# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

**Kuchnia Kingi** (Kinga's Kitchen) is a client-side React SPA for managing recipes. All application code lives in the `kuchnia-kingi/` subdirectory. There is no local backend; recipes, favorites, shopping lists, and analytics persist in browser `localStorage`. Optional **Supabase** (hosted) enables admin login, cloud recipe sync, and comments — copy `kuchnia-kingi/.env.example` to `.env` and set `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` only when testing those features.

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
- No test framework configured — validation is manual/visual
- No Docker, no CI/CD, no backend services needed
- Package manager: npm (uses `package-lock.json`)

### Branch notes

- The full app under `kuchnia-kingi/` is on `main` (merged from feature branches). Older remote `cursor/*` branches may still exist but are not required to run the app.

### Caveats

- Node.js **≥ 20.19.0** (see `kuchnia-kingi/package.json` `engines` and `.nvmrc`).
- `npm run lint` currently passes cleanly.
- The app uses `localStorage` key `kuchnia-kingi-recipes` for recipe persistence. Clearing browser storage resets all data to mock defaults.
- **Adding/editing recipes** (`Nowy przepis`) is in the Admin dropdown and requires a signed-in Supabase admin user. Without Supabase env vars, use browse/search, recipe detail, favorites, and shopping-list flows for manual E2E.
- `npm run preview` serves the production build on port **4173** by default (after `npm run build`).
