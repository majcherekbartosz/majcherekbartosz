import { Clock, Users, Heart } from 'lucide-react';

export default function RecipeCard({ recipe, onClick, isFavorite, onToggleFavorite }) {
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onToggleFavorite(recipe.id);
  };

  return (
    <article
      onClick={onClick}
      className="group cursor-pointer flex gap-4 items-start"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      aria-label={`Otwórz przepis: ${recipe.title}`}
    >
      {/* Image */}
      <div className="relative w-28 h-28 md:w-36 md:h-36 flex-shrink-0 rounded-xl overflow-hidden shadow-soft">
        <img
          src={recipe.image || 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=70'}
          alt={recipe.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Favorite heart */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full bg-surface-container-lowest/80 backdrop-blur-sm shadow-sm active:scale-90 transition-transform"
          aria-label={isFavorite ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
        >
          <Heart
            size={14}
            className={`transition-all duration-200 ${
              isFavorite ? 'text-tertiary fill-tertiary' : 'text-outline'
            }`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 py-1">
        <span className="label-caps text-on-surface-variant block mb-1">{recipe.category}</span>
        <h3 className="font-serif text-body-lg font-medium text-on-surface leading-snug mb-1.5 group-hover:text-tertiary transition-colors line-clamp-2">
          {recipe.title}
        </h3>
        <p className="text-body-sm text-on-surface-variant line-clamp-2 mb-2">
          {recipe.description}
        </p>
        <div className="flex items-center gap-3 text-body-sm text-outline">
          <span className="flex items-center gap-1">
            <Clock size={13} />
            {recipe.prepTime} min
          </span>
          <span className="flex items-center gap-1">
            <Users size={13} />
            {recipe.servings}
          </span>
        </div>
      </div>
    </article>
  );
}
