import { useState } from 'react';
import { MessageCircle, Send, Trash2, User } from 'lucide-react';

export default function Comments({ comments, loading, onAdd, onDelete, isAdmin }) {
  const [authorName, setAuthorName] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!authorName.trim() || !content.trim()) return;

    setSubmitting(true);
    setError('');

    const { error: submitError } = await onAdd(authorName.trim(), content.trim());
    if (submitError) {
      setError('Nie udało się dodać komentarza. Spróbuj ponownie.');
    } else {
      setContent('');
    }
    setSubmitting(false);
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('pl-PL', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="mt-12 pt-8 border-t border-cream-200">
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle size={20} className="text-terracotta-500" />
        <h2 className="font-serif text-2xl font-semibold text-charcoal-800">
          Komentarze ({comments.length})
        </h2>
      </div>

      {/* Add comment form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-cream-200 p-5 mb-6">
        <div className="flex flex-col sm:flex-row gap-3 mb-3">
          <div className="flex-1">
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Twoje imię"
              required
              maxLength={50}
              className="w-full px-4 py-2.5 rounded-xl border border-cream-200 focus:border-terracotta-400 focus:ring-2 focus:ring-cream-100 outline-none transition-all text-sm"
            />
          </div>
        </div>
        <div className="flex gap-3">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Napisz komentarz..."
            required
            maxLength={500}
            rows={3}
            className="flex-1 px-4 py-2.5 rounded-xl border border-cream-200 focus:border-terracotta-400 focus:ring-2 focus:ring-cream-100 outline-none transition-all text-sm resize-none"
          />
        </div>
        {error && (
          <p className="text-sm text-red-500 mt-2">{error}</p>
        )}
        <div className="flex justify-end mt-3">
          <button
            type="submit"
            disabled={submitting || !authorName.trim() || !content.trim()}
            className="flex items-center gap-2 bg-terracotta-500 hover:bg-terracotta-600 disabled:opacity-50 text-white text-sm font-medium px-5 py-2.5 rounded-full transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 min-h-[44px]"
          >
            <Send size={14} />
            {submitting ? 'Wysyłanie...' : 'Dodaj komentarz'}
          </button>
        </div>
      </form>

      {/* Comments list */}
      {loading ? (
        <p className="text-center text-gray-400 py-8">Ładowanie komentarzy...</p>
      ) : comments.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-400 text-sm">Brak komentarzy. Bądź pierwszy!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-white rounded-2xl border border-cream-200 p-4 sm:p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-cream-100 flex items-center justify-center flex-shrink-0">
                    <User size={16} className="text-terracotta-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-charcoal-800 truncate">
                      {comment.author_name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {formatDate(comment.created_at)}
                    </p>
                  </div>
                </div>
                {isAdmin && (
                  <button
                    onClick={() => onDelete(comment.id)}
                    className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                    aria-label="Usuń komentarz"
                    title="Usuń komentarz"
                  >
                    <Trash2 size={15} />
                  </button>
                )}
              </div>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed pl-12">
                {comment.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
