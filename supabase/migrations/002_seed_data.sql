-- ============================================================
-- MEDMARKET MVP – Dane przykładowe (seed)
-- Migracja 002: Specjaliści testowi
-- ============================================================

-- Specjaliści – Strefa A: Senior i Rehabilitacja
INSERT INTO dim_caregivers (nazwa, profesja, weryfikacja_pwz, miasto, stawka_godzinowa, gotowosc_dojazdu, bio, lata_doswiadczenia, telefon, email) VALUES
  ('Anna Kowalska',    'fizjoterapeuta',     TRUE,  'Warszawa',   120.00, 25, 'Specjalistka rehabilitacji poudarowej i geriatrycznej. Certyfikat NDT-Bobath.', 8,  '+48 501 100 001', 'a.kowalska@example.com'),
  ('Marek Wiśniewski', 'fizjoterapeuta',     TRUE,  'Kraków',      110.00, 30, 'Doświadczenie w rehabilitacji ortopedycznej i neurologicznej seniorów.', 12, '+48 501 100 002', 'm.wisniewski@example.com'),
  ('Beata Nowak',      'opiekunka_medyczna', FALSE, 'Warszawa',    65.00,  15, 'Opieka całodobowa i dzienna nad osobami starszymi i po operacjach.', 5,  '+48 501 100 003', 'b.nowak@example.com'),
  ('Zofia Adamczyk',   'opiekunka_medyczna', TRUE,  'Wrocław',     75.00,  20, 'Certyfikowana opiekunka osób starszych. Doświadczenie w chorobach neurodegeneracyjnych.', 9, '+48 501 100 004', 'z.adamczyk@example.com');

-- Specjaliści – Strefa B: Mama i Dziecko
INSERT INTO dim_caregivers (nazwa, profesja, weryfikacja_pwz, miasto, stawka_godzinowa, gotowosc_dojazdu, bio, lata_doswiadczenia, telefon, email) VALUES
  ('Katarzyna Lewandowska', 'polozna',     TRUE,  'Warszawa', 150.00, 20, 'Położna środowiskowa. Wizyty w domu, nauka karmienia piersią, opieka nad noworodkiem.', 10, '+48 501 200 001', 'k.lewandowska@example.com'),
  ('Monika Zielińska',      'polozna',     TRUE,  'Gdańsk',   140.00, 25, 'Specjalistka opieki okołoporodowej. Szkoła rodzenia online i stacjonarnie.', 7,  '+48 501 200 002', 'm.zielinska@example.com'),
  ('Ewa Piotrowska',        'dietetyk',    FALSE, 'Kraków',   100.00, 15, 'Dietetyk perinatalny. Diety ciążowe, laktacyjne i dla niemowląt.', 4,  '+48 501 200 003', 'e.piotrowska@example.com'),
  ('Agnieszka Kamińska',    'dietetyk',    TRUE,  'Poznań',   110.00, 20, 'Certyfikat dietetyki klinicznej. Specjalizacja: alergie u dzieci, karmienie piersią.', 6, '+48 501 200 004', 'a.kaminska@example.com');

-- Specjaliści – Strefa C: Zdrowie i Interwencje
INSERT INTO dim_caregivers (nazwa, profesja, weryfikacja_pwz, miasto, stawka_godzinowa, gotowosc_dojazdu, bio, lata_doswiadczenia, telefon, email) VALUES
  ('Tomasz Jankowski',  'pielegniarka',      TRUE,  'Warszawa', 90.00,  30, 'Pielęgniarz opieki domowej. Iniekcje, opatrunki, pobieranie krwi, monitorowanie.', 11, '+48 501 300 001', 't.jankowski@example.com'),
  ('Sylwia Wróbel',     'pielegniarka',      TRUE,  'Łódź',     85.00,  25, 'Specjalistka pielęgniarstwa internistycznego. Opieka nad chorymi przewlekle.', 8,  '+48 501 300 002', 's.wrobel@example.com'),
  ('Rafał Mazur',       'ratownik_medyczny', TRUE,  'Warszawa', 130.00, 40, 'Ratownik medyczny z doświadczeniem w SOR. Szkolenia pierwszej pomocy.', 6,  '+48 501 300 003', 'r.mazur@example.com'),
  ('Paweł Krawczyk',    'ratownik_medyczny', TRUE,  'Wrocław',  120.00, 35, 'Certyfikowany ratownik. Wizyty interwencyjne i profilaktyczne w domu.', 9,  '+48 501 300 004', 'p.krawczyk@example.com');
