import { useState, useRef, useEffect } from 'react';
import { Plus, ArrowLeft, LogIn, LogOut, BarChart3, ChevronDown, Settings, Home, Search, ShoppingCart, Heart, Menu, X, User } from 'lucide-react';

export default function Header({ onLogoClick, onAddRecipe, onAbout, onFavorites, onShoppingList, shoppingListCount = 0, onAnalytics, onSearch, showBack, onBack, currentView, isAdmin, onLogin, onLogout }) {
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  // Uruchamia wybrana akcje nawigacji i zamyka wysuwane menu na telefonie.
  const handleMobileNav = (action) => {
    if (action) action();
    setMobileMenuOpen(false);
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
          <button onClick={() => setMobileMenuOpen(true)} className="w-10 h-10 flex items-center justify-center" aria-label="Menu">
            <Menu size={20} className="text-primary" />
          </button>
        )}
        {/* Znaczek + nazwa. alt="" bo nazwe czyta juz tekst obok (bez powtorzenia dla czytnikow ekranu) */}
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="" className="h-7 w-auto" />
          <span className="font-serif text-headline-md text-tertiary">Kuchnia Kingi</span>
        </div>
        <button onClick={onSearch} className="w-10 h-10 flex items-center justify-center rounded-full text-primary hover:bg-surface-container transition-colors" aria-label="Szukaj">
          <Search size={20} />
        </button>
      </header>

      {/* Mobile slide-out menu (otwierane ikona ☰) */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[60]" role="dialog" aria-modal="true">
          {/* Przyciemnione tlo — klikniecie zamyka menu */}
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileMenuOpen(false)} />
          {/* Panel wysuwany z lewej */}
          <div className="absolute top-0 left-0 h-full w-72 max-w-[80%] bg-surface-container-lowest shadow-card-hover flex flex-col p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-4 pl-2">
              <div className="flex items-center gap-2">
                <img src="/logo.png" alt="" className="h-7 w-auto" />
                <span className="font-serif text-headline-md text-tertiary">Kuchnia Kingi</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="w-9 h-9 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container transition-colors" aria-label="Zamknij menu">
                <X size={20} />
              </button>
            </div>

            <MobileMenuItem icon={Home} label="Strona główna" active={currentView === 'dashboard'} onClick={() => handleMobileNav(onLogoClick)} />
            <MobileMenuItem icon={Heart} label="Ulubione" active={currentView === 'favorites'} onClick={() => handleMobileNav(onFavorites)} />
            <MobileMenuItem icon={ShoppingCart} label="Lista zakupów" badge={shoppingListCount} active={currentView === 'shopping'} onClick={() => handleMobileNav(onShoppingList)} />
            <MobileMenuItem icon={User} label="O mnie" active={currentView === 'about'} onClick={() => handleMobileNav(onAbout)} />

            <div className="border-t border-outline-variant/30 my-3" />

            {isAdmin ? (
              <>
                <MobileMenuItem icon={Plus} label="Nowy przepis" onClick={() => handleMobileNav(onAddRecipe)} />
                <MobileMenuItem icon={BarChart3} label="Analityka" active={currentView === 'admin'} onClick={() => handleMobileNav(onAnalytics)} />
                <MobileMenuItem icon={LogOut} label="Wyloguj" danger onClick={() => handleMobileNav(onLogout)} />
              </>
            ) : (
              <MobileMenuItem icon={LogIn} label="Panel Admina" onClick={() => handleMobileNav(onLogin)} />
            )}
          </div>
        </div>
      )}

      {/* Desktop top bar */}
      <header className="hidden md:flex sticky top-0 z-50 h-16 items-center justify-between px-margin-desktop bg-surface-container-lowest/80 backdrop-blur-md shadow-soft">
        <div className="flex items-center gap-4">
          {showBack && (
            <button onClick={onBack} className="flex items-center gap-1.5 text-primary hover:text-tertiary transition-colors" aria-label="Wróć">
              <ArrowLeft size={18} />
              <span className="text-body-sm">Wróć</span>
            </button>
          )}
          {/* Znaczek + nazwa "Kuchnia Kingi". alt="" bo nazwe czyta tekst obok */}
          <button onClick={onLogoClick} className="flex items-center gap-2.5 group" aria-label="Strona główna">
            <img src="/logo.png" alt="" className="h-10 w-auto transition-transform group-hover:scale-105" />
            <span className="font-serif text-headline-md text-tertiary">Kuchnia Kingi</span>
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
            onClick={onShoppingList}
            className={`flex items-center gap-1.5 text-body-sm font-medium px-4 py-2 rounded-full transition-all duration-200 ${
              currentView === 'shopping'
                ? 'bg-primary-container text-on-primary-container'
                : 'text-on-surface-variant hover:bg-surface-container hover:text-tertiary'
            }`}
          >
            <ShoppingCart size={15} />
            <span>Lista zakupów</span>
            {shoppingListCount > 0 && (
              <span className="min-w-5 h-5 px-1.5 flex items-center justify-center rounded-full bg-tertiary text-on-tertiary text-[11px] font-semibold tabular-nums">
                {shoppingListCount}
              </span>
            )}
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
          {/* Center FAB — tylko dla zalogowanego admina (dodawanie przepisu) */}
          {isAdmin && (
            <div className="relative -mt-6">
              <button
                onClick={onAddRecipe}
                className="w-14 h-14 rounded-full bg-tertiary text-on-tertiary shadow-card flex items-center justify-center active:scale-90 transition-transform"
                aria-label="Dodaj przepis"
              >
                <Plus size={24} />
              </button>
            </div>
          )}
          <MobileTab icon={ShoppingCart} label="Zakupy" active={currentView === 'shopping'} onClick={onShoppingList} />
          <MobileTab icon={Search} label="Szukaj" active={false} onClick={onSearch} />
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

function MobileMenuItem({ icon: Icon, label, active, badge = 0, danger, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 w-full text-left px-3 py-3 rounded-xl text-body-md font-medium transition-colors ${
        danger
          ? 'text-error hover:bg-error-container/30'
          : active
            ? 'bg-primary-container text-on-primary-container'
            : 'text-on-surface hover:bg-surface-container hover:text-tertiary'
      }`}
    >
      <Icon size={18} />
      <span className="flex-1">{label}</span>
      {badge > 0 && (
        <span className="min-w-5 h-5 px-1.5 flex items-center justify-center rounded-full bg-tertiary text-on-tertiary text-[11px] font-semibold tabular-nums">
          {badge}
        </span>
      )}
    </button>
  );
}
