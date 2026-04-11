-- supabase/migrations/0001_init_analytics.sql

create table if not exists server_hits (
  id              bigserial primary key,
  created_at      timestamptz not null default now(),
  visitor_id      text not null,
  path            text not null,
  -- UA-derived
  device          text,
  browser         text,
  os              text,
  is_bot          boolean not null default false,
  -- Edge geo
  country         text,
  region          text,
  city            text,
  -- Referrer
  referrer_raw    text,
  referrer_source text,
  referrer_bucket text
);

create index if not exists server_hits_created_at_idx on server_hits (created_at desc);
create index if not exists server_hits_visitor_created_idx on server_hits (visitor_id, created_at);
create index if not exists server_hits_path_idx on server_hits (path);
create index if not exists server_hits_is_bot_idx on server_hits (is_bot);

create table if not exists client_events (
  id          bigserial primary key,
  created_at  timestamptz not null default now(),
  visitor_id  text not null,
  event_type  text not null,
  path        text,
  payload     jsonb not null default '{}'::jsonb
);

create index if not exists client_events_created_at_idx on client_events (created_at desc);
create index if not exists client_events_type_created_idx on client_events (event_type, created_at desc);
create index if not exists client_events_path_idx on client_events (path);

-- Lock down direct access. Service role bypasses RLS so reads/writes from
-- our server code still work; anon role is rejected.
alter table server_hits  enable row level security;
alter table client_events enable row level security;
