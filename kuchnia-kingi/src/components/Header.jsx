import { useState, useRef, useEffect } from 'react';
import { Plus, ArrowLeft, LogIn, LogOut, BarChart3, ChevronDown, Settings, Home, Search, ShoppingCart, Heart, Menu } from 'lucide-react';

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
      {/* Mobile top bar */}
      <header className="md:hidden sticky top-0 z-50 bg-surface-container-lowest/80 backdrop-blur-md px-margin-mobile py-2 flex items-center justify-between shadow-soft">
        {showBack ? (
          <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full text-primary hover:bg-surface-container transition-colors" aria-label="Wróć">
            <ArrowLeft size={20} />
          </button>
        ) : (
          <button onClick={onLogoClick} className="w-10 h-10 flex items-center justify-center" aria-label="Menu">
            <Menu size={20} className="text-primary" />
          </button>
        )}
        <img src="/logo.png" alt="Kuchnia Kingi" className="h-12 w-auto" />
        <button className="w-10 h-10 flex items-center justify-center rounded-full text-primary hover:bg-surface-container transition-colors" aria-label="Szukaj">
          <Search size={20} />
        </button>
      </header>

      {/* Desktop top bar */}
      <header className="hidden md:flex sticky top-0 z-50 h-16 items-center justify-between px-margin-desktop bg-surface-container-lowest/80 backdrop-blur-md shadow-soft">
        <div className="flex items-center gap-4">
          {showBack && (
            <button onClick={onBack} className="flex items-center gap-1.5 text-primary hover:text-tertiary transition-colors" aria-label="Wróć">
              <ArrowLeft size={18} />
              <span className="text-body-sm">Wróć</span>
            </button>
          )}
          <button onClick={onLogoClick} className="flex items-center group" aria-label="Strona główna">
            <img src="/logo.png" alt="Kuchnia Kingi" className="h-1 w-auto transition-transform group-hover:scale-105" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onFavorites}
            className={`flex items-center gap-1.5 text-body-sm font-medium px-4 py-2 rounded-full transition-all duration-200 ${
              currentView === 'favorites'
                ? 'bg-primary-container text-on-primary-container'
                : 'text-on-surface-variant hover:bg-surface-container hover:text-tertiary'
            }`}
          >
            <Heart size={15} />
            <span>Ulubione</span>
          </button>
          <button
            onClick={onAbout}
            className={`flex items-center gap-1.5 text-body-sm font-medium px-4 py-2 rounded-full transition-all duration-200 ${
              currentView === 'about'
                ? 'bg-primary-container text-on-primary-container'
                : 'text-on-surface-variant hover:bg-surface-container hover:text-tertiary'
            }`}
          >
            <span>O mnie</span>
          </button>

          {isAdmin ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setAdminDropdownOpen(!adminDropdownOpen)}
                className={`flex items-center gap-1.5 text-body-sm font-medium px-4 py-2 rounded-full transition-all duration-200 ${
                  adminDropdownOpen || currentView === 'admin'
                    ? 'bg-primary-container text-on-primary-container'
                    : 'text-on-surface-variant hover:bg-surface-container hover:text-tertiary'
                }`}
              >
                <Settings size={15} />
                <span>Admin</span>
                <ChevronDown size={14} className={`transition-transform ${adminDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {adminDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-card py-2 z-50">
                  <button onClick={() => handleDropdownClick(onAddRecipe)} className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-body-sm text-on-surface hover:bg-surface-container hover:text-tertiary transition-colors">
                    <Plus size={16} /> Nowy przepis
                  </button>
                  <button onClick={() => handleDropdownClick(onAnalytics)} className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-body-sm text-on-surface hover:bg-surface-container hover:text-tertiary transition-colors">
                    <BarChart3 size={16} /> Analityka
                  </button>
                  <div className="border-t border-outline-variant/30 my-1" />
                  <button onClick={() => handleDropdownClick(onLogout)} className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-body-sm text-error hover:bg-error-container/30 transition-colors">
                    <LogOut size={16} /> Wyloguj
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button onClick={onLogin} className="flex items-center gap-1.5 text-body-sm font-medium px-4 py-2 rounded-full text-on-surface-variant hover:bg-surface-container hover:text-tertiary transition-all duration-200">
              <LogIn size={15} /> <span>Admin</span>
            </button>
          )}

          {isAdmin && (
            <button onClick={onAddRecipe} className="btn-primary flex items-center gap-2 text-body-sm ml-2">
              <Plus size={16} /> Przepis
            </button>
          )}
        </div>
      </header>

      {/* Mobile bottom navigation (screen6.png) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface-container-lowest border-t border-outline-variant/20 pb-[env(safe-area-inset-bottom)]">
        <div className="flex items-center justify-around h-16">
          <MobileTab icon={Home} label="Discover" active={currentView === 'dashboard'} onClick={onLogoClick} />
          <MobileTab icon={Heart} label="Saved" active={currentView === 'favorites'} onClick={onFavorites} />
          {/* Center FAB */}
          <div className="relative -mt-6">
            <button
              onClick={isAdmin ? onAddRecipe : onLogoClick}
              className="w-14 h-14 rounded-full bg-tertiary text-on-tertiary shadow-card flex items-center justify-center active:scale-90 transition-transform"
              aria-label="Dodaj przepis"
            >
              <Plus size={24} />
            </button>
          </div>
          <MobileTab icon={ShoppingCart} label="Zakupy" active={false} onClick={onLogoClick} />
          <MobileTab icon={Search} label="Szukaj" active={false} onClick={onLogoClick} />
        </div>
      </nav>
    </>
  );
}

function MobileTab({ icon: Icon, label, active, onClick }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-0.5 py-2 px-3" aria-label={label}>
      <Icon size={20} className={active ? 'text-tertiary' : 'text-outline'} />
      <span className={`text-[10px] font-medium ${active ? 'text-tertiary' : 'text-outline'}`}>{label}</span>
    </button>
  );
}
