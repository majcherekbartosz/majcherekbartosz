import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'kuchnia-kingi-ratings';

function loadRatings() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

export function useRatings() {
  const [ratings, setRatings] = useState(loadRatings);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ratings));
  }, [ratings]);

  const setRating = useCallback((recipeId, stars) => {
    if (!recipeId) return;
    const value = Math.min(5, Math.max(1, Math.round(stars)));
    setRatings((prev) => ({ ...prev, [recipeId]: value }));
  }, []);

  const clearRating = useCallback((recipeId) => {
    setRatings((prev) => {
      const next = { ...prev };
      delete next[recipeId];
      return next;
    });
  }, []);

  const getRating = useCallback(
    (recipeId) => ratings[recipeId] ?? 0,
    [ratings]
  );

  return { ratings, setRating, clearRating, getRating };
}
