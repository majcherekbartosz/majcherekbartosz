import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/zones/HeroSection'
import { ZoneTiles } from '@/components/zones/ZoneTiles'
import { HowItWorks } from '@/components/zones/HowItWorks'
import { Shield, Award, Users } from 'lucide-react'

function TrustSection() {
  return (
    <section
      id="dla-specjalistow"
      className="bg-gradient-to-br from-slate-800 to-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-teal-400 font-semibold text-sm uppercase tracking-wider mb-3">
              Dla specjalistów
            </p>
            <h2 className="text-3xl font-bold mb-4">
              Dołącz do sieci zweryfikowanych specjalistów
            </h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              Jesteś fizjoterapeutą, pielęgniarką, położną lub ratownikiem medycznym? Zarejestruj
              się i zacznij otrzymywać zapytania od pacjentów w Twoim mieście.
            </p>
            <ul className="space-y-3">
              {[
                'Bezpłatna rejestracja profilu',
                'Pacjenci sami do Ciebie trafiają',
                'Kontrolujesz swój kalendarz i ceny',
                'Odznaka weryfikacji PWZ buduje zaufanie',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-slate-300">
                  <div className="w-5 h-5 rounded-full bg-teal-600 flex items-center justify-center shrink-0">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                icon: Shield,
                title: 'Weryfikacja PWZ',
                desc: 'Każdy specjalista przechodzi weryfikację uprawnień zawodowych.',
                color: 'text-teal-400',
              },
              {
                icon: Award,
                title: 'Certyfikaty i odznaki',
                desc: 'Dodatkowe kwalifikacje widoczne na profilu budują zaufanie.',
                color: 'text-amber-400',
              },
              {
                icon: Users,
                title: 'Model leadowy',
                desc: 'Pacjent płaci za kontakt – Ty nie ponosisz kosztów rejestracji.',
                color: 'text-blue-400',
              },
            ].map((item) => {
              const ItemIcon = item.icon
              return (
                <div
                  key={item.title}
                  className="bg-white/5 rounded-xl p-5 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <ItemIcon className={`w-6 h-6 mb-3 ${item.color}`} />
                  <h3 className="font-bold text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <ZoneTiles />
        <HowItWorks />
        <TrustSection />
      </main>
      <Footer />
    </div>
  )
}
