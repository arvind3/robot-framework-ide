# AI Coach Evaluation Strategy

## Objective
Guarantee AI Coach quality through deterministic, repeatable eval gates before merge and deploy.

## Quality-by-Design Principle
Evaluation is not a one-time QA activity. It is a **core architecture layer**:
- prompt behavior is specified
- responses are measured against specification
- release is blocked on failure

## Scope
This eval suite covers:
- UI flow guidance prompts (import/export/artifacts)
- Core content explanations
- CLI command guidance
- Debug/failure handling
- Variable/structure guidance
- Beginner onboarding prompts
- Fallback prompts

## Test Case Design
- Prompt archetypes: `eval/ai-coach/prompt-archetypes.json`
- Chapter contexts: `src/bookChapters.ts`
- Cross-product generation by evaluator script

Default matrix:
- 10 chapters × 12 archetypes = **120 critical test cases**

## Pass Criteria
A case passes only when:
1. All `mustInclude` terms are present.
2. All `mustNotInclude` terms are absent.

Critical anti-pattern blocked by default:
- exposing internal context/system payload in user-facing answer (e.g., `Context:` dumps)

## Eval Architecture
1. Compile `src/coach.ts` + `src/bookChapters.ts`
2. Load archetypes + chapter contexts
3. Generate test cases
4. Execute `generateCoachResponse(prompt, context)` for each case
5. Compare expected vs actual
6. Emit machine + human reports:
   - `eval/ai-coach/reports/latest.json`
   - `eval/ai-coach/reports/latest.md`
   - Each case includes: **test steps**, **expected result**, and **actual LLM result**
7. Fail process if pass-rate threshold not met

## Execution
Strict gate (release-safe):

```bash
npm run eval:coach
```

Diagnostic run (never fails):

```bash
npm run eval:coach:relaxed
```

Equivalent direct command:

```bash
node scripts/run-ai-coach-eval.mjs --min-pass-rate=100 --chapter-limit=10
```

## CI / Release Gate
Configured cadence should be:
- On every pull request to `main`
- On every push to `main`
- Nightly scheduled run (drift detection)

Policy:
- Block merge/deploy if strict gate fails.

## Always-Latest Report Links
- Markdown: https://github.com/arvind3/robot-framework-ide/blob/main/eval/ai-coach/reports/latest.md
- JSON: https://github.com/arvind3/robot-framework-ide/blob/main/eval/ai-coach/reports/latest.json

## Maintenance Rules
Whenever coach behavior changes:
1. Update archetypes if expected behavior changed.
2. Re-run eval suite.
3. Review failed case details.
4. Merge only when strict gate passes.

## Expansion Path
- Severity-weighted scoring
- Length/readability constraints
- Chapter-specific expected-token checks
- Playwright e2e checks for rendered coach panel text
