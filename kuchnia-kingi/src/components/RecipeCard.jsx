import { Clock, Users, ChevronRight, Lock } from 'lucide-react';
import { CATEGORY_COLORS } from '../data/mockRecipes';

export default function RecipeCard({ recipe, onClick }) {
  const colors = CATEGORY_COLORS[recipe.category] || {
    bg: 'bg-gray-100',
    text: 'text-gray-700',
    border: 'border-gray-200',
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
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={recipe.image || 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=70'}
          alt={recipe.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
        <div className="absolute top-3 left-3">
          <span className={`tag-pill ${colors.bg} ${colors.text} border ${colors.border} font-medium backdrop-blur-sm`}>
            {recipe.category}
          </span>
        </div>
        {recipe.isPremium && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wide bg-charcoal-800/80 text-cream-100 backdrop-blur-sm border border-cream-200/20 shadow-sm">
              <Lock size={10} />
              Premium
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        <h3 className="font-serif text-lg font-semibold text-charcoal-800 leading-snug mb-2 group-hover:text-terracotta-500 transition-colors line-clamp-2">
          {recipe.title}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4">
          {recipe.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              <Clock size={13} className="text-terracotta-400" />
              {recipe.prepTime} min
            </span>
            <span className="flex items-center gap-1.5">
              <Users size={13} className="text-terracotta-400" />
              {recipe.servings} porcji
            </span>
          </div>
          <ChevronRight
            size={16}
            className="text-gray-300 group-hover:text-terracotta-400 group-hover:translate-x-1 transition-all duration-200"
          />
        </div>
      </div>
    </article>
  );
}
