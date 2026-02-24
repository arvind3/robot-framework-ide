# Syntax Highlighting Eval Strategy

## Objective
Ensure browser-side Robot Framework semantic highlighting remains correct and stable.

## Architecture under test
- Lexical baseline in Monaco tokenization
- Semantic token layer from local worker (`src/robotSemanticWorker.ts`)
- Core analyzer (`src/robotSemanticCore.ts`)

## Test design
- 17 base syntax scenarios × 3 variants (normal + pipe style + trailing-comment) = 51 cases
- Coverage includes:
  - cross-file resource import keyword resolution
  - unknown keyword error tagging
  - snapshot-hash stability in report output
  - section headers
  - variables (`${}`, `@{}`, `&{}`, `%{}`)
  - comments (line + inline)
  - settings rows and `[Setting]` tokens
  - test case names
  - keyword definitions and calls
  - control tokens (`IF`, `FOR`, etc.)
  - argument tokens

## Pass criteria
Each test case passes when all expected token types are present.

## Run
```bash
npm run eval:highlight
```

## Reports
- `eval/highlighting/reports/latest.md`
- `eval/highlighting/reports/latest.json`
