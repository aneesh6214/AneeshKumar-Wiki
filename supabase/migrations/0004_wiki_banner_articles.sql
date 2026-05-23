-- supabase/migrations/0004_wiki_banner_articles.sql

create extension if not exists pgcrypto;

create table if not exists wiki_banner_articles (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  url           text not null check (char_length(trim(url)) > 0),
  article_title text not null check (char_length(trim(article_title)) > 0),
  article_key   text not null check (char_length(trim(article_key)) > 0),
  enabled       boolean not null default true
);

create unique index if not exists wiki_banner_articles_article_key_idx
  on wiki_banner_articles (article_key);

create index if not exists wiki_banner_articles_enabled_created_at_idx
  on wiki_banner_articles (enabled, created_at desc);

create table if not exists wiki_banner_daily_picks (
  display_date date primary key,
  article_id   uuid not null references wiki_banner_articles(id) on delete restrict,
  created_at   timestamptz not null default now()
);

create index if not exists wiki_banner_daily_picks_article_id_idx
  on wiki_banner_daily_picks (article_id);

alter table wiki_banner_articles enable row level security;
alter table wiki_banner_daily_picks enable row level security;

insert into wiki_banner_articles (url, article_title, article_key)
values
  ('https://en.wikipedia.org/wiki/Mind', 'Mind', 'mind')
on conflict (article_key) do nothing;
