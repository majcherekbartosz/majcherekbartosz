import Link from 'next/link'

interface EmptyStateProps {
  icon: string
  title: string
  description: string
  ctaLabel?: string
  ctaHref?: string
}

export default function EmptyState({ icon, title, description, ctaLabel, ctaHref }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <span className="text-5xl mb-4">{icon}</span>
      <h3 className="font-display font-semibold text-xl text-on-surface mb-2">{title}</h3>
      <p className="text-sm text-on-surface-variant max-w-xs">{description}</p>
      {ctaLabel && ctaHref && (
        <Link
          href={ctaHref}
          className="mt-6 px-6 py-2.5 rounded-full bg-brand-400 text-white font-medium text-sm hover:bg-brand-600 active:scale-95 transition-all"
        >
          {ctaLabel}
        </Link>
      )}
    </div>
  )
}
