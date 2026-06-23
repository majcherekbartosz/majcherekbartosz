'use client'

import { useState, useEffect } from 'react'
import { X, Check } from 'lucide-react'
import Link from 'next/link'

interface OnboardingChecklistProps {
  recipeCount: number
  hasImage: boolean
  hasShoppingItems: boolean
  hasFavorite: boolean
}

export default function OnboardingChecklist({
  recipeCount,
  hasImage,
  hasShoppingItems,
  hasFavorite,
}: OnboardingChecklistProps) {
  const [dismissed, setDismissed] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('onboarding_dismissed')
    if (stored !== 'true' && recipeCount < 3) {
      setDismissed(false)
    }
  }, [recipeCount])

  if (dismissed) return null

  const steps = [
    { label: 'Załóż konto', done: true, href: undefined },
    { label: 'Dodaj pierwszy przepis', done: recipeCount >= 1, href: '/dodaj-przepis' },
    { label: 'Dodaj zdjęcie do przepisu', done: hasImage, href: '/dodaj-przepis' },
    { label: 'Dodaj składniki do listy zakupów', done: hasShoppingItems, href: undefined },
    { label: 'Oznacz przepis jako ulubiony', done: hasFavorite, href: undefined },
  ]

  const completedCount = steps.filter((s) => s.done).length
  const progress = (completedCount / steps.length) * 100
  const allDone = completedCount === steps.length

  const handleDismiss = () => {
    localStorage.setItem('onboarding_dismissed', 'true')
    setDismissed(true)
  }

  if (allDone) {
    return (
      <div className="bg-brand-50 border border-brand-200 rounded-3xl p-6 mb-8 text-center">
        <p className="text-3xl mb-2">🎉</p>
        <h3 className="font-display font-semibold text-lg text-on-surface mb-1">
          Brawo Kingo!
        </h3>
        <p className="text-sm text-on-surface-variant mb-4">
          Jesteś mistrzynią kuchni! Wszystkie kroki ukończone.
        </p>
        <button
          onClick={handleDismiss}
          className="text-xs font-medium text-brand-600 hover:text-brand-800"
        >
          Zamknij
        </button>
      </div>
    )
  }

  return (
    <div className="bg-brand-50 border border-brand-200 rounded-3xl p-6 mb-8 relative">
      <button
        onClick={handleDismiss}
        className="absolute top-4 right-4 p-1 hover:bg-brand-100 rounded-full"
        aria-label="Zamknij"
      >
        <X size={16} className="text-on-surface-variant" />
      </button>

      <h3 className="font-display font-semibold text-base text-on-surface mb-1">
        Zacznij swoją przygodę 🌿
      </h3>
      <p className="text-xs text-on-surface-variant mb-4">
        {completedCount}/{steps.length} kroków ukończonych
      </p>

      {/* Progress bar */}
      <div className="h-2 bg-brand-100 rounded-full overflow-hidden mb-5">
        <div
          className="h-full bg-brand-400 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Steps */}
      <div className="space-y-2.5">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
              step.done ? 'bg-brand-400' : 'border-2 border-outline-variant'
            }`}>
              {step.done && <Check size={12} className="text-white" strokeWidth={3} />}
            </div>
            {step.href && !step.done ? (
              <Link href={step.href} className="text-sm text-brand-600 hover:text-brand-800 font-medium">
                {step.label}
              </Link>
            ) : (
              <span className={`text-sm ${step.done ? 'text-on-surface-variant line-through' : 'text-on-surface'}`}>
                {step.label}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
