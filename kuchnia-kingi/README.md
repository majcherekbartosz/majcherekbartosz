# Kuchnia Kingi 🍽

Pamiętnik kulinarny – premium culinary cookbook web application.

## Uruchomienie (Getting Started)

### Wymagania (Requirements)
- [Node.js](https://nodejs.org/) **v18 lub nowszy**
- npm (dołączony do Node.js)

### Instalacja i uruchomienie

```bash
# 1. Przejdź do katalogu aplikacji
cd kuchnia-kingi

# 2. Zainstaluj zależności
npm install

# 3. Uruchom serwer deweloperski
npm run dev
```

Otwórz przeglądarkę i przejdź na adres: **http://localhost:5173**

### Budowanie wersji produkcyjnej

```bash
npm run build
npm run preview
```

## Funkcje

- **Galeria przepisów** – responsywna siatka z filtrowaniem po kategorii i wyszukiwaniem
- **Dodawanie/edycja przepisów** – formularz z dynamicznymi listami składników i kroków, obsługa zdjęć
- **Widok przepisu** – elegancki układ dwukolumnowy ze składnikami i krokami
- **Eksport do PDF** – generowanie profesjonalnego A4 z logiem i stopką "Z pamiętnika kulinarnego Kingi"
- **Trwałość danych** – przepisy zapisywane w localStorage

## Stack technologiczny

- React 19 + Vite 8
- Tailwind CSS 3
- Lucide React (ikony)
- html2pdf.js (generowanie PDF)
- Google Fonts: Playfair Display + Inter
