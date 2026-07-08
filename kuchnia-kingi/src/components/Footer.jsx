import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="hidden md:block mt-stack-lg border-t border-outline-variant/20 bg-surface-container-lowest/60">
      <div className="max-w-container-max mx-auto px-margin-desktop py-8">
        <div className="flex items-center justify-between">
          <span className="font-serif text-body-lg italic text-primary">
            Z pamiętnika kulinarnego Kingi
          </span>
          <p className="flex items-center gap-1.5 text-body-sm text-outline">
            Stworzone z <Heart size={12} className="text-tertiary fill-tertiary" /> dla miłości do gotowania
          </p>
        </div>
      </div>
    </footer>
  );
}
