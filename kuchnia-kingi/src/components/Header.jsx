import { useState } from 'react';
import { ChefHat, Plus, ArrowLeft, User, Heart, LogIn, LogOut, Menu, X, BarChart3 } from 'lucide-react';

export default function Header({ onLogoClick, onAddRecipe, onAbout, onFavorites, onAnalytics, showBack, onBack, currentView, isAdmin, onLogin, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (action) => {
    action();
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-cream-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          <div className="flex items-center gap-3">
            {showBack && (
              <button
                onClick={onBack}
                className="flex items-center gap-1.5 text-charcoal-700 hover:text-terracotta-500 transition-colors mr-2 min-w-[44px] min-h-[44px] justify-center"
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
                <span className="block text-xs text-pink-400 font-sans leading-none -mt-0.5 hidden sm:block">
                  pamiętnik kulinarny
                </span>
              </div>
            </button>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1.5 sm:gap-2.5">
            <button
              onClick={onFavorites}
              className={`flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-full transition-all duration-200 min-h-[44px] ${
                currentView === 'favorites'
                  ? 'bg-cream-100 text-terracotta-600'
                  : 'text-charcoal-700 hover:text-terracotta-500 hover:bg-cream-50'
              }`}
              aria-label="Moja Kolekcja"
            >
              <Heart size={15} />
              <span>Moja Kolekcja</span>
            </button>
            <button
              onClick={onAbout}
              className={`flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-full transition-all duration-200 min-h-[44px] ${
                currentView === 'about'
                  ? 'bg-cream-100 text-terracotta-600'
                  : 'text-charcoal-700 hover:text-terracotta-500 hover:bg-cream-50'
              }`}
              aria-label="O mnie"
            >
              <User size={15} />
              <span>O mnie</span>
            </button>
            {isAdmin ? (
              <>
                <button
                  onClick={onAddRecipe}
                  className="flex items-center gap-2 bg-terracotta-500 hover:bg-terracotta-600 active:scale-95 text-white text-sm font-medium px-4 py-2 rounded-full transition-all duration-200 shadow-sm hover:shadow-md min-h-[44px]"
                  aria-label="Dodaj przepis"
                >
                  <Plus size={16} />
                  <span>Nowy przepis</span>
                </button>
                <button
                  onClick={onAnalytics}
                  className={`flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-full transition-all duration-200 min-h-[44px] ${
                    currentView === 'admin'
                      ? 'bg-cream-100 text-terracotta-600'
                      : 'text-charcoal-700 hover:text-terracotta-500 hover:bg-cream-50'
                  }`}
                  aria-label="Analityka"
                >
                  <BarChart3 size={15} />
                  <span>Analityka</span>
                </button>
                <button
                  onClick={onLogout}
                  className="flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-full text-charcoal-700 hover:text-red-500 hover:bg-red-50 transition-all duration-200 min-h-[44px]"
                  aria-label="Wyloguj"
                >
                  <LogOut size={15} />
                  <span>Wyloguj</span>
                </button>
              </>
            ) : (
              <button
                onClick={onLogin}
                className="flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-full text-charcoal-700 hover:text-terracotta-500 hover:bg-cream-50 transition-all duration-200 min-h-[44px]"
                aria-label="Zaloguj się"
              >
                <LogIn size={15} />
                <span>Admin</span>
              </button>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-11 h-11 rounded-full text-charcoal-700 hover:bg-cream-100 transition-colors"
            aria-label={mobileMenuOpen ? 'Zamknij menu' : 'Otwórz menu'}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-cream-200 py-3 pb-4 space-y-1">
            <button
              onClick={() => handleNavClick(onFavorites)}
              className={`flex items-center gap-3 w-full text-left text-sm font-medium px-3 py-3 rounded-xl transition-all min-h-[44px] ${
                currentView === 'favorites'
                  ? 'bg-cream-100 text-terracotta-600'
                  : 'text-charcoal-700 hover:bg-cream-50'
              }`}
            >
              <Heart size={18} />
              Moja Kolekcja
            </button>
            <button
              onClick={() => handleNavClick(onAbout)}
              className={`flex items-center gap-3 w-full text-left text-sm font-medium px-3 py-3 rounded-xl transition-all min-h-[44px] ${
                currentView === 'about'
                  ? 'bg-cream-100 text-terracotta-600'
                  : 'text-charcoal-700 hover:bg-cream-50'
              }`}
            >
              <User size={18} />
              O mnie
            </button>
            {isAdmin ? (
              <>
                <button
                  onClick={() => handleNavClick(onAddRecipe)}
                  className="flex items-center gap-3 w-full text-left text-sm font-medium px-3 py-3 rounded-xl bg-terracotta-500 text-white min-h-[44px]"
                >
                  <Plus size={18} />
                  Nowy przepis
                </button>
                <button
                  onClick={() => handleNavClick(onAnalytics)}
                  className={`flex items-center gap-3 w-full text-left text-sm font-medium px-3 py-3 rounded-xl min-h-[44px] ${
                    currentView === 'admin'
                      ? 'bg-cream-100 text-terracotta-600'
                      : 'text-charcoal-700 hover:bg-cream-50'
                  }`}
                >
                  <BarChart3 size={18} />
                  Analityka
                </button>
                <button
                  onClick={() => handleNavClick(onLogout)}
                  className="flex items-center gap-3 w-full text-left text-sm font-medium px-3 py-3 rounded-xl text-red-500 hover:bg-red-50 min-h-[44px]"
                >
                  <LogOut size={18} />
                  Wyloguj
                </button>
              </>
            ) : (
              <button
                onClick={() => handleNavClick(onLogin)}
                className="flex items-center gap-3 w-full text-left text-sm font-medium px-3 py-3 rounded-xl text-charcoal-700 hover:bg-cream-50 min-h-[44px]"
              >
                <LogIn size={18} />
                Panel Admina
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
