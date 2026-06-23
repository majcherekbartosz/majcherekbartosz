'use client'

import dynamic from 'next/dynamic'

const ShoppingListClient = dynamic(
  () => import('./ShoppingListClient'),
  { ssr: false }
)

export default function ShoppingListPage() {
  return <ShoppingListClient />
}
