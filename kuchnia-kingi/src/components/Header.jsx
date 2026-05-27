import { ChefHat, Plus, ArrowLeft, User, Heart, LogIn, LogOut } from 'lucide-react';

export default function Header({ onLogoClick, onAddRecipe, onAbout, onFavorites, showBack, onBack, currentView, isAdmin, onLogin, onLogout }) {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-cream-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          <div className="flex items-center gap-3">
            {showBack && (
              <button
                onClick={onBack}
                className="flex items-center gap-1.5 text-charcoal-700 hover:text-terracotta-500 transition-colors mr-2"
                aria-label="Wróć"
              >
                <ArrowLeft size={20} />
                <span className="text-sm font-medium hidden sm:inline">Wróć</span>
              </button>
            )}
            <button
              onClick={onLogoClick}
              className="flex items-center gap-2.5 group"
              aria-label="Kuchnia Kingi – strona główna"
            >
              <div className="w-9 h-9 bg-gradient-to-br from-terracotta-400 to-terracotta-600 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                <ChefHat size={18} className="text-white" />
              </div>
              <div className="leading-tight">
                <span className="font-serif text-xl font-bold text-charcoal-800 tracking-tight">
                  Kuchnia Kingi
                </span>
                <span className="block text-xs text-gray-400 font-sans leading-none -mt-0.5 hidden sm:block">
                  pamiętnik kulinarny
                </span>
              </div>
            </button>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2.5">
            <button
              onClick={onFavorites}
              className={`flex items-center gap-1.5 text-sm font-medium px-2.5 sm:px-3 py-2 rounded-full transition-all duration-200 ${
                currentView === 'favorites'
                  ? 'bg-cream-100 text-terracotta-600'
                  : 'text-charcoal-600 hover:text-terracotta-500 hover:bg-cream-50'
              }`}
              aria-label="Moja Kolekcja"
            >
              <Heart size={15} />
              <span className="hidden sm:inline">Moja Kolekcja</span>
            </button>
            <button
              onClick={onAbout}
              className={`flex items-center gap-1.5 text-sm font-medium px-2.5 sm:px-3 py-2 rounded-full transition-all duration-200 ${
                currentView === 'about'
                  ? 'bg-cream-100 text-terracotta-600'
                  : 'text-charcoal-600 hover:text-terracotta-500 hover:bg-cream-50'
              }`}
              aria-label="O mnie"
            >
              <User size={15} />
              <span className="hidden sm:inline">O mnie</span>
            </button>
            {isAdmin ? (
              <>
                <button
                  onClick={onAddRecipe}
                  className="flex items-center gap-2 bg-terracotta-500 hover:bg-terracotta-600 active:scale-95 text-white text-sm font-medium px-3 sm:px-4 py-2 rounded-full transition-all duration-200 shadow-sm hover:shadow-md"
                  aria-label="Dodaj przepis"
                >
                  <Plus size={16} />
                  <span className="hidden sm:inline">Nowy przepis</span>
                  <span className="sm:hidden">Dodaj</span>
                </button>
                <button
                  onClick={onLogout}
                  className="flex items-center gap-1.5 text-sm font-medium px-2.5 sm:px-3 py-2 rounded-full text-charcoal-600 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
                  aria-label="Wyloguj"
                >
                  <LogOut size={15} />
                  <span className="hidden sm:inline">Wyloguj</span>
                </button>
              </>
            ) : (
              <button
                onClick={onLogin}
                className="flex items-center gap-1.5 text-sm font-medium px-2.5 sm:px-3 py-2 rounded-full text-charcoal-600 hover:text-terracotta-500 hover:bg-cream-50 transition-all duration-200"
                aria-label="Zaloguj się"
              >
                <LogIn size={15} />
                <span className="hidden sm:inline">Admin</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
