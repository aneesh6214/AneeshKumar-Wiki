-- supabase/migrations/0003_ama_questions.sql

create extension if not exists pgcrypto;

create table if not exists ama_questions (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  question    text not null check (char_length(trim(question)) between 1 and 1000),
  answer      text,
  answered_at timestamptz,
  archived_at timestamptz
);

create index if not exists ama_questions_created_at_idx
  on ama_questions (created_at desc);

create index if not exists ama_questions_answered_at_idx
  on ama_questions (answered_at desc)
  where answer is not null and archived_at is null;

create index if not exists ama_questions_pending_idx
  on ama_questions (created_at desc)
  where answer is null and archived_at is null;

-- Lock down direct access. Public submission and admin moderation go through
-- server-side code using the service role.
alter table ama_questions enable row level security;
