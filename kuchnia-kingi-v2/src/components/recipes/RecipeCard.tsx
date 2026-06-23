'use client'

import Link from 'next/link'
import { Heart, Clock } from 'lucide-react'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Recipe } from '@/lib/supabase/types'

interface RecipeCardProps {
  recipe: Recipe
  size?: 'default' | 'large'
}

const CATEGORY_EMOJI: Record<string, string> = {
  sniadanie: '🥐',
  obiad: '🍲',
  kolacja: '🥗',
  deser: '🍰',
  przekaska: '🧀',
  napoj: '🍹',
  inne: '🍽️',
}

export default function RecipeCard({ recipe, size = 'default' }: RecipeCardProps) {
  const [isFavorite, setIsFavorite] = useState(recipe.is_favorite)
  const [animating, setAnimating] = useState(false)

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setAnimating(true)
    setIsFavorite(!isFavorite)
    setTimeout(() => setAnimating(false), 200)

    try {
      const supabase = createClient()
      await supabase
        .from('recipes')
        .update({ is_favorite: !isFavorite })
        .eq('id', recipe.id)
    } catch {
      setIsFavorite(isFavorite)
    }
  }

  const totalTime = recipe.prep_time + (recipe.cook_time ?? 0)
  const emoji = CATEGORY_EMOJI[recipe.category] || '🍽️'

  return (
    <Link
      href={`/przepis/${recipe.id}`}
      className="group block bg-surface-card rounded-3xl border border-outline-variant/30 hover:border-brand-400 hover:scale-[1.02] transition-all duration-200 overflow-hidden shadow-[0_4px_20px_rgba(255,133,161,0.05)]"
    >
      {/* Image */}
      <div className={`relative ${size === 'large' ? 'aspect-[4/3]' : 'aspect-square'} overflow-hidden`}>
        {recipe.image ? (
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-brand-50 flex items-center justify-center">
            <span className="text-5xl">{emoji}</span>
          </div>
        )}

        {/* Favorite button */}
        <button
          onClick={toggleFavorite}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm active:scale-90 transition-transform"
          aria-label={isFavorite ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
        >
          <Heart
            size={18}
            className={`transition-all duration-200 ${animating ? 'scale-[1.3]' : 'scale-100'} ${
              isFavorite ? 'text-brand-400 fill-brand-400' : 'text-on-surface-variant'
            }`}
          />
        </button>

        {/* Category badge on large cards */}
        {size === 'large' && (
          <div className="absolute bottom-3 left-3">
            <span className="bg-brand-50/90 backdrop-blur-sm text-brand-800 text-xs font-medium px-3 py-1 rounded-full">
              RECIPE OF THE DAY
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-display font-medium text-on-surface line-clamp-2 text-base leading-snug">
          {recipe.title}
        </h3>
        <div className="flex items-center gap-3 mt-2">
          <span className="flex items-center gap-1 text-xs text-on-surface-variant">
            <Clock size={12} />
            {totalTime} min
          </span>
          <span className="bg-brand-50 text-brand-800 rounded-full text-xs px-2 py-0.5 font-medium">
            {recipe.category}
          </span>
        </div>
      </div>
    </Link>
  )
}
