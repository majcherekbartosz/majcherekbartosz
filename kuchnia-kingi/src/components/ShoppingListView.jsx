import { ShoppingCart, Check, Trash2, X } from 'lucide-react';

export default function ShoppingListView({
  items,
  onToggle,
  onRemove,
  onRemoveRecipeGroup,
  onClearChecked,
  onClearAll,
  onOpenRecipe,
}) {
  const grouped = items.reduce((acc, item) => {
    const key = item.recipeId || 'other';
    if (!acc[key]) {
      acc[key] = { recipeId: item.recipeId, recipeTitle: item.recipeTitle, items: [] };
    }
    acc[key].items.push(item);
    return acc;
  }, {});

  const groups = Object.values(grouped);
  const checkedCount = items.filter((i) => i.checked).length;

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="w-20 h-20 bg-cream-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <ShoppingCart size={32} className="text-sage-400" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-charcoal-800 mb-3">
          Lista zakupów
        </h1>
        <p className="text-gray-500 max-w-md mx-auto">
          Otwórz przepis i kliknij „Dodaj do listy zakupów”, aby wygenerować składniki na podstawie liczby porcji.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <p className="text-sm font-medium text-sage-600 uppercase tracking-widest mb-2">
            Zakupy
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-800">
            Lista zakupów
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            {items.length - checkedCount} do kupienia
            {checkedCount > 0 && ` · ${checkedCount} w koszyku`}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {checkedCount > 0 && (
            <button
              type="button"
              onClick={onClearChecked}
              className="btn-secondary text-sm py-2 px-4"
            >
              Usuń zaznaczone
            </button>
          )}
          <button
            type="button"
            onClick={onClearAll}
            className="text-sm text-red-500 hover:text-red-600 font-medium px-4 py-2 rounded-full hover:bg-red-50 transition-colors"
          >
            Wyczyść wszystko
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {groups.map((group) => (
          <section
            key={group.recipeId || group.recipeTitle}
            className="bg-white rounded-2xl border border-cream-200 shadow-sm overflow-hidden"
          >
            <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3 bg-cream-50 border-b border-cream-200">
              {group.recipeId && onOpenRecipe ? (
                <button
                  type="button"
                  onClick={() => onOpenRecipe(group.recipeId)}
                  className="font-serif text-lg font-semibold text-charcoal-800 hover:text-terracotta-500 text-left transition-colors"
                >
                  {group.recipeTitle}
                </button>
              ) : (
                <h2 className="font-serif text-lg font-semibold text-charcoal-800">
                  {group.recipeTitle || 'Inne'}
                </h2>
              )}
              {group.recipeId && (
                <button
                  type="button"
                  onClick={() => onRemoveRecipeGroup(group.recipeId)}
                  className="text-xs text-gray-400 hover:text-red-500 flex items-center gap-1 transition-colors"
                  aria-label={`Usuń składniki z przepisu ${group.recipeTitle}`}
                >
                  <Trash2 size={12} />
                  Usuń grupę
                </button>
              )}
            </div>
            <ul className="divide-y divide-cream-100">
              {group.items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-3 px-4 sm:px-5 py-3 hover:bg-cream-50/50 transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => onToggle(item.id)}
                    className={`w-5 h-5 flex-shrink-0 rounded-md border-2 flex items-center justify-center transition-all ${
                      item.checked
                        ? 'bg-sage-500 border-sage-500'
                        : 'border-gray-300 hover:border-sage-400'
                    }`}
                    aria-label={item.checked ? 'Oznacz jako do kupienia' : 'Oznacz jako kupione'}
                  >
                    {item.checked && (
                      <Check size={12} className="text-white" strokeWidth={3} />
                    )}
                  </button>
                  <span
                    className={`flex-1 text-sm sm:text-base ${
                      item.checked ? 'line-through text-gray-400' : 'text-gray-700'
                    }`}
                  >
                    {item.text}
                  </span>
                  <button
                    type="button"
                    onClick={() => onRemove(item.id)}
                    className="w-8 h-8 flex items-center justify-center rounded-full text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                    aria-label="Usuń pozycję"
                  >
                    <X size={14} />
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
