'use client'

import Link from 'next/link'
import { Heart, Phone } from 'lucide-react'

export function Navbar() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center group-hover:bg-teal-700 transition-colors">
              <Heart className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="text-xl font-bold text-slate-800">
              Med<span className="text-teal-600">Market</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <Link href="/#strefy" className="hover:text-teal-600 transition-colors">
              Strefy opieki
            </Link>
            <Link href="/#jak-to-dziala" className="hover:text-teal-600 transition-colors">
              Jak to działa
            </Link>
            <Link href="/#dla-specjalistow" className="hover:text-teal-600 transition-colors">
              Dla specjalistów
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="tel:+48800100200"
              className="hidden sm:flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 transition-colors"
            >
              <Phone className="w-4 h-4" />
              800 100 200
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
