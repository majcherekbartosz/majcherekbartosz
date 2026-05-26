import { Heart, Shield } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-slate-800 text-slate-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-teal-600 rounded-lg flex items-center justify-center">
                <Heart className="w-3.5 h-3.5 text-white fill-white" />
              </div>
              <span className="text-white font-bold text-lg">
                Med<span className="text-teal-400">Market</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Łączymy pacjentów z weryfikowanymi specjalistami medycznymi oferującymi wizyty domowe
              w całej Polsce.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Strefy opieki</h4>
            <ul className="space-y-1.5 text-sm">
              <li>Senior i Rehabilitacja</li>
              <li>Mama i Dziecko</li>
              <li>Zdrowie i Interwencje</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Kontakt</h4>
            <ul className="space-y-1.5 text-sm">
              <li>Tel: 800 100 200 (bezpłatna)</li>
              <li>kontakt@medmarket.pl</li>
              <li>Pon–Pt, 8:00–18:00</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p>© 2025 MedMarket. Wszelkie prawa zastrzeżone.</p>
          <div className="flex items-center gap-1.5 text-teal-400">
            <Shield className="w-3.5 h-3.5" />
            <span>Specjaliści weryfikowani przez PWZ</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
