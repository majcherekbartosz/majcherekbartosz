import { ClipboardList, Search, Unlock, CheckCircle } from 'lucide-react'

const steps = [
  {
    icon: ClipboardList,
    number: '01',
    title: 'Opisz swoją potrzebę',
    description: 'Wybierz strefę opieki i wypełnij krótki formularz z opisem zapotrzebowania.',
    color: 'text-teal-600 bg-teal-50',
  },
  {
    icon: Search,
    number: '02',
    title: 'Przejrzyj dopasowanych specjalistów',
    description: 'System wyświetla anonimowe profile z doświadczeniem, zasięgiem i ceną.',
    color: 'text-blue-600 bg-blue-50',
  },
  {
    icon: Unlock,
    number: '03',
    title: 'Odblokuj kontakt (49 zł)',
    description: 'Jednorazowa opłata za dostęp do numeru telefonu i e-maila wybranego specjalisty.',
    color: 'text-rose-600 bg-rose-50',
  },
  {
    icon: CheckCircle,
    number: '04',
    title: 'Umów wizytę bezpośrednio',
    description: 'Kontaktujesz się ze specjalistą i umawiasz wizytę domową według swoich potrzeb.',
    color: 'text-emerald-600 bg-emerald-50',
  },
]

export function HowItWorks() {
  return (
    <section id="jak-to-dziala" className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-teal-600 font-semibold text-sm uppercase tracking-wider mb-2">
            Prosty proces
          </p>
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Jak to działa?</h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Od potrzeby do kontaktu w kilka minut. Bez rejestracji, bez zobowiązań.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon
            return (
              <div key={idx} className="relative">
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-slate-100 z-0" />
                )}
                <div className="relative z-10 text-center">
                  <div
                    className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-4 ${step.color}`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>
                  <div className="text-xs font-bold text-slate-400 tracking-widest mb-1">
                    KROK {step.number}
                  </div>
                  <h3 className="font-bold text-slate-800 mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
