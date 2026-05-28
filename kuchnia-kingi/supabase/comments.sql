-- Kuchnia Kingi: comments table schema for Supabase
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor > New Query)

create table if not exists comments (
  id uuid primary key default gen_random_uuid(),
  recipe_id text not null references recipes(id) on delete cascade,
  author_name text not null,
  content text not null,
  created_at timestamptz not null default now()
);

-- Enable Row Level Security (RLS)
alter table comments enable row level security;

-- Everyone can read comments
create policy "Public read comments"
  on comments for select
  using (true);

-- Everyone can add comments (no login required)
create policy "Public insert comments"
  on comments for insert
  with check (true);

-- Only admin can delete comments (replace UID with your admin user ID)
-- To find your admin UID: Supabase Dashboard > Authentication > Users > copy UID
create policy "Admin delete comments"
  on comments for delete
  using (auth.uid() = '64da71de-557e-4ce9-a335-73f8369b0402'::uuid);

-- Index for faster queries by recipe
create index if not exists idx_comments_recipe_id on comments(recipe_id);
