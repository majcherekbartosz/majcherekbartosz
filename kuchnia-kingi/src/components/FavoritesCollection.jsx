import { Heart } from 'lucide-react';
import RecipeCard from './RecipeCard';

export default function FavoritesCollection({ recipes, favorites, onRecipeClick, isFavorite, onToggleFavorite }) {
  const favoriteRecipes = recipes.filter((r) => favorites.includes(r.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8 sm:mb-12">
        <p className="text-sm font-medium text-terracotta-500 uppercase tracking-widest mb-2 font-sans">
          Twoje ulubione
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-charcoal-800 leading-tight mb-3">
          Moja Kolekcja
        </h1>
        <p className="text-gray-500 text-base sm:text-lg max-w-xl">
          {favoriteRecipes.length > 0
            ? `${favoriteRecipes.length} ${favoriteRecipes.length === 1 ? 'przepis' : favoriteRecipes.length < 5 ? 'przepisy' : 'przepisów'} w Twojej kolekcji`
            : 'Przepisy, które pokochasz'}
        </p>
      </div>

      {/* Grid or Empty State */}
      {favoriteRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {favoriteRecipes.map((recipe) => (
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
            <Heart size={32} className="text-terracotta-300" />
          </div>
          <h3 className="font-serif text-2xl font-semibold text-charcoal-700 mb-2">
            Twoja kolekcja jest jeszcze pusta
          </h3>
          <p className="text-gray-400 mb-2 max-w-sm">
            Dodaj pierwsze przepisy za pomocą ikony serca!
          </p>
          <p className="text-gray-400 text-sm max-w-xs">
            Kliknij <Heart size={12} className="inline text-terracotta-400" /> na karcie dowolnego przepisu, 
            aby dodać go do swojej kolekcji ulubionych.
          </p>
        </div>
      )}
    </div>
  );
}
