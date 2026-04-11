-- supabase/migrations/0002_admin_functions.sql
-- Read-side stored functions for the admin dashboard. Having these as
-- SQL functions keeps the TypeScript query layer small and pushes heavy
-- aggregation onto Postgres.

------------------------------------------------------------
-- admin_summary
------------------------------------------------------------
create or replace function admin_summary(
  p_start timestamptz,
  p_end   timestamptz,
  p_gap_seconds int
) returns table (
  total_pageviews         bigint,
  unique_visitors         bigint,
  sessions                bigint,
  avg_session_seconds     numeric,
  bounce_rate             numeric,
  returning_visitor_rate  numeric,
  top_country             text,
  top_country_share       numeric,
  top_page                text,
  top_page_share          numeric,
  desktop_share           numeric,
  peak_date               date,
  peak_views              bigint,
  peak_referrer           text
) language sql stable as $$
  with hits as (
    select *
      from server_hits
      where is_bot = false
        and created_at <= p_end
        and (p_start is null or created_at >= p_start)
  ),
  ordered as (
    select
      visitor_id,
      created_at,
      path,
      lag(created_at) over (partition by visitor_id order by created_at) as prev_at
    from hits
  ),
  session_starts as (
    select
      visitor_id,
      created_at,
      path,
      (prev_at is null or extract(epoch from (created_at - prev_at)) > p_gap_seconds) as new_session
    from ordered
  ),
  session_ids as (
    select
      visitor_id,
      created_at,
      path,
      sum(case when new_session then 1 else 0 end) over (partition by visitor_id order by created_at) as session_num
    from session_starts
  ),
  sessions_agg as (
    select
      visitor_id,
      session_num,
      min(created_at) as started_at,
      max(created_at) as ended_at,
      count(*) as hits_in_session
    from session_ids
    group by visitor_id, session_num
  ),
  returning_flag as (
    select
      s.visitor_id,
      s.session_num,
      exists (
        select 1 from server_hits h2
          where h2.visitor_id = s.visitor_id
            and h2.is_bot = false
            and h2.created_at < s.started_at - make_interval(secs => p_gap_seconds)
      ) as is_returning
    from sessions_agg s
  ),
  daily as (
    select date_trunc('day', created_at)::date as day, count(*) as v
    from hits group by 1
  ),
  peak_day as (
    select day, v from daily order by v desc, day desc limit 1
  ),
  peak_referrer_calc as (
    select referrer_source
      from hits, peak_day
      where date_trunc('day', hits.created_at)::date = peak_day.day
        and referrer_source is not null
      group by referrer_source
      order by count(*) desc
      limit 1
  ),
  top_country_calc as (
    select country, count(*)::numeric / nullif((select count(*) from hits where country is not null), 0) as share
      from hits
      where country is not null
      group by country
      order by count(*) desc
      limit 1
  ),
  top_page_calc as (
    select path, count(*)::numeric / nullif((select count(*) from hits), 0) as share
      from hits
      group by path
      order by count(*) desc
      limit 1
  )
  select
    (select count(*) from hits)::bigint as total_pageviews,
    (select count(distinct visitor_id) from hits)::bigint as unique_visitors,
    (select count(*) from sessions_agg)::bigint as sessions,
    coalesce((select avg(extract(epoch from (ended_at - started_at))) from sessions_agg), 0)::numeric as avg_session_seconds,
    case when (select count(*) from sessions_agg) = 0
      then null
      else (select count(*)::numeric / (select count(*) from sessions_agg)
              from sessions_agg where hits_in_session = 1)
    end as bounce_rate,
    case when (select count(*) from returning_flag) = 0
      then null
      else (select count(*)::numeric / (select count(*) from returning_flag)
              from returning_flag where is_returning)
    end as returning_visitor_rate,
    (select country from top_country_calc) as top_country,
    (select share from top_country_calc) as top_country_share,
    (select path from top_page_calc) as top_page,
    (select share from top_page_calc) as top_page_share,
    coalesce(
      (select (count(*) filter (where device = 'Desktop'))::numeric / nullif(count(*), 0) from hits),
      0
    ) as desktop_share,
    (select day from peak_day) as peak_date,
    (select v from peak_day) as peak_views,
    (select referrer_source from peak_referrer_calc) as peak_referrer
$$;

------------------------------------------------------------
-- admin_daily_pageviews
------------------------------------------------------------
create or replace function admin_daily_pageviews(
  p_start timestamptz,
  p_end   timestamptz
) returns table (
  day       date,
  views     bigint,
  visitors  bigint
) language sql stable as $$
  select
    date_trunc('day', created_at)::date as day,
    count(*)::bigint as views,
    count(distinct visitor_id)::bigint as visitors
  from server_hits
  where is_bot = false
    and created_at <= p_end
    and (p_start is null or created_at >= p_start)
  group by 1
  order by 1
$$;

------------------------------------------------------------
-- admin_top_pages
------------------------------------------------------------
create or replace function admin_top_pages(
  p_start timestamptz,
  p_end   timestamptz,
  p_limit int
) returns table (
  path              text,
  views             bigint,
  avg_scroll        numeric,
  avg_time_seconds  numeric
) language sql stable as $$
  with views_by_path as (
    select path, count(*)::bigint as views
    from server_hits
    where is_bot = false
      and created_at <= p_end
      and (p_start is null or created_at >= p_start)
    group by path
    order by views desc
    limit p_limit
  ),
  engagement_by_path as (
    select
      path,
      avg((payload->>'max_scroll_pct')::numeric) as avg_scroll,
      avg((payload->>'visible_ms')::numeric) / 1000.0 as avg_time_seconds
    from client_events
    where event_type = 'engagement'
      and created_at <= p_end
      and (p_start is null or created_at >= p_start)
    group by path
  )
  select v.path, v.views, e.avg_scroll, e.avg_time_seconds
  from views_by_path v
  left join engagement_by_path e using (path)
  order by v.views desc
$$;
