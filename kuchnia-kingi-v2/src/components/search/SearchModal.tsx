'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Search, X } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import type { Recipe } from '@/lib/supabase/types'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface SearchModalProps {
  onClose: () => void
}

export default function SearchModal({ onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const router = useRouter()

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1))
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => Math.max(prev - 1, 0))
    }
    if (e.key === 'Enter' && results[selectedIndex]) {
      e.preventDefault()
      router.push(`/przepis/${results[selectedIndex].id}`)
      onClose()
    }
  }, [onClose, results, selectedIndex, router])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    if (!query.trim()) {
      setResults([])
      setSelectedIndex(0)
      return
    }
    timerRef.current = setTimeout(async () => {
      setLoading(true)
      try {
        const supabase = createClient()
        const { data } = await supabase
          .from('recipes')
          .select('id, title, category, image, prep_time')
          .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
          .limit(8)
        setResults((data as Recipe[]) || [])
        setSelectedIndex(0)
      } catch {
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 300)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [query])

  return (
    <div
      className="fixed inset-0 bg-black/40 z-[100] flex items-start justify-center pt-[10vh]"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-lg w-full mx-4 p-4 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-3 pb-3 border-b border-outline-variant">
          <Search size={20} className="text-outline shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Szukaj przepisów..."
            className="flex-1 text-lg outline-none bg-transparent text-on-surface placeholder:text-outline"
          />
          <button onClick={onClose} className="p-1 hover:bg-surface-dim rounded-full" aria-label="Zamknij">
            <X size={18} className="text-outline" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto mt-2">
          {loading && (
            <p className="text-center text-sm text-outline py-6">Szukam...</p>
          )}

          {!loading && query && results.length === 0 && (
            <div className="text-center py-8">
              <p className="text-3xl mb-2">🔍</p>
              <p className="text-sm text-outline mb-3">
                Brak wyników dla &ldquo;{query}&rdquo;
              </p>
              <Link
                href="/dodaj-przepis"
                onClick={onClose}
                className="text-sm font-medium text-brand-400 hover:text-brand-600"
              >
                + Dodaj ten przepis
              </Link>
            </div>
          )}

          {results.map((recipe, i) => (
            <Link
              key={recipe.id}
              href={`/przepis/${recipe.id}`}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                i === selectedIndex ? 'bg-brand-50' : 'hover:bg-surface-dim'
              }`}
            >
              <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center shrink-0 overflow-hidden">
                {recipe.image ? (
                  <img src={recipe.image} alt="" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-lg">🍽️</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-on-surface truncate">{recipe.title}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-outline">{recipe.prep_time} min</span>
                  <span className="bg-brand-50 text-brand-800 text-[10px] font-medium px-1.5 py-0.5 rounded-full">
                    {recipe.category}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Keyboard hints */}
        {results.length > 0 && (
          <div className="flex items-center gap-4 px-3 pt-3 mt-2 border-t border-outline-variant/50 text-[10px] text-outline">
            <span>↑↓ nawiguj</span>
            <span>↵ otwórz</span>
            <span>esc zamknij</span>
          </div>
        )}
      </div>
    </div>
  )
}
