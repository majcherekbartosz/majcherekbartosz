import { useState, useEffect } from 'react';
import { useRecipes } from './hooks/useRecipes';
import { useFavorites } from './hooks/useFavorites';
import { useRatings } from './hooks/useRatings';
import { useGlobalShoppingList } from './hooks/useGlobalShoppingList';
import { useAnalytics } from './hooks/useAnalytics';
import { useAuth } from './hooks/useAuth';
import Dashboard from './components/Dashboard';
import RecipeDetail from './components/RecipeDetail';
import AddEditRecipe from './components/AddEditRecipe';
import AboutMe from './components/AboutMe';
import PrivacyPolicy from './components/PrivacyPolicy';
import FavoritesCollection from './components/FavoritesCollection';
import ShoppingListView from './components/ShoppingListView';
import AdminDashboard from './components/AdminDashboard';
import { buildRecipeShoppingItems } from './utils/buildShoppingList';
import Header from './components/Header';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import LoginModal from './components/LoginModal';
import PwaInstallBanner from './components/PwaInstallBanner';

export default function App() {
  const { recipes, addRecipe, updateRecipe, deleteRecipe, getRecipe } = useRecipes();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { setRating, clearRating, getRating } = useRatings();
  const {
    items: shoppingItems,
    uncheckedCount,
    addFromRecipe,
    toggleItem: toggleShoppingItem,
    removeItem: removeShoppingItem,
    removeRecipeItems,
    clearChecked,
    clearAll: clearShoppingList,
  } = useGlobalShoppingList();
  const { stats, trackView, trackEbookClick } = useAnalytics();
  const { isAdmin, signIn, signOut } = useAuth();
  const [view, setView] = useState('dashboard');
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  // Licznik "wymus fokus w wyszukiwarce" — rosnie po kliknieciu "Szukaj".
  const [searchFocusSignal, setSearchFocusSignal] = useState(0);

  // Losowane RAZ przy wejsciu na strone: numer tla 1-9 dla strony glownej.
  // useState z funkcja w srodku uruchamia losowanie tylko przy pierwszym
  // renderze, wiec tlo nie zmienia sie w kolko podczas przegladania.
  const [bgVariant] = useState(() => Math.floor(Math.random() * 9) + 1);

  // Zapisuje aktualny ekran na znaczniku <body>, zeby index.css
  // mogl podmieniac tlo strony zaleznie od widoku.
  useEffect(() => {
    document.body.dataset.view = view;
  }, [view]);

  // Wpisuje wylosowany numer tla na <body data-bg="...">, zeby index.css
  // mogl pokazac odpowiednie z 9 zdjec na stronie glownej.
  useEffect(() => {
    document.body.dataset.bg = bgVariant;
  }, [bgVariant]);

  // Tlo widoku pojedynczego przepisu: jesli przepis ma wlasne zdjecie,
  // uzywamy go (rozmytego) jako tla strony. Ustawiamy zmienna CSS
  // --recipe-bg z adresem zdjecia i znacznik <body data-recipe-bg="on">,
  // ktore index.css zamienia na rozmyte tlo. Gdy przepis nie ma zdjecia
  // (albo jestesmy na innym ekranie) - czyscimy, wraca zwykle tlo.
  useEffect(() => {
    const recipe = view === 'detail' && selectedRecipeId ? getRecipe(selectedRecipeId) : null;
    if (recipe && recipe.image) {
      document.body.style.setProperty('--recipe-bg', `url("${recipe.image}")`);
      document.body.dataset.recipeBg = 'on';
    } else {
      document.body.style.removeProperty('--recipe-bg');
      delete document.body.dataset.recipeBg;
    }
  }, [view, selectedRecipeId, getRecipe]);

  const navigate = (newView, recipeId = null) => {
    setView(newView);
    setSelectedRecipeId(recipeId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // "Szukaj" na telefonie: przejdz na strone glowna i ustaw kursor w polu
  // wyszukiwania. Zwiekszenie licznika wymusza fokus nawet gdy juz tam jestesmy.
  const handleSearch = () => {
    navigate('dashboard');
    setSearchFocusSignal((n) => n + 1);
  };

  const handleSaveRecipe = (data) => {
    if (view === 'edit' && selectedRecipeId) {
      updateRecipe(selectedRecipeId, data);
      navigate('detail', selectedRecipeId);
    } else {
      const newRecipe = addRecipe(data);
      navigate('detail', newRecipe.id);
    }
  };

  const handleDelete = (id) => {
    deleteRecipe(id);
    navigate('dashboard');
  };

  const handleRate = (recipeId, stars) => {
    if (stars === 0) clearRating(recipeId);
    else setRating(recipeId, stars);
  };

  const handleAddToShoppingList = (recipe, items) => {
    const list = items ?? buildRecipeShoppingItems(recipe);
    return addFromRecipe(recipe, list);
  };

  return (
    <ErrorBoundary>
    <div className="min-h-screen font-sans text-on-surface pb-20 md:pb-0">
      <Header
        onLogoClick={() => navigate('dashboard')}
        onAddRecipe={() => navigate('add')}
        onAbout={() => navigate('about')}
        onFavorites={() => navigate('favorites')}
        onShoppingList={() => navigate('shopping')}
        onAnalytics={() => navigate('admin')}
        onSearch={handleSearch}
        onPrivacy={() => navigate('privacy')}
        shoppingListCount={uncheckedCount}
        showBack={view !== 'dashboard' && view !== 'about' && view !== 'favorites' && view !== 'shopping' && view !== 'admin'}
        onBack={() => {
          if (view === 'detail') navigate('dashboard');
          else if (view === 'edit') navigate('detail', selectedRecipeId);
          else navigate('dashboard');
        }}
        currentView={view}
        isAdmin={isAdmin}
        onLogin={() => setShowLogin(true)}
        onLogout={signOut}
      />

      {showLogin && (
        <LoginModal onLogin={signIn} onClose={() => setShowLogin(false)} />
      )}

      <main className="min-h-screen">
        {view === 'dashboard' && (
          <Dashboard
            recipes={recipes}
            onRecipeClick={(id) => navigate('detail', id)}
            onAddRecipe={() => navigate('add')}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
            getRating={getRating}
            focusSearchSignal={searchFocusSignal}
          />
        )}

        {view === 'detail' && selectedRecipeId && (
          <RecipeDetail
            recipe={getRecipe(selectedRecipeId)}
            onEdit={() => navigate('edit', selectedRecipeId)}
            onDelete={() => handleDelete(selectedRecipeId)}
            onBack={() => navigate('dashboard')}
            isFavorite={isFavorite(selectedRecipeId)}
            onToggleFavorite={toggleFavorite}
            onTrackView={trackView}
            onTrackEbookClick={trackEbookClick}
            isAdmin={isAdmin}
            rating={getRating(selectedRecipeId)}
            onRate={handleRate}
            onAddToShoppingList={handleAddToShoppingList}
            onGoToShoppingList={() => navigate('shopping')}
          />
        )}

        {(view === 'add' || view === 'edit') && (
          <AddEditRecipe
            recipe={view === 'edit' ? getRecipe(selectedRecipeId) : null}
            onSave={handleSaveRecipe}
            onCancel={() => {
              if (view === 'edit') navigate('detail', selectedRecipeId);
              else navigate('dashboard');
            }}
          />
        )}

        {view === 'about' && <AboutMe />}

        {view === 'privacy' && <PrivacyPolicy />}

        {view === 'favorites' && (
          <FavoritesCollection
            recipes={recipes}
            favorites={favorites}
            onRecipeClick={(id) => navigate('detail', id)}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
            getRating={getRating}
          />
        )}

        {view === 'shopping' && (
          <ShoppingListView
            items={shoppingItems}
            onToggle={toggleShoppingItem}
            onRemove={removeShoppingItem}
            onRemoveRecipeGroup={removeRecipeItems}
            onClearChecked={clearChecked}
            onClearAll={clearShoppingList}
            onOpenRecipe={(id) => navigate('detail', id)}
          />
        )}

        {view === 'admin' && isAdmin && (
          <AdminDashboard recipes={recipes} stats={stats} />
        )}
      </main>
      <Footer onPrivacy={() => navigate('privacy')} />
      <PwaInstallBanner />
    </div>
    </ErrorBoundary>
  );
}
