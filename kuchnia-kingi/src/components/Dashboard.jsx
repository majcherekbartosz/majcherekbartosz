import { useState, useMemo, useRef, useEffect } from 'react';
import { Search, Plus, X, UtensilsCrossed } from 'lucide-react';
import RecipeCard from './RecipeCard';
import { CATEGORIES } from '../data/mockRecipes';

const ALL = 'Wszystkie';
const QUICK = 'Szybkie (15 min)';

export default function Dashboard({ recipes, onRecipeClick, onAddRecipe, isFavorite, onToggleFavorite, focusSearchSignal }) {
  const [query, setQuery] = useState('');
  const [ingredientQuery, setIngredientQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(ALL);
  const [searchMode, setSearchMode] = useState('title');
  const searchInputRef = useRef(null);

  // Po klinieciu "Szukaj" (licznik rosnie) ustaw kursor w polu wyszukiwania.
  // Na telefonie fokus otwiera klawiature i przewija do pola.
  useEffect(() => {
    if (focusSearchSignal > 0 && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [focusSearchSignal]);

  const filtered = useMemo(() => {
    return recipes.filter((r) => {
      const matchesCategory =
        activeCategory === ALL ||
        (activeCategory === QUICK ? r.prepTime <= 15 : r.category === activeCategory);

      if (searchMode === 'ingredients') {
        const terms = ingredientQuery.toLowerCase().split(',').map((t) => t.trim()).filter(Boolean);
        if (terms.length === 0) return matchesCategory;
        const ingredientsText = r.ingredients.join(' ').toLowerCase();
        return matchesCategory && terms.every((term) => ingredientsText.includes(term));
      }

      const q = query.trim().toLowerCase();
      const matchesQuery = !q || r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [recipes, query, ingredientQuery, activeCategory, searchMode]);

  const tabs = [ALL, QUICK, ...CATEGORIES];
  const activeQuery = searchMode === 'ingredients' ? ingredientQuery : query;
  const featuredRecipe = filtered[0];
  const restRecipes = filtered.slice(1);

  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-6 md:py-10 pb-24 md:pb-10">
      {/* Search bar */}
      <div className="relative mb-6">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none" />
        <input
          ref={searchInputRef}
          type="search"
          value={searchMode === 'ingredients' ? ingredientQuery : query}
          onChange={(e) => searchMode === 'ingredients' ? setIngredientQuery(e.target.value) : setQuery(e.target.value)}
          placeholder={searchMode === 'ingredients' ? 'Wpisz składniki: kurczak, ryż...' : 'Szukaj inspiracji...'}
          className="input-field pl-11 pr-10"
          aria-label="Szukaj przepisów"
        />
        {activeQuery && (
          <button onClick={() => searchMode === 'ingredients' ? setIngredientQuery('') : setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors" aria-label="Wyczyść">
            <X size={16} />
          </button>
        )}
      </div>

      {/* Category chips (screen6.png style) */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveCategory(tab)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-body-sm font-medium transition-all duration-200 ${
              activeCategory === tab
                ? 'bg-tertiary text-on-tertiary shadow-sm'
                : 'bg-surface-container-lowest text-on-surface-variant border border-outline-variant/40 hover:border-tertiary hover:text-tertiary'
            }`}
          >
            {tab}
          </button>
        ))}
        {/* Search mode toggle */}
        <button
          onClick={() => setSearchMode(searchMode === 'title' ? 'ingredients' : 'title')}
          className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-body-sm font-medium transition-all duration-200 ${
            searchMode === 'ingredients'
              ? 'bg-primary text-on-primary'
              : 'bg-surface-container-lowest text-on-surface-variant border border-outline-variant/40 hover:border-primary'
          }`}
        >
          <UtensilsCrossed size={14} />
          Składniki
        </button>
      </div>

      {/* Content */}
      {filtered.length > 0 ? (
        <div className="space-y-stack-lg">
          {/* Featured Recipe — "Przepis Dnia" (screen6.png) */}
          {featuredRecipe && (
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-headline-lg-mobile md:text-headline-lg text-on-surface">Przepis Dnia</h2>
                <span className="label-caps text-tertiary">Polecane</span>
              </div>
              <div
                onClick={() => onRecipeClick(featuredRecipe.id)}
                className="card cursor-pointer group"
                role="button"
                tabIndex={0}
              >
                <div className="relative aspect-[4/3] md:aspect-[16/9] md:max-h-[60vh] overflow-hidden">
                  <img
                    src={featuredRecipe.image || 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=70'}
                    alt={featuredRecipe.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 w-full p-6">
                    <div className="flex gap-2 mb-2">
                      <span className="tag-pill bg-primary-container text-on-primary-container">{featuredRecipe.category}</span>
                      <span className="tag-pill bg-surface-container-high/80 text-on-surface-variant backdrop-blur-sm">
                        ⏱ {featuredRecipe.prepTime} min
                      </span>
                    </div>
                    <h3 className="font-serif text-headline-lg-mobile md:text-headline-lg text-white leading-tight mb-1">
                      {featuredRecipe.title}
                    </h3>
                    <p className="text-body-sm text-white/70 line-clamp-2">{featuredRecipe.description}</p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Recipe Grid — "Nowe przepisy" */}
          {restRecipes.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-headline-lg-mobile md:text-headline-lg text-on-surface">Nowe przepisy</h2>
                <button className="label-caps text-tertiary hover:text-on-tertiary-container transition-colors">Zobacz wszystko</button>
              </div>
              <div className="space-y-5">
                {restRecipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onClick={() => onRecipeClick(recipe.id)}
                    isFavorite={isFavorite(recipe.id)}
                    onToggleFavorite={onToggleFavorite}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <span className="text-5xl mb-4">🍳</span>
          <h3 className="font-serif text-headline-md text-on-surface mb-2">Brak przepisów</h3>
          <p className="text-body-md text-on-surface-variant mb-6 max-w-xs">
            {activeQuery ? 'Nie znaleziono przepisów.' : 'Twoja kuchenna książka jest pusta. Czas ją zapełnić!'}
          </p>
          {!activeQuery && (
            <button onClick={onAddRecipe} className="btn-primary flex items-center gap-2">
              <Plus size={16} /> Dodaj pierwszy przepis
            </button>
          )}
        </div>
      )}
    </div>
  );
}
