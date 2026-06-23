import { createClient } from '@/lib/supabase/server'
import type { Recipe } from '@/lib/supabase/types'
import AppShell from '@/components/layout/AppShell'
import RecipeCard from '@/components/recipes/RecipeCard'
import EmptyState from '@/components/ui/EmptyState'

export default async function FavoritesPage() {
  let favorites: Recipe[] = []

  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('recipes')
      .select('*')
      .eq('is_favorite', true)
      .order('updated_at', { ascending: false })
    favorites = (data as Recipe[]) || []
  } catch {
    favorites = []
  }

  return (
    <AppShell>
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-6 md:py-10">
        <div className="mb-8">
          <h1 className="font-display font-semibold text-2xl md:text-3xl text-on-surface">
            Ulubione
          </h1>
          <p className="text-on-surface-variant text-sm mt-1">
            {favorites.length > 0
              ? `${favorites.length} ${favorites.length === 1 ? 'przepis' : favorites.length < 5 ? 'przepisy' : 'przepisów'} w ulubionych`
              : 'Twoje ulubione przepisy'}
          </p>
        </div>

        {favorites.length === 0 ? (
          <EmptyState
            icon="❤️"
            title="Brak ulubionych"
            description="Kliknij serce przy przepisie, żeby tu trafił."
          />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {favorites.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </AppShell>
  )
}
