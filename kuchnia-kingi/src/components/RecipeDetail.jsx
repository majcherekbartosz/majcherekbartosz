import { useState } from 'react';
import { Clock, Users, Edit3, Trash2, Lock, BookOpen, ShoppingCart } from 'lucide-react';
import { CATEGORY_COLORS } from '../data/mockRecipes';

const CHECKOUT_URL = 'https://naffy.io/miejsce-na-twoj-link';

export default function RecipeDetail({ recipe, onEdit, onDelete, onBack }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!recipe) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-400">Nie znaleziono przepisu.</p>
        <button onClick={onBack} className="btn-secondary mt-4">Wróć</button>
      </div>
    );
  }

  const colors = CATEGORY_COLORS[recipe.category] || { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-200' };

  const formattedDate = new Date(recipe.createdAt).toLocaleDateString('pl-PL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
      {/* Hero Image */}
      {recipe.image && (
        <div className="rounded-3xl overflow-hidden aspect-[16/7] mb-8 shadow-md">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Title + Meta + Actions */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-8">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <span className={`tag-pill ${colors.bg} ${colors.text} border ${colors.border} font-medium`}>
              {recipe.category}
            </span>
            {recipe.isPremium && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide bg-charcoal-800 text-cream-100 shadow-sm">
                <Lock size={11} />
                Premium
              </span>
            )}
            <span className="text-xs text-gray-400">{formattedDate}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal-800 leading-tight mb-4">
            {recipe.title}
          </h1>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <Clock size={15} className="text-terracotta-400" />
              {recipe.prepTime} minut
            </span>
            <span className="flex items-center gap-2">
              <Users size={15} className="text-terracotta-400" />
              {recipe.servings} porcji
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <a
            href={CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 bg-terracotta-500 hover:bg-terracotta-600 text-white"
          >
            <BookOpen size={16} />
            Kup E-booka
          </a>
          {!recipe.isPremium && (
            <>
              <button
                onClick={onEdit}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 hover:border-terracotta-300 hover:text-terracotta-500 text-gray-500 transition-all duration-200 shadow-sm"
                aria-label="Edytuj przepis"
              >
                <Edit3 size={16} />
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 hover:border-red-300 hover:text-red-500 text-gray-500 transition-all duration-200 shadow-sm"
                aria-label="Usuń przepis"
              >
                <Trash2 size={16} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Description */}
      {recipe.description && (
        <div className="bg-cream-50 border-l-4 border-terracotta-400 rounded-r-2xl px-6 py-5 mb-10 shadow-sm">
          <p className="font-serif text-lg italic text-charcoal-700 leading-relaxed">
            {recipe.description}
          </p>
        </div>
      )}

      {/* Content Section — Paywall or Full Content */}
      {recipe.isPremium ? (
        <div className="relative">
          {/* Blurred content preview */}
          <div className="select-none pointer-events-none filter blur-md opacity-60" aria-hidden="true">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
              <div className="lg:col-span-2">
                <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-5 pb-3 border-b-2 border-cream-200">
                  Składniki
                </h2>
                <ul className="space-y-2.5">
                  {recipe.ingredients.map((ing, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 flex-shrink-0 bg-terracotta-500/10 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-terracotta-600 text-xs font-bold">{i + 1}</span>
                      </div>
                      <span className="text-gray-700 leading-relaxed text-sm sm:text-base">{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:col-span-3">
                <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-5 pb-3 border-b-2 border-cream-200">
                  Sposób przygotowania
                </h2>
                <ol className="space-y-6">
                  {recipe.steps.map((step, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="w-8 h-8 flex-shrink-0 bg-charcoal-800 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-white text-sm font-bold">{i + 1}</span>
                      </div>
                      <div className="flex-1 pt-1">
                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{step}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          {/* Paywall overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-cream-200 p-8 sm:p-10 max-w-md w-full mx-4 text-center">
              <div className="w-16 h-16 bg-terracotta-500/10 rounded-full flex items-center justify-center mx-auto mb-5">
                <Lock size={28} className="text-terracotta-500" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-charcoal-800 mb-3">
                Przepis Premium
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-xs mx-auto">
                Ten przepis to część ekskluzywnej kolekcji. Odkryj wszystkie sekrety kulinarne Kingi!
              </p>
              <a
                href={CHECKOUT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 bg-terracotta-500 hover:bg-terracotta-600 text-white"
              >
                <ShoppingCart size={16} />
                Kup E-booka
              </a>
              <p className="text-xs text-gray-400 mt-4 font-serif italic">
                Odblokuj wszystkie przepisy z kolekcji Kingi
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Full content for free recipes */
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Ingredients */}
          <div className="lg:col-span-2">
            <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-5 pb-3 border-b-2 border-cream-200">
              Składniki
            </h2>
            <ul className="space-y-2.5">
              {recipe.ingredients.map((ing, i) => (
                <li key={i} className="flex items-start gap-3 group">
                  <div className="w-6 h-6 flex-shrink-0 bg-terracotta-500/10 group-hover:bg-terracotta-500 rounded-full flex items-center justify-center mt-0.5 transition-colors">
                    <span className="text-terracotta-600 group-hover:text-white text-xs font-bold transition-colors">
                      {i + 1}
                    </span>
                  </div>
                  <span className="text-gray-700 leading-relaxed text-sm sm:text-base">{ing}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Steps */}
          <div className="lg:col-span-3">
            <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-5 pb-3 border-b-2 border-cream-200">
              Sposób przygotowania
            </h2>
            <ol className="space-y-6">
              {recipe.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-8 h-8 flex-shrink-0 bg-charcoal-800 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-white text-sm font-bold">{i + 1}</span>
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{step}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}

      {/* E-book CTA at bottom */}
      <div className="mt-12 bg-gradient-to-br from-cream-50 to-cream-100 rounded-3xl p-8 text-center border border-cream-200">
        <div className="w-14 h-14 bg-terracotta-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <BookOpen size={26} className="text-terracotta-500" />
        </div>
        <h3 className="font-serif text-xl font-semibold text-charcoal-800 mb-2">
          Wszystkie przepisy w jednym miejscu
        </h3>
        <p className="text-gray-500 text-sm mb-5 max-w-sm mx-auto">
          Kup e-booka z kompletną kolekcją przepisów Kingi — pięknie sformatowanych, gotowych do czytania na każdym urządzeniu.
        </p>
        <a
          href={CHECKOUT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 bg-terracotta-500 hover:bg-terracotta-600 text-white"
        >
          <ShoppingCart size={16} />
          Kup E-booka z przepisami
        </a>
        <p className="text-xs text-gray-400 mt-3 font-serif italic">
          „Z pamiętnika kulinarnego Kingi"
        </p>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-8 text-center">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 size={28} className="text-red-400" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-charcoal-800 mb-2">
              Usunąć przepis?
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              Czy na pewno chcesz usunąć <strong>„{recipe.title}"</strong>? Tej operacji nie można cofnąć.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="btn-secondary flex-1 py-2.5"
              >
                Anuluj
              </button>
              <button
                onClick={() => { setShowDeleteConfirm(false); onDelete(); }}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium px-5 py-2.5 rounded-full transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
              >
                Usuń
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
