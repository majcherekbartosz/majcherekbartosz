import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'kuchnia-kingi-global-shopping-list';

function loadItems() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function useGlobalShoppingList() {
  const [items, setItems] = useState(loadItems);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addFromRecipe = useCallback((recipe, shoppingItems) => {
    if (!recipe || !shoppingItems?.length) return 0;

    let addedCount = 0;

    setItems((prev) => {
      const existing = new Set(
        prev
          .filter((i) => i.recipeId === recipe.id)
          .map((i) => i.text.toLowerCase().trim())
      );

      const toAdd = shoppingItems
        .filter((item) => !existing.has(item.text.toLowerCase().trim()))
        .map((item) => ({
          id: makeId(),
          text: item.text,
          recipeId: recipe.id,
          recipeTitle: recipe.title,
          checked: false,
          addedAt: new Date().toISOString(),
        }));

      addedCount = toAdd.length;
      return toAdd.length ? [...toAdd, ...prev] : prev;
    });

    return addedCount;
  }, []);

  const toggleItem = useCallback((id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  }, []);

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const removeRecipeItems = useCallback((recipeId) => {
    setItems((prev) => prev.filter((item) => item.recipeId !== recipeId));
  }, []);

  const clearChecked = useCallback(() => {
    setItems((prev) => prev.filter((item) => !item.checked));
  }, []);

  const clearAll = useCallback(() => {
    setItems([]);
  }, []);

  const uncheckedCount = items.filter((i) => !i.checked).length;

  return {
    items,
    uncheckedCount,
    addFromRecipe,
    toggleItem,
    removeItem,
    removeRecipeItems,
    clearChecked,
    clearAll,
  };
}
