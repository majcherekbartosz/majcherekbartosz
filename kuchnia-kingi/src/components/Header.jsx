import { useState, useRef, useEffect } from 'react';
import { ChefHat, Plus, ArrowLeft, User, Heart, LogIn, LogOut, BarChart3, ChevronDown, Settings, Home, Search, ShoppingCart } from 'lucide-react';

export default function Header({ onLogoClick, onAddRecipe, onAbout, onFavorites, onAnalytics, showBack, onBack, currentView, isAdmin, onLogin, onLogout }) {
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setAdminDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDropdownClick = (action) => {
    action();
    setAdminDropdownOpen(false);
  };

  return (
    <>
      {/* Desktop top bar */}
      <header className="hidden md:flex sticky top-0 z-50 h-16 items-center justify-between px-8 bg-white/80 backdrop-blur-xl border-b border-outline-variant/50">
        <div className="flex items-center gap-3">
          {showBack && (
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-charcoal-700 hover:text-brand-400 transition-colors mr-2"
              aria-label="Wróć"
            >
              <ArrowLeft size={20} />
            </button>
          )}
          <button
            onClick={onLogoClick}
            className="flex items-center gap-2.5 group"
            aria-label="Kuchnia Kingi – strona główna"
          >
            <div className="w-9 h-9 bg-brand-400 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <ChefHat size={18} className="text-white" />
            </div>
            <div className="leading-tight">
              <span className="font-serif text-xl font-semibold text-charcoal-700 tracking-tight">
                Kuchnia Kingi
              </span>
              <span className="block text-[10px] text-outline font-sans leading-none">
                pamiętnik kulinarny
              </span>
            </div>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onFavorites}
            className={`flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-full transition-all duration-200 ${
              currentView === 'favorites'
                ? 'bg-brand-50 text-brand-600'
                : 'text-charcoal-600 hover:text-brand-400 hover:bg-brand-50'
            }`}
          >
            <Heart size={15} />
            <span>Moja Kolekcja</span>
          </button>
          <button
            onClick={onAbout}
            className={`flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-full transition-all duration-200 ${
              currentView === 'about'
                ? 'bg-brand-50 text-brand-600'
                : 'text-charcoal-600 hover:text-brand-400 hover:bg-brand-50'
            }`}
          >
            <User size={15} />
            <span>O mnie</span>
          </button>

          {isAdmin ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setAdminDropdownOpen(!adminDropdownOpen)}
                className={`flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-full transition-all duration-200 ${
                  adminDropdownOpen || currentView === 'admin'
                    ? 'bg-brand-50 text-brand-600'
                    : 'text-charcoal-600 hover:text-brand-400 hover:bg-brand-50'
                }`}
              >
                <Settings size={15} />
                <span>Admin</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${adminDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {adminDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl border border-outline-variant/50 shadow-card-hover py-2 z-50">
                  <button
                    onClick={() => handleDropdownClick(onAddRecipe)}
                    className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm text-charcoal-700 hover:bg-brand-50 hover:text-brand-600 transition-colors"
                  >
                    <Plus size={16} />
                    Nowy przepis
                  </button>
                  <button
                    onClick={() => handleDropdownClick(onAnalytics)}
                    className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm text-charcoal-700 hover:bg-brand-50 hover:text-brand-600 transition-colors"
                  >
                    <BarChart3 size={16} />
                    Analityka
                  </button>
                  <div className="border-t border-outline-variant/30 my-1" />
                  <button
                    onClick={() => handleDropdownClick(onLogout)}
                    className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={16} />
                    Wyloguj
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onLogin}
              className="flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-full text-charcoal-600 hover:text-brand-400 hover:bg-brand-50 transition-all duration-200"
            >
              <LogIn size={15} />
              <span>Admin</span>
            </button>
          )}
        </div>
      </header>

      {/* Mobile top bar — minimal */}
      <header className="md:hidden sticky top-0 z-50 flex items-center justify-between h-14 px-5 bg-white/80 backdrop-blur-xl">
        {showBack ? (
          <button onClick={onBack} className="p-2 -ml-2" aria-label="Wróć">
            <ArrowLeft size={20} className="text-charcoal-700" />
          </button>
        ) : (
          <div className="w-8 h-8 bg-brand-400 rounded-lg flex items-center justify-center">
            <ChefHat size={14} className="text-white" />
          </div>
        )}
        <span className="font-serif font-semibold text-lg text-charcoal-700">
          {currentView === 'favorites' ? 'Moja Kolekcja' : currentView === 'about' ? 'O mnie' : 'Kuchnia Kingi'}
        </span>
        <button onClick={onFavorites} className="p-2 -mr-2" aria-label="Szukaj">
          <Search size={20} className="text-charcoal-700" />
        </button>
      </header>

      {/* Mobile bottom navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-outline-variant/30 pb-[env(safe-area-inset-bottom)]">
        <div className="flex items-center justify-around h-16 px-4">
          <MobileTab
            icon={Home}
            label="Home"
            active={currentView === 'dashboard'}
            onClick={onLogoClick}
          />
          <MobileTab
            icon={Search}
            label="Discover"
            active={false}
            onClick={onLogoClick}
          />
          {/* Center shopping button */}
          <button
            onClick={onFavorites}
            className="flex flex-col items-center gap-0.5 -mt-4"
            aria-label="Lista zakupów"
          >
            <div className="w-12 h-12 rounded-full bg-brand-400 flex items-center justify-center shadow-lg">
              <ShoppingCart size={20} className="text-white" />
            </div>
            <span className="text-[10px] font-medium text-brand-400">Shopping</span>
          </button>
          <MobileTab
            icon={User}
            label="Profile"
            active={currentView === 'about'}
            onClick={onAbout}
          />
        </div>
      </nav>

      {/* Desktop spacer */}
      <div className="hidden md:block h-0" />
      {/* Mobile bottom spacer */}
      <div className="md:hidden h-0" />
    </>
  );
}

function MobileTab({ icon: Icon, label, active, onClick }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-0.5 py-1" aria-label={label}>
      <Icon size={22} className={active ? 'text-brand-400' : 'text-outline'} />
      <span className={`text-[10px] font-medium ${active ? 'text-brand-400' : 'text-outline'}`}>
        {label}
      </span>
    </button>
  );
}
