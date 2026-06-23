import AppShell from '@/components/layout/AppShell'
import EmptyState from '@/components/ui/EmptyState'

export default function FavoritesPage() {
  return (
    <AppShell>
      <div className="max-w-6xl mx-auto px-5 py-6">
        <h1 className="font-display font-semibold text-2xl text-on-surface mb-6">
          Ulubione
        </h1>
        <EmptyState
          icon="❤️"
          title="Brak ulubionych"
          description="Kliknij serce przy przepisie, żeby tu trafił."
        />
      </div>
    </AppShell>
  )
}
