'use client'

import { useState } from 'react'
import { ShoppingCart, Check } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import type { Recipe, RecipeIngredient } from '@/lib/supabase/types'
import { toast } from 'sonner'
import StepTimer from './StepTimer'

interface ServingsSliderProps {
  recipe: Recipe
}

export default function ServingsSlider({ recipe }: ServingsSliderProps) {
  const baseServings = recipe.servings
  const [currentServings, setCurrentServings] = useState(baseServings)
  const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(new Set())
  const [addingToList, setAddingToList] = useState(false)

  const scale = currentServings / baseServings

  const scaleAmount = (amount?: number): string => {
    if (!amount) return ''
    const scaled = amount * scale
    const rounded = Math.round(scaled * 10) / 10
    return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1)
  }

  const toggleIngredient = (index: number) => {
    setCheckedIngredients((prev) => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  const addToShoppingList = async () => {
    const uncheckedIngredients = recipe.ingredients.filter(
      (_, i) => !checkedIngredients.has(i)
    )
    if (uncheckedIngredients.length === 0) {
      toast.success('Wszystkie składniki już zaznaczone!')
      return
    }

    setAddingToList(true)
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        toast.error('Zaloguj się, aby dodać do listy zakupów')
        return
      }

      const { data: existing } = await supabase
        .from('shopping_list_items')
        .select('name')
        .eq('user_id', user.id)

      const existingNames = new Set((existing || []).map((item: { name: string }) => item.name.toLowerCase()))

      const newItems = uncheckedIngredients
        .filter((ing) => !existingNames.has(ing.name.toLowerCase()))
        .map((ing) => ({
          user_id: user.id,
          name: ing.name,
          amount: ing.amount ? Math.round(ing.amount * scale * 10) / 10 : null,
          unit: ing.unit || null,
          recipe_id: recipe.id,
          is_checked: false,
        }))

      if (newItems.length === 0) {
        toast.success('Składniki już są na liście zakupów!')
        return
      }

      await supabase.from('shopping_list_items').insert(newItems)
      toast.success(`Dodano ${newItems.length} składników 🛒`)
    } catch {
      toast.error('Coś poszło nie tak. Spróbuj ponownie.')
    } finally {
      setAddingToList(false)
    }
  }

  return (
    <div className="px-5 mt-8">
      {/* Servings Slider */}
      <div className="bg-surface-card rounded-2xl border border-outline-variant/30 p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-on-surface-variant">Porcje</span>
          <span className="font-display font-semibold text-lg text-on-surface">{currentServings}</span>
        </div>
        <input
          type="range"
          min={1}
          max={12}
          step={1}
          value={currentServings}
          onChange={(e) => setCurrentServings(Number(e.target.value))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer bg-surface-dim accent-brand-400
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-400 [&::-webkit-slider-thumb]:shadow-md
            [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-brand-400 [&::-moz-range-thumb]:border-0"
          aria-label="Liczba porcji"
        />
        <div className="flex justify-between text-xs text-outline mt-1">
          <span>1</span>
          <span>12</span>
        </div>
      </div>

      {/* Ingredients */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">🧂</span>
          <h2 className="font-display font-semibold text-xl text-on-surface">Składniki</h2>
        </div>

        <div className="bg-surface-card rounded-2xl border border-outline-variant/30 divide-y divide-outline-variant/20">
          {recipe.ingredients.map((ing: RecipeIngredient, i: number) => {
            const checked = checkedIngredients.has(i)
            return (
              <label
                key={i}
                className="flex items-center gap-3 px-4 py-3.5 cursor-pointer hover:bg-surface-dim/50 transition-colors first:rounded-t-2xl last:rounded-b-2xl"
              >
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all ${
                  checked ? 'bg-brand-400 border-brand-400' : 'border-outline-variant'
                }`}>
                  {checked && <Check size={12} className="text-white" strokeWidth={3} />}
                </div>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleIngredient(i)}
                  className="sr-only"
                />
                <span className={`flex-1 text-sm transition-all duration-200 ${
                  checked ? 'line-through text-outline' : 'text-on-surface'
                }`}>
                  {ing.name}
                </span>
                <span className={`text-sm font-medium tabular-nums shrink-0 transition-all duration-200 ${
                  checked ? 'text-outline line-through' : 'text-on-surface-variant'
                }`}>
                  {scaleAmount(ing.amount)}{ing.unit ? `${ing.unit}` : ''}
                </span>
              </label>
            )
          })}
        </div>

        {/* Add to shopping list button */}
        <button
          onClick={addToShoppingList}
          disabled={addingToList}
          className="mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-full bg-brand-400 text-white font-medium text-sm hover:bg-brand-600 active:scale-[0.98] transition-all disabled:opacity-50"
        >
          <ShoppingCart size={16} />
          {addingToList ? 'Dodaję...' : '🛒 Dodaj wszystkie do listy zakupów'}
        </button>
      </section>

      {/* Steps */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">📋</span>
          <h2 className="font-display font-semibold text-xl text-on-surface">Przygotowanie</h2>
        </div>

        <div className="space-y-4">
          {recipe.steps.map((step, i) => (
            <div key={i} className="bg-surface-card rounded-2xl border border-outline-variant/30 p-4">
              <div className="flex items-start gap-3">
                <span className="font-display font-semibold text-lg text-brand-400 shrink-0 w-8">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex-1 min-w-0">
                  {step.instruction && (
                    <>
                      <p className="font-medium text-sm text-on-surface mb-1">
                        {step.instruction.split('.')[0]}
                      </p>
                      <p className="text-sm text-on-surface-variant leading-relaxed">
                        {step.instruction}
                      </p>
                    </>
                  )}
                  {step.timer_minutes && step.timer_minutes > 0 && (
                    <div className="mt-3">
                      <StepTimer minutes={step.timer_minutes} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
