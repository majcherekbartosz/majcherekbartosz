-- Kuchnia Kingi: recipes table schema for Supabase
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor > New Query)

create table if not exists recipes (
  id text primary key,
  title text not null,
  category text not null,
  prep_time integer not null default 0,
  servings integer not null default 1,
  is_premium boolean not null default false,
  description text,
  image text,
  ingredients jsonb not null default '[]'::jsonb,
  steps jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

-- Enable Row Level Security (RLS)
alter table recipes enable row level security;

-- Public read access (anon key can read all recipes)
create policy "Public read access"
  on recipes for select
  using (true);

-- Public write access (for demo purposes; restrict in production)
create policy "Public insert access"
  on recipes for insert
  with check (true);

create policy "Public update access"
  on recipes for update
  using (true);

create policy "Public delete access"
  on recipes for delete
  using (true);

-- Optional: seed with initial data
insert into recipes (id, title, category, prep_time, servings, is_premium, description, image, ingredients, steps, created_at)
values
  ('1', 'Puszyste Pancakes z Owocami', 'Śniadanie', 20, 4, false,
   'Lekkie, puszyste pancakes o złotistym kolorze, podawane z sezonowymi owocami, syropem klonowym i odrobiną świeżej śmietany.',
   'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=1200&q=80',
   '["200 g mąki pszennej","2 łyżeczki proszku do pieczenia","1 łyżka cukru","szczypta soli","250 ml mleka","2 duże jajka","2 łyżki masła, roztopionego","1 łyżeczka ekstraktu waniliowego","150 g świeżych borówek","1 banan, pokrojony w plasterki","syrop klonowy do podania","śmietana 30% do podania"]'::jsonb,
   '["W dużej misce wymieszaj suche składniki: mąkę, proszek do pieczenia, cukier i sól.","W osobnej misce połącz mleko, jajka, roztopione masło i ekstrakt waniliowy.","Wlej mokre składniki do suchych i wymieszaj do połączenia.","Rozgrzej patelnię na średnim ogniu i lekko posmaruj masłem.","Na każdego pancakesa wylej około 3 łyżki ciasta. Smaż 2-3 minuty.","Smaż kolejne 1-2 minuty do złotego koloru.","Podawaj z borówkami, bananem, syropem klonowym i kleksem śmietany."]'::jsonb,
   '2024-01-15T00:00:00Z')
on conflict (id) do nothing;
