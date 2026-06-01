# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

**Kuchnia Kingi** (Kinga's Kitchen) is a client-side React SPA for managing recipes. All application code lives in the `kuchnia-kingi/` subdirectory. By default there is no backend: data persists in browser `localStorage`. Optionally, set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (see `kuchnia-kingi/.env.example`) to sync recipes, admin auth, and comments via hosted Supabase.

### Running the app

Node **≥20.19** is required (`kuchnia-kingi/package.json` `engines`; `.nvmrc` pins 20).

```bash
cd kuchnia-kingi
npm run dev -- --host 0.0.0.0   # Vite dev server on http://localhost:5173
```

For long-running dev in Cloud Agent VMs, start Vite in a tmux session (e.g. `vite-dev-server`) so the process survives after the setup shell exits.

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
- No Docker, no CI/CD; only the Vite dev server must run locally for UI work (Supabase is external and optional)
- Package manager: npm (uses `package-lock.json`)

### Branch notes

- The `main` branch contains only a bare `README.md`. All application code is on feature branches.
- When working on this project, ensure you are on an application branch or a branch created from one.

### Caveats

- `npm run lint` currently passes cleanly. Previous versions had pre-existing errors in `RecipeDetail.jsx` that have since been resolved.
- The app uses `localStorage` key `kuchnia-kingi-recipes` for recipe persistence. Clearing browser storage resets all data to mock defaults.
