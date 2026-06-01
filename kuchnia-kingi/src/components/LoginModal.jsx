import { useState } from 'react';
import { X, LogIn } from 'lucide-react';

export default function LoginModal({ onLogin, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error: authError } = await onLogin(email, password);
    if (authError) {
      setError(authError.message === 'Invalid login credentials'
        ? 'Nieprawidłowy email lub hasło'
        : authError.message);
    } else {
      onClose();
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          aria-label="Zamknij"
        >
          <X size={18} />
        </button>

        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-cream-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <LogIn size={24} className="text-terracotta-500" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-charcoal-800">Panel Admina</h2>
          <p className="text-sm text-gray-500 mt-1">Zaloguj się, aby zarządzać przepisami</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-cream-200 focus:border-terracotta-400 focus:ring-2 focus:ring-cream-100 outline-none transition-all text-sm"
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Hasło</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-cream-200 focus:border-terracotta-400 focus:ring-2 focus:ring-cream-100 outline-none transition-all text-sm"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-terracotta-500 hover:bg-terracotta-600 disabled:opacity-50 text-white font-medium py-2.5 rounded-full transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
          >
            {loading ? 'Logowanie...' : 'Zaloguj się'}
          </button>
        </form>
      </div>
    </div>
  );
}
