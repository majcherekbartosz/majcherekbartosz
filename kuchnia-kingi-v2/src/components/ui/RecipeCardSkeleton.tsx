export default function RecipeCardSkeleton() {
  return (
    <div className="animate-pulse bg-surface-card rounded-3xl border border-outline-variant/30 overflow-hidden">
      <div className="aspect-square bg-surface-dim" />
      <div className="p-4 space-y-2">
        <div className="h-4 bg-surface-dim rounded w-4/5" />
        <div className="h-3 bg-surface-dim rounded w-2/3" />
      </div>
    </div>
  )
}
