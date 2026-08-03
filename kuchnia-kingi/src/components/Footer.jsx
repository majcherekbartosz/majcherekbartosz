import { Heart } from 'lucide-react';

export default function Footer({ onPrivacy }) {
  return (
    <footer className="hidden md:block mt-stack-lg border-t border-outline-variant/20 bg-surface-container-lowest/60">
      <div className="max-w-container-max mx-auto px-margin-desktop py-8">
        <div className="flex items-center justify-between gap-6">
          <span className="font-serif text-body-lg italic text-primary">
            Z pamiętnika kulinarnego Kingi
          </span>
          <div className="flex items-center gap-6">
            {onPrivacy && (
              <button
                onClick={onPrivacy}
                className="text-body-sm text-on-surface-variant hover:text-tertiary transition-colors"
              >
                Polityka prywatności
              </button>
            )}
            <p className="flex items-center gap-1.5 text-body-sm text-outline">
              Stworzone z <Heart size={12} className="text-tertiary fill-tertiary" /> dla miłości do gotowania
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
