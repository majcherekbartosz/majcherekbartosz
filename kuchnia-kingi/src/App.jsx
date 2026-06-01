import { useState } from 'react';
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
import FavoritesCollection from './components/FavoritesCollection';
import ShoppingListView from './components/ShoppingListView';
import AdminDashboard from './components/AdminDashboard';
import { buildRecipeShoppingItems } from './utils/buildShoppingList';
import Header from './components/Header';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import LoginModal from './components/LoginModal';

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

  const navigate = (newView, recipeId = null) => {
    setView(newView);
    setSelectedRecipeId(recipeId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    <div className="min-h-screen bg-cream-50" style={{ backgroundColor: '#FFF0F3' }}>
      <Header
        onLogoClick={() => navigate('dashboard')}
        onAddRecipe={() => navigate('add')}
        onAbout={() => navigate('about')}
        onFavorites={() => navigate('favorites')}
        onShoppingList={() => navigate('shopping')}
        onAnalytics={() => navigate('admin')}
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
      <Footer />
    </div>
    </ErrorBoundary>
  );
}
