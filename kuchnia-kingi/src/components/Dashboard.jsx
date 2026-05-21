import { useState, useMemo } from 'react';
import { Search, Plus, BookOpen, X } from 'lucide-react';
import RecipeCard from './RecipeCard';
import { CATEGORIES } from '../data/mockRecipes';

const ALL = 'Wszystkie';

export default function Dashboard({ recipes, onRecipeClick, onAddRecipe, isFavorite, onToggleFavorite }) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(ALL);

  const filtered = useMemo(() => {
    return recipes.filter((r) => {
      const matchesCategory = activeCategory === ALL || r.category === activeCategory;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [recipes, query, activeCategory]);

  const tabs = [ALL, ...CATEGORIES];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero */}
      <div className="mb-8 sm:mb-12">
        <p className="text-sm font-medium text-terracotta-500 uppercase tracking-widest mb-2 font-sans">
          Witaj w kuchni
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-charcoal-800 leading-tight mb-3">
          Moje przepisy
        </h1>
        <p className="text-gray-500 text-base sm:text-lg max-w-xl">
          {recipes.length === 0
            ? 'Zacznij od dodania swojego pierwszego przepisu!'
            : `${recipes.length} ${recipes.length === 1 ? 'przepis' : recipes.length < 5 ? 'przepisy' : 'przepisów'} w kolekcji`}
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Szukaj przepisów..."
          className="input-field pl-11 pr-10"
          aria-label="Szukaj przepisów"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Wyczyść wyszukiwanie"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-8 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveCategory(tab)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeCategory === tab
                ? 'bg-terracotta-500 text-white shadow-sm'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-terracotta-300 hover:text-terracotta-500'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {filtered.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={() => onRecipeClick(recipe.id)}
              isFavorite={isFavorite(recipe.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-20 h-20 bg-cream-100 rounded-full flex items-center justify-center mb-5">
            <BookOpen size={32} className="text-terracotta-300" />
          </div>
          <h3 className="font-serif text-2xl font-semibold text-charcoal-700 mb-2">
            Brak przepisów
          </h3>
          <p className="text-gray-400 mb-6 max-w-xs">
            {query || activeCategory !== ALL
              ? 'Nie znaleziono przepisów pasujących do kryteriów.'
              : 'Twoja kuchenna książka jest pusta. Czas ją zapełnić!'}
          </p>
          {!query && activeCategory === ALL && (
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
