# Robot Framework IDE — Browser-first LocalAI Dev Platform

Browser-first Robot Framework IDE with chapter-driven learning, CLI execution, and an AI Coach.

Live app: https://arvind3.github.io/robot-framework-ide/

---

## Core Features

- Multi-file project explorer (create / rename / delete)
- Monaco editor for `.robot`, `.resource`, `.py`, `.json`, etc.
- Chapter-based learning content synced from the companion book
- In-browser Robot execution flow with artifacts (`output.xml`, `log.html`, `report.html`)
- ZIP import/export for full project handoff
- AI Coach panel for chapter-aware guidance
- Hybrid syntax highlighting: lexical (Monaco/TextMate-style) + local semantic tokens (worker-based)

---

## Quality by Design: AI Coach Eval Strategy

This project uses **evaluation-first quality gates** for AI responses.

### What is covered

The eval suite validates:
- UI-flow prompts (import/export/artifacts)
- Core content explanations
- CLI command guidance
- Debug/failure guidance
- Variables/structure guidance
- Beginner prompts
- Fallback prompts

### Test volume

- `10 chapters × 12 prompt archetypes = 120 critical test cases`
- Can be expanded further by adding archetypes or chapter contexts

### Pass criteria

A case passes only when:
1. All required phrases are present (`mustInclude`)
2. Forbidden leakage is absent (`mustNotInclude`), especially internal context dumps

### Eval architecture

1. Prompt archetypes are defined in: `eval/ai-coach/prompt-archetypes.json`
2. Chapter contexts are sourced from: `src/bookChapters.ts`
3. Evaluator generates cross-product test cases and executes: `scripts/run-ai-coach-eval.mjs`
4. Syntax-highlighting evaluator validates local semantic tokenization via: `scripts/run-highlighting-eval.mjs`
5. Reports are generated to:
   - `eval/ai-coach/reports/latest.md`
   - `eval/ai-coach/reports/latest.json`
   - `eval/highlighting/reports/latest.md`
   - `eval/highlighting/reports/latest.json`
6. Strict gate fails build if pass criteria is not met

### Always-latest report URLs

AI Coach:
- Markdown report: https://github.com/arvind3/robot-framework-ide/blob/main/eval/ai-coach/reports/latest.md
- JSON report: https://github.com/arvind3/robot-framework-ide/blob/main/eval/ai-coach/reports/latest.json

Syntax Highlighting:
- Markdown report: https://github.com/arvind3/robot-framework-ide/blob/main/eval/highlighting/reports/latest.md
- JSON report: https://github.com/arvind3/robot-framework-ide/blob/main/eval/highlighting/reports/latest.json

---

## Local Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Syntax Highlighting Architecture (Local Option A)

- Layer 1: Monaco lexical tokenization for instant baseline coloring
- Layer 2: Worker-based local semantic analysis (`src/robotSemanticWorker.ts` + `src/robotSemanticCore.ts`)
- Semantic tokens are provided to Monaco via `registerDocumentSemanticTokensProvider`
- No backend dependency required for syntax highlighting

## AI Coach Eval Commands

```bash
# strict AI coach gate
npm run eval:coach

# strict syntax-highlighting gate
npm run eval:highlight

# full quality gate (coach + highlighting)
npm run eval:all

# diagnostic coach run (never fails CI)
npm run eval:coach:relaxed
```

---

## Eval Frequency

Recommended and configured cadence:
- On every PR to `main`
- On every push to `main`
- Nightly scheduled run for drift detection

This ensures regressions are caught before release and monitored continuously.

---

## Deploy (GitHub Pages)

Workflow included at `.github/workflows/pages.yml`.

- Push to `main`
- Ensure GitHub Pages is enabled for GitHub Actions
- App publishes to: `https://<user>.github.io/<repo-name>/`
