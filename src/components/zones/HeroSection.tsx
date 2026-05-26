import { Shield, MapPin, Clock } from 'lucide-react'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-teal-600 via-teal-700 to-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-3xl">
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium">
              <Shield className="w-3.5 h-3.5 text-teal-300" />
              Specjaliści z weryfikacją PWZ
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium">
              <MapPin className="w-3.5 h-3.5 text-teal-300" />
              Wizyty domowe w całej Polsce
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium">
              <Clock className="w-3.5 h-3.5 text-teal-300" />
              Dostępni 7 dni w tygodniu
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            Specjalista medyczny
            <br />
            <span className="text-teal-300">przyjedzie do Ciebie</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-8 max-w-2xl">
            Znajdź fizjoterapeutę, pielęgniarkę, położną lub ratownika medycznego w swoim mieście.
            Anonimowe profile, weryfikowane kwalifikacje — odblokuj kontakt dopiero gdy wybierzesz
            odpowiednią osobę.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="#strefy"
              className="bg-white text-teal-700 font-bold px-8 py-3.5 rounded-xl hover:bg-teal-50 transition-colors shadow-lg"
            >
              Znajdź specjalistę
            </Link>
            <Link
              href="#jak-to-dziala"
              className="border border-white/40 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-colors"
            >
              Jak to działa?
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { value: '200+', label: 'Specjalistów' },
              { value: '12', label: 'Miast' },
              { value: '49 zł', label: 'Odblokowanie kontaktu' },
              { value: '4.9/5', label: 'Średnia ocen' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-extrabold text-white">{stat.value}</div>
                <div className="text-sm text-white/60 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
