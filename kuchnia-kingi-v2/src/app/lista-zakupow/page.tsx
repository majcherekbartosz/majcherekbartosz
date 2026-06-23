import AppShell from '@/components/layout/AppShell'
import EmptyState from '@/components/ui/EmptyState'

export default function ShoppingListPage() {
  return (
    <AppShell>
      <div className="max-w-2xl mx-auto px-5 py-6">
        <h1 className="font-display font-semibold text-2xl text-on-surface mb-6">
          Lista Zakupów
        </h1>
        <EmptyState
          icon="🛒"
          title="Lista zakupów jest pusta"
          description="Wejdź w przepis i dodaj składniki jednym kliknięciem."
        />
      </div>
    </AppShell>
  )
}
