import { Star } from 'lucide-react';

export default function StarRating({
  value = 0,
  onChange,
  size = 20,
  readOnly = false,
  showLabel = true,
  className = '',
}) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <div
        className="flex items-center gap-0.5"
        role={readOnly ? 'img' : 'radiogroup'}
        aria-label={
          value > 0
            ? `Ocena: ${value} z 5 gwiazdek`
            : 'Brak oceny — wybierz liczbę gwiazdek'
        }
      >
        {stars.map((star) => {
          const filled = star <= value;
          const halfHover = !readOnly && value === 0;

          if (readOnly) {
            return (
              <Star
                key={star}
                size={size}
                className={
                  filled
                    ? 'text-amber-400 fill-amber-400'
                    : 'text-gray-200 fill-gray-100'
                }
                aria-hidden
              />
            );
          }

          return (
            <button
              key={star}
              type="button"
              onClick={() => onChange?.(star === value ? 0 : star)}
              className={`p-0.5 rounded transition-transform duration-150 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                halfHover ? 'hover:text-amber-300' : ''
              }`}
              aria-label={`Oceń na ${star} ${star === 1 ? 'gwiazdkę' : star < 5 ? 'gwiazdki' : 'gwiazdek'}`}
            >
              <Star
                size={size}
                className={
                  filled
                    ? 'text-amber-400 fill-amber-400'
                    : 'text-gray-300 hover:text-amber-300 hover:fill-amber-200'
                }
              />
            </button>
          );
        })}
      </div>
      {showLabel && (
        <span className="text-sm text-gray-500">
          {value > 0 ? (
            <>
              <span className="font-semibold text-charcoal-700 tabular-nums">{value}</span>
              <span className="text-gray-400"> / 5</span>
            </>
          ) : (
            <span className="italic">Oceń przepis</span>
          )}
        </span>
      )}
    </div>
  );
}
