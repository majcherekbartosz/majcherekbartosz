/**
 * Scales numeric quantities in an ingredient string by a multiplier.
 * Handles patterns like "200 g mąki", "2 łyżki", "1/2 szklanki", etc.
 * Returns the original string if no number is found.
 */
export function scaleIngredient(ingredient, multiplier) {
  if (multiplier === 1) return ingredient;

  return ingredient.replace(
    /(\d+[.,]?\d*)\s*([/-]\s*\d+[.,]?\d*)?/g,
    (match, num, fraction) => {
      if (fraction) {
        const cleanFraction = fraction.replace(/\s/g, '');
        if (cleanFraction.startsWith('/')) {
          const denominator = parseFloat(cleanFraction.slice(1).replace(',', '.'));
          const value = parseFloat(num.replace(',', '.')) / denominator;
          const scaled = value * multiplier;
          return formatNumber(scaled);
        }
        if (cleanFraction.startsWith('-')) {
          const secondNum = parseFloat(cleanFraction.slice(1).replace(',', '.'));
          const scaledFirst = parseFloat(num.replace(',', '.')) * multiplier;
          const scaledSecond = secondNum * multiplier;
          return `${formatNumber(scaledFirst)}-${formatNumber(scaledSecond)}`;
        }
      }
      const value = parseFloat(num.replace(',', '.'));
      const scaled = value * multiplier;
      return formatNumber(scaled);
    }
  );
}

function formatNumber(n) {
  if (Number.isInteger(n)) return String(n);
  const rounded = Math.round(n * 10) / 10;
  if (Number.isInteger(rounded)) return String(rounded);
  return rounded.toString().replace('.', ',');
}
