import { Heart, BookOpen, BarChart3 } from 'lucide-react';

const CHECKOUT_URL = 'https://naffy.io/miejsce-na-twoj-link';

export default function Footer({ onAdminClick }) {
  return (
    <footer className="mt-16 border-t border-cream-200 bg-white/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-serif italic text-base text-terracotta-500">
            Z pamiętnika kulinarnego Kingi
          </p>
          <a
            href={CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 bg-terracotta-500 hover:bg-terracotta-600 text-white min-h-[44px]"
          >
            <BookOpen size={15} />
            Kup E-booka z przepisami
          </a>
          <div className="flex items-center gap-3">
            <p className="flex items-center gap-1.5 text-sm text-gray-400">
              Stworzone z <Heart size={13} className="text-terracotta-500 fill-current" /> dla miłości do gotowania
            </p>
            <button
              onClick={onAdminClick}
              className="text-gray-300 hover:text-terracotta-500 transition-colors p-1 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Panel analityczny"
              title="Panel"
            >
              <BarChart3 size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
