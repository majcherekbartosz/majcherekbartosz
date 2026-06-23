interface RecipeHeroProps {
  image?: string
  title: string
  category: string
}

const CATEGORY_EMOJI: Record<string, string> = {
  sniadanie: '🥐',
  obiad: '🍲',
  kolacja: '🥗',
  deser: '🍰',
  przekaska: '🧀',
  napoj: '🍹',
  inne: '🍽️',
}

export default function RecipeHero({ image, title, category }: RecipeHeroProps) {
  const emoji = CATEGORY_EMOJI[category] || '🍽️'

  return (
    <div className="relative mx-5 rounded-3xl overflow-hidden aspect-[4/3] max-h-72">
      {image ? (
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-brand-50 flex items-center justify-center">
          <span className="text-7xl">{emoji}</span>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

      {/* Badges on image */}
      <div className="absolute bottom-4 left-4 flex items-center gap-2">
        <span className="bg-white/90 backdrop-blur-sm text-on-surface text-xs font-medium px-3 py-1.5 rounded-full">
          ⏱ {/* filled by parent */}
        </span>
      </div>
    </div>
  )
}
