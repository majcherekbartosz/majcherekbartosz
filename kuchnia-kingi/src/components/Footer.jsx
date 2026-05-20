import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-cream-200 bg-white/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-400">
        <p className="font-serif italic text-base text-terracotta-400">
          Z pamiętnika kulinarnego Kingi
        </p>
        <p className="flex items-center gap-1.5">
          Stworzone z <Heart size={13} className="text-terracotta-400 fill-current" /> dla miłości do gotowania
        </p>
      </div>
    </footer>
  );
}
