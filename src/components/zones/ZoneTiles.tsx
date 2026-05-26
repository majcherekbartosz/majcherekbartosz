'use client'

import Link from 'next/link'
import { Users, Baby, Activity, ArrowRight, Shield } from 'lucide-react'

const zones = [
  {
    id: 'senior_i_rehabilitacja',
    slug: 'senior-i-rehabilitacja',
    label: 'Strefa A',
    title: 'Senior i Rehabilitacja',
    subtitle: 'Opiekunki medyczne, Fizjoterapeuci',
    description:
      'Profesjonalna rehabilitacja i opieka domowa dla seniorów oraz osób po urazach. Fizjoterapeuci z certyfikatami, opiekunki z doświadczeniem w geriatrii.',
    icon: Users,
    color: 'teal',
    gradient: 'from-teal-500 to-teal-700',
    lightBg: 'bg-teal-50',
    border: 'border-teal-200 hover:border-teal-400',
    iconBg: 'bg-teal-100 text-teal-700',
    badgeBg: 'bg-teal-100 text-teal-700',
    ctaColor: 'bg-teal-600 hover:bg-teal-700',
    services: ['Fizjoterapia po udarze', 'Rehabilitacja ortopedyczna', 'Opieka przy Alzheimer'],
  },
  {
    id: 'mama_i_dziecko',
    slug: 'mama-i-dziecko',
    label: 'Strefa B',
    title: 'Mama i Dziecko',
    subtitle: 'Położne, Opieka okołoporodowa, Dietetycy',
    description:
      'Wsparcie dla mam i noworodków w domu. Położne środowiskowe, pomoc w karmieniu piersią, dieta ciążowa i laktacyjna.',
    icon: Baby,
    color: 'rose',
    gradient: 'from-rose-400 to-rose-600',
    lightBg: 'bg-rose-50',
    border: 'border-rose-200 hover:border-rose-400',
    iconBg: 'bg-rose-100 text-rose-700',
    badgeBg: 'bg-rose-100 text-rose-700',
    ctaColor: 'bg-rose-500 hover:bg-rose-600',
    services: ['Wizyty położnej domowej', 'Nauka karmienia piersią', 'Dieta perinatalna'],
  },
  {
    id: 'zdrowie_i_interwencje',
    slug: 'zdrowie-i-interwencje',
    label: 'Strefa C',
    title: 'Zdrowie i Interwencje',
    subtitle: 'Pielęgniarki, Ratownicy medyczni',
    description:
      'Szybka pomoc medyczna w domu. Iniekcje, opatrunki, pobieranie krwi, EKG. Ratownicy medyczni i pielęgniarki domowe.',
    icon: Activity,
    color: 'blue',
    gradient: 'from-blue-500 to-blue-700',
    lightBg: 'bg-blue-50',
    border: 'border-blue-200 hover:border-blue-400',
    iconBg: 'bg-blue-100 text-blue-700',
    badgeBg: 'bg-blue-100 text-blue-700',
    ctaColor: 'bg-blue-600 hover:bg-blue-700',
    services: ['Iniekcje i opatrunki', 'Pobieranie krwi w domu', 'EKG i monitorowanie'],
  },
]

export function ZoneTiles() {
  return (
    <section id="strefy" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <p className="text-teal-600 font-semibold text-sm uppercase tracking-wider mb-2">
          Wybierz swoją potrzebę
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
          Trzy strefy opieki medycznej
        </h2>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg">
          Dopasuj specjalistę do swojej sytuacji. Każda strefa oferuje weryfikowanych
          profesjonalistów gotowych do wizyty w domu.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {zones.map((zone) => {
          const Icon = zone.icon
          return (
            <div
              key={zone.id}
              className={`group bg-white rounded-2xl border-2 ${zone.border} p-6 flex flex-col transition-all duration-200 hover:shadow-lg cursor-pointer`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${zone.iconBg}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${zone.badgeBg}`}>
                  {zone.label}
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-800 mb-1">{zone.title}</h3>
              <p className="text-sm text-slate-500 mb-4">{zone.subtitle}</p>
              <p className="text-slate-600 text-sm leading-relaxed mb-5 flex-1">
                {zone.description}
              </p>

              <ul className="space-y-1.5 mb-6">
                {zone.services.map((service) => (
                  <li key={service} className="flex items-center gap-2 text-sm text-slate-500">
                    <div className={`w-1.5 h-1.5 rounded-full bg-current ${zone.iconBg} opacity-70`} />
                    {service}
                  </li>
                ))}
              </ul>

              <Link
                href={`/strefa/${zone.slug}`}
                className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-white font-semibold text-sm transition-colors ${zone.ctaColor}`}
              >
                Znajdź specjalistę
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export { zones }
