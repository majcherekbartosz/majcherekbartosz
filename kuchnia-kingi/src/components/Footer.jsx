import { Heart, BookOpen } from 'lucide-react';

const CHECKOUT_URL = 'https://naffy.io/miejsce-na-twoj-link';

export default function Footer() {
  return (
    <footer className="hidden md:block mt-16 border-t border-outline-variant/30 bg-white/60">
      <div className="max-w-6xl mx-auto px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-serif italic text-sm text-brand-400">
            Z pamiętnika kulinarnego Kingi
          </p>
          <a
            href={CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 bg-brand-400 hover:bg-brand-600 text-white"
          >
            <BookOpen size={15} />
            Kup E-booka z przepisami
          </a>
          <p className="flex items-center gap-1.5 text-xs text-outline">
            Stworzone z <Heart size={12} className="text-brand-400 fill-current" /> dla miłości do gotowania
          </p>
        </div>
      </div>
    </footer>
  );
}
