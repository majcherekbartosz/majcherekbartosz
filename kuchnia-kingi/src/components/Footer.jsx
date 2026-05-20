import { Heart, BookOpen } from 'lucide-react';

const CHECKOUT_URL = 'https://twojsklep.pl/checkout';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-cream-200 bg-white/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-serif italic text-base text-terracotta-400">
            Z pamiętnika kulinarnego Kingi
          </p>
          <a
            href={CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 bg-terracotta-500 hover:bg-terracotta-600 text-white"
          >
            <BookOpen size={15} />
            Kup E-booka z przepisami Kingi
          </a>
          <p className="flex items-center gap-1.5 text-sm text-gray-400">
            Stworzone z <Heart size={13} className="text-terracotta-400 fill-current" /> dla miłości do gotowania
          </p>
        </div>
      </div>
    </footer>
  );
}
