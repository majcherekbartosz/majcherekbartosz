-- Already executed in Supabase Dashboard
-- Kept here for reference

ALTER TABLE recipes
  ADD COLUMN IF NOT EXISTS is_favorite boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS is_public   boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS user_id     uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  ADD COLUMN IF NOT EXISTS cook_time   integer,
  ADD COLUMN IF NOT EXISTS updated_at  timestamptz DEFAULT now();

CREATE TABLE IF NOT EXISTS shopping_list_items (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name       text NOT NULL,
  amount     numeric,
  unit       text,
  is_checked boolean DEFAULT false,
  recipe_id  text REFERENCES recipes(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE shopping_list_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own shopping list" ON shopping_list_items
  FOR ALL USING (auth.uid() = user_id);

ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own recipes" ON recipes
  FOR ALL USING (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "Public recipes readable" ON recipes
  FOR SELECT USING (is_public = true);

CREATE INDEX IF NOT EXISTS idx_recipes_user_id   ON recipes(user_id);
CREATE INDEX IF NOT EXISTS idx_recipes_category  ON recipes(category);
CREATE INDEX IF NOT EXISTS idx_shopping_user_id  ON shopping_list_items(user_id);
