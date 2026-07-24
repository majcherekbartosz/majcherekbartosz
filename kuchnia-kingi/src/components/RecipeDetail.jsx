import { useState, useEffect } from 'react';
import { Clock, Users, Edit3, Trash2, Lock, BookOpen, ShoppingCart, Heart, Check, Minus, Plus, Copy, ListPlus, ChefHat } from 'lucide-react';
import { useShoppingList } from '../hooks/useShoppingList';
import { scaleIngredient } from '../utils/scaleIngredient';
import { buildRecipeShoppingItems, formatShoppingListText } from '../utils/buildShoppingList';
import { useComments } from '../hooks/useComments';
import Comments from './Comments';
import StarRating from './StarRating';

const CHECKOUT_URL = 'https://naffy.io/miejsce-na-twoj-link';

export default function RecipeDetail({
  recipe,
  onEdit,
  onDelete,
  onBack,
  isFavorite,
  onToggleFavorite,
  onTrackView,
  onTrackEbookClick,
  isAdmin,
  rating = 0,
  onRate,
  onAddToShoppingList,
  onGoToShoppingList,
}) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [servings, setServings] = useState(recipe?.servings || 4);
  const [listFeedback, setListFeedback] = useState(null);
  const { toggleItem, isChecked, checkedCount } = useShoppingList(recipe?.id);
  const { comments, loading: commentsLoading, addComment, deleteComment } = useComments(recipe?.id);

  const multiplier = recipe ? servings / recipe.servings : 1;
  const shoppingItems = recipe ? buildRecipeShoppingItems(recipe, servings) : [];

  useEffect(() => {
    if (!listFeedback) return undefined;
    const timer = setTimeout(() => setListFeedback(null), 3000);
    return () => clearTimeout(timer);
  }, [listFeedback]);

  const handleCopyShoppingList = async () => {
    if (!recipe) return;
    const text = formatShoppingListText(recipe.title, shoppingItems);
    try {
      await navigator.clipboard.writeText(text);
      setListFeedback('Skopiowano listę do schowka');
    } catch {
      setListFeedback('Nie udało się skopiować listy');
    }
  };

  const handleAddToGlobalList = () => {
    if (!recipe || !onAddToShoppingList) return;
    const added = onAddToShoppingList(recipe, shoppingItems);
    if (added > 0) {
      setListFeedback(
        `Dodano ${added} ${added === 1 ? 'składnik' : added < 5 ? 'składniki' : 'składników'} do listy zakupów`
      );
    } else {
      setListFeedback('Te składniki są już na liście zakupów');
    }
  };

  useEffect(() => {
    if (recipe && onTrackView) {
      onTrackView(recipe.id);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipe?.id]);

  if (!recipe) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-on-surface-variant">Nie znaleziono przepisu.</p>
        <button
          onClick={onBack}
          className="mt-4 px-6 py-2.5 rounded-full text-body-sm font-medium border border-outline-variant text-on-surface hover:bg-surface-container transition-colors"
        >
          Wróć
        </button>
      </div>
    );
  }

  const formattedDate = new Date(recipe.createdAt).toLocaleDateString('pl-PL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
      {/* Zdjęcie główne */}
      {recipe.image && (
        <div className="relative rounded-xl overflow-hidden mb-stack-md shadow-card" style={{ aspectRatio: '16/9' }}>
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
          <button
            onClick={() => onToggleFavorite && onToggleFavorite(recipe.id)}
            className="absolute top-4 right-4 w-11 h-11 flex items-center justify-center rounded-full bg-surface-container-lowest/90 backdrop-blur-sm shadow-soft hover:scale-105 transition-all duration-200 active:scale-90"
            aria-label={isFavorite ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
          >
            <Heart
              size={20}
              className={isFavorite ? 'text-tertiary fill-tertiary' : 'text-on-surface-variant'}
            />
          </button>
        </div>
      )}

      {/* Tagi + tytuł + akcje */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-stack-sm mb-stack-md">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-label-caps uppercase bg-tertiary-container text-on-tertiary-container">
              {recipe.category}
            </span>
            {recipe.isPremium && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-label-caps uppercase bg-inverse-surface text-inverse-on-surface">
                <Lock size={11} />
                Premium
              </span>
            )}
            <span className="text-body-sm text-on-surface-variant">{formattedDate}</span>
          </div>

          <h1 className="font-serif text-headline-lg-mobile sm:text-headline-lg lg:text-headline-xl text-on-surface mb-3">
            {recipe.title}
          </h1>

          {!recipe.image && (
            <button
              onClick={() => onToggleFavorite && onToggleFavorite(recipe.id)}
              className="mb-4 w-10 h-10 flex items-center justify-center rounded-full bg-surface-container border border-outline-variant hover:border-tertiary transition-all duration-200 active:scale-90"
              aria-label={isFavorite ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
            >
              <Heart
                size={18}
                className={isFavorite ? 'text-tertiary fill-tertiary' : 'text-on-surface-variant'}
              />
            </button>
          )}

          {!recipe.isPremium && onRate && (
            <div className="mb-4">
              <StarRating value={rating} onChange={(stars) => onRate(recipe.id, stars)} />
            </div>
          )}
          {recipe.isPremium && rating > 0 && (
            <div className="mb-4">
              <StarRating value={rating} readOnly />
            </div>
          )}
        </div>

        {/* Przyciski akcji */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <a
            href={CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onTrackEbookClick && onTrackEbookClick(recipe.id)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-body-sm font-semibold transition-all duration-200 shadow-soft hover:shadow-card active:scale-95 bg-tertiary hover:bg-on-tertiary-container text-on-tertiary"
          >
            <BookOpen size={16} />
            Kup E-booka
          </a>
          {isAdmin && !recipe.isPremium && (
            <>
              <button
                onClick={onEdit}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-lowest border border-outline-variant hover:border-tertiary hover:text-tertiary text-on-surface-variant transition-all duration-200 shadow-soft"
                aria-label="Edytuj przepis"
              >
                <Edit3 size={16} />
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-lowest border border-outline-variant hover:border-error hover:text-error text-on-surface-variant transition-all duration-200 shadow-soft"
                aria-label="Usuń przepis"
              >
                <Trash2 size={16} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Opis */}
      {recipe.description && (
        <p className="font-sans text-body-lg text-on-surface-variant leading-relaxed mb-stack-md max-w-2xl">
          {recipe.description}
        </p>
      )}

      {/* Karty: Czas / Porcje */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-stack-lg">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-5 text-center shadow-soft">
          <Clock size={18} className="text-tertiary mx-auto mb-2" />
          <p className="text-label-caps uppercase text-on-surface-variant mb-1">Czas</p>
          <p className="font-serif text-headline-md text-on-surface">{recipe.prepTime} min</p>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-5 text-center shadow-soft">
          <Users size={18} className="text-tertiary mx-auto mb-2" />
          <p className="text-label-caps uppercase text-on-surface-variant mb-1">Porcje</p>
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setServings((s) => Math.max(1, s - 1))}
              className="w-7 h-7 flex items-center justify-center rounded-full border border-outline-variant text-on-surface hover:bg-surface-container transition-colors active:scale-90"
              aria-label="Mniej porcji"
            >
              <Minus size={13} />
            </button>
            <span className="font-serif text-headline-md text-on-surface min-w-[2ch] tabular-nums">
              {servings}
            </span>
            <button
              onClick={() => setServings((s) => Math.min(20, s + 1))}
              className="w-7 h-7 flex items-center justify-center rounded-full border border-outline-variant text-on-surface hover:bg-surface-container transition-colors active:scale-90"
              aria-label="Więcej porcji"
            >
              <Plus size={13} />
            </button>
          </div>
          {multiplier !== 1 && (
            <button
              onClick={() => setServings(recipe.servings)}
              className="text-body-sm text-tertiary hover:underline mt-1"
            >
              reset
            </button>
          )}
        </div>
      </div>

      {/* Treść — paywall albo pełny przepis */}
      {recipe.isPremium ? (
        <div className="relative">
          {/* Rozmyty podgląd */}
          <div className="select-none pointer-events-none filter blur-md opacity-60" aria-hidden="true">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
              <div className="lg:col-span-2">
                <h2 className="font-serif text-headline-md text-on-surface mb-5 pb-3 border-b border-outline-variant">
                  Składniki
                </h2>
                <ul className="space-y-2.5">
                  {recipe.ingredients.map((ing, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-tertiary flex-shrink-0 mt-2.5" />
                      <span className="text-body-md text-on-surface-variant leading-relaxed">{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:col-span-3">
                <h2 className="font-serif text-headline-md text-on-surface mb-5 pb-3 border-b border-outline-variant">
                  Sposób przygotowania
                </h2>
                <ol className="space-y-6">
                  {recipe.steps.map((step, i) => (
                    <li key={i}>
                      <span className="inline-block px-2.5 py-1 rounded-full text-label-caps uppercase bg-tertiary-container text-on-tertiary-container mb-2">
                        Krok {i + 1}
                      </span>
                      <p className="text-body-md text-on-surface-variant leading-relaxed">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          {/* Nakładka paywall */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-surface-container-lowest/95 backdrop-blur-sm rounded-xl shadow-card-hover border border-outline-variant p-8 sm:p-10 max-w-md w-full mx-4 text-center">
              <div className="w-16 h-16 bg-tertiary-container rounded-full flex items-center justify-center mx-auto mb-5">
                <Lock size={28} className="text-tertiary" />
              </div>
              <h3 className="font-serif text-headline-md text-on-surface mb-3">
                Przepis Premium
              </h3>
              <p className="text-body-sm text-on-surface-variant leading-relaxed mb-6 max-w-xs mx-auto">
                Ten przepis to część ekskluzywnej kolekcji. Odkryj wszystkie sekrety kulinarne Kingi!
              </p>
              <a
                href={CHECKOUT_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onTrackEbookClick && onTrackEbookClick(recipe.id)}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-body-sm font-semibold transition-all duration-200 shadow-card hover:shadow-card-hover active:scale-95 bg-tertiary hover:bg-on-tertiary-container text-on-tertiary"
              >
                <ShoppingCart size={16} />
                Kup E-booka
              </a>
              <p className="text-body-sm text-on-surface-variant mt-4 font-serif italic">
                Odblokuj wszystkie przepisy z kolekcji Kingi
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Pełna treść dla przepisów darmowych */
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-stack-md lg:gap-12">
          {/* Składniki / lista zakupów */}
          <div className="lg:col-span-2">
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-soft">
              <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
                <h2 className="font-serif text-headline-md text-on-surface">
                  Składniki
                </h2>
                <div className="flex items-center gap-2">
                  {multiplier !== 1 && (
                    <span className="text-label-caps uppercase text-on-tertiary-container bg-tertiary-container px-2.5 py-1 rounded-full">
                      ×{multiplier % 1 === 0 ? multiplier : multiplier.toFixed(1)}
                    </span>
                  )}
                  {checkedCount > 0 && (
                    <span className="text-label-caps text-on-tertiary-container bg-tertiary-container px-2.5 py-1 rounded-full tabular-nums">
                      {checkedCount}/{recipe.ingredients.length}
                    </span>
                  )}
                </div>
              </div>
              <p className="text-body-sm text-on-surface-variant mb-4">
                Dla {servings} {servings === 1 ? 'porcji' : 'porcji'} — zaznacz w sklepie lub dodaj do zbiorczej listy
              </p>

              <ul className="space-y-1 mb-5">
                {recipe.ingredients.map((ing, i) => {
                  const checked = isChecked(i);
                  const scaled = scaleIngredient(ing, multiplier);
                  return (
                    <li
                      key={i}
                      onClick={() => toggleItem(i)}
                      className="flex items-center gap-3 group cursor-pointer rounded px-2 py-2.5 -mx-2 hover:bg-surface-container-low transition-colors duration-150"
                      role="checkbox"
                      aria-checked={checked}
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && toggleItem(i)}
                    >
                      <div className={`w-5 h-5 flex-shrink-0 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                        checked
                          ? 'bg-tertiary border-tertiary'
                          : 'border-outline-variant group-hover:border-tertiary'
                      }`}>
                        {checked && <Check size={12} className="text-on-tertiary" strokeWidth={3} />}
                      </div>
                      <span className={`text-body-md leading-relaxed transition-all duration-200 ${
                        checked
                          ? 'line-through text-outline'
                          : 'text-on-surface-variant'
                      }`}>
                        {scaled}
                      </span>
                    </li>
                  );
                })}
              </ul>

              <div className="flex flex-col gap-2">
                {onAddToShoppingList && (
                  <button
                    type="button"
                    onClick={handleAddToGlobalList}
                    className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full text-body-sm font-semibold bg-tertiary hover:bg-on-tertiary-container text-on-tertiary transition-all duration-200 shadow-soft hover:shadow-card active:scale-95"
                  >
                    <ListPlus size={16} />
                    Dodaj do listy zakupów
                  </button>
                )}
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={handleCopyShoppingList}
                    className="flex items-center gap-1.5 text-body-sm font-medium px-3 py-2 rounded-full border border-outline-variant text-on-surface hover:bg-surface-container transition-colors"
                  >
                    <Copy size={13} />
                    Kopiuj listę
                  </button>
                  {onGoToShoppingList && (
                    <button
                      type="button"
                      onClick={onGoToShoppingList}
                      className="flex items-center gap-1.5 text-body-sm font-medium px-3 py-2 rounded-full text-tertiary hover:bg-tertiary-container transition-colors"
                    >
                      <ShoppingCart size={13} />
                      Otwórz listę
                    </button>
                  )}
                </div>
              </div>

              {listFeedback && (
                <p className="text-body-sm text-tertiary mt-3 font-medium" role="status">
                  {listFeedback}
                </p>
              )}
            </div>
          </div>

          {/* Kroki przygotowania */}
          <div className="lg:col-span-3">
            <h2 className="font-serif text-headline-lg text-on-surface mb-6">
              Sposób przygotowania
            </h2>
            <ol className="space-y-stack-md">
              {recipe.steps.map((step, i) => (
                <li key={i} className="border-b border-outline-variant pb-stack-md last:border-0 last:pb-0">
                  <span className="inline-block px-2.5 py-1 rounded-full text-label-caps uppercase bg-tertiary-container text-on-tertiary-container mb-2">
                    Krok {i + 1}
                  </span>
                  <p className="text-body-md text-on-surface-variant leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}

      {/* Sekcja e-booka */}
      <div className="mt-stack-lg bg-surface-container rounded-xl p-8 sm:p-10 text-center border border-outline-variant">
        <div className="w-14 h-14 bg-tertiary-container rounded-full flex items-center justify-center mx-auto mb-4">
          <ChefHat size={26} className="text-tertiary" />
        </div>
        <h3 className="font-serif text-headline-md text-on-surface mb-2">
          Wszystkie przepisy w jednym miejscu
        </h3>
        <p className="text-body-sm text-on-surface-variant mb-6 max-w-sm mx-auto leading-relaxed">
          Kup e-booka z kompletną kolekcją przepisów Kingi — pięknie sformatowanych, gotowych do czytania na każdym urządzeniu.
        </p>
        <a
          href={CHECKOUT_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => onTrackEbookClick && onTrackEbookClick(recipe.id)}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-body-sm font-semibold transition-all duration-200 shadow-soft hover:shadow-card active:scale-95 bg-tertiary hover:bg-on-tertiary-container text-on-tertiary"
        >
          <ShoppingCart size={16} />
          Kup E-booka z przepisami
        </a>
        <p className="text-body-sm text-on-surface-variant mt-4 font-serif italic">
          „Z pamiętnika kulinarnego Kingi"
        </p>
      </div>

      {/* Komentarze */}
      {!recipe.isPremium && (
        <Comments
          comments={comments}
          loading={commentsLoading}
          onAdd={addComment}
          onDelete={deleteComment}
          isAdmin={isAdmin}
        />
      )}

      {/* Potwierdzenie usunięcia */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(34,25,28,0.5)' }}>
          <div className="bg-surface-container-lowest rounded-xl shadow-card-hover max-w-sm w-full p-8 text-center">
            <div className="w-16 h-16 bg-error-container rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 size={28} className="text-error" />
            </div>
            <h3 className="font-serif text-headline-md text-on-surface mb-2">
              Usunąć przepis?
            </h3>
            <p className="text-body-sm text-on-surface-variant mb-6 leading-relaxed">
              Czy na pewno chcesz usunąć <strong>„{recipe.title}"</strong>? Tej operacji nie można cofnąć.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-5 py-2.5 rounded-full text-body-sm font-medium border border-outline-variant text-on-surface hover:bg-surface-container transition-colors"
              >
                Anuluj
              </button>
              <button
                onClick={() => { setShowDeleteConfirm(false); onDelete(); }}
                className="flex-1 bg-error hover:opacity-90 text-white font-semibold px-5 py-2.5 rounded-full text-body-sm transition-all duration-200 shadow-soft active:scale-95"
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
