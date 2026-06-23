import { Clock, Users, Heart } from 'lucide-react';

export default function RecipeCard({ recipe, onClick, isFavorite, onToggleFavorite }) {
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onToggleFavorite(recipe.id);
  };

  return (
    <article
      onClick={onClick}
      className="card group cursor-pointer"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      aria-label={`Otwórz przepis: ${recipe.title}`}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-square">
        <img
          src={recipe.image || 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=70'}
          alt={recipe.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-brand-50/90 backdrop-blur-sm text-brand-800 border border-brand-200/50 text-[10px] font-semibold px-2.5 py-1 rounded-full">
            {recipe.category}
          </span>
        </div>
        {/* Favorite heart */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow-sm active:scale-90 transition-transform"
          aria-label={isFavorite ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
        >
          <Heart
            size={16}
            className={`transition-all duration-200 ${
              isFavorite ? 'text-brand-400 fill-brand-400 scale-110' : 'text-charcoal-600'
            }`}
          />
        </button>
        {/* Premium badge */}
        {recipe.isPremium && (
          <div className="absolute bottom-3 left-3">
            <span className="bg-charcoal-700/80 backdrop-blur-sm text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
              Premium
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-serif font-medium text-charcoal-700 leading-snug mb-2 line-clamp-2">
          {recipe.title}
        </h3>
        <div className="flex items-center gap-3 text-xs text-outline">
          <span className="flex items-center gap-1">
            <Clock size={12} className="text-brand-400" />
            {recipe.prepTime} min
          </span>
          <span className="flex items-center gap-1">
            <Users size={12} className="text-brand-400" />
            {recipe.servings} porcji
          </span>
        </div>
      </div>
    </article>
  );
}
