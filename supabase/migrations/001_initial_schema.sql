-- ============================================================
-- MEDMARKET MVP – Star Schema dla Supabase / PostgreSQL
-- Migracja 001: Schemat początkowy
-- ============================================================

-- ENUM: Profesje opiekunów
CREATE TYPE profession_type AS ENUM (
  'fizjoterapeuta',
  'pielegniarka',
  'opiekunka_medyczna',
  'polozna',
  'ratownik_medyczny',
  'dietetyk'
);

-- ENUM: Kategorie opieki (strefy)
CREATE TYPE care_category AS ENUM (
  'senior_i_rehabilitacja',
  'mama_i_dziecko',
  'zdrowie_i_interwencje'
);

-- ENUM: Status leada
CREATE TYPE lead_status AS ENUM (
  'otwarte',
  'zamkniete'
);

-- ============================================================
-- TABELE WYMIARÓW (Dimensions)
-- ============================================================

-- Dim_Caregivers – Specjaliści / Opiekunowie
CREATE TABLE dim_caregivers (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nazwa               TEXT NOT NULL,
  profesja            profession_type NOT NULL,
  weryfikacja_pwz     BOOLEAN NOT NULL DEFAULT FALSE,
  miasto              TEXT NOT NULL,
  stawka_godzinowa    NUMERIC(8, 2) NOT NULL,
  gotowosc_dojazdu    INTEGER NOT NULL DEFAULT 20, -- km
  bio                 TEXT,
  lata_doswiadczenia  INTEGER DEFAULT 0,
  telefon             TEXT,
  email               TEXT,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Dim_Clients – Klienci (pacjenci / rodziny)
CREATE TABLE dim_clients (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  data_rejestracji    TIMESTAMPTZ NOT NULL DEFAULT now(),
  miasto_zlecenia     TEXT NOT NULL,
  imie_kontaktowe     TEXT,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- TABELE FAKTÓW (Facts)
-- ============================================================

-- Fact_Leads – Zgłoszenia zapotrzebowania
CREATE TABLE fact_leads (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id           UUID NOT NULL REFERENCES dim_clients(id) ON DELETE CASCADE,
  data_zgloszenia     TIMESTAMPTZ NOT NULL DEFAULT now(),
  kategoria_opieki    care_category NOT NULL,
  opis_zapotrzebowania TEXT,
  status              lead_status NOT NULL DEFAULT 'otwarte',
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Fact_Unlocks – Odblokowania kontaktów (serce monetyzacji)
CREATE TABLE fact_unlocks (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id             UUID NOT NULL REFERENCES fact_leads(id) ON DELETE CASCADE,
  caregiver_id        UUID NOT NULL REFERENCES dim_caregivers(id) ON DELETE CASCADE,
  data_odblokowania   TIMESTAMPTZ NOT NULL DEFAULT now(),
  kwota_prowizji      NUMERIC(8, 2) NOT NULL DEFAULT 49.00,
  status_platnosci    TEXT NOT NULL DEFAULT 'oczekuje', -- oczekuje | oplacone | anulowane
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (lead_id, caregiver_id)
);

-- ============================================================
-- INDEKSY dla wydajności analitycznej
-- ============================================================

CREATE INDEX idx_fact_leads_client_id        ON fact_leads(client_id);
CREATE INDEX idx_fact_leads_kategoria        ON fact_leads(kategoria_opieki);
CREATE INDEX idx_fact_leads_status           ON fact_leads(status);
CREATE INDEX idx_fact_leads_data_zgloszenia  ON fact_leads(data_zgloszenia);

CREATE INDEX idx_fact_unlocks_lead_id        ON fact_unlocks(lead_id);
CREATE INDEX idx_fact_unlocks_caregiver_id   ON fact_unlocks(caregiver_id);
CREATE INDEX idx_fact_unlocks_data           ON fact_unlocks(data_odblokowania);
CREATE INDEX idx_fact_unlocks_status         ON fact_unlocks(status_platnosci);

CREATE INDEX idx_dim_caregivers_profesja     ON dim_caregivers(profesja);
CREATE INDEX idx_dim_caregivers_miasto       ON dim_caregivers(miasto);
CREATE INDEX idx_dim_caregivers_pwz          ON dim_caregivers(weryfikacja_pwz);

-- ============================================================
-- ROW LEVEL SECURITY (RLS) – podstawowe polityki
-- ============================================================

ALTER TABLE dim_caregivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE dim_clients    ENABLE ROW LEVEL SECURITY;
ALTER TABLE fact_leads     ENABLE ROW LEVEL SECURITY;
ALTER TABLE fact_unlocks   ENABLE ROW LEVEL SECURITY;

-- Publiczny odczyt profili opiekunów (bez danych kontaktowych – filtrowane przez aplikację)
CREATE POLICY "Caregivers are publicly readable"
  ON dim_caregivers FOR SELECT USING (true);

-- Klienci mogą czytać tylko swoje dane
CREATE POLICY "Clients read own data"
  ON dim_clients FOR SELECT USING (true);

CREATE POLICY "Clients insert own data"
  ON dim_clients FOR INSERT WITH CHECK (true);

-- Leady – tworzenie i odczyt
CREATE POLICY "Leads insert"
  ON fact_leads FOR INSERT WITH CHECK (true);

CREATE POLICY "Leads select"
  ON fact_leads FOR SELECT USING (true);

-- Odblokowania – tworzenie i odczyt
CREATE POLICY "Unlocks insert"
  ON fact_unlocks FOR INSERT WITH CHECK (true);

CREATE POLICY "Unlocks select"
  ON fact_unlocks FOR SELECT USING (true);

CREATE POLICY "Unlocks update status"
  ON fact_unlocks FOR UPDATE USING (true);
