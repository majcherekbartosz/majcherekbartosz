// SZABLON DO UZUPEŁNIENIA — przed publikacją wypełnij pola w [nawiasach]
// i zweryfikuj treść (najlepiej z kimś znającym RODO). Gdy dodasz
// statystyki lub reklamy, wróć tu i rozbuduj sekcje "Cookies" i "Odbiorcy".

export default function PrivacyPolicy() {
  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-6 md:py-10 pb-24 md:pb-10">
      <div className="max-w-3xl">
        <span className="label-caps text-tertiary">Informacje</span>
        <h1 className="font-serif text-headline-lg-mobile md:text-headline-lg text-on-surface mb-2 mt-1">
          Polityka prywatności
        </h1>
        <p className="text-body-sm text-on-surface-variant mb-8">
          Ostatnia aktualizacja: [DATA]
        </p>

        <div className="space-y-8 text-body-md text-on-surface leading-relaxed">
          <section>
            <h2 className="font-serif text-headline-md text-on-surface mb-2">1. Administrator danych</h2>
            <p className="text-on-surface-variant">
              Administratorem danych jest [Imię i nazwisko / nazwa]. W sprawach dotyczących
              prywatności możesz się skontaktować pod adresem: [adres e-mail].
            </p>
          </section>

          <section>
            <h2 className="font-serif text-headline-md text-on-surface mb-2">2. Jakie dane przetwarzamy</h2>
            <p className="text-on-surface-variant mb-2">
              Staramy się zbierać jak najmniej danych. W praktyce są to:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-on-surface-variant">
              <li>
                <strong className="text-on-surface font-medium">Dane logowania administratora</strong> — adres e-mail
                używany do logowania do panelu zarządzania przepisami. Dotyczy wyłącznie właściciela strony.
              </li>
              <li>
                <strong className="text-on-surface font-medium">Dane zapisywane lokalnie w Twojej przeglądarce</strong> —
                ulubione przepisy, lista zakupów i oceny. Te dane pozostają na Twoim urządzeniu (pamięć lokalna
                przeglądarki) i nie są wysyłane na serwer.
              </li>
              <li>
                <strong className="text-on-surface font-medium">Podstawowe dane techniczne</strong> niezbędne do
                wyświetlenia strony (obsługiwane przez dostawcę hostingu).
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-headline-md text-on-surface mb-2">3. Pliki cookie i pamięć lokalna</h2>
            <p className="text-on-surface-variant">
              Obecnie aplikacja korzysta wyłącznie z pamięci lokalnej niezbędnej do jej działania
              (zapamiętanie ulubionych i listy zakupów). Nie używamy plików cookie do śledzenia ani
              do reklam. Jeśli w przyszłości dodamy statystyki odwiedzin lub reklamy, poprosimy Cię
              wcześniej o zgodę osobnym komunikatem i zaktualizujemy tę politykę.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-headline-md text-on-surface mb-2">4. Cele i podstawa przetwarzania</h2>
            <p className="text-on-surface-variant">
              Dane przetwarzamy w celu świadczenia usługi (przeglądanie i zapisywanie przepisów, lista
              zakupów) oraz obsługi panelu administratora. Podstawą jest niezbędność do świadczenia usługi
              oraz — w zakresie panelu administratora — nasz uzasadniony interes. [Uzupełnij, jeśli dojdą
              inne cele, np. statystyki lub reklamy.]
            </p>
          </section>

          <section>
            <h2 className="font-serif text-headline-md text-on-surface mb-2">5. Komu powierzamy dane</h2>
            <p className="text-on-surface-variant">
              W działaniu strony pomagają nam zaufani dostawcy usług: [hosting — np. Vercel] oraz
              [baza danych i logowanie — np. Supabase]. Przetwarzają oni dane wyłącznie w naszym imieniu.
              [Sprawdź i uzupełnij, czy dane mogą być przetwarzane poza Europejskim Obszarem Gospodarczym
              i na jakiej podstawie.]
            </p>
          </section>

          <section>
            <h2 className="font-serif text-headline-md text-on-surface mb-2">6. Jak długo przechowujemy dane</h2>
            <p className="text-on-surface-variant">
              Dane zapisane lokalnie w przeglądarce przechowujesz Ty — możesz je w każdej chwili usunąć,
              czyszcząc dane strony w przeglądarce. Dane administratora przechowujemy przez czas
              korzystania z panelu. [Uzupełnij szczegóły, jeśli potrzeba.]
            </p>
          </section>

          <section>
            <h2 className="font-serif text-headline-md text-on-surface mb-2">7. Twoje prawa</h2>
            <p className="text-on-surface-variant">
              Masz prawo dostępu do swoich danych, ich sprostowania, usunięcia, ograniczenia przetwarzania,
              sprzeciwu oraz przenoszenia danych. Przysługuje Ci również prawo wniesienia skargi do Prezesa
              Urzędu Ochrony Danych Osobowych (PUODO). Aby skorzystać z tych praw, napisz na: [adres e-mail].
            </p>
          </section>

          <section>
            <h2 className="font-serif text-headline-md text-on-surface mb-2">8. Zmiany polityki</h2>
            <p className="text-on-surface-variant">
              Tę politykę możemy aktualizować — np. gdy dodamy nowe funkcje. Aktualną wersję zawsze
              znajdziesz na tej stronie, wraz z datą ostatniej aktualizacji.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-headline-md text-on-surface mb-2">9. Kontakt</h2>
            <p className="text-on-surface-variant">
              W sprawach dotyczących prywatności napisz na: [adres e-mail].
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
