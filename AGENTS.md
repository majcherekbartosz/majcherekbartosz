# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

**Kuchnia Kingi** (Kinga's Kitchen) is a client-side React SPA for managing recipes. All application code lives in the `kuchnia-kingi/` subdirectory. There is no backend, database, or external API; data persists in browser `localStorage`.

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
- The app uses `localStorage` key `kuchnia-kingi-recipes` for recipe persistence. Clearing browser storage resets all data to mock defaults.
