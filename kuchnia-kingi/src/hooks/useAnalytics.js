import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'app_stats';

function loadStats() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

export function useAnalytics() {
  const [stats, setStats] = useState(loadStats);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  }, [stats]);

  const trackView = useCallback((recipeId) => {
    setStats((prev) => {
      const entry = prev[recipeId] || { views: 0, clicks: 0 };
      return { ...prev, [recipeId]: { ...entry, views: entry.views + 1 } };
    });
  }, []);

  const trackEbookClick = useCallback((recipeId) => {
    setStats((prev) => {
      const entry = prev[recipeId] || { views: 0, clicks: 0 };
      return { ...prev, [recipeId]: { ...entry, clicks: entry.clicks + 1 } };
    });
  }, []);

  const getStats = useCallback(
    (recipeId) => stats[recipeId] || { views: 0, clicks: 0 },
    [stats]
  );

  return { stats, trackView, trackEbookClick, getStats };
}
