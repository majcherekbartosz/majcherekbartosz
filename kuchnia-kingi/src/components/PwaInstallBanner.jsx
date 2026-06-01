import { Download, Share, X, Smartphone } from 'lucide-react';
import { usePwaInstallPrompt } from '../hooks/usePwaInstallPrompt';

export default function PwaInstallBanner() {
  const { visible, isIosDevice, canNativeInstall, install, dismiss } = usePwaInstallPrompt();

  if (!visible) return null;

  const handleInstall = async () => {
    if (canNativeInstall) {
      await install();
    }
  };

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[60] px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 pointer-events-none"
      role="dialog"
      aria-labelledby="pwa-install-title"
      aria-describedby="pwa-install-desc"
    >
      <div className="pointer-events-auto relative mx-auto max-w-lg rounded-2xl border border-cream-200 bg-white/95 backdrop-blur-md shadow-2xl shadow-charcoal-800/10 p-4 sm:p-5">
        <div className="flex gap-3">
          <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-terracotta-400 to-terracotta-600 flex items-center justify-center shadow-sm">
            <Smartphone size={22} className="text-white" />
          </div>
          <div className="flex-1 min-w-0 pr-6">
            <h2
              id="pwa-install-title"
              className="font-serif text-lg font-semibold text-charcoal-800 leading-tight"
            >
              Zainstaluj Kuchnię Kingi
            </h2>
            <p id="pwa-install-desc" className="text-sm text-gray-500 mt-1 leading-relaxed">
              Dodaj aplikację na ekran główny — szybki dostęp do przepisów i listy zakupów, także offline.
            </p>

            {isIosDevice ? (
              <ol className="mt-3 space-y-2 text-sm text-charcoal-700">
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-cream-100 text-terracotta-600 text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <span>
                    Naciśnij <Share size={14} className="inline -mt-0.5 text-terracotta-500" aria-hidden />{' '}
                    <strong>Udostępnij</strong> na dolnym pasku Safari
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-cream-100 text-terracotta-600 text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <span>
                    Wybierz <strong>Dodaj do ekranu początkowego</strong>
                  </span>
                </li>
              </ol>
            ) : (
              <button
                type="button"
                onClick={handleInstall}
                disabled={!canNativeInstall}
                className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold bg-terracotta-500 text-white hover:bg-terracotta-600 transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Download size={16} />
                {canNativeInstall ? 'Zainstaluj aplikację' : 'Instalacja dostępna w Chrome'}
              </button>
            )}

            <div className="mt-3 flex gap-2">
              {!isIosDevice && !canNativeInstall && (
                <p className="text-xs text-gray-400 flex-1">
                  Otwórz stronę w przeglądarce Chrome, aby zobaczyć przycisk instalacji.
                </p>
              )}
              <button
                type="button"
                onClick={dismiss}
                className="ml-auto text-sm font-medium text-gray-500 hover:text-charcoal-700 px-2 py-1 rounded-lg hover:bg-cream-50 transition-colors"
              >
                Później
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={dismiss}
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-charcoal-700 hover:bg-cream-100 transition-colors"
            aria-label="Zamknij komunikat instalacji"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
