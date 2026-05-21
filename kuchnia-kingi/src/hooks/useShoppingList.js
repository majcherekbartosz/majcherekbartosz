import { useState, useEffect, useCallback } from 'react';

function getStorageKey(recipeId) {
  return `shopping_list_${recipeId}`;
}

export function useShoppingList(recipeId) {
  const [checked, setChecked] = useState(() => {
    if (!recipeId) return [];
    try {
      const stored = localStorage.getItem(getStorageKey(recipeId));
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (!recipeId) return;
    localStorage.setItem(getStorageKey(recipeId), JSON.stringify(checked));
  }, [checked, recipeId]);

  const toggleItem = useCallback((index) => {
    setChecked((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  }, []);

  const isChecked = useCallback(
    (index) => checked.includes(index),
    [checked]
  );

  const checkedCount = checked.length;

  return { toggleItem, isChecked, checkedCount };
}
