import { BookOpen, Camera } from 'lucide-react';

const CHECKOUT_URL = 'https://naffy.io/miejsce-na-twoj-link';

/*
 * ZDJĘCIE PROFILOWE AUTORKI:
 * Aby zmienić zdjęcie profilowe, zastąp poniższy URL swoim zdjęciem.
 * Możesz użyć:
 *   - URL z hostingu zdjęć (np. Unsplash, Cloudinary, Supabase Storage)
 *   - Ścieżki do pliku w katalogu public/ (np. '/profile-photo.jpg')
 *
 * Aby użyć pliku lokalnego:
 *   1. Umieść zdjęcie w katalogu kuchnia-kingi/public/ (np. public/profile-photo.jpg)
 *   2. Zmień PROFILE_PHOTO_URL na '/profile-photo.jpg'
 *
 * Zalecany rozmiar: minimum 400x400px, kwadratowe (zostanie przycięte do koła)
 */
const PROFILE_PHOTO_URL = null;

export default function AboutMe() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Profile photo - circular */}
      <div className="flex flex-col items-center mb-10 sm:mb-14">
        <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-cream-200 shadow-lg mb-4">
          {PROFILE_PHOTO_URL ? (
            <img
              src={PROFILE_PHOTO_URL}
              alt="Kinga — autorka Kuchni Kingi"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-cream-100 to-cream-200 flex items-center justify-center">
              <Camera size={36} className="text-terracotta-400" />
            </div>
          )}
        </div>
        <p className="text-xs text-terracotta-400 font-serif italic">
          Autorka Kuchni Kingi
        </p>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-start">
        {/* Left: Photo */}
        <div className="lg:col-span-2">
          <div className="sticky top-24">
            <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-lg border border-cream-200">
              <img
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"
                alt="Kinga w kuchni"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-center text-xs text-terracotta-400 mt-3 font-serif italic">
              Gotowanie to moja forma wyrażania miłości
            </p>
          </div>
        </div>

        {/* Right: Content */}
        <div className="lg:col-span-3">
          {/* Header accent */}
          <p className="text-sm font-medium text-terracotta-500 uppercase tracking-widest mb-3 font-sans">
            O autorce
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-charcoal-800 leading-tight mb-8">
            Poznajmy się
          </h1>

          {/* Content paragraphs */}
          <div className="space-y-6 text-gray-600 leading-relaxed text-base sm:text-lg">
            <p>
              Cześć! Jestem <strong className="text-charcoal-800">Kinga</strong> — 
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

            <div className="bg-cream-50 border-l-4 border-terracotta-500 rounded-r-2xl px-6 py-5 my-8">
              <p className="font-serif text-lg italic text-charcoal-700">
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
          <div className="mt-10 bg-gradient-to-br from-cream-50 to-cream-100 rounded-2xl p-6 sm:p-8 border border-cream-200">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="w-12 h-12 bg-cream-200 rounded-full flex items-center justify-center flex-shrink-0">
                <BookOpen size={22} className="text-terracotta-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-lg font-semibold text-charcoal-800 mb-1">
                  E-book z przepisami Kingi
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Kompletna kolekcja moich najlepszych przepisów w eleganckim formacie.
                </p>
                <a
                  href={CHECKOUT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 bg-terracotta-500 hover:bg-terracotta-600 text-white min-h-[44px]"
                >
                  <BookOpen size={15} />
                  Kup E-booka
                </a>
              </div>
            </div>
          </div>

          {/* Sign-off */}
          <div className="mt-14 pt-8 border-t border-cream-200">
            <p className="text-gray-600 leading-relaxed text-base mb-6">
              Dziękuję, że tu jesteś. Mam nadzieję, że moje przepisy przyniosą Ci tyle 
              radości, ile mi przynosi ich tworzenie. Do zobaczenia w kuchni!
            </p>
            <p className="font-serif text-3xl sm:text-4xl italic text-terracotta-500 mt-4">
              Kinga
            </p>
            <div className="w-16 h-0.5 bg-terracotta-500 mt-3 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
