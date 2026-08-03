// GOTOWY, ALE JESZCZE NIEUŻYWANY komponent "miejsce na reklamę".
// Dziś NIE wyświetla żadnej reklamy — służy do zarezerwowania miejsca na
// przyszłość, żeby później nie przerabiać układu strony.
//
// JAK UŻYĆ W PRZYSZŁOŚCI (gdy będziesz mieć konto AdSense i zgodę na reklamy):
//   1) wstaw <AdSlot /> w miejscu, gdzie ma być reklama
//      (np. w Dashboard między "Przepis Dnia" a "Nowe przepisy"),
//   2) reklamy pokazuj TYLKO po zgodzie użytkownika:
//        import { hasConsent } from './CookieConsent';
//        {hasConsent() && <AdSlot />}
//   3) w miejscu oznaczonym niżej wklej kod reklamy z AdSense.
//
// Na razie: w trybie developera pokazuje delikatną zaślepkę (żebyś widział,
// gdzie reklama się pojawi), a na produkcji nie pokazuje nic.

export default function AdSlot({ label = 'Miejsce na reklamę', className = '' }) {
  const isDev = import.meta.env?.DEV;

  // TODO (przyszłość): tutaj wstaw kod reklamy z AdSense, np. <ins className="adsbygoogle" .../>
  // i usuń poniższą zaślepkę.

  if (!isDev) return null; // na produkcji na razie nic nie pokazujemy

  return (
    <div
      className={`w-full rounded-xl border border-dashed border-outline-variant bg-surface-container/40 text-on-surface-variant text-body-sm flex items-center justify-center py-8 ${className}`}
      aria-hidden="true"
    >
      {label}
    </div>
  );
}
