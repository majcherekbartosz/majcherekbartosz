# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

**Kuchnia Kingi** (Kinga's Kitchen) is a client-side React SPA for managing recipes. All application code lives in the `kuchnia-kingi/` subdirectory.

**Data persistence:** By default (no `VITE_SUPABASE_*` env), recipes and related state use browser `localStorage` with `mockRecipes` as fallback. When `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set (see `kuchnia-kingi/.env.example`), the app uses hosted Supabase for recipes, auth, and comments, with `localStorage` fallback on fetch errors.

**Node:** Use Node.js **≥ 20.19** (see `kuchnia-kingi/.nvmrc` and `package.json` `engines`).

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

- The `main` branch contains only a bare `README.md`. All application code is on feature branches.
- When working on this project, ensure you are on an application branch or a branch created from one.

### Caveats

- `npm run lint` currently passes cleanly. Previous versions had pre-existing errors in `RecipeDetail.jsx` that have since been resolved.
- The app uses `localStorage` key `kuchnia-kingi-recipes` for recipe persistence when Supabase is not configured. Clearing browser storage resets to `mockRecipes` defaults.
- **Adding/editing recipes via the header** requires admin login when Supabase auth is enabled (`Admin` → sign in). Without Supabase, the gallery still loads mock recipes; use the empty-gallery CTA or admin flows as implemented in `Header.jsx` / `Dashboard.jsx`.
- **PWA / service worker** only registers in production (`npm run build` + `npm run preview`), not in `npm run dev`.
- Cloud VMs may inject `VITE_SUPABASE_*` secrets automatically; to test localStorage-only behavior locally, start dev with those variables unset: `env -u VITE_SUPABASE_URL -u VITE_SUPABASE_ANON_KEY npm run dev -- --host 0.0.0.0`.
