# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

This is **Kuchnia Kingi** (Kinga's Kitchen) — a client-side React SPA for managing recipes. All application code lives in the `kuchnia-kingi/` subdirectory. There is no backend, database, or external API; data persists in browser `localStorage`.

### Running the app

```bash
cd kuchnia-kingi
npm run dev -- --host 0.0.0.0   # Vite dev server on http://localhost:5173
```

### Available scripts (from `kuchnia-kingi/package.json`)

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build (outputs to `dist/`) |
| `npm run lint` | ESLint check |
| `npm run preview` | Preview production build |

### Known issues

- `npm run lint` reports 2 pre-existing errors in `src/components/RecipeDetail.jsx` (component defined inside render). These are not blocking.

### Branch notes

- The `main` branch contains only a bare `README.md`. All application code is on `cursor/culinary-cookbook-kuchnia-kingi-5a0b`.
- When working on this project, ensure you are on the application branch or a branch created from it.

### Tech stack

- React 19, Vite 8, Tailwind CSS 3.4, ESLint 10
- No tests framework configured — validation is manual/visual
- No Docker, no CI/CD, no backend services needed
