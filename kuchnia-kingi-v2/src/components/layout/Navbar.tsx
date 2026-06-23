'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Search, ShoppingCart, Heart } from 'lucide-react'
import { useState, useEffect } from 'react'

interface NavbarProps {
  onSearchOpen: () => void
}

export default function Navbar({ onSearchOpen }: NavbarProps) {
  const pathname = usePathname()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        onSearchOpen()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onSearchOpen])

  return (
    <>
      {/* Desktop top navbar */}
      <header className="hidden md:flex fixed top-0 left-0 right-0 z-50 h-16 items-center justify-between px-8 bg-white/80 backdrop-blur-xl border-b border-outline-variant">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🍳</span>
          <span className="font-display font-semibold text-xl text-on-surface">Kuchnia Kingi</span>
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={onSearchOpen}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-outline-variant text-on-surface-variant text-sm hover:border-brand-400 transition-colors"
            aria-label="Szukaj przepisów"
          >
            <Search size={16} />
            <span className="text-on-surface-variant/60">Szukaj...</span>
            <kbd className="ml-2 text-xs bg-surface-dim px-1.5 py-0.5 rounded text-outline">⌘K</kbd>
          </button>
          <Link
            href="/dodaj-przepis"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-400 text-white font-medium text-sm hover:bg-brand-600 active:scale-95 transition-all shadow-sm"
          >
            + Przepis
          </Link>
        </div>
      </header>

      {/* Mobile bottom navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-outline-variant safe-area-bottom">
        <div className="flex items-center justify-around h-16 px-4">
          <NavTab href="/" icon={Home} label="Home" active={pathname === '/'} />
          <button
            onClick={onSearchOpen}
            className="flex flex-col items-center gap-0.5 py-1"
            aria-label="Szukaj"
          >
            <Search size={22} className="text-outline" />
            <span className="text-[10px] font-medium text-outline">Discover</span>
          </button>
          <NavTab href="/lista-zakupow" icon={ShoppingCart} label="Shopping" active={pathname === '/lista-zakupow'} isCenter />
          <NavTab href="/ulubione" icon={Heart} label="Profile" active={pathname === '/ulubione'} />
        </div>
      </nav>

      {/* Spacers */}
      <div className="hidden md:block h-16" />
      <div className="md:hidden h-0" />
    </>
  )
}

interface NavTabProps {
  href: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  label: string
  active: boolean
  isCenter?: boolean
}

function NavTab({ href, icon: Icon, label, active, isCenter }: NavTabProps) {
  if (isCenter) {
    return (
      <Link href={href} className="flex flex-col items-center gap-0.5 py-1 -mt-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
          active ? 'bg-brand-400' : 'bg-brand-400'
        }`}>
          <Icon size={22} className="text-white" />
        </div>
        <span className={`text-[10px] font-medium ${active ? 'text-brand-400' : 'text-outline'}`}>
          {label}
        </span>
      </Link>
    )
  }

  return (
    <Link href={href} className="flex flex-col items-center gap-0.5 py-1">
      <Icon size={22} className={active ? 'text-brand-400' : 'text-outline'} />
      <span className={`text-[10px] font-medium ${active ? 'text-brand-400' : 'text-outline'}`}>
        {label}
      </span>
    </Link>
  )
}
