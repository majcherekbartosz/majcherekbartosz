'use client'

import { useState } from 'react'
import Navbar from './Navbar'
import SearchModal from '../search/SearchModal'

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <>
      <Navbar onSearchOpen={() => setSearchOpen(true)} />
      <main className="pb-20 md:pb-0">
        {children}
      </main>
      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </>
  )
}
