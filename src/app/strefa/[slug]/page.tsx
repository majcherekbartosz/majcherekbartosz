'use client'

import { useState, use } from 'react'
import Link from 'next/link'
import { ArrowLeft, Users, Baby, Activity, CheckCircle } from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { RequestForm } from '@/components/zones/RequestForm'
import { CaregiverCard } from '@/components/caregivers/CaregiverCard'
import { CAREGIVERS_BY_CATEGORY } from '@/lib/mock-data'
import type { CareCategoryType, DimCaregiver } from '@/lib/types/database'

const ZONE_CONFIG: Record<
  string,
  {
    category: CareCategoryType
    label: string
    title: string
    subtitle: string
    icon: React.ComponentType<{ className?: string }>
    gradient: string
    accentColor: string
  }
> = {
  'senior-i-rehabilitacja': {
    category: 'senior_i_rehabilitacja',
    label: 'Strefa A',
    title: 'Senior i Rehabilitacja',
    subtitle: 'Fizjoterapeuci i opiekunki medyczne z dojazdem',
    icon: Users,
    gradient: 'from-teal-600 to-teal-800',
    accentColor: 'text-teal-600',
  },
  'mama-i-dziecko': {
    category: 'mama_i_dziecko',
    label: 'Strefa B',
    title: 'Mama i Dziecko',
    subtitle: 'Położne i dietetycy perinatalni z dojazdem',
    icon: Baby,
    gradient: 'from-rose-500 to-rose-700',
    accentColor: 'text-rose-600',
  },
  'zdrowie-i-interwencje': {
    category: 'zdrowie_i_interwencje',
    label: 'Strefa C',
    title: 'Zdrowie i Interwencje',
    subtitle: 'Pielęgniarki i ratownicy medyczni z dojazdem',
    icon: Activity,
    gradient: 'from-blue-600 to-blue-800',
    accentColor: 'text-blue-600',
  },
}

type Step = 'form' | 'results'

interface LeadData {
  imie: string
  miasto: string
  opis: string
  profesja?: string
  czestotliwosc?: string
}

export default function ZonePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const config = ZONE_CONFIG[slug]

  const [step, setStep] = useState<Step>('form')
  const [leadData, setLeadData] = useState<LeadData | null>(null)
  const [results, setResults] = useState<DimCaregiver[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [leadId, setLeadId] = useState<string>('')

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Nie znaleziono strefy</h1>
          <Link href="/" className="text-teal-600 hover:underline">
            Wróć na stronę główną
          </Link>
        </div>
      </div>
    )
  }

  const Icon = config.icon

  async function handleFormSubmit(data: LeadData) {
    setIsLoading(true)
    setLeadData(data)

    // Simulate API call / Supabase insert
    await new Promise((res) => setTimeout(res, 1200))

    const caregivers = CAREGIVERS_BY_CATEGORY[config.category]
    const filtered = data.profesja
      ? caregivers.filter((c) => c.profesja === data.profesja)
      : caregivers

    setLeadId(`lead_${Date.now()}`)
    setResults(filtered.length > 0 ? filtered : caregivers)
    setIsLoading(false)
    setStep('results')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Zone Header */}
      <div className={`bg-gradient-to-r ${config.gradient} text-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Wróć do stref
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Icon className="w-5 h-5" />
            </div>
            <span className="text-sm font-semibold bg-white/20 rounded-full px-3 py-1">
              {config.label}
            </span>
          </div>
          <h1 className="text-3xl font-extrabold mb-1">{config.title}</h1>
          <p className="text-white/75">{config.subtitle}</p>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm">
            <div className={`flex items-center gap-1.5 font-semibold ${step === 'form' ? config.accentColor : 'text-emerald-600'}`}>
              {step === 'results' ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white bg-teal-600`}>
                  1
                </span>
              )}
              Opisz zapotrzebowanie
            </div>
            <div className="w-8 h-0.5 bg-slate-200 rounded" />
            <div className={`flex items-center gap-1.5 font-semibold ${step === 'results' ? config.accentColor : 'text-slate-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${step === 'results' ? 'text-white bg-teal-600' : 'text-slate-400 bg-slate-100'}`}>
                2
              </span>
              Przeglądaj specjalistów
            </div>
            <div className="w-8 h-0.5 bg-slate-200 rounded" />
            <div className="flex items-center gap-1.5 font-semibold text-slate-400">
              <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-400">
                3
              </span>
              Odblokuj kontakt
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {step === 'form' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
              <h2 className="text-xl font-bold text-slate-800 mb-1">
                Opisz swoje zapotrzebowanie
              </h2>
              <p className="text-sm text-slate-500 mb-6">
                Na podstawie opisu dopasujemy dla Ciebie najlepszych specjalistów z okolicy.
              </p>
              <RequestForm
                category={config.category}
                onSubmit={handleFormSubmit}
                isLoading={isLoading}
              />
            </div>
          </div>
        )}

        {step === 'results' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Dopasowani specjaliści ({results.length})
                </h2>
                {leadData && (
                  <p className="text-sm text-slate-500 mt-0.5">
                    Dla: <strong>{leadData.imie}</strong> · {leadData.miasto}
                  </p>
                )}
              </div>
              <button
                onClick={() => setStep('form')}
                className="text-sm text-slate-500 hover:text-teal-600 transition-colors flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                Zmień opis
              </button>
            </div>

            {leadData?.opis && (
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6 text-sm text-blue-800">
                <span className="font-semibold">Twoje zapotrzebowanie:</span>{' '}
                {leadData.opis}
              </div>
            )}

            {results.length === 0 ? (
              <div className="text-center py-16 text-slate-400">
                <p className="text-lg font-semibold mb-2">Brak wyników</p>
                <p className="text-sm">Spróbuj zmienić kryteria wyszukiwania.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {results.map((caregiver) => (
                  <CaregiverCard key={caregiver.id} caregiver={caregiver} leadId={leadId} />
                ))}
              </div>
            )}

            <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800 flex items-start gap-2">
              <span className="font-semibold shrink-0">💡 Wskazówka:</span>
              <span>
                Dane kontaktowe specjalisty są ukryte do momentu opłacenia dostępu (49 zł).
                Płatność jednorazowa, bez abonamentów.
              </span>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
