'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, X } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import type { Recipe } from '@/lib/supabase/types'
import Link from 'next/link'

interface SearchModalProps {
  onClose: () => void
}

export default function SearchModal({ onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    inputRef.current?.focus()
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [onClose])

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    if (!query.trim()) {
      setResults([])
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
      } catch {
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 300)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [query])

  return (
    <div className="fixed inset-0 bg-black/40 z-[100] flex items-start justify-center pt-[10vh]" onClick={onClose}>
      <div
        className="bg-white rounded-3xl max-w-lg w-full mx-4 p-4 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
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

        <div className="max-h-80 overflow-y-auto mt-2">
          {loading && (
            <p className="text-center text-sm text-outline py-6">Szukam...</p>
          )}
          {!loading && query && results.length === 0 && (
            <div className="text-center py-8">
              <p className="text-3xl mb-2">🔍</p>
              <p className="text-sm text-outline">Brak wyników dla &ldquo;{query}&rdquo;</p>
            </div>
          )}
          {results.map((recipe) => (
            <Link
              key={recipe.id}
              href={`/przepis/${recipe.id}`}
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-surface-dim transition-colors"
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
                <p className="text-xs text-outline">{recipe.prep_time} min · {recipe.category}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
