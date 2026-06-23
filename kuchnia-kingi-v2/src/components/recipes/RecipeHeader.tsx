'use client'

import { useState } from 'react'
import { Heart, Share2, Clock } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import type { Recipe } from '@/lib/supabase/types'
import { toast } from 'sonner'

interface RecipeHeaderProps {
  recipe: Recipe
}

export default function RecipeHeader({ recipe }: RecipeHeaderProps) {
  const [isFavorite, setIsFavorite] = useState(recipe.is_favorite)

  const totalTime = recipe.prep_time + (recipe.cook_time ?? 0)

  const toggleFavorite = async () => {
    const next = !isFavorite
    setIsFavorite(next)
    try {
      const supabase = createClient()
      await supabase.from('recipes').update({ is_favorite: next }).eq('id', recipe.id)
      toast.success(next ? 'Dodano do ulubionych ❤️' : 'Usunięto z ulubionych')
    } catch {
      setIsFavorite(!next)
      toast.error('Coś poszło nie tak. Spróbuj ponownie.')
    }
  }

  const handleShare = async () => {
    const url = window.location.href
    if (navigator.share) {
      await navigator.share({ title: recipe.title, url })
    } else {
      await navigator.clipboard.writeText(url)
      toast.success('Link skopiowany!')
    }
  }

  return (
    <div className="px-5 pt-5">
      {/* Badges row */}
      <div className="flex items-center gap-2 mb-3">
        <span className="flex items-center gap-1 text-xs text-on-surface-variant bg-surface-dim px-2.5 py-1 rounded-full">
          <Clock size={12} />
          {totalTime} min
        </span>
        <span className="bg-brand-50 text-brand-800 text-xs font-medium px-2.5 py-1 rounded-full">
          {recipe.category}
        </span>
        {recipe.is_premium && (
          <span className="bg-brand-400 text-white text-xs font-medium px-2.5 py-1 rounded-full">
            Premium
          </span>
        )}
      </div>

      {/* Title + actions */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h1 className="font-display font-semibold text-2xl md:text-3xl text-on-surface leading-tight">
            {recipe.title}
          </h1>
          {recipe.description && (
            <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">
              {recipe.description}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={toggleFavorite}
            className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:border-brand-400 transition-colors active:scale-90"
            aria-label={isFavorite ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
          >
            <Heart
              size={18}
              className={isFavorite ? 'text-brand-400 fill-brand-400' : 'text-on-surface-variant'}
            />
          </button>
          <button
            onClick={handleShare}
            className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:border-brand-400 transition-colors active:scale-90"
            aria-label="Udostępnij"
          >
            <Share2 size={18} className="text-on-surface-variant" />
          </button>
        </div>
      </div>
    </div>
  )
}
