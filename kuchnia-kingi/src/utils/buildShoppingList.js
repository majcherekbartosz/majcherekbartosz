import { scaleIngredient } from './scaleIngredient';

/**
 * Builds scaled ingredient lines for a recipe at the given serving count.
 */
export function buildRecipeShoppingItems(recipe, servings = recipe?.servings) {
  if (!recipe?.ingredients?.length) return [];

  const baseServings = recipe.servings || 1;
  const target = servings || baseServings;
  const multiplier = target / baseServings;

  return recipe.ingredients.map((ing, index) => ({
    index,
    text: scaleIngredient(ing, multiplier),
    original: ing,
  }));
}

export function formatShoppingListText(recipeTitle, items) {
  const lines = items.map((item) => `☐ ${item.text}`);
  return [`Lista zakupów — ${recipeTitle}`, '', ...lines].join('\n');
}
