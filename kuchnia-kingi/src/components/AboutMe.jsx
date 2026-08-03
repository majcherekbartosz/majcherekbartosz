import { BookOpen } from 'lucide-react';

const CHECKOUT_URL = 'https://naffy.io/miejsce-na-twoj-link';

/*
 * LINKI DO SOCIAL MEDIÓW:
 * Wpisz swoje prawdziwe adresy profili. Usuń te, których nie używasz,
 * albo dopisz kolejne (np. Pinterest). Kolejność = kolejność wyświetlania.
 */
const SOCIALS = [
  { name: 'Instagram', url: 'https://instagram.com/' },
  { name: 'TikTok', url: 'https://tiktok.com/' },
  { name: 'Facebook', url: 'https://facebook.com/' },
];

export default function AboutMe() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Social media links */}
      <div className="flex flex-col items-center gap-4 mb-10 sm:mb-14">
        <p className="label-caps text-tertiary">Obserwuj mnie</p>
        <div className="flex flex-wrap justify-center gap-2.5">
          {SOCIALS.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-full text-body-sm font-medium bg-surface-container-lowest text-on-surface-variant border border-outline-variant hover:border-tertiary hover:text-tertiary transition-all duration-200"
            >
              {s.name}
            </a>
          ))}
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-start">
        {/* Left: Photo */}
        <div className="lg:col-span-2">
          <div className="sticky top-24">
            <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-lg border border-outline-variant">
              <img
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"
                alt="Kinga w kuchni"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-center text-xs text-tertiary mt-3 font-serif italic">
              Gotowanie to moja forma wyrażania miłości
            </p>
          </div>
        </div>

        {/* Right: Content */}
        <div className="lg:col-span-3">
          {/* Header accent */}
          <p className="text-sm font-medium text-tertiary uppercase tracking-widest mb-3 font-sans">
            O autorce
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-on-surface leading-tight mb-8">
            Poznajmy się
          </h1>

          {/* Content paragraphs */}
          <div className="space-y-6 text-on-surface-variant leading-relaxed text-base sm:text-lg">
            <p>
              Cześć! Jestem <strong className="text-on-surface">Kinga</strong> — 
              kobieta, dla której kuchnia to nie tylko miejsce do gotowania, ale przestrzeń 
              pełna wspomnień, aromatów i emocji. Od kiedy pamiętam, gotowanie towarzyszyło mi 
              w najważniejszych momentach życia.
            </p>

            <p>
              Moja kulinarna podróż zaczęła się w dzieciństwie, w kuchni mojej babci, 
              gdzie powstawały najprostsze, ale jednocześnie najsmaczniejsze dania na świecie. 
              To tam nauczyłam się, że gotowanie to przede wszystkim miłość do ludzi, 
              z którymi dzielisz posiłek.
            </p>

            <div className="bg-tertiary-container border-l-4 border-tertiary rounded-r-2xl px-6 py-5 my-8">
              <p className="font-serif text-lg italic text-on-surface">
                „Każdy przepis opowiada historię. Moją historię — pełną pasji, 
                odkrywania nowych smaków i radości z dzielenia się nimi z innymi."
              </p>
            </div>

            <p>
              Dziś prowadzę tego bloga, aby dzielić się z Tobą moimi ulubionymi przepisami — 
              tymi sprawdzonymi rodzinnymi klasykami i nowymi odkryciami. Wierzę, że gotowanie 
              nie musi być skomplikowane, aby było wyjątkowe. Wystarczy kilka dobrych składników, 
              odrobina pasji i chęć do eksperymentowania.
            </p>

            <p>
              Znajdziesz tu przepisy na każdą okazję — od szybkich śniadań przez eleganckie 
              obiady po wyrafinowane desery. Każdy z nich jest przeze mnie wielokrotnie testowany, 
              by mieć pewność, że wyjdzie Ci idealnie za pierwszym razem.
            </p>

            <p>
              Jeśli chcesz mieć wszystkie moje przepisy zawsze pod ręką, zapraszam po 
              mojego e-booka — pięknie zaprojektowaną kolekcję, którą możesz czytać na 
              każdym urządzeniu.
            </p>
          </div>

          {/* E-book CTA */}
          <div className="mt-10 bg-surface-container-lowest/95 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-outline-variant shadow-card">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="w-12 h-12 bg-outline-variant rounded-full flex items-center justify-center flex-shrink-0">
                <BookOpen size={22} className="text-tertiary" />
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-lg font-semibold text-on-surface mb-1">
                  E-book z przepisami Kingi
                </h3>
                <p className="text-sm text-on-surface-variant mb-4">
                  Kompletna kolekcja moich najlepszych przepisów w eleganckim formacie.
                </p>
                <a
                  href={CHECKOUT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 bg-tertiary hover:bg-on-tertiary-container text-white min-h-[44px]"
                >
                  <BookOpen size={15} />
                  Kup E-booka
                </a>
              </div>
            </div>
          </div>

          {/* Sign-off */}
          <div className="mt-14 pt-8 border-t border-outline-variant">
            <p className="text-on-surface-variant leading-relaxed text-base mb-6">
              Dziękuję, że tu jesteś. Mam nadzieję, że moje przepisy przyniosą Ci tyle 
              radości, ile mi przynosi ich tworzenie. Do zobaczenia w kuchni!
            </p>
            <p className="font-serif text-3xl sm:text-4xl italic text-tertiary mt-4">
              Kinga
            </p>
            <div className="w-16 h-0.5 bg-tertiary mt-3 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
