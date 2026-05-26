# MedMarket – Lokalny Marketplace Usług Medycznych z Dojazdem

MVP platformy łączącej pacjentów z weryfikowanymi specjalistami medycznymi (fizjoterapeuci, pielęgniarki, położne, ratownicy medyczni) oferującymi wizyty domowe. Opiera się na **modelu leadowym** – użytkownik płaci 49 zł za odblokowanie danych kontaktowych wybranego specjalisty.

---

## Stos technologiczny

| Warstwa | Technologia |
|---|---|
| Frontend | Next.js 16 (App Router), TypeScript, Tailwind CSS v4 |
| Komponenty UI | shadcn/ui (base-ui), Lucide Icons |
| Backend/API | Next.js API Routes |
| Baza danych | Supabase (PostgreSQL) – Star Schema |

---

## Architektura interfejsu – Trzy Strefy

| Strefa | Tytuł | Specjaliści |
|---|---|---|
| A | Senior i Rehabilitacja | Fizjoterapeuci, Opiekunki medyczne |
| B | Mama i Dziecko | Położne, Dietetycy perinatalni |
| C | Zdrowie i Interwencje | Pielęgniarki, Ratownicy medyczni |

---

## Schemat bazy danych (Star Schema)

```
Dim_Caregivers ──┐
                 ├── Fact_Unlocks
Fact_Leads ──────┘
    │
    └── Dim_Clients
```

### Tabele

- **`dim_caregivers`** – Specjaliści (profesja, weryfikacja PWZ, miasto, stawka, zasięg dojazdu)
- **`dim_clients`** – Klienci (miasto zlecenia, data rejestracji)
- **`fact_leads`** – Zgłoszenia zapotrzebowania (kategoria opieki, opis, status)
- **`fact_unlocks`** – Odblokowania kontaktów (lead_id, caregiver_id, kwota prowizji, status płatności)

Pliki migracji: `supabase/migrations/`

---

## Szybki start

### 1. Zainstaluj zależności

```bash
npm install
```

### 2. Skonfiguruj Supabase

```bash
cp .env.local.example .env.local
# Uzupełnij NEXT_PUBLIC_SUPABASE_URL i NEXT_PUBLIC_SUPABASE_ANON_KEY
```

### 3. Utwórz tabele w Supabase

W panelu Supabase > SQL Editor uruchom kolejno:
- `supabase/migrations/001_initial_schema.sql`
- `supabase/migrations/002_seed_data.sql`

### 4. Uruchom aplikację

```bash
npm run dev
```

Otwórz [http://localhost:3000](http://localhost:3000).

---

## Przepływ użytkownika

1. **Strona główna** → wybór strefy (Kafelki A / B / C)
2. **Strefa** → formularz zapotrzebowania (imię, miasto, opis, profesja, częstotliwość)
3. **Lista specjalistów** → anonimowe karty (zamazany telefon i e-mail)
4. **Karta specjalisty** → przycisk „Odblokuj kontakt – 49 PLN"
5. Po kliknięciu dane kontaktowe stają się widoczne (MVP: symulacja płatności)

---

## API Routes

| Endpoint | Metoda | Opis |
|---|---|---|
| `/api/leads` | POST | Tworzy klienta i lead w Supabase |
| `/api/unlocks` | POST | Zmienia status odblokowania na `oplacone` |

---

## Zmienne środowiskowe

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

---

## Struktura projektu

```
src/
├── app/
│   ├── page.tsx                    # Strona główna (Hero + Strefy + HowItWorks)
│   ├── strefa/[slug]/page.tsx      # Strona strefy (formularz → lista → odblokowanie)
│   └── api/
│       ├── leads/route.ts          # API: tworzenie leada
│       └── unlocks/route.ts        # API: odblokowanie kontaktu
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── zones/
│   │   ├── HeroSection.tsx
│   │   ├── ZoneTiles.tsx           # Kafelki 3 stref
│   │   ├── HowItWorks.tsx
│   │   └── RequestForm.tsx         # Formularz zapotrzebowania
│   └── caregivers/
│       └── CaregiverCard.tsx       # Karta specjalisty z blokadą kontaktu
└── lib/
    ├── supabase.ts                 # Klient Supabase
    ├── mock-data.ts                # Dane demo (12 specjalistów)
    └── types/
        └── database.ts            # Typy TypeScript (Star Schema)

supabase/
└── migrations/
    ├── 001_initial_schema.sql     # Schemat tabel + RLS
    └── 002_seed_data.sql          # Dane przykładowe
```
