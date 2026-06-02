# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

**Kuchnia Kingi** (Kinga's Kitchen) is a client-side React SPA for managing recipes. All application code lives in the `kuchnia-kingi/` subdirectory. By default there is no backend: data persists in browser `localStorage`. **Optional:** hosted Supabase when `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set (see `kuchnia-kingi/.env.example`); SQL schemas are in `kuchnia-kingi/supabase/` for manual setup in the Supabase dashboard (no local Supabase process in-repo).

### Running the app

```bash
cd kuchnia-kingi
npm run dev -- --host 0.0.0.0   # Vite dev server on http://localhost:5173
```

### Available scripts (from `kuchnia-kingi/package.json`)

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start Vite dev server (port 5173) |
| `npm run build` | Production build (outputs to `dist/`) |
| `npm run lint` | ESLint check |
| `npm run preview` | Preview production build |

### Tech stack

- React 19, Vite 8, Tailwind CSS 3.4, ESLint 10
- Node.js **>=20.19.0** (`kuchnia-kingi/package.json` engines; `.nvmrc` is `20`)
- No test framework configured — validation is manual/visual
- No Docker, no CI/CD; only the Vite dev (or preview) server must run locally
- Package manager: npm (uses `package-lock.json`)

### Branch notes

- The `main` branch contains only a bare `README.md`. All application code is on feature branches.
- When working on this project, ensure you are on an application branch or a branch created from one.

### Caveats

- `npm run lint` currently passes cleanly. Previous versions had pre-existing errors in `RecipeDetail.jsx` that have since been resolved.
- The app uses `localStorage` key `kuchnia-kingi-recipes` for recipe persistence. Clearing browser storage resets all data to mock defaults.
- **Recipe creation in the UI:** when the gallery already has recipes, **Nowy przepis** is only in the Admin menu and requires Supabase admin login (`isAdmin`). Without credentials, use browse/detail/favorites/shopping-list flows for manual E2E, or clear `localStorage` to get the empty-state **Dodaj pierwszy przepis** button.
- **PWA / service worker / offline:** the service worker registers only in production builds (`src/main.jsx`). Test with `npm run build` then `npm run preview` (not `npm run dev`).
