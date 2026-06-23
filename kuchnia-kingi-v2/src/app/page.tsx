import { createClient } from '@/lib/supabase/server'
import type { Recipe } from '@/lib/supabase/types'
import RecipeCard from '@/components/recipes/RecipeCard'
import EmptyState from '@/components/ui/EmptyState'
import AppShell from '@/components/layout/AppShell'
import Link from 'next/link'

const CATEGORY_TILES = [
  { name: 'Śniadania', key: 'sniadanie', emoji: '🥐' },
  { name: 'Obiady', key: 'obiad', emoji: '🍲' },
  { name: 'Desery', key: 'deser', emoji: '🍰' },
  { name: 'Przekąski', key: 'przekaska', emoji: '🧀' },
]

export default async function HomePage() {
  let recipes: Recipe[] = []

  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('recipes')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(8)
    recipes = (data as Recipe[]) || []
  } catch {
    recipes = []
  }

  const featuredRecipe = recipes[0]
  const recentRecipes = recipes.slice(1)

  return (
    <AppShell>
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-6 md:py-10">
        {/* Greeting */}
        <div className="mb-8">
          <h1 className="font-display font-semibold text-[28px] md:text-4xl text-on-surface leading-tight">
            Culinary Diary
          </h1>
          <p className="text-on-surface-variant text-sm mt-1">Co gotujesz dziś?</p>
        </div>

        {recipes.length === 0 ? (
          <EmptyState
            icon="🍳"
            title="Twoja kuchnia czeka!"
            description="Dodaj pierwszy przepis i zacznij swój kulinarny pamiętnik."
            ctaLabel="Dodaj przepis"
            ctaHref="/dodaj-przepis"
          />
        ) : (
          <>
            {/* Featured Recipe */}
            {featuredRecipe && (
              <section className="mb-8">
                <RecipeCard recipe={featuredRecipe} size="large" />
              </section>
            )}

            {/* Recent Recipes heading */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-semibold text-lg text-on-surface">Recent Recipes</h2>
              <Link href="/przepisy" className="text-sm font-medium text-brand-400 hover:text-brand-600">
                View All
              </Link>
            </div>

            {/* Recipe Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {recentRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>

            {/* Category Tiles */}
            <section className="mt-10">
              <h2 className="font-display font-semibold text-lg text-on-surface mb-4">Kategorie</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {CATEGORY_TILES.map((cat) => {
                  const count = recipes.filter(r => r.category === cat.key).length
                  return (
                    <Link
                      key={cat.key}
                      href={`/przepisy?kategoria=${cat.key}`}
                      className="bg-surface-card rounded-3xl border border-outline-variant/30 hover:border-brand-400 p-5 text-center transition-colors"
                    >
                      <span className="text-3xl block mb-2">{cat.emoji}</span>
                      <p className="font-medium text-sm text-on-surface">{cat.name}</p>
                      <p className="text-xs text-on-surface-variant mt-0.5">{count} przepisów</p>
                    </Link>
                  )
                })}
              </div>
            </section>
          </>
        )}
      </div>
    </AppShell>
  )
}
