'use client'

import { useState, useEffect, useCallback } from 'react'
import { Plus, Trash2, X } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import type { ShoppingListItem } from '@/lib/supabase/types'
import { toast } from 'sonner'
import AppShell from '@/components/layout/AppShell'
import EmptyState from '@/components/ui/EmptyState'
import Link from 'next/link'

export default function ShoppingListClient() {
  const [items, setItems] = useState<ShoppingListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)

  const supabase = createClient()

  const fetchItems = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setLoading(false)
        return
      }
      setUserId(user.id)

      const { data } = await supabase
        .from('shopping_list_items')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true })

      setItems((data as ShoppingListItem[]) || [])
    } catch {
      toast.error('Nie udało się pobrać listy zakupów')
    } finally {
      setLoading(false)
    }
  }, [supabase])

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  useEffect(() => {
    if (!userId) return

    const channel = supabase
      .channel('shopping-list')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'shopping_list_items',
        filter: `user_id=eq.${userId}`,
      }, () => fetchItems())
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [userId, supabase, fetchItems])

  const toggleItem = async (item: ShoppingListItem) => {
    const next = !item.is_checked
    setItems((prev) =>
      prev.map((i) => i.id === item.id ? { ...i, is_checked: next } : i)
    )
    try {
      await supabase
        .from('shopping_list_items')
        .update({ is_checked: next })
        .eq('id', item.id)
    } catch {
      setItems((prev) =>
        prev.map((i) => i.id === item.id ? { ...i, is_checked: !next } : i)
      )
    }
  }

  const deleteItem = async (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
    try {
      await supabase.from('shopping_list_items').delete().eq('id', id)
    } catch {
      fetchItems()
    }
  }

  const clearChecked = async () => {
    const checkedIds = items.filter((i) => i.is_checked).map((i) => i.id)
    if (checkedIds.length === 0) return

    setItems((prev) => prev.filter((i) => !i.is_checked))
    try {
      await supabase
        .from('shopping_list_items')
        .delete()
        .in('id', checkedIds)
      toast.success('Wyczyszczono kupione produkty')
    } catch {
      fetchItems()
      toast.error('Coś poszło nie tak')
    }
  }

  const addItem = async (name: string, amount?: number, unit?: string) => {
    if (!userId || !name.trim()) return
    const newItem: Partial<ShoppingListItem> = {
      user_id: userId,
      name: name.trim(),
      amount: amount || undefined,
      unit: unit || undefined,
      is_checked: false,
    }
    try {
      const { data } = await supabase
        .from('shopping_list_items')
        .insert(newItem)
        .select()
        .single()
      if (data) setItems((prev) => [...prev, data as ShoppingListItem])
      toast.success('Dodano do listy 🛒')
    } catch {
      toast.error('Nie udało się dodać')
    }
  }

  const unchecked = items.filter((i) => !i.is_checked)
  const checked = items.filter((i) => i.is_checked)

  if (loading) {
    return (
      <AppShell>
        <div className="max-w-2xl mx-auto px-5 py-6">
          <h1 className="font-display font-semibold text-2xl text-on-surface mb-6">Lista Zakupów</h1>
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-14 bg-surface-card rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </AppShell>
    )
  }

  if (!userId) {
    return (
      <AppShell>
        <div className="max-w-2xl mx-auto px-5 py-6">
          <h1 className="font-display font-semibold text-2xl text-on-surface mb-6">Lista Zakupów</h1>
          <EmptyState
            icon="🔒"
            title="Zaloguj się"
            description="Lista zakupów wymaga konta. Zaloguj się, aby korzystać."
          />
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell>
      <div className="max-w-2xl mx-auto px-5 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display font-semibold text-2xl text-on-surface">Lista Zakupów</h1>
          {checked.length > 0 && (
            <button
              onClick={clearChecked}
              className="text-xs font-medium text-brand-600 hover:text-brand-800 transition-colors"
            >
              Wyczyść kupione ({checked.length})
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <EmptyState
            icon="🛒"
            title="Lista zakupów jest pusta"
            description="Wejdź w przepis i dodaj składniki jednym kliknięciem."
          />
        ) : (
          <>
            {unchecked.length > 0 && (
              <section className="mb-8">
                <h2 className="font-display font-semibold text-lg text-on-surface mb-3">Do kupienia</h2>
                <div className="bg-surface-card rounded-2xl border border-outline-variant/30 divide-y divide-outline-variant/20">
                  {unchecked.map((item) => (
                    <ShoppingItem
                      key={item.id}
                      item={item}
                      onToggle={() => toggleItem(item)}
                      onDelete={() => deleteItem(item.id)}
                    />
                  ))}
                </div>
              </section>
            )}

            {checked.length > 0 && (
              <section>
                <h2 className="font-display font-semibold text-lg text-on-surface-variant mb-3">W koszyku ✓</h2>
                <div className="bg-surface-card rounded-2xl border border-outline-variant/20 divide-y divide-outline-variant/10 opacity-60">
                  {checked.map((item) => (
                    <ShoppingItem
                      key={item.id}
                      item={item}
                      onToggle={() => toggleItem(item)}
                      onDelete={() => deleteItem(item.id)}
                    />
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        <button
          onClick={() => setShowAddModal(true)}
          className="fixed bottom-24 md:bottom-8 right-5 w-14 h-14 rounded-full bg-brand-400 text-white shadow-lg flex items-center justify-center hover:bg-brand-600 active:scale-90 transition-all z-40"
          aria-label="Dodaj produkt"
        >
          <Plus size={24} />
        </button>

        {showAddModal && (
          <AddItemModal onAdd={addItem} onClose={() => setShowAddModal(false)} />
        )}
      </div>
    </AppShell>
  )
}

interface ShoppingItemProps {
  item: ShoppingListItem
  onToggle: () => void
  onDelete: () => void
}

function ShoppingItem({ item, onToggle, onDelete }: ShoppingItemProps) {
  return (
    <div className="flex items-center gap-3 px-4 py-3.5 group">
      <button
        onClick={onToggle}
        className={`w-5 h-5 rounded border-2 shrink-0 flex items-center justify-center transition-all ${
          item.is_checked ? 'bg-brand-400 border-brand-400' : 'border-outline-variant hover:border-brand-400'
        }`}
        aria-label={item.is_checked ? 'Odznacz' : 'Zaznacz jako kupione'}
      >
        {item.is_checked && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>

      <div className="flex-1 min-w-0">
        <span className={`text-sm transition-all ${
          item.is_checked ? 'line-through text-outline' : 'text-on-surface'
        }`}>
          {item.name}
          {item.amount && (
            <span className="text-on-surface-variant ml-1">
              ({item.amount}{item.unit || ''})
            </span>
          )}
        </span>
        {item.recipe_id && (
          <Link
            href={`/przepis/${item.recipe_id}`}
            className="block text-xs text-brand-400 hover:text-brand-600 mt-0.5"
            onClick={(e) => e.stopPropagation()}
          >
            z przepisu →
          </Link>
        )}
      </div>

      <button
        onClick={onDelete}
        className="opacity-0 group-hover:opacity-100 p-1.5 rounded-full hover:bg-surface-dim text-outline hover:text-brand-600 transition-all"
        aria-label="Usuń"
      >
        <Trash2 size={14} />
      </button>
    </div>
  )
}

interface AddItemModalProps {
  onAdd: (name: string, amount?: number, unit?: string) => void
  onClose: () => void
}

function AddItemModal({ onAdd, onClose }: AddItemModalProps) {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [unit, setUnit] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    onAdd(name, amount ? Number(amount) : undefined, unit || undefined)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-[100] flex items-end md:items-center justify-center" onClick={onClose}>
      <div
        className="bg-white rounded-t-3xl md:rounded-3xl w-full max-w-md p-6 md:mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-semibold text-lg text-on-surface">Dodaj produkt</h3>
          <button onClick={onClose} className="p-1 hover:bg-surface-dim rounded-full" aria-label="Zamknij">
            <X size={18} className="text-outline" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nazwa produktu"
            autoFocus
            className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container text-on-surface placeholder:text-outline focus:border-brand-400 focus:ring-1 focus:ring-brand-400 outline-none text-sm"
          />
          <div className="flex gap-3">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Ilość"
              step="0.1"
              className="flex-1 px-4 py-3 rounded-xl border border-outline-variant bg-surface-container text-on-surface placeholder:text-outline focus:border-brand-400 focus:ring-1 focus:ring-brand-400 outline-none text-sm"
            />
            <input
              type="text"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              placeholder="Jednostka (g, ml, szt.)"
              className="flex-1 px-4 py-3 rounded-xl border border-outline-variant bg-surface-container text-on-surface placeholder:text-outline focus:border-brand-400 focus:ring-1 focus:ring-brand-400 outline-none text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full py-3 rounded-full bg-brand-400 text-white font-medium text-sm hover:bg-brand-600 active:scale-[0.98] transition-all disabled:opacity-40"
          >
            Dodaj do listy
          </button>
        </form>
      </div>
    </div>
  )
}
