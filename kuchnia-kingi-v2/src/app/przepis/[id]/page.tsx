import { createClient } from '@/lib/supabase/server'
import type { Recipe } from '@/lib/supabase/types'
import { notFound } from 'next/navigation'
import AppShell from '@/components/layout/AppShell'
import RecipeHero from '@/components/recipes/RecipeHero'
import RecipeHeader from '@/components/recipes/RecipeHeader'
import ServingsSlider from '@/components/recipes/ServingsSlider'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function RecipePage({ params }: PageProps) {
  const { id } = await params
  let recipe: Recipe | null = null

  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('recipes')
      .select('*')
      .eq('id', id)
      .single()
    recipe = data as Recipe | null
  } catch {
    notFound()
  }

  if (!recipe) notFound()

  return (
    <AppShell>
      <div className="max-w-2xl mx-auto pb-24">
        {/* Back button */}
        <div className="px-5 py-4 md:py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="text-sm font-medium sr-only">Wróć</span>
          </Link>
        </div>

        {/* Hero Image */}
        <RecipeHero image={recipe.image} title={recipe.title} category={recipe.category} />

        {/* Header: title, meta, favorite */}
        <RecipeHeader recipe={recipe} />

        {/* Interactive part: servings slider, ingredients, steps */}
        <ServingsSlider recipe={recipe} />
      </div>
    </AppShell>
  )
}
