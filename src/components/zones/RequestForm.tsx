'use client'

import { useState } from 'react'
import { Search, MapPin, User, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { CareCategoryType, ProfessionType } from '@/lib/types/database'

interface RequestFormProps {
  category: CareCategoryType
  onSubmit: (data: FormData) => void
  isLoading?: boolean
}

interface FormData {
  imie: string
  miasto: string
  opis: string
  profesja?: ProfessionType
  czestotliwosc?: string
}

const PROFESSION_OPTIONS: Record<CareCategoryType, { value: ProfessionType; label: string }[]> = {
  senior_i_rehabilitacja: [
    { value: 'fizjoterapeuta', label: 'Fizjoterapeuta' },
    { value: 'opiekunka_medyczna', label: 'Opiekunka medyczna' },
  ],
  mama_i_dziecko: [
    { value: 'polozna', label: 'Położna' },
    { value: 'dietetyk', label: 'Dietetyk perinatalny' },
  ],
  zdrowie_i_interwencje: [
    { value: 'pielegniarka', label: 'Pielęgniarka/Pielęgniarz' },
    { value: 'ratownik_medyczny', label: 'Ratownik medyczny' },
  ],
}

const FREQUENCY_OPTIONS = [
  { value: 'jednorazowo', label: 'Jednorazowo' },
  { value: '1_w_tyg', label: '1 raz w tygodniu' },
  { value: '2_w_tyg', label: '2 razy w tygodniu' },
  { value: '3_w_tyg', label: '3 razy w tygodniu' },
  { value: 'codziennie', label: 'Codziennie' },
  { value: 'okazjonalnie', label: 'Okazjonalnie / do ustalenia' },
]

const PLACEHOLDER_BY_CATEGORY: Record<CareCategoryType, string> = {
  senior_i_rehabilitacja:
    'Np. "Potrzebuję fizjoterapeuty dla taty (72 lata) po udarze. Rehabilitacja 3 razy w tygodniu. Mieszkamy w centrum Warszawy."',
  mama_i_dziecko:
    'Np. "Szukam położnej do wizyt domowych po porodzie. Dziecko ma 2 tygodnie, mam trudności z karmieniem piersią."',
  zdrowie_i_interwencje:
    'Np. "Potrzebuję pielęgniarki do regularnych zastrzyków insuliny dla mamy (cukrzyca typu 1). Codziennie rano."',
}

export function RequestForm({ category, onSubmit, isLoading }: RequestFormProps) {
  const [form, setForm] = useState<FormData>({
    imie: '',
    miasto: '',
    opis: '',
    profesja: undefined,
    czestotliwosc: '',
  })

  const profOptions = PROFESSION_OPTIONS[category]

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.imie || !form.miasto || !form.opis) return
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="imie" className="text-sm font-medium text-slate-700">
            <User className="w-3.5 h-3.5 inline mr-1.5 text-slate-400" />
            Imię kontaktowe
          </Label>
          <Input
            id="imie"
            placeholder="Np. Marek"
            value={form.imie}
            onChange={(e) => setForm({ ...form, imie: e.target.value })}
            required
            className="border-slate-200 focus:border-teal-400 focus:ring-teal-400"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="miasto" className="text-sm font-medium text-slate-700">
            <MapPin className="w-3.5 h-3.5 inline mr-1.5 text-slate-400" />
            Miasto / dzielnica
          </Label>
          <Input
            id="miasto"
            placeholder="Np. Warszawa, Mokotów"
            value={form.miasto}
            onChange={(e) => setForm({ ...form, miasto: e.target.value })}
            required
            className="border-slate-200 focus:border-teal-400 focus:ring-teal-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="text-sm font-medium text-slate-700">Rodzaj specjalisty</Label>
          <Select
            value={form.profesja}
            onValueChange={(val) => setForm({ ...form, profesja: val as ProfessionType })}
          >
            <SelectTrigger className="border-slate-200 focus:ring-teal-400">
              <SelectValue placeholder="Wybierz specjalizację" />
            </SelectTrigger>
            <SelectContent>
              {profOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label className="text-sm font-medium text-slate-700">Częstotliwość wizyt</Label>
          <Select
            value={form.czestotliwosc}
            onValueChange={(val) => setForm({ ...form, czestotliwosc: val ?? '' })}
          >
            <SelectTrigger className="border-slate-200 focus:ring-teal-400">
              <SelectValue placeholder="Jak często?" />
            </SelectTrigger>
            <SelectContent>
              {FREQUENCY_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="opis" className="text-sm font-medium text-slate-700">
          Opisz swoje zapotrzebowanie
          <span className="text-red-400 ml-0.5">*</span>
        </Label>
        <Textarea
          id="opis"
          placeholder={PLACEHOLDER_BY_CATEGORY[category]}
          value={form.opis}
          onChange={(e) => setForm({ ...form, opis: e.target.value })}
          required
          rows={4}
          className="border-slate-200 focus:border-teal-400 focus:ring-teal-400 resize-none"
        />
        <p className="text-xs text-slate-400">
          Im dokładniejszy opis, tym lepsze dopasowanie specjalistów.
        </p>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl py-3 h-auto gap-2 text-base"
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Szukamy dla Ciebie...
          </>
        ) : (
          <>
            <Search className="w-5 h-5" />
            Znajdź specjalistów
            <ChevronRight className="w-4 h-4" />
          </>
        )}
      </Button>
    </form>
  )
}
