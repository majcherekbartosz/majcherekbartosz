import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'favorite_recipes';

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = useCallback((recipeId) => {
    setFavorites((prev) =>
      prev.includes(recipeId)
        ? prev.filter((id) => id !== recipeId)
        : [...prev, recipeId]
    );
  }, []);

  const isFavorite = useCallback(
    (recipeId) => favorites.includes(recipeId),
    [favorites]
  );

  return { favorites, toggleFavorite, isFavorite };
}
