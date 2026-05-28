import { useState, useRef } from 'react';
import { Plus, X, GripVertical, Camera, Upload, ChefHat, Globe, Lock } from 'lucide-react';
import { CATEGORIES } from '../data/mockRecipes';

const DEFAULT_FORM = {
  title: '',
  category: CATEGORIES[0],
  prepTime: '',
  servings: '',
  description: '',
  isPremium: false,
  image: '',
  ingredients: [''],
  steps: [''],
};

export default function AddEditRecipe({ recipe, onSave, onCancel }) {
  const isEdit = !!recipe;
  const [form, setForm] = useState(
    recipe
      ? {
          ...recipe,
          prepTime: String(recipe.prepTime),
          servings: String(recipe.servings),
          ingredients: recipe.ingredients.length ? recipe.ingredients : [''],
          steps: recipe.steps.length ? recipe.steps : [''],
        }
      : DEFAULT_FORM
  );
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(recipe?.image || '');
  const fileInputRef = useRef(null);

  const set = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleImageFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target.result;
      setImagePreview(dataUrl);
      set('image', dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleImageUrl = (e) => {
    const url = e.target.value;
    set('image', url);
    setImagePreview(url);
  };

  // Ingredients
  const updateIngredient = (i, val) => {
    const arr = [...form.ingredients];
    arr[i] = val;
    set('ingredients', arr);
  };
  const addIngredient = () => set('ingredients', [...form.ingredients, '']);
  const removeIngredient = (i) => {
    if (form.ingredients.length === 1) return;
    set('ingredients', form.ingredients.filter((_, idx) => idx !== i));
  };

  // Steps
  const updateStep = (i, val) => {
    const arr = [...form.steps];
    arr[i] = val;
    set('steps', arr);
  };
  const addStep = () => set('steps', [...form.steps, '']);
  const removeStep = (i) => {
    if (form.steps.length === 1) return;
    set('steps', form.steps.filter((_, idx) => idx !== i));
  };

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Tytuł jest wymagany';
    if (!form.prepTime || isNaN(form.prepTime) || Number(form.prepTime) <= 0)
      e.prepTime = 'Podaj czas przygotowania';
    if (!form.servings || isNaN(form.servings) || Number(form.servings) <= 0)
      e.servings = 'Podaj liczbę porcji';
    if (!form.description.trim()) e.description = 'Dodaj krótki opis';
    const nonEmptyIngredients = form.ingredients.filter((i) => i.trim());
    if (nonEmptyIngredients.length === 0) e.ingredients = 'Dodaj przynajmniej jeden składnik';
    const nonEmptySteps = form.steps.filter((s) => s.trim());
    if (nonEmptySteps.length === 0) e.steps = 'Dodaj przynajmniej jeden krok';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave({
      ...form,
      prepTime: Number(form.prepTime),
      servings: Number(form.servings),
      ingredients: form.ingredients.filter((i) => i.trim()),
      steps: form.steps.filter((s) => s.trim()),
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
      {/* Page Header */}
      <div className="mb-8">
        <p className="text-sm font-medium text-terracotta-500 uppercase tracking-widest mb-1 font-sans">
          {isEdit ? 'Edytuj przepis' : 'Nowy przepis'}
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-800">
          {isEdit ? recipe.title : 'Dodaj przepis'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-8">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-charcoal-700 mb-1.5">
            Nazwa przepisu <span className="text-terracotta-500">*</span>
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => set('title', e.target.value)}
            placeholder="np. Puszyste pancakes z owocami"
            className={`input-field text-base ${errors.title ? 'border-red-400 ring-2 ring-red-100' : ''}`}
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        {/* Category + Time + Servings */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-charcoal-700 mb-1.5">
              Kategoria
            </label>
            <select
              value={form.category}
              onChange={(e) => set('category', e.target.value)}
              className="input-field"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal-700 mb-1.5">
              Czas (min) <span className="text-terracotta-500">*</span>
            </label>
            <input
              type="number"
              min="1"
              value={form.prepTime}
              onChange={(e) => set('prepTime', e.target.value)}
              placeholder="30"
              className={`input-field ${errors.prepTime ? 'border-red-400 ring-2 ring-red-100' : ''}`}
            />
            {errors.prepTime && <p className="text-red-500 text-sm mt-1">{errors.prepTime}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal-700 mb-1.5">
              Porcje <span className="text-terracotta-500">*</span>
            </label>
            <input
              type="number"
              min="1"
              value={form.servings}
              onChange={(e) => set('servings', e.target.value)}
              placeholder="4"
              className={`input-field ${errors.servings ? 'border-red-400 ring-2 ring-red-100' : ''}`}
            />
            {errors.servings && <p className="text-red-500 text-sm mt-1">{errors.servings}</p>}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-charcoal-700 mb-1.5">
            Krótki opis <span className="text-terracotta-500">*</span>
          </label>
          <textarea
            rows={3}
            value={form.description}
            onChange={(e) => set('description', e.target.value)}
            placeholder="Kilka słów o tym przepisie, jego smaku i wyjątkowości..."
            className={`input-field resize-none ${errors.description ? 'border-red-400 ring-2 ring-red-100' : ''}`}
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        {/* Premium Toggle */}
        <div>
          <label className="block text-sm font-medium text-charcoal-700 mb-2">
            Dostępność przepisu
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => set('isPremium', false)}
              className={`relative flex items-center gap-3 p-4 rounded-2xl border-2 transition-all duration-200 text-left ${
                !form.isPremium
                  ? 'border-sage-500 bg-sage-500/5 shadow-sm'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                !form.isPremium ? 'bg-sage-500 text-white' : 'bg-gray-100 text-gray-400'
              }`}>
                <Globe size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold ${!form.isPremium ? 'text-sage-700' : 'text-charcoal-700'}`}>
                  Przepis darmowy
                </p>
                <p className="text-xs text-gray-400 mt-0.5">Ogólnodostępny dla wszystkich</p>
              </div>
              {!form.isPremium && (
                <div className="absolute top-2.5 right-2.5 w-5 h-5 bg-sage-500 rounded-full flex items-center justify-center">
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </button>
            <button
              type="button"
              onClick={() => set('isPremium', true)}
              className={`relative flex items-center gap-3 p-4 rounded-2xl border-2 transition-all duration-200 text-left ${
                form.isPremium
                  ? 'border-terracotta-500 bg-terracotta-500/5 shadow-sm'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                form.isPremium ? 'bg-terracotta-500 text-white' : 'bg-gray-100 text-gray-400'
              }`}>
                <Lock size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold ${form.isPremium ? 'text-terracotta-700' : 'text-charcoal-700'}`}>
                  Przepis Premium
                </p>
                <p className="text-xs text-gray-400 mt-0.5">Dostępny po zakupie E-booka</p>
              </div>
              {form.isPremium && (
                <div className="absolute top-2.5 right-2.5 w-5 h-5 bg-terracotta-500 rounded-full flex items-center justify-center">
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-charcoal-700 mb-1.5">
            Zdjęcie przepisu
          </label>
          <div className="space-y-3">
            {/* Preview */}
            {imagePreview && (
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-gray-100">
                <img
                  src={imagePreview}
                  alt="Podgląd"
                  className="w-full h-full object-cover"
                  onError={() => setImagePreview('')}
                />
                <button
                  type="button"
                  onClick={() => { setImagePreview(''); set('image', ''); }}
                  className="absolute top-3 right-3 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                  aria-label="Usuń zdjęcie"
                >
                  <X size={14} className="text-white" />
                </button>
              </div>
            )}

            {/* Upload from device */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-cream-300 hover:border-terracotta-300 rounded-2xl p-6 text-center cursor-pointer transition-colors group"
            >
              <div className="w-12 h-12 bg-cream-100 group-hover:bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 transition-colors">
                <Camera size={22} className="text-terracotta-400" />
              </div>
              <p className="text-sm font-medium text-charcoal-700 mb-1">
                Kliknij, by wybrać zdjęcie
              </p>
              <p className="text-xs text-gray-400">JPG, PNG, WEBP</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImageFile}
                className="hidden"
              />
            </div>

            {/* OR URL */}
            <div className="relative flex items-center gap-3">
              <div className="flex-1 h-px bg-cream-200" />
              <span className="text-xs text-gray-400 font-medium">lub wklej URL</span>
              <div className="flex-1 h-px bg-cream-200" />
            </div>
            <div className="relative">
              <Upload size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                type="url"
                value={imagePreview.startsWith('data:') ? '' : form.image}
                onChange={handleImageUrl}
                placeholder="https://images.unsplash.com/..."
                className="input-field pl-10 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Ingredients */}
        <div>
          <label className="block text-sm font-medium text-charcoal-700 mb-1.5">
            Składniki <span className="text-terracotta-500">*</span>
          </label>
          {errors.ingredients && <p className="text-red-500 text-sm mb-2">{errors.ingredients}</p>}
          <div className="space-y-2.5">
            {form.ingredients.map((ing, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="flex items-center justify-center w-6 flex-shrink-0">
                  <GripVertical size={14} className="text-gray-300" />
                </div>
                <div className="w-5 h-5 flex-shrink-0 bg-terracotta-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold leading-none">{i + 1}</span>
                </div>
                <input
                  type="text"
                  value={ing}
                  onChange={(e) => updateIngredient(i, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') { e.preventDefault(); addIngredient(); }
                  }}
                  placeholder={`Składnik ${i + 1}`}
                  className="input-field py-2.5 text-sm flex-1"
                />
                <button
                  type="button"
                  onClick={() => removeIngredient(i)}
                  disabled={form.ingredients.length === 1}
                  className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-50 text-gray-300 hover:text-red-400 transition-colors disabled:opacity-30"
                  aria-label="Usuń składnik"
                >
                  <X size={15} />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addIngredient}
            className="mt-3 flex items-center gap-2 text-sm text-terracotta-500 hover:text-terracotta-600 font-medium transition-colors"
          >
            <Plus size={15} />
            Dodaj składnik
          </button>
        </div>

        {/* Steps */}
        <div>
          <label className="block text-sm font-medium text-charcoal-700 mb-1.5">
            Kroki przygotowania <span className="text-terracotta-500">*</span>
          </label>
          {errors.steps && <p className="text-red-500 text-sm mb-2">{errors.steps}</p>}
          <div className="space-y-3">
            {form.steps.map((step, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="flex items-center justify-center w-6 mt-3 flex-shrink-0">
                  <GripVertical size={14} className="text-gray-300" />
                </div>
                <div className="w-7 h-7 flex-shrink-0 mt-2.5 bg-charcoal-800 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{i + 1}</span>
                </div>
                <textarea
                  rows={2}
                  value={step}
                  onChange={(e) => updateStep(i, e.target.value)}
                  placeholder={`Krok ${i + 1}`}
                  className="input-field text-sm resize-none flex-1"
                />
                <button
                  type="button"
                  onClick={() => removeStep(i)}
                  disabled={form.steps.length === 1}
                  className="flex-shrink-0 w-8 h-8 mt-2.5 flex items-center justify-center rounded-full hover:bg-red-50 text-gray-300 hover:text-red-400 transition-colors disabled:opacity-30"
                  aria-label="Usuń krok"
                >
                  <X size={15} />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addStep}
            className="mt-3 flex items-center gap-2 text-sm text-terracotta-500 hover:text-terracotta-600 font-medium transition-colors"
          >
            <Plus size={15} />
            Dodaj krok
          </button>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-cream-200">
          <button type="submit" className="btn-primary flex items-center justify-center gap-2 flex-1 sm:flex-none sm:px-10 py-3">
            <ChefHat size={16} />
            {isEdit ? 'Zapisz zmiany' : 'Dodaj przepis'}
          </button>
          <button type="button" onClick={onCancel} className="btn-secondary flex items-center justify-center gap-2 flex-1 sm:flex-none sm:px-8 py-3">
            Anuluj
          </button>
        </div>
      </form>
    </div>
  );
}
