// TypeScript types mirroring the Supabase Star Schema

export type ProfessionType =
  | 'fizjoterapeuta'
  | 'pielegniarka'
  | 'opiekunka_medyczna'
  | 'polozna'
  | 'ratownik_medyczny'
  | 'dietetyk'

export type CareCategoryType =
  | 'senior_i_rehabilitacja'
  | 'mama_i_dziecko'
  | 'zdrowie_i_interwencje'

export type LeadStatus = 'otwarte' | 'zamkniete'
export type PaymentStatus = 'oczekuje' | 'oplacone' | 'anulowane'

export interface DimCaregiver {
  id: string
  nazwa: string
  profesja: ProfessionType
  weryfikacja_pwz: boolean
  miasto: string
  stawka_godzinowa: number
  gotowosc_dojazdu: number
  bio: string | null
  lata_doswiadczenia: number
  telefon: string | null
  email: string | null
  created_at: string
}

export interface DimClient {
  id: string
  data_rejestracji: string
  miasto_zlecenia: string
  imie_kontaktowe: string | null
  created_at: string
}

export interface FactLead {
  id: string
  client_id: string
  data_zgloszenia: string
  kategoria_opieki: CareCategoryType
  opis_zapotrzebowania: string | null
  status: LeadStatus
  created_at: string
}

export interface FactUnlock {
  id: string
  lead_id: string
  caregiver_id: string
  data_odblokowania: string
  kwota_prowizji: number
  status_platnosci: PaymentStatus
  created_at: string
}

// Database type for Supabase client
export type Database = {
  public: {
    Tables: {
      dim_caregivers: {
        Row: DimCaregiver
        Insert: Omit<DimCaregiver, 'id' | 'created_at'>
        Update: Partial<Omit<DimCaregiver, 'id' | 'created_at'>>
      }
      dim_clients: {
        Row: DimClient
        Insert: Omit<DimClient, 'id' | 'created_at' | 'data_rejestracji'>
        Update: Partial<Omit<DimClient, 'id' | 'created_at'>>
      }
      fact_leads: {
        Row: FactLead
        Insert: Omit<FactLead, 'id' | 'created_at' | 'data_zgloszenia'>
        Update: Partial<Omit<FactLead, 'id' | 'created_at'>>
      }
      fact_unlocks: {
        Row: FactUnlock
        Insert: Omit<FactUnlock, 'id' | 'created_at' | 'data_odblokowania'>
        Update: Partial<Omit<FactUnlock, 'id' | 'created_at'>>
      }
    }
  }
}
