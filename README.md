# Robot Framework IDE (Browser-first)

In-browser Robot Framework IDE prototype built for GitHub Pages deployment.

## Current Features (v1)

- Multi-file project tree
- Create / rename / delete files
- Monaco editor-based code editing
- Robot version selector (3.1, 3.2, 4.1, 5.0, 6.1)
- Starter templates
- ZIP import/export for full project handoff
- Pyodide runtime check scaffold

## Local Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy (GitHub Pages)

Workflow included at `.github/workflows/pages.yml`.

- Push to `main`
- Ensure GitHub Pages is enabled for GitHub Actions
- App will publish to: `https://<user>.github.io/<repo-name>/`

## Next Phase

1. Full Robot Framework runtime execution via Pyodide + wheel strategy
2. Multi-version runtime packs and fallback compatibility checks
3. Better Robot syntax support and diagnostics
4. WebLLM + wllama fallback for inline reasoning/help
5. Curated best-practice examples gallery
