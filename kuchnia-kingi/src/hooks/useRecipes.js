import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { mockRecipes } from '../data/mockRecipes';

const STORAGE_KEY = 'kuchnia-kingi-recipes';

function loadFromLocalStorage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed && parsed.length > 0) return parsed;
    }
  } catch {
    // ignore
  }
  return mockRecipes;
}

function toDbRow(recipe) {
  return {
    id: recipe.id,
    title: recipe.title,
    category: recipe.category,
    prep_time: recipe.prepTime,
    servings: recipe.servings,
    is_premium: recipe.isPremium ?? false,
    description: recipe.description,
    image: recipe.image ?? null,
    ingredients: recipe.ingredients,
    steps: recipe.steps,
    created_at: recipe.createdAt,
  };
}

function fromDbRow(row) {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    prepTime: row.prep_time,
    servings: row.servings,
    isPremium: row.is_premium,
    description: row.description,
    image: row.image,
    ingredients: row.ingredients,
    steps: row.steps,
    createdAt: row.created_at,
  };
}

async function fetchFromSupabase() {
  const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase fetch error:', error.message);
    return null;
  }
  return data.map(fromDbRow);
}

export function useRecipes() {
  const [recipes, setRecipes] = useState(() => {
    if (isSupabaseConfigured()) return [];
    return loadFromLocalStorage();
  });
  const [loading, setLoading] = useState(isSupabaseConfigured());

  useEffect(() => {
    if (!isSupabaseConfigured()) return;

    let cancelled = false;
    fetchFromSupabase().then((data) => {
      if (cancelled) return;
      setRecipes(data ?? loadFromLocalStorage());
      setLoading(false);
    });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
    }
  }, [recipes]);

  const addRecipe = async (recipe) => {
    const newRecipe = {
      ...recipe,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    if (isSupabaseConfigured()) {
      const { error } = await supabase
        .from('recipes')
        .insert(toDbRow(newRecipe));

      if (error) {
        console.error('Supabase insert error:', error.message);
      }
    }

    setRecipes((prev) => [newRecipe, ...prev]);
    return newRecipe;
  };

  const updateRecipe = async (id, data) => {
    if (isSupabaseConfigured()) {
      const updated = { ...recipes.find((r) => r.id === id), ...data };
      const { error } = await supabase
        .from('recipes')
        .update(toDbRow(updated))
        .eq('id', id);

      if (error) {
        console.error('Supabase update error:', error.message);
      }
    }

    setRecipes((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...data } : r))
    );
  };

  const deleteRecipe = async (id) => {
    if (isSupabaseConfigured()) {
      const { error } = await supabase
        .from('recipes')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Supabase delete error:', error.message);
      }
    }

    setRecipes((prev) => prev.filter((r) => r.id !== id));
  };

  const getRecipe = (id) => recipes.find((r) => r.id === id);

  return { recipes, loading, addRecipe, updateRecipe, deleteRecipe, getRecipe };
}
