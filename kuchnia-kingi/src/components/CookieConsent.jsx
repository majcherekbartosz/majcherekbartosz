// GOTOWY, ALE JESZCZE NIEPODŁĄCZONY mechanizm zgody na cookies.
// Na razie NIE dodawaj <CookieConsent /> do App.jsx — nie masz jeszcze
// żadnych cookies do śledzenia, więc baner tylko przeszkadzałby użytkownikom.
// Podłącz go dopiero, gdy dodasz statystyki lub reklamy. Wtedy:
//   1) w App.jsx zaimportuj i wstaw <CookieConsent /> (obok <PwaInstallBanner />),
//   2) skrypty statystyk/reklam odpalaj tylko, gdy hasConsent() === true.
//
// UWAGA: reklamy spersonalizowane w UE i tak wymagają certyfikowanego CMP
// (osobne narzędzie z kontem). Ten baner to prosta zgoda "podstawowa" —
// dobra na start i pod własne statystyki, ale nie zastępuje CMP pod AdSense.

import { useState, useEffect } from 'react';
import { Cookie } from 'lucide-react';

const CONSENT_KEY = 'kk-cookie-consent'; // 'accepted' | 'rejected'

// --- Pomocnicze funkcje (do użycia w przyszłości przez skrypty statystyk/reklam) ---
export function getConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY); // 'accepted' | 'rejected' | null
  } catch {
    return null;
  }
}

export function hasConsent() {
  return getConsent() === 'accepted';
}

export function setConsent(value) {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* pusta obsługa — brak localStorage nie może wywalić aplikacji */
  }
  // Powiadom aplikację, że zgoda się zmieniła (np. by odpalić statystyki).
  window.dispatchEvent(new CustomEvent('kk-consent-change', { detail: value }));
}

// Wywołaj z linku "Ustawienia cookies" (np. w stopce), by baner pojawił się ponownie.
export function openCookieSettings() {
  try {
    localStorage.removeItem(CONSENT_KEY);
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new CustomEvent('kk-consent-reopen'));
}

// --- Baner ---
export default function CookieConsent({ onOpenPolicy }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Pokaż baner tylko, gdy użytkownik jeszcze nie dokonał wyboru.
    if (!getConsent()) setVisible(true);
    const reopen = () => setVisible(true);
    window.addEventListener('kk-consent-reopen', reopen);
    return () => window.removeEventListener('kk-consent-reopen', reopen);
  }, []);

  if (!visible) return null;

  const choose = (value) => {
    setConsent(value);
    setVisible(false);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 pointer-events-none">
      <div className="pointer-events-auto mx-auto max-w-2xl rounded-2xl border border-outline-variant bg-surface-container-lowest/95 backdrop-blur-md shadow-card-hover p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-tertiary-container flex items-center justify-center">
            <Cookie size={20} className="text-tertiary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-body-sm text-on-surface leading-relaxed">
              Używamy pamięci przeglądarki, aby aplikacja działała (np. ulubione i lista zakupów).
              Chcesz zgodzić się także na cookies wspierające statystyki i rozwój aplikacji?{' '}
              {onOpenPolicy && (
                <button
                  onClick={onOpenPolicy}
                  className="text-tertiary hover:text-on-tertiary-container underline underline-offset-2"
                >
                  Polityka prywatności
                </button>
              )}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                onClick={() => choose('accepted')}
                className="btn-primary text-body-sm px-5 py-2"
              >
                Akceptuję
              </button>
              <button
                onClick={() => choose('rejected')}
                className="text-body-sm font-medium px-5 py-2 rounded-full border border-outline-variant text-on-surface hover:bg-surface-container transition-colors"
              >
                Tylko niezbędne
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
