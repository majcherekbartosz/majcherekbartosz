import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('Kuchnia Kingi error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-cream-50 p-4">
          <div className="bg-white rounded-3xl shadow-sm p-10 max-w-md w-full text-center">
            <div className="text-4xl mb-4">🍳</div>
            <h2 className="font-serif text-2xl font-bold text-charcoal-800 mb-3">
              Coś poszło nie tak
            </h2>
            <p className="text-gray-500 text-sm mb-2">
              Wystąpił nieoczekiwany błąd. Spróbuj odświeżyć stronę.
            </p>
            <p className="text-xs text-red-400 font-mono mb-6 bg-red-50 rounded-lg p-2 text-left overflow-auto max-h-24">
              {this.state.error?.message || 'Nieznany błąd'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Odśwież stronę
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
