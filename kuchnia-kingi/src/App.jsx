import { useState } from 'react';
import { useRecipes } from './hooks/useRecipes';
import Dashboard from './components/Dashboard';
import RecipeDetail from './components/RecipeDetail';
import AddEditRecipe from './components/AddEditRecipe';
import Header from './components/Header';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';

export default function App() {
  const { recipes, addRecipe, updateRecipe, deleteRecipe, getRecipe } = useRecipes();
  const [view, setView] = useState('dashboard'); // 'dashboard' | 'detail' | 'add' | 'edit'
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);

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

  return (
    <ErrorBoundary>
    <div className="min-h-screen bg-cream-50">
      <Header
        onLogoClick={() => navigate('dashboard')}
        onAddRecipe={() => navigate('add')}
        showBack={view !== 'dashboard'}
        onBack={() => {
          if (view === 'detail') navigate('dashboard');
          else if (view === 'edit') navigate('detail', selectedRecipeId);
          else navigate('dashboard');
        }}
      />

      <main className="min-h-screen">
        {view === 'dashboard' && (
          <Dashboard
            recipes={recipes}
            onRecipeClick={(id) => navigate('detail', id)}
            onAddRecipe={() => navigate('add')}
          />
        )}

        {view === 'detail' && selectedRecipeId && (
          <RecipeDetail
            recipe={getRecipe(selectedRecipeId)}
            onEdit={() => navigate('edit', selectedRecipeId)}
            onDelete={() => handleDelete(selectedRecipeId)}
            onBack={() => navigate('dashboard')}
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
      </main>
      <Footer />
    </div>
    </ErrorBoundary>
  );
}
