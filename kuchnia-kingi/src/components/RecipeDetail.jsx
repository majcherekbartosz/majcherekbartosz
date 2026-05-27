import { useState } from 'react';
import { Clock, Users, Edit3, Trash2, FileDown, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { CATEGORY_COLORS } from '../data/mockRecipes';
import { generateRecipePdf } from '../utils/generatePdf';

function PdfButtonLabel({ pdfState }) {
  if (pdfState === 'loading') return <><Loader2 size={16} className="animate-spin" /> Generuję PDF...</>;
  if (pdfState === 'success') return <><CheckCircle size={16} /> Pobrano!</>;
  if (pdfState === 'error') return <><AlertCircle size={16} /> Spróbuj ponownie</>;
  return <><FileDown size={16} /> Eksportuj do PDF</>;
}

const PDF_BTN_CLASSES = {
  idle: 'bg-sage-500 hover:bg-sage-600 text-white',
  loading: 'bg-sage-400 text-white cursor-wait',
  success: 'bg-green-500 text-white',
  error: 'bg-red-500 text-white',
};

export default function RecipeDetail({ recipe, onEdit, onDelete, onBack }) {
  const [pdfState, setPdfState] = useState('idle');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!recipe) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-400">Nie znaleziono przepisu.</p>
        <button onClick={onBack} className="btn-secondary mt-4">Wróć</button>
      </div>
    );
  }

  const colors = CATEGORY_COLORS[recipe.category] || {
    bg: 'bg-gray-100',
    text: 'text-gray-700',
    border: 'border-gray-200',
  };

  const handleExportPdf = async () => {
    setPdfState('loading');
    try {
      await generateRecipePdf(recipe);
      setPdfState('success');
      setTimeout(() => setPdfState('idle'), 3000);
    } catch (err) {
      console.error('PDF generation failed:', err);
      setPdfState('error');
      setTimeout(() => setPdfState('idle'), 4000);
    }
  };

  const pdfButtonClass = PDF_BTN_CLASSES[pdfState] || PDF_BTN_CLASSES.idle;

  const formattedDate = new Date(recipe.createdAt).toLocaleDateString('pl-PL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
      {/* Hero Image */}
      {recipe.image && (
        <div className="rounded-3xl overflow-hidden aspect-video mb-8 shadow-md" style={{ aspectRatio: '16/7' }}>
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
          <button
            onClick={handleExportPdf}
            disabled={pdfState === 'loading'}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 ${pdfButtonClass}`}
          >
            <PdfButtonLabel pdfState={pdfState} />
          </button>
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

      {/* Two-Column Layout: Ingredients + Steps */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
        {/* Ingredients */}
        <div className="lg:col-span-2">
          <h2 className="font-serif text-2xl font-semibold text-charcoal-800 mb-5 pb-3 border-b-2 border-cream-200">
            Składniki
          </h2>
          <ul className="space-y-2.5">
            {recipe.ingredients.map((ing, i) => (
              <li key={i} className="flex items-start gap-3 group">
                <div className="w-6 h-6 flex-shrink-0 bg-orange-100 group-hover:bg-terracotta-500 rounded-full flex items-center justify-center mt-0.5 transition-colors">
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

      {/* Large PDF Export CTA at bottom */}
      <div className="mt-12 bg-gradient-to-br from-cream-50 to-cream-100 rounded-3xl p-8 text-center border border-cream-200">
        <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileDown size={26} className="text-sage-500" />
        </div>
        <h3 className="font-serif text-xl font-semibold text-charcoal-800 mb-2">
          Zapisz na zawsze
        </h3>
        <p className="text-gray-500 text-sm mb-5 max-w-sm mx-auto">
          Wyeksportuj ten przepis do elegancko sformatowanego pliku PDF, który możesz wydrukować lub udostępnić bliskim.
        </p>
        <button
          onClick={handleExportPdf}
          disabled={pdfState === 'loading'}
          className={`inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 ${pdfButtonClass}`}
        >
          <PdfButtonLabel pdfState={pdfState} />
        </button>
        <p className="text-xs text-gray-400 mt-3 font-serif italic">
          „Z pamiętnika kulinarnego Kingi"
        </p>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
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
