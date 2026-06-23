import { useState, useMemo } from 'react';
import { Search, Plus, BookOpen, X, UtensilsCrossed } from 'lucide-react';
import RecipeCard from './RecipeCard';
import { CATEGORIES } from '../data/mockRecipes';

const ALL = 'Wszystkie';

export default function Dashboard({ recipes, onRecipeClick, onAddRecipe, isFavorite, onToggleFavorite }) {
  const [query, setQuery] = useState('');
  const [ingredientQuery, setIngredientQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(ALL);
  const [searchMode, setSearchMode] = useState('title');

  const filtered = useMemo(() => {
    return recipes.filter((r) => {
      const matchesCategory = activeCategory === ALL || r.category === activeCategory;

      if (searchMode === 'ingredients') {
        const terms = ingredientQuery
          .toLowerCase()
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean);
        if (terms.length === 0) return matchesCategory;
        const ingredientsText = r.ingredients.join(' ').toLowerCase();
        const matchesIngredients = terms.every((term) => ingredientsText.includes(term));
        return matchesCategory && matchesIngredients;
      }

      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [recipes, query, ingredientQuery, activeCategory, searchMode]);

  const tabs = [ALL, ...CATEGORIES];
  const activeQuery = searchMode === 'ingredients' ? ingredientQuery : query;
  const featuredRecipe = filtered[0];
  const restRecipes = filtered.slice(1);

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 py-6 md:py-10">
      {/* Search */}
      <div className="relative mb-6">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none"
        />
        <input
          type="search"
          value={searchMode === 'ingredients' ? ingredientQuery : query}
          onChange={(e) =>
            searchMode === 'ingredients'
              ? setIngredientQuery(e.target.value)
              : setQuery(e.target.value)
          }
          placeholder={
            searchMode === 'ingredients'
              ? 'Wpisz składniki: kurczak, ryż, czosnek...'
              : 'Szukaj przepisów...'
          }
          className="input-field pl-11 pr-10"
          aria-label="Szukaj przepisów"
        />
        {activeQuery && (
          <button
            onClick={() => searchMode === 'ingredients' ? setIngredientQuery('') : setQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-charcoal-700 transition-colors"
            aria-label="Wyczyść"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Search mode toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setSearchMode('title')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium transition-all duration-200 ${
            searchMode === 'title'
              ? 'bg-brand-400 text-white shadow-sm'
              : 'bg-surface-card text-charcoal-600 border border-outline-variant/50 hover:border-brand-400'
          }`}
        >
          <Search size={12} />
          Po nazwie
        </button>
        <button
          onClick={() => setSearchMode('ingredients')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium transition-all duration-200 ${
            searchMode === 'ingredients'
              ? 'bg-sage-400 text-white shadow-sm'
              : 'bg-surface-card text-charcoal-600 border border-outline-variant/50 hover:border-sage-400'
          }`}
        >
          <UtensilsCrossed size={12} />
          Mam w lodówce...
        </button>
      </div>

      {/* Ingredient hint */}
      {searchMode === 'ingredients' && ingredientQuery && (
        <p className="text-xs text-sage-500 -mt-4 mb-5 pl-1">
          Znaleziono {filtered.length} {filtered.length === 1 ? 'przepis' : filtered.length < 5 ? 'przepisy' : 'przepisów'}
        </p>
      )}

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-8 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveCategory(tab)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeCategory === tab
                ? 'bg-brand-400 text-white shadow-sm'
                : 'bg-surface-card text-charcoal-600 border border-outline-variant/50 hover:border-brand-400 hover:text-brand-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      {filtered.length > 0 ? (
        <div className="space-y-8">
          {/* Featured recipe — large card */}
          {featuredRecipe && (
            <div
              onClick={() => onRecipeClick(featuredRecipe.id)}
              className="card cursor-pointer group"
              role="button"
              tabIndex={0}
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={featuredRecipe.image || 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=70'}
                  alt={featuredRecipe.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="bg-brand-400/90 backdrop-blur-sm text-white text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full">
                    Recipe of the day
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="font-serif text-2xl md:text-3xl font-semibold text-white leading-tight mb-2">
                    {featuredRecipe.title}
                  </h2>
                  <div className="flex items-center gap-3 text-white/80 text-xs">
                    <span>⏱ {featuredRecipe.prepTime} min</span>
                    <span>👤 {featuredRecipe.servings} porcji</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Recent Recipes heading */}
          {restRecipes.length > 0 && (
            <>
              <div className="flex items-center justify-between">
                <h2 className="font-serif font-semibold text-lg text-charcoal-700">Recent Recipes</h2>
                <span className="text-xs font-medium text-brand-400">View All</span>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
            </>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-20 h-20 bg-brand-50 rounded-full flex items-center justify-center mb-5">
            <BookOpen size={32} className="text-brand-200" />
          </div>
          <h3 className="font-serif text-2xl font-semibold text-charcoal-700 mb-2">
            Brak przepisów
          </h3>
          <p className="text-outline mb-6 max-w-xs">
            {activeQuery || activeCategory !== ALL
              ? searchMode === 'ingredients'
                ? 'Nie znaleziono przepisów z podanymi składnikami.'
                : 'Nie znaleziono przepisów pasujących do kryteriów.'
              : 'Twoja kuchenna książka jest pusta. Czas ją zapełnić!'}
          </p>
          {!activeQuery && activeCategory === ALL && (
            <button onClick={onAddRecipe} className="btn-primary flex items-center gap-2">
              <Plus size={16} />
              Dodaj pierwszy przepis
            </button>
          )}
        </div>
      )}
    </div>
  );
}
