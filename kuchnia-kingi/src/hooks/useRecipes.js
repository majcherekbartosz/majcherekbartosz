import { useState, useEffect } from 'react';
import { mockRecipes } from '../data/mockRecipes';

const STORAGE_KEY = 'kuchnia-kingi-recipes';

export function useRecipes() {
  const [recipes, setRecipes] = useState(() => {
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
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
  }, [recipes]);

  const addRecipe = (recipe) => {
    const newRecipe = {
      ...recipe,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setRecipes((prev) => [newRecipe, ...prev]);
    return newRecipe;
  };

  const updateRecipe = (id, data) => {
    setRecipes((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...data } : r))
    );
  };

  const deleteRecipe = (id) => {
    setRecipes((prev) => prev.filter((r) => r.id !== id));
  };

  const getRecipe = (id) => recipes.find((r) => r.id === id);

  return { recipes, addRecipe, updateRecipe, deleteRecipe, getRecipe };
}
