'use client'

import { useState } from 'react'
import { Shield, MapPin, Clock, Star, Phone, Mail, Lock, Unlock, CheckCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import type { DimCaregiver } from '@/lib/types/database'
import { PROFESSION_LABELS } from '@/lib/mock-data'

interface CaregiverCardProps {
  caregiver: DimCaregiver
  leadId?: string
}

const PROFESSION_COLORS: Record<string, string> = {
  fizjoterapeuta: 'bg-teal-100 text-teal-700 border-teal-200',
  pielegniarka: 'bg-blue-100 text-blue-700 border-blue-200',
  opiekunka_medyczna: 'bg-violet-100 text-violet-700 border-violet-200',
  polozna: 'bg-rose-100 text-rose-700 border-rose-200',
  ratownik_medyczny: 'bg-orange-100 text-orange-700 border-orange-200',
  dietetyk: 'bg-amber-100 text-amber-700 border-amber-200',
}

function BlurredText({ value }: { value: string }) {
  return (
    <span
      className="select-none blur-sm text-slate-400 text-sm font-mono tracking-wide"
      aria-hidden="true"
    >
      {value}
    </span>
  )
}

function InitialsAvatar({ name, color }: { name: string; color: string }) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const colors: Record<string, string> = {
    teal: 'bg-teal-100 text-teal-700',
    blue: 'bg-blue-100 text-blue-700',
    rose: 'bg-rose-100 text-rose-700',
    violet: 'bg-violet-100 text-violet-700',
    orange: 'bg-orange-100 text-orange-700',
    amber: 'bg-amber-100 text-amber-700',
  }

  const cls = colors[color] || 'bg-slate-100 text-slate-600'

  return (
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-xl ${cls}`}>
      {initials}
    </div>
  )
}

const PROF_AVATAR_COLOR: Record<string, string> = {
  fizjoterapeuta: 'teal',
  pielegniarka: 'blue',
  opiekunka_medyczna: 'violet',
  polozna: 'rose',
  ratownik_medyczny: 'orange',
  dietetyk: 'amber',
}

export function CaregiverCard({ caregiver, leadId }: CaregiverCardProps) {
  const [unlocked, setUnlocked] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleUnlock() {
    setLoading(true)
    // Simulate payment / API call (MVP: just toggle status)
    await new Promise((res) => setTimeout(res, 1000))
    setLoading(false)
    setUnlocked(true)
    // In production: call /api/unlocks with { leadId, caregiverId: caregiver.id }
  }

  const profColor = PROFESSION_COLORS[caregiver.profesja] || 'bg-slate-100 text-slate-600'
  const avatarColor = PROF_AVATAR_COLOR[caregiver.profesja] || 'slate'

  return (
    <Card className="group hover:shadow-md transition-shadow duration-200 border border-slate-200 bg-white rounded-2xl overflow-hidden">
      <CardContent className="p-5">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <InitialsAvatar name={caregiver.nazwa} color={avatarColor} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 className="font-bold text-slate-800 text-base leading-tight">{caregiver.nazwa}</h3>
              {caregiver.weryfikacja_pwz && (
                <span className="flex items-center gap-1 text-xs text-teal-700 bg-teal-50 border border-teal-200 rounded-full px-2 py-0.5 font-medium">
                  <Shield className="w-3 h-3" />
                  PWZ
                </span>
              )}
            </div>
            <Badge variant="outline" className={`text-xs font-medium ${profColor}`}>
              {PROFESSION_LABELS[caregiver.profesja] ?? caregiver.profesja}
            </Badge>
          </div>
          <div className="text-right shrink-0">
            <div className="text-lg font-extrabold text-slate-800">
              {caregiver.stawka_godzinowa} zł
            </div>
            <div className="text-xs text-slate-400">/godz.</div>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap gap-3 text-sm text-slate-500 mb-4">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            {caregiver.miasto}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            Dojazd do {caregiver.gotowosc_dojazdu} km
          </span>
          <span className="flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-amber-400" />
            {caregiver.lata_doswiadczenia} lat doświadczenia
          </span>
        </div>

        {/* Bio */}
        {caregiver.bio && (
          <p className="text-sm text-slate-600 leading-relaxed mb-5 line-clamp-2">{caregiver.bio}</p>
        )}

        {/* Contact section */}
        <div className="bg-slate-50 rounded-xl p-4 mb-4 border border-slate-100">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
            Dane kontaktowe
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-slate-400 shrink-0" />
              {unlocked && caregiver.telefon ? (
                <a
                  href={`tel:${caregiver.telefon}`}
                  className="text-teal-600 font-semibold hover:underline text-sm"
                >
                  {caregiver.telefon}
                </a>
              ) : (
                <BlurredText value="+48 5XX XXX XXX" />
              )}
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-slate-400 shrink-0" />
              {unlocked && caregiver.email ? (
                <a
                  href={`mailto:${caregiver.email}`}
                  className="text-teal-600 font-semibold hover:underline text-sm"
                >
                  {caregiver.email}
                </a>
              ) : (
                <BlurredText value="xxxxxxxx@example.com" />
              )}
            </div>
          </div>
        </div>

        {/* CTA Button */}
        {unlocked ? (
          <div className="flex items-center gap-2 justify-center py-2.5 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-200 text-sm font-semibold">
            <CheckCircle className="w-4 h-4" />
            Kontakt odblokowany
          </div>
        ) : (
          <Button
            onClick={handleUnlock}
            disabled={loading}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl py-2.5 h-auto gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Przetwarzanie...
              </>
            ) : (
              <>
                <Unlock className="w-4 h-4" />
                Odblokuj kontakt – 49 PLN
              </>
            )}
          </Button>
        )}

        {!unlocked && (
          <p className="text-xs text-slate-400 text-center mt-2">
            <Lock className="w-3 h-3 inline mr-1" />
            Jednorazowa płatność. Dane kontaktowe tylko Twoje.
          </p>
        )}
      </CardContent>
    </Card>
  )
}
