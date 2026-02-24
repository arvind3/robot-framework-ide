# AI Coach Evaluation Report

- Generated: 2026-02-24T18:07:21.877Z
- Total cases: 120
- Passed: 120
- Failed: 0
- Pass rate: 100%
- Required minimum: 100%

## Category Breakdown

| Category | Total | Passed | Failed | Pass Rate |
|---|---:|---:|---:|---:|
| core-content | 10 | 10 | 0 | 100% |
| ui-flow | 10 | 10 | 0 | 100% |
| command | 10 | 10 | 0 | 100% |
| artifacts | 20 | 20 | 0 | 100% |
| debug | 20 | 20 | 0 | 100% |
| quality | 10 | 10 | 0 | 100% |
| beginner-guidance | 10 | 10 | 0 | 100% |
| workflow | 10 | 10 | 0 | 100% |
| fallback | 10 | 10 | 0 | 100% |
| variables | 10 | 10 | 0 | 100% |

## Case Results (with Expected and Actual)

| # | Case ID | Category | Severity | Prompt | Expected Result | Actual LLM Result | Status |
|---|---|---|---|---|---|---|---|
| 1 | chapter-01-introduction-EXPLAIN_PROGRAM | core-content | critical | explain this program to me | Response should include: Robot Framework, IDE; and should NOT include: Context: | This is Robot Framework IDE — Browser-first LocalAI Dev Platform. You load a chapter, edit multi-file tests, run Robot CLI in-browser, then inspect artifacts (output.xml/log.html/report.html). Flow: Chapter → Edit → Exec… | PASS |
| 2 | chapter-01-introduction-IMPORT_ZIP | ui-flow | critical | how to import zip files? | Response should include: Import expects a ZIP, tests/*.robot; and should NOT include: Context: | Import expects a ZIP with project-style paths (example: tests/*.robot, resources/*.resource). On import, current file tree is replaced by ZIP contents. Use Help → Download sample import zip for a known-good structure. | PASS |
| 3 | chapter-01-introduction-RUN_COMMAND | command | critical | which command should i run now | Response should include: run; and should NOT include: Context: | Chapter 01: Introduction. Objective: Minimal Robot suite and shared resource file.. Active file: main.robot. Next action: run robot main.robot and inspect terminal + artifacts. Ask specific topics (import, debug, reports… | PASS |
| 4 | chapter-01-introduction-REPORT_FILES | artifacts | critical | how do i generate report.html and log.html | Response should include: --output artifacts/output.xml, report.html; and should NOT include: Context: | Use explicit artifact flags: `robot --output artifacts/output.xml --log artifacts/log.html --report artifacts/report.html <suite>.robot` No artifacts listed yet. Then click an artifact in left panel to preview. | PASS |
| 5 | chapter-01-introduction-DEBUG_FAILURE | debug | critical | tests failed, help debug | Response should include: Debug checklist, Re-run:; and should NOT include: Context: | Debug checklist: 1) Re-run: robot main.robot 2) Structure check: Settings=yes, Test Cases=yes, Keywords=no 3) Validate file path passed to robot command. 4) If fetch/network appears, retry runtime bootstrap and verify co… | PASS |
| 6 | chapter-01-introduction-FETCH_FAILURE | debug | high | fetch failed error, what now | Response should include: retry runtime bootstrap, Debug checklist; and should NOT include: Context: | Debug checklist: 1) Re-run: robot main.robot 2) Structure check: Settings=yes, Test Cases=yes, Keywords=no 3) Validate file path passed to robot command. 4) If fetch/network appears, retry runtime bootstrap and verify co… | PASS |
| 7 | chapter-01-introduction-QUALITY_IMPROVEMENT | quality | high | how can i improve quality of this chapter | Response should include: Quality upgrades, Current structure; and should NOT include: Context: | Chapter focus: Minimal Robot suite and shared resource file. Quality upgrades: - clear test names by behavior - reusable keywords in resource files - avoid duplicate steps Current structure: Settings=ok, Test Cases=ok, K… | PASS |
| 8 | chapter-01-introduction-ARTIFACT_MISSING | artifacts | high | artifact not visible in left panel | Response should include: artifacts, left panel; and should NOT include: Context: | Use explicit artifact flags: `robot --output artifacts/output.xml --log artifacts/log.html --report artifacts/report.html <suite>.robot` No artifacts listed yet. Then click an artifact in left panel to preview. | PASS |
| 9 | chapter-01-introduction-BEGINNER_FIRST_STEPS | beginner-guidance | high | i am new what are first 3 steps | Response should include: Chapter, Objective; and should NOT include: Context: | Chapter 01: Introduction. Objective: Minimal Robot suite and shared resource file.. Active file: main.robot. Next action: run robot main.robot and inspect terminal + artifacts. Ask specific topics (import, debug, reports… | PASS |
| 10 | chapter-01-introduction-NEXT_ACTION | workflow | medium | what should i do next | Response should include: Next action; and should NOT include: Context: | Chapter 01: Introduction. Objective: Minimal Robot suite and shared resource file.. Active file: main.robot. Next action: run robot main.robot and inspect terminal + artifacts. Ask specific topics (import, debug, reports… | PASS |
| 11 | chapter-01-introduction-GENERIC_HELP | fallback | medium | help me | Response should include: Chapter, Objective; and should NOT include: Context: | Chapter 01: Introduction. Objective: Minimal Robot suite and shared resource file.. Active file: main.robot. Next action: run robot main.robot and inspect terminal + artifacts. Ask specific topics (import, debug, reports… | PASS |
| 12 | chapter-01-introduction-VARIABLES_EXPLANATION | variables | medium | how do variables work in this chapter | Response should include: Chapter, Objective; and should NOT include: Context: | Chapter 01: Introduction. Objective: Minimal Robot suite and shared resource file.. Active file: main.robot. Next action: run robot main.robot and inspect terminal + artifacts. Ask specific topics (import, debug, reports… | PASS |
| 13 | chapter-02-installation-concepts-EXPLAIN_PROGRAM | core-content | critical | explain this program to me | Response should include: Robot Framework, IDE; and should NOT include: Context: | This is Robot Framework IDE — Browser-first LocalAI Dev Platform. You load a chapter, edit multi-file tests, run Robot CLI in-browser, then inspect artifacts (output.xml/log.html/report.html). Flow: Chapter → Edit → Exec… | PASS |
| 14 | chapter-02-installation-concepts-IMPORT_ZIP | ui-flow | critical | how to import zip files? | Response should include: Import expects a ZIP, tests/*.robot; and should NOT include: Context: | Import expects a ZIP with project-style paths (example: tests/*.robot, resources/*.resource). On import, current file tree is replaced by ZIP contents. Use Help → Download sample import zip for a known-good structure. | PASS |
| 15 | chapter-02-installation-concepts-RUN_COMMAND | command | critical | which command should i run now | Response should include: run; and should NOT include: Context: | Chapter 02: Installation Concepts. Objective: Dependency and environment awareness in a chapter bundle.. Active file: libraries/install_notes.py. Next action: run robot main.robot and inspect terminal + artifacts. Ask sp… | PASS |
| 16 | chapter-02-installation-concepts-REPORT_FILES | artifacts | critical | how do i generate report.html and log.html | Response should include: --output artifacts/output.xml, report.html; and should NOT include: Context: | Use explicit artifact flags: `robot --output artifacts/output.xml --log artifacts/log.html --report artifacts/report.html <suite>.robot` No artifacts listed yet. Then click an artifact in left panel to preview. | PASS |
| 17 | chapter-02-installation-concepts-DEBUG_FAILURE | debug | critical | tests failed, help debug | Response should include: Debug checklist, Re-run:; and should NOT include: Context: | Debug checklist: 1) Re-run: robot main.robot 2) Structure check: Settings=no, Test Cases=no, Keywords=no 3) Validate file path passed to robot command. 4) If fetch/network appears, retry runtime bootstrap and verify conn… | PASS |
| 18 | chapter-02-installation-concepts-FETCH_FAILURE | debug | high | fetch failed error, what now | Response should include: retry runtime bootstrap, Debug checklist; and should NOT include: Context: | Debug checklist: 1) Re-run: robot main.robot 2) Structure check: Settings=no, Test Cases=no, Keywords=no 3) Validate file path passed to robot command. 4) If fetch/network appears, retry runtime bootstrap and verify conn… | PASS |
| 19 | chapter-02-installation-concepts-QUALITY_IMPROVEMENT | quality | high | how can i improve quality of this chapter | Response should include: Quality upgrades, Current structure; and should NOT include: Context: | Chapter focus: Dependency and environment awareness in a chapter bundle. Quality upgrades: - clear test names by behavior - reusable keywords in resource files - avoid duplicate steps Current structure: Settings=missing,… | PASS |
| 20 | chapter-02-installation-concepts-ARTIFACT_MISSING | artifacts | high | artifact not visible in left panel | Response should include: artifacts, left panel; and should NOT include: Context: | Use explicit artifact flags: `robot --output artifacts/output.xml --log artifacts/log.html --report artifacts/report.html <suite>.robot` No artifacts listed yet. Then click an artifact in left panel to preview. | PASS |
| 21 | chapter-02-installation-concepts-BEGINNER_FIRST_STEPS | beginner-guidance | high | i am new what are first 3 steps | Response should include: Chapter, Objective; and should NOT include: Context: | Chapter 02: Installation Concepts. Objective: Dependency and environment awareness in a chapter bundle.. Active file: libraries/install_notes.py. Next action: run robot main.robot and inspect terminal + artifacts. Ask sp… | PASS |
| 22 | chapter-02-installation-concepts-NEXT_ACTION | workflow | medium | what should i do next | Response should include: Next action; and should NOT include: Context: | Chapter 02: Installation Concepts. Objective: Dependency and environment awareness in a chapter bundle.. Active file: libraries/install_notes.py. Next action: run robot main.robot and inspect terminal + artifacts. Ask sp… | PASS |
| 23 | chapter-02-installation-concepts-GENERIC_HELP | fallback | medium | help me | Response should include: Chapter, Objective; and should NOT include: Context: | Chapter 02: Installation Concepts. Objective: Dependency and environment awareness in a chapter bundle.. Active file: libraries/install_notes.py. Next action: run robot main.robot and inspect terminal + artifacts. Ask sp… | PASS |
| 24 | chapter-02-installation-concepts-VARIABLES_EXPLANATION | variables | medium | how do variables work in this chapter | Response should include: Chapter, Objective; and should NOT include: Context: | Chapter 02: Installation Concepts. Objective: Dependency and environment awareness in a chapter bundle.. Active file: libraries/install_notes.py. Next action: run robot main.robot and inspect terminal + artifacts. Ask sp… | PASS |
| 25 | chapter-03-robot-framework-basics-EXPLAIN_PROGRAM | core-content | critical | explain this program to me | Response should include: Robot Framework, IDE; and should NOT include: Context: | This is Robot Framework IDE — Browser-first LocalAI Dev Platform. You load a chapter, edit multi-file tests, run Robot CLI in-browser, then inspect artifacts (output.xml/log.html/report.html). Flow: Chapter → Edit → Exec… | PASS |
| 26 | chapter-03-robot-framework-basics-IMPORT_ZIP | ui-flow | critical | how to import zip files? | Response should include: Import expects a ZIP, tests/*.robot; and should NOT include: Context: | Import expects a ZIP with project-style paths (example: tests/*.robot, resources/*.resource). On import, current file tree is replaced by ZIP contents. Use Help → Download sample import zip for a known-good structure. | PASS |
| 27 | chapter-03-robot-framework-basics-RUN_COMMAND | command | critical | which command should i run now | Response should include: run; and should NOT include: Context: | Chapter 03: Robot Framework Basics. Objective: Core suite, keywords, and data structure.. Active file: data/test_data.json. Next action: run robot suite.robot and inspect terminal + artifacts. Ask specific topics (import… | PASS |
| 28 | chapter-03-robot-framework-basics-REPORT_FILES | artifacts | critical | how do i generate report.html and log.html | Response should include: --output artifacts/output.xml, report.html; and should NOT include: Context: | Use explicit artifact flags: `robot --output artifacts/output.xml --log artifacts/log.html --report artifacts/report.html <suite>.robot` No artifacts listed yet. Then click an artifact in left panel to preview. | PASS |
| 29 | chapter-03-robot-framework-basics-DEBUG_FAILURE | debug | critical | tests failed, help debug | Response should include: Debug checklist, Re-run:; and should NOT include: Context: | Debug checklist: 1) Re-run: robot suite.robot 2) Structure check: Settings=no, Test Cases=no, Keywords=no 3) Validate file path passed to robot command. 4) If fetch/network appears, retry runtime bootstrap and verify con… | PASS |
| 30 | chapter-03-robot-framework-basics-FETCH_FAILURE | debug | high | fetch failed error, what now | Response should include: retry runtime bootstrap, Debug checklist; and should NOT include: Context: | Debug checklist: 1) Re-run: robot suite.robot 2) Structure check: Settings=no, Test Cases=no, Keywords=no 3) Validate file path passed to robot command. 4) If fetch/network appears, retry runtime bootstrap and verify con… | PASS |
| 31 | chapter-03-robot-framework-basics-QUALITY_IMPROVEMENT | quality | high | how can i improve quality of this chapter | Response should include: Quality upgrades, Current structure; and should NOT include: Context: | Chapter focus: Core suite, keywords, and data structure. Quality upgrades: - clear test names by behavior - reusable keywords in resource files - avoid duplicate steps Current structure: Settings=missing, Test Cases=miss… | PASS |
| 32 | chapter-03-robot-framework-basics-ARTIFACT_MISSING | artifacts | high | artifact not visible in left panel | Response should include: artifacts, left panel; and should NOT include: Context: | Use explicit artifact flags: `robot --output artifacts/output.xml --log artifacts/log.html --report artifacts/report.html <suite>.robot` No artifacts listed yet. Then click an artifact in left panel to preview. | PASS |
| 33 | chapter-03-robot-framework-basics-BEGINNER_FIRST_STEPS | beginner-guidance | high | i am new what are first 3 steps | Response should include: Chapter, Objective; and should NOT include: Context: | Chapter 03: Robot Framework Basics. Objective: Core suite, keywords, and data structure.. Active file: data/test_data.json. Next action: run robot suite.robot and inspect terminal + artifacts. Ask specific topics (import… | PASS |
| 34 | chapter-03-robot-framework-basics-NEXT_ACTION | workflow | medium | what should i do next | Response should include: Next action; and should NOT include: Context: | Chapter 03: Robot Framework Basics. Objective: Core suite, keywords, and data structure.. Active file: data/test_data.json. Next action: run robot suite.robot and inspect terminal + artifacts. Ask specific topics (import… | PASS |
| 35 | chapter-03-robot-framework-basics-GENERIC_HELP | fallback | medium | help me | Response should include: Chapter, Objective; and should NOT include: Context: | Chapter 03: Robot Framework Basics. Objective: Core suite, keywords, and data structure.. Active file: data/test_data.json. Next action: run robot suite.robot and inspect terminal + artifacts. Ask specific topics (import… | PASS |
| 36 | chapter-03-robot-framework-basics-VARIABLES_EXPLANATION | variables | medium | how do variables work in this chapter | Response should include: Chapter, Objective; and should NOT include: Context: | Chapter 03: Robot Framework Basics. Objective: Core suite, keywords, and data structure.. Active file: data/test_data.json. Next action: run robot suite.robot and inspect terminal + artifacts. Ask specific topics (import… | PASS |
| 37 | chapter-04-multi-file-architecture-EXPLAIN_PROGRAM | core-content | critical | explain this program to me | Response should include: Robot Framework, IDE; and should NOT include: Context: | This is Robot Framework IDE — Browser-first LocalAI Dev Platform. You load a chapter, edit multi-file tests, run Robot CLI in-browser, then inspect artifacts (output.xml/log.html/report.html). Flow: Chapter → Edit → Exec… | PASS |
| 38 | chapter-04-multi-file-architecture-IMPORT_ZIP | ui-flow | critical | how to import zip files? | Response should include: Import expects a ZIP, tests/*.robot; and should NOT include: Context: | Import expects a ZIP with project-style paths (example: tests/*.robot, resources/*.resource). On import, current file tree is replaced by ZIP contents. Use Help → Download sample import zip for a known-good structure. | PASS |
| 39 | chapter-04-multi-file-architecture-RUN_COMMAND | command | critical | which command should i run now | Response should include: run; and should NOT include: Context: | Chapter 04: Multi-file Architecture. Objective: Nested folders with resources and Python helpers.. Active file: helpers/constants.py. Next action: run robot suites/main.robot and inspect terminal + artifacts. Ask specifi… | PASS |
| 40 | chapter-04-multi-file-architecture-REPORT_FILES | artifacts | critical | how do i generate report.html and log.html | Response should include: --output artifacts/output.xml, report.html; and should NOT include: Context: | Use explicit artifact flags: `robot --output artifacts/output.xml --log artifacts/log.html --report artifacts/report.html <suite>.robot` No artifacts listed yet. Then click an artifact in left panel to preview. | PASS |
| 41 | chapter-04-multi-file-architecture-DEBUG_FAILURE | debug | critical | tests failed, help debug | Response should include: Debug checklist, Re-run:; and should NOT include: Context: | Debug checklist: 1) Re-run: robot suites/main.robot 2) Structure check: Settings=no, Test Cases=no, Keywords=no 3) Validate file path passed to robot command. 4) If fetch/network appears, retry runtime bootstrap and veri… | PASS |
| 42 | chapter-04-multi-file-architecture-FETCH_FAILURE | debug | high | fetch failed error, what now | Response should include: retry runtime bootstrap, Debug checklist; and should NOT include: Context: | Debug checklist: 1) Re-run: robot suites/main.robot 2) Structure check: Settings=no, Test Cases=no, Keywords=no 3) Validate file path passed to robot command. 4) If fetch/network appears, retry runtime bootstrap and veri… | PASS |
| 43 | chapter-04-multi-file-architecture-QUALITY_IMPROVEMENT | quality | high | how can i improve quality of this chapter | Response should include: Quality upgrades, Current structure; and should NOT include: Context: | Chapter focus: Nested folders with resources and Python helpers. Quality upgrades: - clear test names by behavior - reusable keywords in resource files - avoid duplicate steps Current structure: Settings=missing, Test Ca… | PASS |
| 44 | chapter-04-multi-file-architecture-ARTIFACT_MISSING | artifacts | high | artifact not visible in left panel | Response should include: artifacts, left panel; and should NOT include: Context: | Use explicit artifact flags: `robot --output artifacts/output.xml --log artifacts/log.html --report artifacts/report.html <suite>.robot` No artifacts listed yet. Then click an artifact in left panel to preview. | PASS |
| 45 | chapter-04-multi-file-architecture-BEGINNER_FIRST_STEPS | beginner-guidance | high | i am new what are first 3 steps | Response should include: Chapter, Objective; and should NOT include: Context: | Chapter 04: Multi-file Architecture. Objective: Nested folders with resources and Python helpers.. Active file: helpers/constants.py. Next action: run robot suites/main.robot and inspect terminal + artifacts. Ask specifi… | PASS |
| 46 | chapter-04-multi-file-architecture-NEXT_ACTION | workflow | medium | what should i do next | Response should include: Next action; and should NOT include: Context: | Chapter 04: Multi-file Architecture. Objective: Nested folders with resources and Python helpers.. Active file: helpers/constants.py. Next action: run robot suites/main.robot and inspect terminal + artifacts. Ask specifi… | PASS |
| 47 | chapter-04-multi-file-architecture-GENERIC_HELP | fallback | medium | help me | Response should include: Chapter, Objective; and should NOT include: Context: | Chapter 04: Multi-file Architecture. Objective: Nested folders with resources and Python helpers.. Active file: helpers/constants.py. Next action: run robot suites/main.robot and inspect terminal + artifacts. Ask specifi… | PASS |
| 48 | chapter-04-multi-file-architecture-VARIABLES_EXPLANATION | variables | medium | how do variables work in this chapter | Response should include: Chapter, Objective; and should NOT include: Context: | Chapter 04: Multi-file Architecture. Objective: Nested folders with resources and Python helpers.. Active file: helpers/constants.py. Next action: run robot suites/main.robot and inspect terminal + artifacts. Ask specifi… | PASS |
| 49 | chapter-05-advanced-keywords-EXPLAIN_PROGRAM | core-content | critical | explain this program to me | Response should include: Robot Framework, IDE; and should NOT include: Context: | This is Robot Framework IDE — Browser-first LocalAI Dev Platform. You load a chapter, edit multi-file tests, run Robot CLI in-browser, then inspect artifacts (output.xml/log.html/report.html). Flow: Chapter → Edit → Exec… | PASS |
| 50 | chapter-05-advanced-keywords-IMPORT_ZIP | ui-flow | critical | how to import zip files? | Response should include: Import expects a ZIP, tests/*.robot; and should NOT include: Context: | Import expects a ZIP with project-style paths (example: tests/*.robot, resources/*.resource). On import, current file tree is replaced by ZIP contents. Use Help → Download sample import zip for a known-good structure. | PASS |
| 51 | chapter-05-advanced-keywords-RUN_COMMAND | command | critical | which command should i run now | Response should include: run; and should NOT include: Context: | Chapter 05: Advanced Keywords. Objective: Composable keyword architecture with explicit assertions.. Active file: keywords/advanced.resource. Next action: run robot main.robot and inspect terminal + artifacts. Ask specif… | PASS |
| 52 | chapter-05-advanced-keywords-REPORT_FILES | artifacts | critical | how do i generate report.html and log.html | Response should include: --output artifacts/output.xml, report.html; and should NOT include: Context: | Use explicit artifact flags: `robot --output artifacts/output.xml --log artifacts/log.html --report artifacts/report.html <suite>.robot` No artifacts listed yet. Then click an artifact in left panel to preview. | PASS |
| 53 | chapter-05-advanced-keywords-DEBUG_FAILURE | debug | critical | tests failed, help debug | Response should include: Debug checklist, Re-run:; and should NOT include: Context: | Debug checklist: 1) Re-run: robot main.robot 2) Structure check: Settings=no, Test Cases=no, Keywords=yes 3) Validate file path passed to robot command. 4) If fetch/network appears, retry runtime bootstrap and verify con… | PASS |
| 54 | chapter-05-advanced-keywords-FETCH_FAILURE | debug | high | fetch failed error, what now | Response should include: retry runtime bootstrap, Debug checklist; and should NOT include: Context: | Debug checklist: 1) Re-run: robot main.robot 2) Structure check: Settings=no, Test Cases=no, Keywords=yes 3) Validate file path passed to robot command. 4) If fetch/network appears, retry runtime bootstrap and verify con… | PASS |
| 55 | chapter-05-advanced-keywords-QUALITY_IMPROVEMENT | quality | high | how can i improve quality of this chapter | Response should include: Quality upgrades, Current structure; and should NOT include: Context: | Chapter focus: Composable keyword architecture with explicit assertions. Quality upgrades: - clear test names by behavior - reusable keywords in resource files - avoid duplicate steps Current structure: Settings=missing,… | PASS |
| 56 | chapter-05-advanced-keywords-ARTIFACT_MISSING | artifacts | high | artifact not visible in left panel | Response should include: artifacts, left panel; and should NOT include: Context: | Use explicit artifact flags: `robot --output artifacts/output.xml --log artifacts/log.html --report artifacts/report.html <suite>.robot` No artifacts listed yet. Then click an artifact in left panel to preview. | PASS |
| 57 | chapter-05-advanced-keywords-BEGINNER_FIRST_STEPS | beginner-guidance | high | i am new what are first 3 steps | Response should include: Chapter, Objective; and should NOT include: Context: | Chapter 05: Advanced Keywords. Objective: Composable keyword architecture with explicit assertions.. Active file: keywords/advanced.resource. Next action: run robot main.robot and inspect terminal + artifacts. Ask specif… | PASS |
| 58 | chapter-05-advanced-keywords-NEXT_ACTION | workflow | medium | what should i do next | Response should include: Next action; and should NOT include: Context: | Chapter 05: Advanced Keywords. Objective: Composable keyword architecture with explicit assertions.. Active file: keywords/advanced.resource. Next action: run robot main.robot and inspect terminal + artifacts. Ask specif… | PASS |
| 59 | chapter-05-advanced-keywords-GENERIC_HELP | fallback | medium | help me | Response should include: Chapter, Objective; and should NOT include: Context: | Chapter 05: Advanced Keywords. Objective: Composable keyword architecture with explicit assertions.. Active file: keywords/advanced.resource. Next action: run robot main.robot and inspect terminal + artifacts. Ask specif… | PASS |
| 60 | chapter-05-advanced-keywords-VARIABLES_EXPLANATION | variables | medium | how do variables work in this chapter | Response should include: Chapter, Objective; and should NOT include: Context: | Chapter 05: Advanced Keywords. Objective: Composable keyword architecture with explicit assertions.. Active file: keywords/advanced.resource. Next action: run robot main.robot and inspect terminal + artifacts. Ask specif… | PASS |
| 61 | chapter-06-python-integration-EXPLAIN_PROGRAM | core-content | critical | explain this program to me | Response should include: Robot Framework, IDE; and should NOT include: Context: | This is Robot Framework IDE — Browser-first LocalAI Dev Platform. You load a chapter, edit multi-file tests, run Robot CLI in-browser, then inspect artifacts (output.xml/log.html/report.html). Flow: Chapter → Edit → Exec… | PASS |
| 62 | chapter-06-python-integration-IMPORT_ZIP | ui-flow | critical | how to import zip files? | Response should include: Import expects a ZIP, tests/*.robot; and should NOT include: Context: | Import expects a ZIP with project-style paths (example: tests/*.robot, resources/*.resource). On import, current file tree is replaced by ZIP contents. Use Help → Download sample import zip for a known-good structure. | PASS |
| 63 | chapter-06-python-integration-RUN_COMMAND | command | critical | which command should i run now | Response should include: run; and should NOT include: Context: | Chapter 06: Python Integration. Objective: Robot suites that call Python libraries.. Active file: libraries/math_lib.py. Next action: run robot suites/python_integration.robot and inspect terminal + artifacts. Ask specif… | PASS |
| 64 | chapter-06-python-integration-REPORT_FILES | artifacts | critical | how do i generate report.html and log.html | Response should include: --output artifacts/output.xml, report.html; and should NOT include: Context: | Use explicit artifact flags: `robot --output artifacts/output.xml --log artifacts/log.html --report artifacts/report.html <suite>.robot` No artifacts listed yet. Then click an artifact in left panel to preview. | PASS |
| 65 | chapter-06-python-integration-DEBUG_FAILURE | debug | critical | tests failed, help debug | Response should include: Debug checklist, Re-run:; and should NOT include: Context: | Debug checklist: 1) Re-run: robot suites/python_integration.robot 2) Structure check: Settings=no, Test Cases=no, Keywords=no 3) Validate file path passed to robot command. 4) If fetch/network appears, retry runtime boot… | PASS |
| 66 | chapter-06-python-integration-FETCH_FAILURE | debug | high | fetch failed error, what now | Response should include: retry runtime bootstrap, Debug checklist; and should NOT include: Context: | Debug checklist: 1) Re-run: robot suites/python_integration.robot 2) Structure check: Settings=no, Test Cases=no, Keywords=no 3) Validate file path passed to robot command. 4) If fetch/network appears, retry runtime boot… | PASS |
| 67 | chapter-06-python-integration-QUALITY_IMPROVEMENT | quality | high | how can i improve quality of this chapter | Response should include: Quality upgrades, Current structure; and should NOT include: Context: | Chapter focus: Robot suites that call Python libraries. Quality upgrades: - clear test names by behavior - reusable keywords in resource files - avoid duplicate steps Current structure: Settings=missing, Test Cases=missi… | PASS |
| 68 | chapter-06-python-integration-ARTIFACT_MISSING | artifacts | high | artifact not visible in left panel | Response should include: artifacts, left panel; and should NOT include: Context: | Use explicit artifact flags: `robot --output artifacts/output.xml --log artifacts/log.html --report artifacts/report.html <suite>.robot` No artifacts listed yet. Then click an artifact in left panel to preview. | PASS |
| 69 | chapter-06-python-integration-BEGINNER_FIRST_STEPS | beginner-guidance | high | i am new what are first 3 steps | Response should include: Chapter, Objective; and should NOT include: Context: | Chapter 06: Python Integration. Objective: Robot suites that call Python libraries.. Active file: libraries/math_lib.py. Next action: run robot suites/python_integration.robot and inspect terminal + artifacts. Ask specif… | PASS |
| 70 | chapter-06-python-integration-NEXT_ACTION | workflow | medium | what should i do next | Response should include: Next action; and should NOT include: Context: | Chapter 06: Python Integration. Objective: Robot suites that call Python libraries.. Active file: libraries/math_lib.py. Next action: run robot suites/python_integration.robot and inspect terminal + artifacts. Ask specif… | PASS |
| 71 | chapter-06-python-integration-GENERIC_HELP | fallback | medium | help me | Response should include: Chapter, Objective; and should NOT include: Context: | Chapter 06: Python Integration. Objective: Robot suites that call Python libraries.. Active file: libraries/math_lib.py. Next action: run robot suites/python_integration.robot and inspect terminal + artifacts. Ask specif… | PASS |
| 72 | chapter-06-python-integration-VARIABLES_EXPLANATION | variables | medium | how do variables work in this chapter | Response should include: Chapter, Objective; and should NOT include: Context: | Chapter 06: Python Integration. Objective: Robot suites that call Python libraries.. Active file: libraries/math_lib.py. Next action: run robot suites/python_integration.robot and inspect terminal + artifacts. Ask specif… | PASS |
| 73 | chapter-07-best-practices-EXPLAIN_PROGRAM | core-content | critical | explain this program to me | Response should include: Robot Framework, IDE; and should NOT include: Context: | This is Robot Framework IDE — Browser-first LocalAI Dev Platform. You load a chapter, edit multi-file tests, run Robot CLI in-browser, then inspect artifacts (output.xml/log.html/report.html). Flow: Chapter → Edit → Exec… | PASS |
| 74 | chapter-07-best-practices-IMPORT_ZIP | ui-flow | critical | how to import zip files? | Response should include: Import expects a ZIP, tests/*.robot; and should NOT include: Context: | Import expects a ZIP with project-style paths (example: tests/*.robot, resources/*.resource). On import, current file tree is replaced by ZIP contents. Use Help → Download sample import zip for a known-good structure. | PASS |
| 75 | chapter-07-best-practices-RUN_COMMAND | command | critical | which command should i run now | Response should include: run; and should NOT include: Context: | Chapter 07: Best Practices. Objective: Stable data and reusable keywords.. Active file: data/orders.json. Next action: run robot main.robot and inspect terminal + artifacts. Ask specific topics (import, debug, reports, q… | PASS |
| 76 | chapter-07-best-practices-REPORT_FILES | artifacts | critical | how do i generate report.html and log.html | Response should include: --output artifacts/output.xml, report.html; and should NOT include: Context: | Use explicit artifact flags: `robot --output artifacts/output.xml --log artifacts/log.html --report artifacts/report.html <suite>.robot` No artifacts listed yet. Then click an artifact in left panel to preview. | PASS |
| 77 | chapter-07-best-practices-DEBUG_FAILURE | debug | critical | tests failed, help debug | Response should include: Debug checklist, Re-run:; and should NOT include: Context: | Debug checklist: 1) Re-run: robot main.robot 2) Structure check: Settings=no, Test Cases=no, Keywords=no 3) Validate file path passed to robot command. 4) If fetch/network appears, retry runtime bootstrap and verify conn… | PASS |
| 78 | chapter-07-best-practices-FETCH_FAILURE | debug | high | fetch failed error, what now | Response should include: retry runtime bootstrap, Debug checklist; and should NOT include: Context: | Debug checklist: 1) Re-run: robot main.robot 2) Structure check: Settings=no, Test Cases=no, Keywords=no 3) Validate file path passed to robot command. 4) If fetch/network appears, retry runtime bootstrap and verify conn… | PASS |
| 79 | chapter-07-best-practices-QUALITY_IMPROVEMENT | quality | high | how can i improve quality of this chapter | Response should include: Quality upgrades, Current structure; and should NOT include: Context: | Chapter focus: Stable data and reusable keywords. Quality upgrades: - clear test names by behavior - reusable keywords in resource files - avoid duplicate steps Current structure: Settings=missing, Test Cases=missing, Ke… | PASS |
| 80 | chapter-07-best-practices-ARTIFACT_MISSING | artifacts | high | artifact not visible in left panel | Response should include: artifacts, left panel; and should NOT include: Context: | Use explicit artifact flags: `robot --output artifacts/output.xml --log artifacts/log.html --report artifacts/report.html <suite>.robot` No artifacts listed yet. Then click an artifact in left panel to preview. | PASS |
| 81 | chapter-07-best-practices-BEGINNER_FIRST_STEPS | beginner-guidance | high | i am new what are first 3 steps | Response should include: Chapter, Objective; and should NOT include: Context: | Chapter 07: Best Practices. Objective: Stable data and reusable keywords.. Active file: data/orders.json. Next action: run robot main.robot and inspect terminal + artifacts. Ask specific topics (import, debug, reports, q… | PASS |
| 82 | chapter-07-best-practices-NEXT_ACTION | workflow | medium | what should i do next | Response should include: Next action; and should NOT include: Context: | Chapter 07: Best Practices. Objective: Stable data and reusable keywords.. Active file: data/orders.json. Next action: run robot main.robot and inspect terminal + artifacts. Ask specific topics (import, debug, reports, q… | PASS |
| 83 | chapter-07-best-practices-GENERIC_HELP | fallback | medium | help me | Response should include: Chapter, Objective; and should NOT include: Context: | Chapter 07: Best Practices. Objective: Stable data and reusable keywords.. Active file: data/orders.json. Next action: run robot main.robot and inspect terminal + artifacts. Ask specific topics (import, debug, reports, q… | PASS |
| 84 | chapter-07-best-practices-VARIABLES_EXPLANATION | variables | medium | how do variables work in this chapter | Response should include: Chapter, Objective; and should NOT include: Context: | Chapter 07: Best Practices. Objective: Stable data and reusable keywords.. Active file: data/orders.json. Next action: run robot main.robot and inspect terminal + artifacts. Ask specific topics (import, debug, reports, q… | PASS |
| 85 | chapter-08-enterprise-patterns-EXPLAIN_PROGRAM | core-content | critical | explain this program to me | Response should include: Robot Framework, IDE; and should NOT include: Context: | This is Robot Framework IDE — Browser-first LocalAI Dev Platform. You load a chapter, edit multi-file tests, run Robot CLI in-browser, then inspect artifacts (output.xml/log.html/report.html). Flow: Chapter → Edit → Exec… | PASS |
| 86 | chapter-08-enterprise-patterns-IMPORT_ZIP | ui-flow | critical | how to import zip files? | Response should include: Import expects a ZIP, tests/*.robot; and should NOT include: Context: | Import expects a ZIP with project-style paths (example: tests/*.robot, resources/*.resource). On import, current file tree is replaced by ZIP contents. Use Help → Download sample import zip for a known-good structure. | PASS |
| 87 | chapter-08-enterprise-patterns-RUN_COMMAND | command | critical | which command should i run now | Response should include: run; and should NOT include: Context: | Chapter 08: Enterprise Patterns. Objective: Shared resources and execution profiles.. Active file: configs/env.yaml. Next action: run robot suites/enterprise.robot and inspect terminal + artifacts. Ask specific topics (i… | PASS |
| 88 | chapter-08-enterprise-patterns-REPORT_FILES | artifacts | critical | how do i generate report.html and log.html | Response should include: --output artifacts/output.xml, report.html; and should NOT include: Context: | Use explicit artifact flags: `robot --output artifacts/output.xml --log artifacts/log.html --report artifacts/report.html <suite>.robot` No artifacts listed yet. Then click an artifact in left panel to preview. | PASS |
| 89 | chapter-08-enterprise-patterns-DEBUG_FAILURE | debug | critical | tests failed, help debug | Response should include: Debug checklist, Re-run:; and should NOT include: Context: | Debug checklist: 1) Re-run: robot suites/enterprise.robot 2) Structure check: Settings=no, Test Cases=no, Keywords=no 3) Validate file path passed to robot command. 4) If fetch/network appears, retry runtime bootstrap an… | PASS |
| 90 | chapter-08-enterprise-patterns-FETCH_FAILURE | debug | high | fetch failed error, what now | Response should include: retry runtime bootstrap, Debug checklist; and should NOT include: Context: | Debug checklist: 1) Re-run: robot suites/enterprise.robot 2) Structure check: Settings=no, Test Cases=no, Keywords=no 3) Validate file path passed to robot command. 4) If fetch/network appears, retry runtime bootstrap an… | PASS |
| 91 | chapter-08-enterprise-patterns-QUALITY_IMPROVEMENT | quality | high | how can i improve quality of this chapter | Response should include: Quality upgrades, Current structure; and should NOT include: Context: | Chapter focus: Shared resources and execution profiles. Quality upgrades: - clear test names by behavior - reusable keywords in resource files - avoid duplicate steps Current structure: Settings=missing, Test Cases=missi… | PASS |
| 92 | chapter-08-enterprise-patterns-ARTIFACT_MISSING | artifacts | high | artifact not visible in left panel | Response should include: artifacts, left panel; and should NOT include: Context: | Use explicit artifact flags: `robot --output artifacts/output.xml --log artifacts/log.html --report artifacts/report.html <suite>.robot` No artifacts listed yet. Then click an artifact in left panel to preview. | PASS |
| 93 | chapter-08-enterprise-patterns-BEGINNER_FIRST_STEPS | beginner-guidance | high | i am new what are first 3 steps | Response should include: Chapter, Objective; and should NOT include: Context: | Chapter 08: Enterprise Patterns. Objective: Shared resources and execution profiles.. Active file: configs/env.yaml. Next action: run robot suites/enterprise.robot and inspect terminal + artifacts. Ask specific topics (i… | PASS |
| 94 | chapter-08-enterprise-patterns-NEXT_ACTION | workflow | medium | what should i do next | Response should include: Next action; and should NOT include: Context: | Chapter 08: Enterprise Patterns. Objective: Shared resources and execution profiles.. Active file: configs/env.yaml. Next action: run robot suites/enterprise.robot and inspect terminal + artifacts. Ask specific topics (i… | PASS |
| 95 | chapter-08-enterprise-patterns-GENERIC_HELP | fallback | medium | help me | Response should include: Chapter, Objective; and should NOT include: Context: | Chapter 08: Enterprise Patterns. Objective: Shared resources and execution profiles.. Active file: configs/env.yaml. Next action: run robot suites/enterprise.robot and inspect terminal + artifacts. Ask specific topics (i… | PASS |
| 96 | chapter-08-enterprise-patterns-VARIABLES_EXPLANATION | variables | medium | how do variables work in this chapter | Response should include: Chapter, Objective; and should NOT include: Context: | Chapter 08: Enterprise Patterns. Objective: Shared resources and execution profiles.. Active file: configs/env.yaml. Next action: run robot suites/enterprise.robot and inspect terminal + artifacts. Ask specific topics (i… | PASS |
| 97 | chapter-09-real-world-case-study-EXPLAIN_PROGRAM | core-content | critical | explain this program to me | Response should include: Robot Framework, IDE; and should NOT include: Context: | This is Robot Framework IDE — Browser-first LocalAI Dev Platform. You load a chapter, edit multi-file tests, run Robot CLI in-browser, then inspect artifacts (output.xml/log.html/report.html). Flow: Chapter → Edit → Exec… | PASS |
| 98 | chapter-09-real-world-case-study-IMPORT_ZIP | ui-flow | critical | how to import zip files? | Response should include: Import expects a ZIP, tests/*.robot; and should NOT include: Context: | Import expects a ZIP with project-style paths (example: tests/*.robot, resources/*.resource). On import, current file tree is replaced by ZIP contents. Use Help → Download sample import zip for a known-good structure. | PASS |
| 99 | chapter-09-real-world-case-study-RUN_COMMAND | command | critical | which command should i run now | Response should include: run; and should NOT include: Context: | Chapter 09: Real-world Case Study. Objective: End-to-end scenario with fixtures and helper libraries.. Active file: fixtures/case_data.json. Next action: run robot suites/case_study.robot and inspect terminal + artifacts… | PASS |
| 100 | chapter-09-real-world-case-study-REPORT_FILES | artifacts | critical | how do i generate report.html and log.html | Response should include: --output artifacts/output.xml, report.html; and should NOT include: Context: | Use explicit artifact flags: `robot --output artifacts/output.xml --log artifacts/log.html --report artifacts/report.html <suite>.robot` No artifacts listed yet. Then click an artifact in left panel to preview. | PASS |
| 101 | chapter-09-real-world-case-study-DEBUG_FAILURE | debug | critical | tests failed, help debug | Response should include: Debug checklist, Re-run:; and should NOT include: Context: | Debug checklist: 1) Re-run: robot suites/case_study.robot 2) Structure check: Settings=no, Test Cases=no, Keywords=no 3) Validate file path passed to robot command. 4) If fetch/network appears, retry runtime bootstrap an… | PASS |
| 102 | chapter-09-real-world-case-study-FETCH_FAILURE | debug | high | fetch failed error, what now | Response should include: retry runtime bootstrap, Debug checklist; and should NOT include: Context: | Debug checklist: 1) Re-run: robot suites/case_study.robot 2) Structure check: Settings=no, Test Cases=no, Keywords=no 3) Validate file path passed to robot command. 4) If fetch/network appears, retry runtime bootstrap an… | PASS |
| 103 | chapter-09-real-world-case-study-QUALITY_IMPROVEMENT | quality | high | how can i improve quality of this chapter | Response should include: Quality upgrades, Current structure; and should NOT include: Context: | Chapter focus: End-to-end scenario with fixtures and helper libraries. Quality upgrades: - clear test names by behavior - reusable keywords in resource files - avoid duplicate steps Current structure: Settings=missing, T… | PASS |
| 104 | chapter-09-real-world-case-study-ARTIFACT_MISSING | artifacts | high | artifact not visible in left panel | Response should include: artifacts, left panel; and should NOT include: Context: | Use explicit artifact flags: `robot --output artifacts/output.xml --log artifacts/log.html --report artifacts/report.html <suite>.robot` No artifacts listed yet. Then click an artifact in left panel to preview. | PASS |
| 105 | chapter-09-real-world-case-study-BEGINNER_FIRST_STEPS | beginner-guidance | high | i am new what are first 3 steps | Response should include: Chapter, Objective; and should NOT include: Context: | Chapter 09: Real-world Case Study. Objective: End-to-end scenario with fixtures and helper libraries.. Active file: fixtures/case_data.json. Next action: run robot suites/case_study.robot and inspect terminal + artifacts… | PASS |
| 106 | chapter-09-real-world-case-study-NEXT_ACTION | workflow | medium | what should i do next | Response should include: Next action; and should NOT include: Context: | Chapter 09: Real-world Case Study. Objective: End-to-end scenario with fixtures and helper libraries.. Active file: fixtures/case_data.json. Next action: run robot suites/case_study.robot and inspect terminal + artifacts… | PASS |
| 107 | chapter-09-real-world-case-study-GENERIC_HELP | fallback | medium | help me | Response should include: Chapter, Objective; and should NOT include: Context: | Chapter 09: Real-world Case Study. Objective: End-to-end scenario with fixtures and helper libraries.. Active file: fixtures/case_data.json. Next action: run robot suites/case_study.robot and inspect terminal + artifacts… | PASS |
| 108 | chapter-09-real-world-case-study-VARIABLES_EXPLANATION | variables | medium | how do variables work in this chapter | Response should include: Chapter, Objective; and should NOT include: Context: | Chapter 09: Real-world Case Study. Objective: End-to-end scenario with fixtures and helper libraries.. Active file: fixtures/case_data.json. Next action: run robot suites/case_study.robot and inspect terminal + artifacts… | PASS |
| 109 | chapter-10-final-capstone-project-EXPLAIN_PROGRAM | core-content | critical | explain this program to me | Response should include: Robot Framework, IDE; and should NOT include: Context: | This is Robot Framework IDE — Browser-first LocalAI Dev Platform. You load a chapter, edit multi-file tests, run Robot CLI in-browser, then inspect artifacts (output.xml/log.html/report.html). Flow: Chapter → Edit → Exec… | PASS |
| 110 | chapter-10-final-capstone-project-IMPORT_ZIP | ui-flow | critical | how to import zip files? | Response should include: Import expects a ZIP, tests/*.robot; and should NOT include: Context: | Import expects a ZIP with project-style paths (example: tests/*.robot, resources/*.resource). On import, current file tree is replaced by ZIP contents. Use Help → Download sample import zip for a known-good structure. | PASS |
| 111 | chapter-10-final-capstone-project-RUN_COMMAND | command | critical | which command should i run now | Response should include: run; and should NOT include: Context: | Chapter 10: Final Capstone Project. Objective: Production-style nested Robot Framework example with 20+ files.. Active file: configs/execution.yaml. Next action: run robot suites/main.robot and inspect terminal + artifac… | PASS |
| 112 | chapter-10-final-capstone-project-REPORT_FILES | artifacts | critical | how do i generate report.html and log.html | Response should include: --output artifacts/output.xml, report.html; and should NOT include: Context: | Use explicit artifact flags: `robot --output artifacts/output.xml --log artifacts/log.html --report artifacts/report.html <suite>.robot` No artifacts listed yet. Then click an artifact in left panel to preview. | PASS |
| 113 | chapter-10-final-capstone-project-DEBUG_FAILURE | debug | critical | tests failed, help debug | Response should include: Debug checklist, Re-run:; and should NOT include: Context: | Debug checklist: 1) Re-run: robot suites/main.robot 2) Structure check: Settings=no, Test Cases=no, Keywords=no 3) Validate file path passed to robot command. 4) If fetch/network appears, retry runtime bootstrap and veri… | PASS |
| 114 | chapter-10-final-capstone-project-FETCH_FAILURE | debug | high | fetch failed error, what now | Response should include: retry runtime bootstrap, Debug checklist; and should NOT include: Context: | Debug checklist: 1) Re-run: robot suites/main.robot 2) Structure check: Settings=no, Test Cases=no, Keywords=no 3) Validate file path passed to robot command. 4) If fetch/network appears, retry runtime bootstrap and veri… | PASS |
| 115 | chapter-10-final-capstone-project-QUALITY_IMPROVEMENT | quality | high | how can i improve quality of this chapter | Response should include: Quality upgrades, Current structure; and should NOT include: Context: | Chapter focus: Production-style nested Robot Framework example with 20+ files. Quality upgrades: - clear test names by behavior - reusable keywords in resource files - avoid duplicate steps Current structure: Settings=mi… | PASS |
| 116 | chapter-10-final-capstone-project-ARTIFACT_MISSING | artifacts | high | artifact not visible in left panel | Response should include: artifacts, left panel; and should NOT include: Context: | Use explicit artifact flags: `robot --output artifacts/output.xml --log artifacts/log.html --report artifacts/report.html <suite>.robot` No artifacts listed yet. Then click an artifact in left panel to preview. | PASS |
| 117 | chapter-10-final-capstone-project-BEGINNER_FIRST_STEPS | beginner-guidance | high | i am new what are first 3 steps | Response should include: Chapter, Objective; and should NOT include: Context: | Chapter 10: Final Capstone Project. Objective: Production-style nested Robot Framework example with 20+ files.. Active file: configs/execution.yaml. Next action: run robot suites/main.robot and inspect terminal + artifac… | PASS |
| 118 | chapter-10-final-capstone-project-NEXT_ACTION | workflow | medium | what should i do next | Response should include: Next action; and should NOT include: Context: | Chapter 10: Final Capstone Project. Objective: Production-style nested Robot Framework example with 20+ files.. Active file: configs/execution.yaml. Next action: run robot suites/main.robot and inspect terminal + artifac… | PASS |
| 119 | chapter-10-final-capstone-project-GENERIC_HELP | fallback | medium | help me | Response should include: Chapter, Objective; and should NOT include: Context: | Chapter 10: Final Capstone Project. Objective: Production-style nested Robot Framework example with 20+ files.. Active file: configs/execution.yaml. Next action: run robot suites/main.robot and inspect terminal + artifac… | PASS |
| 120 | chapter-10-final-capstone-project-VARIABLES_EXPLANATION | variables | medium | how do variables work in this chapter | Response should include: Chapter, Objective; and should NOT include: Context: | Chapter 10: Final Capstone Project. Objective: Production-style nested Robot Framework example with 20+ files.. Active file: configs/execution.yaml. Next action: run robot suites/main.robot and inspect terminal + artifac… | PASS |

## Detailed Test Steps, Expected Result, Actual LLM Result

### 1. chapter-01-introduction-EXPLAIN_PROGRAM (PASS)
- Category: core-content (critical)
- Prompt: explain this program to me
- Test Steps:
  1. Load chapter context: Introduction (chapter-01-introduction)
  2. Set active file: main.robot
  3. Submit prompt to coach: "explain this program to me"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Robot Framework, IDE; and should NOT include: Context:
- Actual LLM Result: This is Robot Framework IDE — Browser-first LocalAI Dev Platform. You load a chapter, edit multi-file tests, run Robot CLI in-browser, then inspect artifacts (output.xml/log.html/report.html). Flow: Chapter → Edit → Execute CLI → Review Artifacts → Ask AI Coach.

### 2. chapter-01-introduction-IMPORT_ZIP (PASS)
- Category: ui-flow (critical)
- Prompt: how to import zip files?
- Test Steps:
  1. Load chapter context: Introduction (chapter-01-introduction)
  2. Set active file: main.robot
  3. Submit prompt to coach: "how to import zip files?"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Import expects a ZIP, tests/*.robot; and should NOT include: Context:
- Actual LLM Result: Import expects a ZIP with project-style paths (example: tests/*.robot, resources/*.resource). On import, current file tree is replaced by ZIP contents. Use Help → Download sample import zip for a known-good structure.

### 3. chapter-01-introduction-RUN_COMMAND (PASS)
- Category: command (critical)
- Prompt: which command should i run now
- Test Steps:
  1. Load chapter context: Introduction (chapter-01-introduction)
  2. Set active file: main.robot
  3. Submit prompt to coach: "which command should i run now"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: run; and should NOT include: Context:
- Actual LLM Result: Chapter 01: Introduction. Objective: Minimal Robot suite and shared resource file.. Active file: main.robot. Next action: run robot main.robot and inspect terminal + artifacts. Ask specific topics (import, debug, reports, quality) for targeted steps.

### 4. chapter-01-introduction-REPORT_FILES (PASS)
- Category: artifacts (critical)
- Prompt: how do i generate report.html and log.html
- Test Steps:
  1. Load chapter context: Introduction (chapter-01-introduction)
  2. Set active file: main.robot
  3. Submit prompt to coach: "how do i generate report.html and log.html"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: --output artifacts/output.xml, report.html; and should NOT include: Context:
- Actual LLM Result: Use explicit artifact flags: `robot --output artifacts/output.xml --log artifacts/log.html --report artifacts/report.html <suite>.robot` No artifacts listed yet. Then click an artifact in left panel to preview.

### 5. chapter-01-introduction-DEBUG_FAILURE (PASS)
- Category: debug (critical)
- Prompt: tests failed, help debug
- Test Steps:
  1. Load chapter context: Introduction (chapter-01-introduction)
  2. Set active file: main.robot
  3. Submit prompt to coach: "tests failed, help debug"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Debug checklist, Re-run:; and should NOT include: Context:
- Actual LLM Result: Debug checklist: 1) Re-run: robot main.robot 2) Structure check: Settings=yes, Test Cases=yes, Keywords=no 3) Validate file path passed to robot command. 4) If fetch/network appears, retry runtime bootstrap and verify connectivity. Terminal tail: Robot IDE ready | Run complete

### 6. chapter-01-introduction-FETCH_FAILURE (PASS)
- Category: debug (high)
- Prompt: fetch failed error, what now
- Test Steps:
  1. Load chapter context: Introduction (chapter-01-introduction)
  2. Set active file: main.robot
  3. Submit prompt to coach: "fetch failed error, what now"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: retry runtime bootstrap, Debug checklist; and should NOT include: Context:
- Actual LLM Result: Debug checklist: 1) Re-run: robot main.robot 2) Structure check: Settings=yes, Test Cases=yes, Keywords=no 3) Validate file path passed to robot command. 4) If fetch/network appears, retry runtime bootstrap and verify connectivity. Terminal tail: Robot IDE ready | Run complete

### 7. chapter-01-introduction-QUALITY_IMPROVEMENT (PASS)
- Category: quality (high)
- Prompt: how can i improve quality of this chapter
- Test Steps:
  1. Load chapter context: Introduction (chapter-01-introduction)
  2. Set active file: main.robot
  3. Submit prompt to coach: "how can i improve quality of this chapter"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Quality upgrades, Current structure; and should NOT include: Context:
- Actual LLM Result: Chapter focus: Minimal Robot suite and shared resource file. Quality upgrades: - clear test names by behavior - reusable keywords in resource files - avoid duplicate steps Current structure: Settings=ok, Test Cases=ok, Keywords=missing

### 8. chapter-01-introduction-ARTIFACT_MISSING (PASS)
- Category: artifacts (high)
- Prompt: artifact not visible in left panel
- Test Steps:
  1. Load chapter context: Introduction (chapter-01-introduction)
  2. Set active file: main.robot
  3. Submit prompt to coach: "artifact not visible in left panel"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: artifacts, left panel; and should NOT include: Context:
- Actual LLM Result: Use explicit artifact flags: `robot --output artifacts/output.xml --log artifacts/log.html --report artifacts/report.html <suite>.robot` No artifacts listed yet. Then click an artifact in left panel to preview.

### 9. chapter-01-introduction-BEGINNER_FIRST_STEPS (PASS)
- Category: beginner-guidance (high)
- Prompt: i am new what are first 3 steps
- Test Steps:
  1. Load chapter context: Introduction (chapter-01-introduction)
  2. Set active file: main.robot
  3. Submit prompt to coach: "i am new what are first 3 steps"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Chapter, Objective; and should NOT include: Context:
- Actual LLM Result: Chapter 01: Introduction. Objective: Minimal Robot suite and shared resource file.. Active file: main.robot. Next action: run robot main.robot and inspect terminal + artifacts. Ask specific topics (import, debug, reports, quality) for targeted steps.

### 10. chapter-01-introduction-NEXT_ACTION (PASS)
- Category: workflow (medium)
- Prompt: what should i do next
- Test Steps:
  1. Load chapter context: Introduction (chapter-01-introduction)
  2. Set active file: main.robot
  3. Submit prompt to coach: "what should i do next"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Next action; and should NOT include: Context:
- Actual LLM Result: Chapter 01: Introduction. Objective: Minimal Robot suite and shared resource file.. Active file: main.robot. Next action: run robot main.robot and inspect terminal + artifacts. Ask specific topics (import, debug, reports, quality) for targeted steps.

### 11. chapter-01-introduction-GENERIC_HELP (PASS)
- Category: fallback (medium)
- Prompt: help me
- Test Steps:
  1. Load chapter context: Introduction (chapter-01-introduction)
  2. Set active file: main.robot
  3. Submit prompt to coach: "help me"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Chapter, Objective; and should NOT include: Context:
- Actual LLM Result: Chapter 01: Introduction. Objective: Minimal Robot suite and shared resource file.. Active file: main.robot. Next action: run robot main.robot and inspect terminal + artifacts. Ask specific topics (import, debug, reports, quality) for targeted steps.

### 12. chapter-01-introduction-VARIABLES_EXPLANATION (PASS)
- Category: variables (medium)
- Prompt: how do variables work in this chapter
- Test Steps:
  1. Load chapter context: Introduction (chapter-01-introduction)
  2. Set active file: main.robot
  3. Submit prompt to coach: "how do variables work in this chapter"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Chapter, Objective; and should NOT include: Context:
- Actual LLM Result: Chapter 01: Introduction. Objective: Minimal Robot suite and shared resource file.. Active file: main.robot. Next action: run robot main.robot and inspect terminal + artifacts. Ask specific topics (import, debug, reports, quality) for targeted steps.

### 13. chapter-02-installation-concepts-EXPLAIN_PROGRAM (PASS)
- Category: core-content (critical)
- Prompt: explain this program to me
- Test Steps:
  1. Load chapter context: Installation Concepts (chapter-02-installation-concepts)
  2. Set active file: libraries/install_notes.py
  3. Submit prompt to coach: "explain this program to me"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Robot Framework, IDE; and should NOT include: Context:
- Actual LLM Result: This is Robot Framework IDE — Browser-first LocalAI Dev Platform. You load a chapter, edit multi-file tests, run Robot CLI in-browser, then inspect artifacts (output.xml/log.html/report.html). Flow: Chapter → Edit → Execute CLI → Review Artifacts → Ask AI Coach.

### 14. chapter-02-installation-concepts-IMPORT_ZIP (PASS)
- Category: ui-flow (critical)
- Prompt: how to import zip files?
- Test Steps:
  1. Load chapter context: Installation Concepts (chapter-02-installation-concepts)
  2. Set active file: libraries/install_notes.py
  3. Submit prompt to coach: "how to import zip files?"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Import expects a ZIP, tests/*.robot; and should NOT include: Context:
- Actual LLM Result: Import expects a ZIP with project-style paths (example: tests/*.robot, resources/*.resource). On import, current file tree is replaced by ZIP contents. Use Help → Download sample import zip for a known-good structure.

### 15. chapter-02-installation-concepts-RUN_COMMAND (PASS)
- Category: command (critical)
- Prompt: which command should i run now
- Test Steps:
  1. Load chapter context: Installation Concepts (chapter-02-installation-concepts)
  2. Set active file: libraries/install_notes.py
  3. Submit prompt to coach: "which command should i run now"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: run; and should NOT include: Context:
- Actual LLM Result: Chapter 02: Installation Concepts. Objective: Dependency and environment awareness in a chapter bundle.. Active file: libraries/install_notes.py. Next action: run robot main.robot and inspect terminal + artifacts. Ask specific topics (import, debug, reports, quality) for targeted steps.

### 16. chapter-02-installation-concepts-REPORT_FILES (PASS)
- Category: artifacts (critical)
- Prompt: how do i generate report.html and log.html
- Test Steps:
  1. Load chapter context: Installation Concepts (chapter-02-installation-concepts)
  2. Set active file: libraries/install_notes.py
  3. Submit prompt to coach: "how do i generate report.html and log.html"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: --output artifacts/output.xml, report.html; and should NOT include: Context:
- Actual LLM Result: Use explicit artifact flags: `robot --output artifacts/output.xml --log artifacts/log.html --report artifacts/report.html <suite>.robot` No artifacts listed yet. Then click an artifact in left panel to preview.

### 17. chapter-02-installation-concepts-DEBUG_FAILURE (PASS)
- Category: debug (critical)
- Prompt: tests failed, help debug
- Test Steps:
  1. Load chapter context: Installation Concepts (chapter-02-installation-concepts)
  2. Set active file: libraries/install_notes.py
  3. Submit prompt to coach: "tests failed, help debug"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Debug checklist, Re-run:; and should NOT include: Context:
- Actual LLM Result: Debug checklist: 1) Re-run: robot main.robot 2) Structure check: Settings=no, Test Cases=no, Keywords=no 3) Validate file path passed to robot command. 4) If fetch/network appears, retry runtime bootstrap and verify connectivity. Terminal tail: Robot IDE ready | Run complete

### 18. chapter-02-installation-concepts-FETCH_FAILURE (PASS)
- Category: debug (high)
- Prompt: fetch failed error, what now
- Test Steps:
  1. Load chapter context: Installation Concepts (chapter-02-installation-concepts)
  2. Set active file: libraries/install_notes.py
  3. Submit prompt to coach: "fetch failed error, what now"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: retry runtime bootstrap, Debug checklist; and should NOT include: Context:
- Actual LLM Result: Debug checklist: 1) Re-run: robot main.robot 2) Structure check: Settings=no, Test Cases=no, Keywords=no 3) Validate file path passed to robot command. 4) If fetch/network appears, retry runtime bootstrap and verify connectivity. Terminal tail: Robot IDE ready | Run complete

### 19. chapter-02-installation-concepts-QUALITY_IMPROVEMENT (PASS)
- Category: quality (high)
- Prompt: how can i improve quality of this chapter
- Test Steps:
  1. Load chapter context: Installation Concepts (chapter-02-installation-concepts)
  2. Set active file: libraries/install_notes.py
  3. Submit prompt to coach: "how can i improve quality of this chapter"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Quality upgrades, Current structure; and should NOT include: Context:
- Actual LLM Result: Chapter focus: Dependency and environment awareness in a chapter bundle. Quality upgrades: - clear test names by behavior - reusable keywords in resource files - avoid duplicate steps Current structure: Settings=missing, Test Cases=missing, Keywords=missing

### 20. chapter-02-installation-concepts-ARTIFACT_MISSING (PASS)
- Category: artifacts (high)
- Prompt: artifact not visible in left panel
- Test Steps:
  1. Load chapter context: Installation Concepts (chapter-02-installation-concepts)
  2. Set active file: libraries/install_notes.py
  3. Submit prompt to coach: "artifact not visible in left panel"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: artifacts, left panel; and should NOT include: Context:
- Actual LLM Result: Use explicit artifact flags: `robot --output artifacts/output.xml --log artifacts/log.html --report artifacts/report.html <suite>.robot` No artifacts listed yet. Then click an artifact in left panel to preview.

### 21. chapter-02-installation-concepts-BEGINNER_FIRST_STEPS (PASS)
- Category: beginner-guidance (high)
- Prompt: i am new what are first 3 steps
- Test Steps:
  1. Load chapter context: Installation Concepts (chapter-02-installation-concepts)
  2. Set active file: libraries/install_notes.py
  3. Submit prompt to coach: "i am new what are first 3 steps"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Chapter, Objective; and should NOT include: Context:
- Actual LLM Result: Chapter 02: Installation Concepts. Objective: Dependency and environment awareness in a chapter bundle.. Active file: libraries/install_notes.py. Next action: run robot main.robot and inspect terminal + artifacts. Ask specific topics (import, debug, reports, quality) for targeted steps.

### 22. chapter-02-installation-concepts-NEXT_ACTION (PASS)
- Category: workflow (medium)
- Prompt: what should i do next
- Test Steps:
  1. Load chapter context: Installation Concepts (chapter-02-installation-concepts)
  2. Set active file: libraries/install_notes.py
  3. Submit prompt to coach: "what should i do next"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Next action; and should NOT include: Context:
- Actual LLM Result: Chapter 02: Installation Concepts. Objective: Dependency and environment awareness in a chapter bundle.. Active file: libraries/install_notes.py. Next action: run robot main.robot and inspect terminal + artifacts. Ask specific topics (import, debug, reports, quality) for targeted steps.

### 23. chapter-02-installation-concepts-GENERIC_HELP (PASS)
- Category: fallback (medium)
- Prompt: help me
- Test Steps:
  1. Load chapter context: Installation Concepts (chapter-02-installation-concepts)
  2. Set active file: libraries/install_notes.py
  3. Submit prompt to coach: "help me"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Chapter, Objective; and should NOT include: Context:
- Actual LLM Result: Chapter 02: Installation Concepts. Objective: Dependency and environment awareness in a chapter bundle.. Active file: libraries/install_notes.py. Next action: run robot main.robot and inspect terminal + artifacts. Ask specific topics (import, debug, reports, quality) for targeted steps.

### 24. chapter-02-installation-concepts-VARIABLES_EXPLANATION (PASS)
- Category: variables (medium)
- Prompt: how do variables work in this chapter
- Test Steps:
  1. Load chapter context: Installation Concepts (chapter-02-installation-concepts)
  2. Set active file: libraries/install_notes.py
  3. Submit prompt to coach: "how do variables work in this chapter"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Chapter, Objective; and should NOT include: Context:
- Actual LLM Result: Chapter 02: Installation Concepts. Objective: Dependency and environment awareness in a chapter bundle.. Active file: libraries/install_notes.py. Next action: run robot main.robot and inspect terminal + artifacts. Ask specific topics (import, debug, reports, quality) for targeted steps.

### 25. chapter-03-robot-framework-basics-EXPLAIN_PROGRAM (PASS)
- Category: core-content (critical)
- Prompt: explain this program to me
- Test Steps:
  1. Load chapter context: Robot Framework Basics (chapter-03-robot-framework-basics)
  2. Set active file: data/test_data.json
  3. Submit prompt to coach: "explain this program to me"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Robot Framework, IDE; and should NOT include: Context:
- Actual LLM Result: This is Robot Framework IDE — Browser-first LocalAI Dev Platform. You load a chapter, edit multi-file tests, run Robot CLI in-browser, then inspect artifacts (output.xml/log.html/report.html). Flow: Chapter → Edit → Execute CLI → Review Artifacts → Ask AI Coach.

### 26. chapter-03-robot-framework-basics-IMPORT_ZIP (PASS)
- Category: ui-flow (critical)
- Prompt: how to import zip files?
- Test Steps:
  1. Load chapter context: Robot Framework Basics (chapter-03-robot-framework-basics)
  2. Set active file: data/test_data.json
  3. Submit prompt to coach: "how to import zip files?"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Import expects a ZIP, tests/*.robot; and should NOT include: Context:
- Actual LLM Result: Import expects a ZIP with project-style paths (example: tests/*.robot, resources/*.resource). On import, current file tree is replaced by ZIP contents. Use Help → Download sample import zip for a known-good structure.

### 27. chapter-03-robot-framework-basics-RUN_COMMAND (PASS)
- Category: command (critical)
- Prompt: which command should i run now
- Test Steps:
  1. Load chapter context: Robot Framework Basics (chapter-03-robot-framework-basics)
  2. Set active file: data/test_data.json
  3. Submit prompt to coach: "which command should i run now"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: run; and should NOT include: Context:
- Actual LLM Result: Chapter 03: Robot Framework Basics. Objective: Core suite, keywords, and data structure.. Active file: data/test_data.json. Next action: run robot suite.robot and inspect terminal + artifacts. Ask specific topics (import, debug, reports, quality) for targeted steps.

### 28. chapter-03-robot-framework-basics-REPORT_FILES (PASS)
- Category: artifacts (critical)
- Prompt: how do i generate report.html and log.html
- Test Steps:
  1. Load chapter context: Robot Framework Basics (chapter-03-robot-framework-basics)
  2. Set active file: data/test_data.json
  3. Submit prompt to coach: "how do i generate report.html and log.html"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: --output artifacts/output.xml, report.html; and should NOT include: Context:
- Actual LLM Result: Use explicit artifact flags: `robot --output artifacts/output.xml --log artifacts/log.html --report artifacts/report.html <suite>.robot` No artifacts listed yet. Then click an artifact in left panel to preview.

### 29. chapter-03-robot-framework-basics-DEBUG_FAILURE (PASS)
- Category: debug (critical)
- Prompt: tests failed, help debug
- Test Steps:
  1. Load chapter context: Robot Framework Basics (chapter-03-robot-framework-basics)
  2. Set active file: data/test_data.json
  3. Submit prompt to coach: "tests failed, help debug"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Debug checklist, Re-run:; and should NOT include: Context:
- Actual LLM Result: Debug checklist: 1) Re-run: robot suite.robot 2) Structure check: Settings=no, Test Cases=no, Keywords=no 3) Validate file path passed to robot command. 4) If fetch/network appears, retry runtime bootstrap and verify connectivity. Terminal tail: Robot IDE ready | Run complete

### 30. chapter-03-robot-framework-basics-FETCH_FAILURE (PASS)
- Category: debug (high)
- Prompt: fetch failed error, what now
- Test Steps:
  1. Load chapter context: Robot Framework Basics (chapter-03-robot-framework-basics)
  2. Set active file: data/test_data.json
  3. Submit prompt to coach: "fetch failed error, what now"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: retry runtime bootstrap, Debug checklist; and should NOT include: Context:
- Actual LLM Result: Debug checklist: 1) Re-run: robot suite.robot 2) Structure check: Settings=no, Test Cases=no, Keywords=no 3) Validate file path passed to robot command. 4) If fetch/network appears, retry runtime bootstrap and verify connectivity. Terminal tail: Robot IDE ready | Run complete

### 31. chapter-03-robot-framework-basics-QUALITY_IMPROVEMENT (PASS)
- Category: quality (high)
- Prompt: how can i improve quality of this chapter
- Test Steps:
  1. Load chapter context: Robot Framework Basics (chapter-03-robot-framework-basics)
  2. Set active file: data/test_data.json
  3. Submit prompt to coach: "how can i improve quality of this chapter"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Quality upgrades, Current structure; and should NOT include: Context:
- Actual LLM Result: Chapter focus: Core suite, keywords, and data structure. Quality upgrades: - clear test names by behavior - reusable keywords in resource files - avoid duplicate steps Current structure: Settings=missing, Test Cases=missing, Keywords=missing

### 32. chapter-03-robot-framework-basics-ARTIFACT_MISSING (PASS)
- Category: artifacts (high)
- Prompt: artifact not visible in left panel
- Test Steps:
  1. Load chapter context: Robot Framework Basics (chapter-03-robot-framework-basics)
  2. Set active file: data/test_data.json
  3. Submit prompt to coach: "artifact not visible in left panel"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: artifacts, left panel; and should NOT include: Context:
- Actual LLM Result: Use explicit artifact flags: `robot --output artifacts/output.xml --log artifacts/log.html --report artifacts/report.html <suite>.robot` No artifacts listed yet. Then click an artifact in left panel to preview.

### 33. chapter-03-robot-framework-basics-BEGINNER_FIRST_STEPS (PASS)
- Category: beginner-guidance (high)
- Prompt: i am new what are first 3 steps
- Test Steps:
  1. Load chapter context: Robot Framework Basics (chapter-03-robot-framework-basics)
  2. Set active file: data/test_data.json
  3. Submit prompt to coach: "i am new what are first 3 steps"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Chapter, Objective; and should NOT include: Context:
- Actual LLM Result: Chapter 03: Robot Framework Basics. Objective: Core suite, keywords, and data structure.. Active file: data/test_data.json. Next action: run robot suite.robot and inspect terminal + artifacts. Ask specific topics (import, debug, reports, quality) for targeted steps.

### 34. chapter-03-robot-framework-basics-NEXT_ACTION (PASS)
- Category: workflow (medium)
- Prompt: what should i do next
- Test Steps:
  1. Load chapter context: Robot Framework Basics (chapter-03-robot-framework-basics)
  2. Set active file: data/test_data.json
  3. Submit prompt to coach: "what should i do next"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Next action; and should NOT include: Context:
- Actual LLM Result: Chapter 03: Robot Framework Basics. Objective: Core suite, keywords, and data structure.. Active file: data/test_data.json. Next action: run robot suite.robot and inspect terminal + artifacts. Ask specific topics (import, debug, reports, quality) for targeted steps.

### 35. chapter-03-robot-framework-basics-GENERIC_HELP (PASS)
- Category: fallback (medium)
- Prompt: help me
- Test Steps:
  1. Load chapter context: Robot Framework Basics (chapter-03-robot-framework-basics)
  2. Set active file: data/test_data.json
  3. Submit prompt to coach: "help me"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Chapter, Objective; and should NOT include: Context:
- Actual LLM Result: Chapter 03: Robot Framework Basics. Objective: Core suite, keywords, and data structure.. Active file: data/test_data.json. Next action: run robot suite.robot and inspect terminal + artifacts. Ask specific topics (import, debug, reports, quality) for targeted steps.

### 36. chapter-03-robot-framework-basics-VARIABLES_EXPLANATION (PASS)
- Category: variables (medium)
- Prompt: how do variables work in this chapter
- Test Steps:
  1. Load chapter context: Robot Framework Basics (chapter-03-robot-framework-basics)
  2. Set active file: data/test_data.json
  3. Submit prompt to coach: "how do variables work in this chapter"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Chapter, Objective; and should NOT include: Context:
- Actual LLM Result: Chapter 03: Robot Framework Basics. Objective: Core suite, keywords, and data structure.. Active file: data/test_data.json. Next action: run robot suite.robot and inspect terminal + artifacts. Ask specific topics (import, debug, reports, quality) for targeted steps.

### 37. chapter-04-multi-file-architecture-EXPLAIN_PROGRAM (PASS)
- Category: core-content (critical)
- Prompt: explain this program to me
- Test Steps:
  1. Load chapter context: Multi-file Architecture (chapter-04-multi-file-architecture)
  2. Set active file: helpers/constants.py
  3. Submit prompt to coach: "explain this program to me"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Robot Framework, IDE; and should NOT include: Context:
- Actual LLM Result: This is Robot Framework IDE — Browser-first LocalAI Dev Platform. You load a chapter, edit multi-file tests, run Robot CLI in-browser, then inspect artifacts (output.xml/log.html/report.html). Flow: Chapter → Edit → Execute CLI → Review Artifacts → Ask AI Coach.

### 38. chapter-04-multi-file-architecture-IMPORT_ZIP (PASS)
- Category: ui-flow (critical)
- Prompt: how to import zip files?
- Test Steps:
  1. Load chapter context: Multi-file Architecture (chapter-04-multi-file-architecture)
  2. Set active file: helpers/constants.py
  3. Submit prompt to coach: "how to import zip files?"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Import expects a ZIP, tests/*.robot; and should NOT include: Context:
- Actual LLM Result: Import expects a ZIP with project-style paths (example: tests/*.robot, resources/*.resource). On import, current file tree is replaced by ZIP contents. Use Help → Download sample import zip for a known-good structure.

### 39. chapter-04-multi-file-architecture-RUN_COMMAND (PASS)
- Category: command (critical)
- Prompt: which command should i run now
- Test Steps:
  1. Load chapter context: Multi-file Architecture (chapter-04-multi-file-architecture)
  2. Set active file: helpers/constants.py
  3. Submit prompt to coach: "which command should i run now"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: run; and should NOT include: Context:
- Actual LLM Result: Chapter 04: Multi-file Architecture. Objective: Nested folders with resources and Python helpers.. Active file: helpers/constants.py. Next action: run robot suites/main.robot and inspect terminal + artifacts. Ask specific topics (import, debug, reports, quality) for targeted steps.

### 40. chapter-04-multi-file-architecture-REPORT_FILES (PASS)
- Category: artifacts (critical)
- Prompt: how do i generate report.html and log.html
- Test Steps:
  1. Load chapter context: Multi-file Architecture (chapter-04-multi-file-architecture)
  2. Set active file: helpers/constants.py
  3. Submit prompt to coach: "how do i generate report.html and log.html"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: --output artifacts/output.xml, report.html; and should NOT include: Context:
- Actual LLM Result: Use explicit artifact flags: `robot --output artifacts/output.xml --log artifacts/log.html --report artifacts/report.html <suite>.robot` No artifacts listed yet. Then click an artifact in left panel to preview.

### 41. chapter-04-multi-file-architecture-DEBUG_FAILURE (PASS)
- Category: debug (critical)
- Prompt: tests failed, help debug
- Test Steps:
  1. Load chapter context: Multi-file Architecture (chapter-04-multi-file-architecture)
  2. Set active file: helpers/constants.py
  3. Submit prompt to coach: "tests failed, help debug"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Debug checklist, Re-run:; and should NOT include: Context:
- Actual LLM Result: Debug checklist: 1) Re-run: robot suites/main.robot 2) Structure check: Settings=no, Test Cases=no, Keywords=no 3) Validate file path passed to robot command. 4) If fetch/network appears, retry runtime bootstrap and verify connectivity. Terminal tail: Robot IDE ready | Run complete

### 42. chapter-04-multi-file-architecture-FETCH_FAILURE (PASS)
- Category: debug (high)
- Prompt: fetch failed error, what now
- Test Steps:
  1. Load chapter context: Multi-file Architecture (chapter-04-multi-file-architecture)
  2. Set active file: helpers/constants.py
  3. Submit prompt to coach: "fetch failed error, what now"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: retry runtime bootstrap, Debug checklist; and should NOT include: Context:
- Actual LLM Result: Debug checklist: 1) Re-run: robot suites/main.robot 2) Structure check: Settings=no, Test Cases=no, Keywords=no 3) Validate file path passed to robot command. 4) If fetch/network appears, retry runtime bootstrap and verify connectivity. Terminal tail: Robot IDE ready | Run complete

### 43. chapter-04-multi-file-architecture-QUALITY_IMPROVEMENT (PASS)
- Category: quality (high)
- Prompt: how can i improve quality of this chapter
- Test Steps:
  1. Load chapter context: Multi-file Architecture (chapter-04-multi-file-architecture)
  2. Set active file: helpers/constants.py
  3. Submit prompt to coach: "how can i improve quality of this chapter"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Quality upgrades, Current structure; and should NOT include: Context:
- Actual LLM Result: Chapter focus: Nested folders with resources and Python helpers. Quality upgrades: - clear test names by behavior - reusable keywords in resource files - avoid duplicate steps Current structure: Settings=missing, Test Cases=missing, Keywords=missing

### 44. chapter-04-multi-file-architecture-ARTIFACT_MISSING (PASS)
- Category: artifacts (high)
- Prompt: artifact not visible in left panel
- Test Steps:
  1. Load chapter context: Multi-file Architecture (chapter-04-multi-file-architecture)
  2. Set active file: helpers/constants.py
  3. Submit prompt to coach: "artifact not visible in left panel"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: artifacts, left panel; and should NOT include: Context:
- Actual LLM Result: Use explicit artifact flags: `robot --output artifacts/output.xml --log artifacts/log.html --report artifacts/report.html <suite>.robot` No artifacts listed yet. Then click an artifact in left panel to preview.

### 45. chapter-04-multi-file-architecture-BEGINNER_FIRST_STEPS (PASS)
- Category: beginner-guidance (high)
- Prompt: i am new what are first 3 steps
- Test Steps:
  1. Load chapter context: Multi-file Architecture (chapter-04-multi-file-architecture)
  2. Set active file: helpers/constants.py
  3. Submit prompt to coach: "i am new what are first 3 steps"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Chapter, Objective; and should NOT include: Context:
- Actual LLM Result: Chapter 04: Multi-file Architecture. Objective: Nested folders with resources and Python helpers.. Active file: helpers/constants.py. Next action: run robot suites/main.robot and inspect terminal + artifacts. Ask specific topics (import, debug, reports, quality) for targeted steps.

### 46. chapter-04-multi-file-architecture-NEXT_ACTION (PASS)
- Category: workflow (medium)
- Prompt: what should i do next
- Test Steps:
  1. Load chapter context: Multi-file Architecture (chapter-04-multi-file-architecture)
  2. Set active file: helpers/constants.py
  3. Submit prompt to coach: "what should i do next"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Next action; and should NOT include: Context:
- Actual LLM Result: Chapter 04: Multi-file Architecture. Objective: Nested folders with resources and Python helpers.. Active file: helpers/constants.py. Next action: run robot suites/main.robot and inspect terminal + artifacts. Ask specific topics (import, debug, reports, quality) for targeted steps.

### 47. chapter-04-multi-file-architecture-GENERIC_HELP (PASS)
- Category: fallback (medium)
- Prompt: help me
- Test Steps:
  1. Load chapter context: Multi-file Architecture (chapter-04-multi-file-architecture)
  2. Set active file: helpers/constants.py
  3. Submit prompt to coach: "help me"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Chapter, Objective; and should NOT include: Context:
- Actual LLM Result: Chapter 04: Multi-file Architecture. Objective: Nested folders with resources and Python helpers.. Active file: helpers/constants.py. Next action: run robot suites/main.robot and inspect terminal + artifacts. Ask specific topics (import, debug, reports, quality) for targeted steps.

### 48. chapter-04-multi-file-architecture-VARIABLES_EXPLANATION (PASS)
- Category: variables (medium)
- Prompt: how do variables work in this chapter
- Test Steps:
  1. Load chapter context: Multi-file Architecture (chapter-04-multi-file-architecture)
  2. Set active file: helpers/constants.py
  3. Submit prompt to coach: "how do variables work in this chapter"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Chapter, Objective; and should NOT include: Context:
- Actual LLM Result: Chapter 04: Multi-file Architecture. Objective: Nested folders with resources and Python helpers.. Active file: helpers/constants.py. Next action: run robot suites/main.robot and inspect terminal + artifacts. Ask specific topics (import, debug, reports, quality) for targeted steps.

### 49. chapter-05-advanced-keywords-EXPLAIN_PROGRAM (PASS)
- Category: core-content (critical)
- Prompt: explain this program to me
- Test Steps:
  1. Load chapter context: Advanced Keywords (chapter-05-advanced-keywords)
  2. Set active file: keywords/advanced.resource
  3. Submit prompt to coach: "explain this program to me"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Robot Framework, IDE; and should NOT include: Context:
- Actual LLM Result: This is Robot Framework IDE — Browser-first LocalAI Dev Platform. You load a chapter, edit multi-file tests, run Robot CLI in-browser, then inspect artifacts (output.xml/log.html/report.html). Flow: Chapter → Edit → Execute CLI → Review Artifacts → Ask AI Coach.

### 50. chapter-05-advanced-keywords-IMPORT_ZIP (PASS)
- Category: ui-flow (critical)
- Prompt: how to import zip files?
- Test Steps:
  1. Load chapter context: Advanced Keywords (chapter-05-advanced-keywords)
  2. Set active file: keywords/advanced.resource
  3. Submit prompt to coach: "how to import zip files?"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Import expects a ZIP, tests/*.robot; and should NOT include: Context:
- Actual LLM Result: Import expects a ZIP with project-style paths (example: tests/*.robot, resources/*.resource). On import, current file tree is replaced by ZIP contents. Use Help → Download sample import zip for a known-good structure.

### 51. chapter-05-advanced-keywords-RUN_COMMAND (PASS)
- Category: command (critical)
- Prompt: which command should i run now
- Test Steps:
  1. Load chapter context: Advanced Keywords (chapter-05-advanced-keywords)
  2. Set active file: keywords/advanced.resource
  3. Submit prompt to coach: "which command should i run now"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: run; and should NOT include: Context:
- Actual LLM Result: Chapter 05: Advanced Keywords. Objective: Composable keyword architecture with explicit assertions.. Active file: keywords/advanced.resource. Next action: run robot main.robot and inspect terminal + artifacts. Ask specific topics (import, debug, reports, quality) for targeted steps.

### 52. chapter-05-advanced-keywords-REPORT_FILES (PASS)
- Category: artifacts (critical)
- Prompt: how do i generate report.html and log.html
- Test Steps:
  1. Load chapter context: Advanced Keywords (chapter-05-advanced-keywords)
  2. Set active file: keywords/advanced.resource
  3. Submit prompt to coach: "how do i generate report.html and log.html"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: --output artifacts/output.xml, report.html; and should NOT include: Context:
- Actual LLM Result: Use explicit artifact flags: `robot --output artifacts/output.xml --log artifacts/log.html --report artifacts/report.html <suite>.robot` No artifacts listed yet. Then click an artifact in left panel to preview.

### 53. chapter-05-advanced-keywords-DEBUG_FAILURE (PASS)
- Category: debug (critical)
- Prompt: tests failed, help debug
- Test Steps:
  1. Load chapter context: Advanced Keywords (chapter-05-advanced-keywords)
  2. Set active file: keywords/advanced.resource
  3. Submit prompt to coach: "tests failed, help debug"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Debug checklist, Re-run:; and should NOT include: Context:
- Actual LLM Result: Debug checklist: 1) Re-run: robot main.robot 2) Structure check: Settings=no, Test Cases=no, Keywords=yes 3) Validate file path passed to robot command. 4) If fetch/network appears, retry runtime bootstrap and verify connectivity. Terminal tail: Robot IDE ready | Run complete

### 54. chapter-05-advanced-keywords-FETCH_FAILURE (PASS)
- Category: debug (high)
- Prompt: fetch failed error, what now
- Test Steps:
  1. Load chapter context: Advanced Keywords (chapter-05-advanced-keywords)
  2. Set active file: keywords/advanced.resource
  3. Submit prompt to coach: "fetch failed error, what now"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: retry runtime bootstrap, Debug checklist; and should NOT include: Context:
- Actual LLM Result: Debug checklist: 1) Re-run: robot main.robot 2) Structure check: Settings=no, Test Cases=no, Keywords=yes 3) Validate file path passed to robot command. 4) If fetch/network appears, retry runtime bootstrap and verify connectivity. Terminal tail: Robot IDE ready | Run complete

### 55. chapter-05-advanced-keywords-QUALITY_IMPROVEMENT (PASS)
- Category: quality (high)
- Prompt: how can i improve quality of this chapter
- Test Steps:
  1. Load chapter context: Advanced Keywords (chapter-05-advanced-keywords)
  2. Set active file: keywords/advanced.resource
  3. Submit prompt to coach: "how can i improve quality of this chapter"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Quality upgrades, Current structure; and should NOT include: Context:
- Actual LLM Result: Chapter focus: Composable keyword architecture with explicit assertions. Quality upgrades: - clear test names by behavior - reusable keywords in resource files - avoid duplicate steps Current structure: Settings=missing, Test Cases=missing, Keywords=ok

### 56. chapter-05-advanced-keywords-ARTIFACT_MISSING (PASS)
- Category: artifacts (high)
- Prompt: artifact not visible in left panel
- Test Steps:
  1. Load chapter context: Advanced Keywords (chapter-05-advanced-keywords)
  2. Set active file: keywords/advanced.resource
  3. Submit prompt to coach: "artifact not visible in left panel"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: artifacts, left panel; and should NOT include: Context:
- Actual LLM Result: Use explicit artifact flags: `robot --output artifacts/output.xml --log artifacts/log.html --report artifacts/report.html <suite>.robot` No artifacts listed yet. Then click an artifact in left panel to preview.

### 57. chapter-05-advanced-keywords-BEGINNER_FIRST_STEPS (PASS)
- Category: beginner-guidance (high)
- Prompt: i am new what are first 3 steps
- Test Steps:
  1. Load chapter context: Advanced Keywords (chapter-05-advanced-keywords)
  2. Set active file: keywords/advanced.resource
  3. Submit prompt to coach: "i am new what are first 3 steps"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Chapter, Objective; and should NOT include: Context:
- Actual LLM Result: Chapter 05: Advanced Keywords. Objective: Composable keyword architecture with explicit assertions.. Active file: keywords/advanced.resource. Next action: run robot main.robot and inspect terminal + artifacts. Ask specific topics (import, debug, reports, quality) for targeted steps.

### 58. chapter-05-advanced-keywords-NEXT_ACTION (PASS)
- Category: workflow (medium)
- Prompt: what should i do next
- Test Steps:
  1. Load chapter context: Advanced Keywords (chapter-05-advanced-keywords)
  2. Set active file: keywords/advanced.resource
  3. Submit prompt to coach: "what should i do next"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Next action; and should NOT include: Context:
- Actual LLM Result: Chapter 05: Advanced Keywords. Objective: Composable keyword architecture with explicit assertions.. Active file: keywords/advanced.resource. Next action: run robot main.robot and inspect terminal + artifacts. Ask specific topics (import, debug, reports, quality) for targeted steps.

### 59. chapter-05-advanced-keywords-GENERIC_HELP (PASS)
- Category: fallback (medium)
- Prompt: help me
- Test Steps:
  1. Load chapter context: Advanced Keywords (chapter-05-advanced-keywords)
  2. Set active file: keywords/advanced.resource
  3. Submit prompt to coach: "help me"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Chapter, Objective; and should NOT include: Context:
- Actual LLM Result: Chapter 05: Advanced Keywords. Objective: Composable keyword architecture with explicit assertions.. Active file: keywords/advanced.resource. Next action: run robot main.robot and inspect terminal + artifacts. Ask specific topics (import, debug, reports, quality) for targeted steps.

### 60. chapter-05-advanced-keywords-VARIABLES_EXPLANATION (PASS)
- Category: variables (medium)
- Prompt: how do variables work in this chapter
- Test Steps:
  1. Load chapter context: Advanced Keywords (chapter-05-advanced-keywords)
  2. Set active file: keywords/advanced.resource
  3. Submit prompt to coach: "how do variables work in this chapter"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Chapter, Objective; and should NOT include: Context:
- Actual LLM Result: Chapter 05: Advanced Keywords. Objective: Composable keyword architecture with explicit assertions.. Active file: keywords/advanced.resource. Next action: run robot main.robot and inspect terminal + artifacts. Ask specific topics (import, debug, reports, quality) for targeted steps.

### 61. chapter-06-python-integration-EXPLAIN_PROGRAM (PASS)
- Category: core-content (critical)
- Prompt: explain this program to me
- Test Steps:
  1. Load chapter context: Python Integration (chapter-06-python-integration)
  2. Set active file: libraries/math_lib.py
  3. Submit prompt to coach: "explain this program to me"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Robot Framework, IDE; and should NOT include: Context:
- Actual LLM Result: This is Robot Framework IDE — Browser-first LocalAI Dev Platform. You load a chapter, edit multi-file tests, run Robot CLI in-browser, then inspect artifacts (output.xml/log.html/report.html). Flow: Chapter → Edit → Execute CLI → Review Artifacts → Ask AI Coach.

### 62. chapter-06-python-integration-IMPORT_ZIP (PASS)
- Category: ui-flow (critical)
- Prompt: how to import zip files?
- Test Steps:
  1. Load chapter context: Python Integration (chapter-06-python-integration)
  2. Set active file: libraries/math_lib.py
  3. Submit prompt to coach: "how to import zip files?"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Import expects a ZIP, tests/*.robot; and should NOT include: Context:
- Actual LLM Result: Import expects a ZIP with project-style paths (example: tests/*.robot, resources/*.resource). On import, current file tree is replaced by ZIP contents. Use Help → Download sample import zip for a known-good structure.

### 63. chapter-06-python-integration-RUN_COMMAND (PASS)
- Category: command (critical)
- Prompt: which command should i run now
- Test Steps:
  1. Load chapter context: Python Integration (chapter-06-python-integration)
  2. Set active file: libraries/math_lib.py
  3. Submit prompt to coach: "which command should i run now"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: run; and should NOT include: Context:
- Actual LLM Result: Chapter 06: Python Integration. Objective: Robot suites that call Python libraries.. Active file: libraries/math_lib.py. Next action: run robot suites/python_integration.robot and inspect terminal + artifacts. Ask specific topics (import, debug, reports, quality) for targeted steps.

### 64. chapter-06-python-integration-REPORT_FILES (PASS)
- Category: artifacts (critical)
- Prompt: how do i generate report.html and log.html
- Test Steps:
  1. Load chapter context: Python Integration (chapter-06-python-integration)
  2. Set active file: libraries/math_lib.py
  3. Submit prompt to coach: "how do i generate report.html and log.html"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: --output artifacts/output.xml, report.html; and should NOT include: Context:
- Actual LLM Result: Use explicit artifact flags: `robot --output artifacts/output.xml --log artifacts/log.html --report artifacts/report.html <suite>.robot` No artifacts listed yet. Then click an artifact in left panel to preview.

### 65. chapter-06-python-integration-DEBUG_FAILURE (PASS)
- Category: debug (critical)
- Prompt: tests failed, help debug
- Test Steps:
  1. Load chapter context: Python Integration (chapter-06-python-integration)
  2. Set active file: libraries/math_lib.py
  3. Submit prompt to coach: "tests failed, help debug"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Debug checklist, Re-run:; and should NOT include: Context:
- Actual LLM Result: Debug checklist: 1) Re-run: robot suites/python_integration.robot 2) Structure check: Settings=no, Test Cases=no, Keywords=no 3) Validate file path passed to robot command. 4) If fetch/network appears, retry runtime bootstrap and verify connectivity. Terminal tail: Robot IDE ready | Run complete

### 66. chapter-06-python-integration-FETCH_FAILURE (PASS)
- Category: debug (high)
- Prompt: fetch failed error, what now
- Test Steps:
  1. Load chapter context: Python Integration (chapter-06-python-integration)
  2. Set active file: libraries/math_lib.py
  3. Submit prompt to coach: "fetch failed error, what now"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: retry runtime bootstrap, Debug checklist; and should NOT include: Context:
- Actual LLM Result: Debug checklist: 1) Re-run: robot suites/python_integration.robot 2) Structure check: Settings=no, Test Cases=no, Keywords=no 3) Validate file path passed to robot command. 4) If fetch/network appears, retry runtime bootstrap and verify connectivity. Terminal tail: Robot IDE ready | Run complete

### 67. chapter-06-python-integration-QUALITY_IMPROVEMENT (PASS)
- Category: quality (high)
- Prompt: how can i improve quality of this chapter
- Test Steps:
  1. Load chapter context: Python Integration (chapter-06-python-integration)
  2. Set active file: libraries/math_lib.py
  3. Submit prompt to coach: "how can i improve quality of this chapter"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Quality upgrades, Current structure; and should NOT include: Context:
- Actual LLM Result: Chapter focus: Robot suites that call Python libraries. Quality upgrades: - clear test names by behavior - reusable keywords in resource files - avoid duplicate steps Current structure: Settings=missing, Test Cases=missing, Keywords=missing

### 68. chapter-06-python-integration-ARTIFACT_MISSING (PASS)
- Category: artifacts (high)
- Prompt: artifact not visible in left panel
- Test Steps:
  1. Load chapter context: Python Integration (chapter-06-python-integration)
  2. Set active file: libraries/math_lib.py
  3. Submit prompt to coach: "artifact not visible in left panel"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: artifacts, left panel; and should NOT include: Context:
- Actual LLM Result: Use explicit artifact flags: `robot --output artifacts/output.xml --log artifacts/log.html --report artifacts/report.html <suite>.robot` No artifacts listed yet. Then click an artifact in left panel to preview.

### 69. chapter-06-python-integration-BEGINNER_FIRST_STEPS (PASS)
- Category: beginner-guidance (high)
- Prompt: i am new what are first 3 steps
- Test Steps:
  1. Load chapter context: Python Integration (chapter-06-python-integration)
  2. Set active file: libraries/math_lib.py
  3. Submit prompt to coach: "i am new what are first 3 steps"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Chapter, Objective; and should NOT include: Context:
- Actual LLM Result: Chapter 06: Python Integration. Objective: Robot suites that call Python libraries.. Active file: libraries/math_lib.py. Next action: run robot suites/python_integration.robot and inspect terminal + artifacts. Ask specific topics (import, debug, reports, quality) for targeted steps.

### 70. chapter-06-python-integration-NEXT_ACTION (PASS)
- Category: workflow (medium)
- Prompt: what should i do next
- Test Steps:
  1. Load chapter context: Python Integration (chapter-06-python-integration)
  2. Set active file: libraries/math_lib.py
  3. Submit prompt to coach: "what should i do next"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Next action; and should NOT include: Context:
- Actual LLM Result: Chapter 06: Python Integration. Objective: Robot suites that call Python libraries.. Active file: libraries/math_lib.py. Next action: run robot suites/python_integration.robot and inspect terminal + artifacts. Ask specific topics (import, debug, reports, quality) for targeted steps.

### 71. chapter-06-python-integration-GENERIC_HELP (PASS)
- Category: fallback (medium)
- Prompt: help me
- Test Steps:
  1. Load chapter context: Python Integration (chapter-06-python-integration)
  2. Set active file: libraries/math_lib.py
  3. Submit prompt to coach: "help me"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Chapter, Objective; and should NOT include: Context:
- Actual LLM Result: Chapter 06: Python Integration. Objective: Robot suites that call Python libraries.. Active file: libraries/math_lib.py. Next action: run robot suites/python_integration.robot and inspect terminal + artifacts. Ask specific topics (import, debug, reports, quality) for targeted steps.

### 72. chapter-06-python-integration-VARIABLES_EXPLANATION (PASS)
- Category: variables (medium)
- Prompt: how do variables work in this chapter
- Test Steps:
  1. Load chapter context: Python Integration (chapter-06-python-integration)
  2. Set active file: libraries/math_lib.py
  3. Submit prompt to coach: "how do variables work in this chapter"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Chapter, Objective; and should NOT include: Context:
- Actual LLM Result: Chapter 06: Python Integration. Objective: Robot suites that call Python libraries.. Active file: libraries/math_lib.py. Next action: run robot suites/python_integration.robot and inspect terminal + artifacts. Ask specific topics (import, debug, reports, quality) for targeted steps.

### 73. chapter-07-best-practices-EXPLAIN_PROGRAM (PASS)
- Category: core-content (critical)
- Prompt: explain this program to me
- Test Steps:
  1. Load chapter context: Best Practices (chapter-07-best-practices)
  2. Set active file: data/orders.json
  3. Submit prompt to coach: "explain this program to me"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Robot Framework, IDE; and should NOT include: Context:
- Actual LLM Result: This is Robot Framework IDE — Browser-first LocalAI Dev Platform. You load a chapter, edit multi-file tests, run Robot CLI in-browser, then inspect artifacts (output.xml/log.html/report.html). Flow: Chapter → Edit → Execute CLI → Review Artifacts → Ask AI Coach.

### 74. chapter-07-best-practices-IMPORT_ZIP (PASS)
- Category: ui-flow (critical)
- Prompt: how to import zip files?
- Test Steps:
  1. Load chapter context: Best Practices (chapter-07-best-practices)
  2. Set active file: data/orders.json
  3. Submit prompt to coach: "how to import zip files?"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Import expects a ZIP, tests/*.robot; and should NOT include: Context:
- Actual LLM Result: Import expects a ZIP with project-style paths (example: tests/*.robot, resources/*.resource). On import, current file tree is replaced by ZIP contents. Use Help → Download sample import zip for a known-good structure.

### 75. chapter-07-best-practices-RUN_COMMAND (PASS)
- Category: command (critical)
- Prompt: which command should i run now
- Test Steps:
  1. Load chapter context: Best Practices (chapter-07-best-practices)
  2. Set active file: data/orders.json
  3. Submit prompt to coach: "which command should i run now"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: run; and should NOT include: Context:
- Actual LLM Result: Chapter 07: Best Practices. Objective: Stable data and reusable keywords.. Active file: data/orders.json. Next action: run robot main.robot and inspect terminal + artifacts. Ask specific topics (import, debug, reports, quality) for targeted steps.

### 76. chapter-07-best-practices-REPORT_FILES (PASS)
- Category: artifacts (critical)
- Prompt: how do i generate report.html and log.html
- Test Steps:
  1. Load chapter context: Best Practices (chapter-07-best-practices)
  2. Set active file: data/orders.json
  3. Submit prompt to coach: "how do i generate report.html and log.html"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: --output artifacts/output.xml, report.html; and should NOT include: Context:
- Actual LLM Result: Use explicit artifact flags: `robot --output artifacts/output.xml --log artifacts/log.html --report artifacts/report.html <suite>.robot` No artifacts listed yet. Then click an artifact in left panel to preview.

### 77. chapter-07-best-practices-DEBUG_FAILURE (PASS)
- Category: debug (critical)
- Prompt: tests failed, help debug
- Test Steps:
  1. Load chapter context: Best Practices (chapter-07-best-practices)
  2. Set active file: data/orders.json
  3. Submit prompt to coach: "tests failed, help debug"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Debug checklist, Re-run:; and should NOT include: Context:
- Actual LLM Result: Debug checklist: 1) Re-run: robot main.robot 2) Structure check: Settings=no, Test Cases=no, Keywords=no 3) Validate file path passed to robot command. 4) If fetch/network appears, retry runtime bootstrap and verify connectivity. Terminal tail: Robot IDE ready | Run complete

### 78. chapter-07-best-practices-FETCH_FAILURE (PASS)
- Category: debug (high)
- Prompt: fetch failed error, what now
- Test Steps:
  1. Load chapter context: Best Practices (chapter-07-best-practices)
  2. Set active file: data/orders.json
  3. Submit prompt to coach: "fetch failed error, what now"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: retry runtime bootstrap, Debug checklist; and should NOT include: Context:
- Actual LLM Result: Debug checklist: 1) Re-run: robot main.robot 2) Structure check: Settings=no, Test Cases=no, Keywords=no 3) Validate file path passed to robot command. 4) If fetch/network appears, retry runtime bootstrap and verify connectivity. Terminal tail: Robot IDE ready | Run complete

### 79. chapter-07-best-practices-QUALITY_IMPROVEMENT (PASS)
- Category: quality (high)
- Prompt: how can i improve quality of this chapter
- Test Steps:
  1. Load chapter context: Best Practices (chapter-07-best-practices)
  2. Set active file: data/orders.json
  3. Submit prompt to coach: "how can i improve quality of this chapter"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Quality upgrades, Current structure; and should NOT include: Context:
- Actual LLM Result: Chapter focus: Stable data and reusable keywords. Quality upgrades: - clear test names by behavior - reusable keywords in resource files - avoid duplicate steps Current structure: Settings=missing, Test Cases=missing, Keywords=missing

### 80. chapter-07-best-practices-ARTIFACT_MISSING (PASS)
- Category: artifacts (high)
- Prompt: artifact not visible in left panel
- Test Steps:
  1. Load chapter context: Best Practices (chapter-07-best-practices)
  2. Set active file: data/orders.json
  3. Submit prompt to coach: "artifact not visible in left panel"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: artifacts, left panel; and should NOT include: Context:
- Actual LLM Result: Use explicit artifact flags: `robot --output artifacts/output.xml --log artifacts/log.html --report artifacts/report.html <suite>.robot` No artifacts listed yet. Then click an artifact in left panel to preview.

### 81. chapter-07-best-practices-BEGINNER_FIRST_STEPS (PASS)
- Category: beginner-guidance (high)
- Prompt: i am new what are first 3 steps
- Test Steps:
  1. Load chapter context: Best Practices (chapter-07-best-practices)
  2. Set active file: data/orders.json
  3. Submit prompt to coach: "i am new what are first 3 steps"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Chapter, Objective; and should NOT include: Context:
- Actual LLM Result: Chapter 07: Best Practices. Objective: Stable data and reusable keywords.. Active file: data/orders.json. Next action: run robot main.robot and inspect terminal + artifacts. Ask specific topics (import, debug, reports, quality) for targeted steps.

### 82. chapter-07-best-practices-NEXT_ACTION (PASS)
- Category: workflow (medium)
- Prompt: what should i do next
- Test Steps:
  1. Load chapter context: Best Practices (chapter-07-best-practices)
  2. Set active file: data/orders.json
  3. Submit prompt to coach: "what should i do next"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Next action; and should NOT include: Context:
- Actual LLM Result: Chapter 07: Best Practices. Objective: Stable data and reusable keywords.. Active file: data/orders.json. Next action: run robot main.robot and inspect terminal + artifacts. Ask specific topics (import, debug, reports, quality) for targeted steps.

### 83. chapter-07-best-practices-GENERIC_HELP (PASS)
- Category: fallback (medium)
- Prompt: help me
- Test Steps:
  1. Load chapter context: Best Practices (chapter-07-best-practices)
  2. Set active file: data/orders.json
  3. Submit prompt to coach: "help me"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Chapter, Objective; and should NOT include: Context:
- Actual LLM Result: Chapter 07: Best Practices. Objective: Stable data and reusable keywords.. Active file: data/orders.json. Next action: run robot main.robot and inspect terminal + artifacts. Ask specific topics (import, debug, reports, quality) for targeted steps.

### 84. chapter-07-best-practices-VARIABLES_EXPLANATION (PASS)
- Category: variables (medium)
- Prompt: how do variables work in this chapter
- Test Steps:
  1. Load chapter context: Best Practices (chapter-07-best-practices)
  2. Set active file: data/orders.json
  3. Submit prompt to coach: "how do variables work in this chapter"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Chapter, Objective; and should NOT include: Context:
- Actual LLM Result: Chapter 07: Best Practices. Objective: Stable data and reusable keywords.. Active file: data/orders.json. Next action: run robot main.robot and inspect terminal + artifacts. Ask specific topics (import, debug, reports, quality) for targeted steps.

### 85. chapter-08-enterprise-patterns-EXPLAIN_PROGRAM (PASS)
- Category: core-content (critical)
- Prompt: explain this program to me
- Test Steps:
  1. Load chapter context: Enterprise Patterns (chapter-08-enterprise-patterns)
  2. Set active file: configs/env.yaml
  3. Submit prompt to coach: "explain this program to me"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Robot Framework, IDE; and should NOT include: Context:
- Actual LLM Result: This is Robot Framework IDE — Browser-first LocalAI Dev Platform. You load a chapter, edit multi-file tests, run Robot CLI in-browser, then inspect artifacts (output.xml/log.html/report.html). Flow: Chapter → Edit → Execute CLI → Review Artifacts → Ask AI Coach.

### 86. chapter-08-enterprise-patterns-IMPORT_ZIP (PASS)
- Category: ui-flow (critical)
- Prompt: how to import zip files?
- Test Steps:
  1. Load chapter context: Enterprise Patterns (chapter-08-enterprise-patterns)
  2. Set active file: configs/env.yaml
  3. Submit prompt to coach: "how to import zip files?"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Import expects a ZIP, tests/*.robot; and should NOT include: Context:
- Actual LLM Result: Import expects a ZIP with project-style paths (example: tests/*.robot, resources/*.resource). On import, current file tree is replaced by ZIP contents. Use Help → Download sample import zip for a known-good structure.

### 87. chapter-08-enterprise-patterns-RUN_COMMAND (PASS)
- Category: command (critical)
- Prompt: which command should i run now
- Test Steps:
  1. Load chapter context: Enterprise Patterns (chapter-08-enterprise-patterns)
  2. Set active file: configs/env.yaml
  3. Submit prompt to coach: "which command should i run now"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: run; and should NOT include: Context:
- Actual LLM Result: Chapter 08: Enterprise Patterns. Objective: Shared resources and execution profiles.. Active file: configs/env.yaml. Next action: run robot suites/enterprise.robot and inspect terminal + artifacts. Ask specific topics (import, debug, reports, quality) for targeted steps.

### 88. chapter-08-enterprise-patterns-REPORT_FILES (PASS)
- Category: artifacts (critical)
- Prompt: how do i generate report.html and log.html
- Test Steps:
  1. Load chapter context: Enterprise Patterns (chapter-08-enterprise-patterns)
  2. Set active file: configs/env.yaml
  3. Submit prompt to coach: "how do i generate report.html and log.html"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: --output artifacts/output.xml, report.html; and should NOT include: Context:
- Actual LLM Result: Use explicit artifact flags: `robot --output artifacts/output.xml --log artifacts/log.html --report artifacts/report.html <suite>.robot` No artifacts listed yet. Then click an artifact in left panel to preview.

### 89. chapter-08-enterprise-patterns-DEBUG_FAILURE (PASS)
- Category: debug (critical)
- Prompt: tests failed, help debug
- Test Steps:
  1. Load chapter context: Enterprise Patterns (chapter-08-enterprise-patterns)
  2. Set active file: configs/env.yaml
  3. Submit prompt to coach: "tests failed, help debug"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Debug checklist, Re-run:; and should NOT include: Context:
- Actual LLM Result: Debug checklist: 1) Re-run: robot suites/enterprise.robot 2) Structure check: Settings=no, Test Cases=no, Keywords=no 3) Validate file path passed to robot command. 4) If fetch/network appears, retry runtime bootstrap and verify connectivity. Terminal tail: Robot IDE ready | Run complete

### 90. chapter-08-enterprise-patterns-FETCH_FAILURE (PASS)
- Category: debug (high)
- Prompt: fetch failed error, what now
- Test Steps:
  1. Load chapter context: Enterprise Patterns (chapter-08-enterprise-patterns)
  2. Set active file: configs/env.yaml
  3. Submit prompt to coach: "fetch failed error, what now"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: retry runtime bootstrap, Debug checklist; and should NOT include: Context:
- Actual LLM Result: Debug checklist: 1) Re-run: robot suites/enterprise.robot 2) Structure check: Settings=no, Test Cases=no, Keywords=no 3) Validate file path passed to robot command. 4) If fetch/network appears, retry runtime bootstrap and verify connectivity. Terminal tail: Robot IDE ready | Run complete

### 91. chapter-08-enterprise-patterns-QUALITY_IMPROVEMENT (PASS)
- Category: quality (high)
- Prompt: how can i improve quality of this chapter
- Test Steps:
  1. Load chapter context: Enterprise Patterns (chapter-08-enterprise-patterns)
  2. Set active file: configs/env.yaml
  3. Submit prompt to coach: "how can i improve quality of this chapter"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Quality upgrades, Current structure; and should NOT include: Context:
- Actual LLM Result: Chapter focus: Shared resources and execution profiles. Quality upgrades: - clear test names by behavior - reusable keywords in resource files - avoid duplicate steps Current structure: Settings=missing, Test Cases=missing, Keywords=missing

### 92. chapter-08-enterprise-patterns-ARTIFACT_MISSING (PASS)
- Category: artifacts (high)
- Prompt: artifact not visible in left panel
- Test Steps:
  1. Load chapter context: Enterprise Patterns (chapter-08-enterprise-patterns)
  2. Set active file: configs/env.yaml
  3. Submit prompt to coach: "artifact not visible in left panel"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: artifacts, left panel; and should NOT include: Context:
- Actual LLM Result: Use explicit artifact flags: `robot --output artifacts/output.xml --log artifacts/log.html --report artifacts/report.html <suite>.robot` No artifacts listed yet. Then click an artifact in left panel to preview.

### 93. chapter-08-enterprise-patterns-BEGINNER_FIRST_STEPS (PASS)
- Category: beginner-guidance (high)
- Prompt: i am new what are first 3 steps
- Test Steps:
  1. Load chapter context: Enterprise Patterns (chapter-08-enterprise-patterns)
  2. Set active file: configs/env.yaml
  3. Submit prompt to coach: "i am new what are first 3 steps"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Chapter, Objective; and should NOT include: Context:
- Actual LLM Result: Chapter 08: Enterprise Patterns. Objective: Shared resources and execution profiles.. Active file: configs/env.yaml. Next action: run robot suites/enterprise.robot and inspect terminal + artifacts. Ask specific topics (import, debug, reports, quality) for targeted steps.

### 94. chapter-08-enterprise-patterns-NEXT_ACTION (PASS)
- Category: workflow (medium)
- Prompt: what should i do next
- Test Steps:
  1. Load chapter context: Enterprise Patterns (chapter-08-enterprise-patterns)
  2. Set active file: configs/env.yaml
  3. Submit prompt to coach: "what should i do next"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Next action; and should NOT include: Context:
- Actual LLM Result: Chapter 08: Enterprise Patterns. Objective: Shared resources and execution profiles.. Active file: configs/env.yaml. Next action: run robot suites/enterprise.robot and inspect terminal + artifacts. Ask specific topics (import, debug, reports, quality) for targeted steps.

### 95. chapter-08-enterprise-patterns-GENERIC_HELP (PASS)
- Category: fallback (medium)
- Prompt: help me
- Test Steps:
  1. Load chapter context: Enterprise Patterns (chapter-08-enterprise-patterns)
  2. Set active file: configs/env.yaml
  3. Submit prompt to coach: "help me"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Chapter, Objective; and should NOT include: Context:
- Actual LLM Result: Chapter 08: Enterprise Patterns. Objective: Shared resources and execution profiles.. Active file: configs/env.yaml. Next action: run robot suites/enterprise.robot and inspect terminal + artifacts. Ask specific topics (import, debug, reports, quality) for targeted steps.

### 96. chapter-08-enterprise-patterns-VARIABLES_EXPLANATION (PASS)
- Category: variables (medium)
- Prompt: how do variables work in this chapter
- Test Steps:
  1. Load chapter context: Enterprise Patterns (chapter-08-enterprise-patterns)
  2. Set active file: configs/env.yaml
  3. Submit prompt to coach: "how do variables work in this chapter"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Chapter, Objective; and should NOT include: Context:
- Actual LLM Result: Chapter 08: Enterprise Patterns. Objective: Shared resources and execution profiles.. Active file: configs/env.yaml. Next action: run robot suites/enterprise.robot and inspect terminal + artifacts. Ask specific topics (import, debug, reports, quality) for targeted steps.

### 97. chapter-09-real-world-case-study-EXPLAIN_PROGRAM (PASS)
- Category: core-content (critical)
- Prompt: explain this program to me
- Test Steps:
  1. Load chapter context: Real-world Case Study (chapter-09-real-world-case-study)
  2. Set active file: fixtures/case_data.json
  3. Submit prompt to coach: "explain this program to me"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Robot Framework, IDE; and should NOT include: Context:
- Actual LLM Result: This is Robot Framework IDE — Browser-first LocalAI Dev Platform. You load a chapter, edit multi-file tests, run Robot CLI in-browser, then inspect artifacts (output.xml/log.html/report.html). Flow: Chapter → Edit → Execute CLI → Review Artifacts → Ask AI Coach.

### 98. chapter-09-real-world-case-study-IMPORT_ZIP (PASS)
- Category: ui-flow (critical)
- Prompt: how to import zip files?
- Test Steps:
  1. Load chapter context: Real-world Case Study (chapter-09-real-world-case-study)
  2. Set active file: fixtures/case_data.json
  3. Submit prompt to coach: "how to import zip files?"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Import expects a ZIP, tests/*.robot; and should NOT include: Context:
- Actual LLM Result: Import expects a ZIP with project-style paths (example: tests/*.robot, resources/*.resource). On import, current file tree is replaced by ZIP contents. Use Help → Download sample import zip for a known-good structure.

### 99. chapter-09-real-world-case-study-RUN_COMMAND (PASS)
- Category: command (critical)
- Prompt: which command should i run now
- Test Steps:
  1. Load chapter context: Real-world Case Study (chapter-09-real-world-case-study)
  2. Set active file: fixtures/case_data.json
  3. Submit prompt to coach: "which command should i run now"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: run; and should NOT include: Context:
- Actual LLM Result: Chapter 09: Real-world Case Study. Objective: End-to-end scenario with fixtures and helper libraries.. Active file: fixtures/case_data.json. Next action: run robot suites/case_study.robot and inspect terminal + artifacts. Ask specific topics (import, debug, reports, quality) for targeted steps.

### 100. chapter-09-real-world-case-study-REPORT_FILES (PASS)
- Category: artifacts (critical)
- Prompt: how do i generate report.html and log.html
- Test Steps:
  1. Load chapter context: Real-world Case Study (chapter-09-real-world-case-study)
  2. Set active file: fixtures/case_data.json
  3. Submit prompt to coach: "how do i generate report.html and log.html"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: --output artifacts/output.xml, report.html; and should NOT include: Context:
- Actual LLM Result: Use explicit artifact flags: `robot --output artifacts/output.xml --log artifacts/log.html --report artifacts/report.html <suite>.robot` No artifacts listed yet. Then click an artifact in left panel to preview.

### 101. chapter-09-real-world-case-study-DEBUG_FAILURE (PASS)
- Category: debug (critical)
- Prompt: tests failed, help debug
- Test Steps:
  1. Load chapter context: Real-world Case Study (chapter-09-real-world-case-study)
  2. Set active file: fixtures/case_data.json
  3. Submit prompt to coach: "tests failed, help debug"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Debug checklist, Re-run:; and should NOT include: Context:
- Actual LLM Result: Debug checklist: 1) Re-run: robot suites/case_study.robot 2) Structure check: Settings=no, Test Cases=no, Keywords=no 3) Validate file path passed to robot command. 4) If fetch/network appears, retry runtime bootstrap and verify connectivity. Terminal tail: Robot IDE ready | Run complete

### 102. chapter-09-real-world-case-study-FETCH_FAILURE (PASS)
- Category: debug (high)
- Prompt: fetch failed error, what now
- Test Steps:
  1. Load chapter context: Real-world Case Study (chapter-09-real-world-case-study)
  2. Set active file: fixtures/case_data.json
  3. Submit prompt to coach: "fetch failed error, what now"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: retry runtime bootstrap, Debug checklist; and should NOT include: Context:
- Actual LLM Result: Debug checklist: 1) Re-run: robot suites/case_study.robot 2) Structure check: Settings=no, Test Cases=no, Keywords=no 3) Validate file path passed to robot command. 4) If fetch/network appears, retry runtime bootstrap and verify connectivity. Terminal tail: Robot IDE ready | Run complete

### 103. chapter-09-real-world-case-study-QUALITY_IMPROVEMENT (PASS)
- Category: quality (high)
- Prompt: how can i improve quality of this chapter
- Test Steps:
  1. Load chapter context: Real-world Case Study (chapter-09-real-world-case-study)
  2. Set active file: fixtures/case_data.json
  3. Submit prompt to coach: "how can i improve quality of this chapter"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Quality upgrades, Current structure; and should NOT include: Context:
- Actual LLM Result: Chapter focus: End-to-end scenario with fixtures and helper libraries. Quality upgrades: - clear test names by behavior - reusable keywords in resource files - avoid duplicate steps Current structure: Settings=missing, Test Cases=missing, Keywords=missing

### 104. chapter-09-real-world-case-study-ARTIFACT_MISSING (PASS)
- Category: artifacts (high)
- Prompt: artifact not visible in left panel
- Test Steps:
  1. Load chapter context: Real-world Case Study (chapter-09-real-world-case-study)
  2. Set active file: fixtures/case_data.json
  3. Submit prompt to coach: "artifact not visible in left panel"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: artifacts, left panel; and should NOT include: Context:
- Actual LLM Result: Use explicit artifact flags: `robot --output artifacts/output.xml --log artifacts/log.html --report artifacts/report.html <suite>.robot` No artifacts listed yet. Then click an artifact in left panel to preview.

### 105. chapter-09-real-world-case-study-BEGINNER_FIRST_STEPS (PASS)
- Category: beginner-guidance (high)
- Prompt: i am new what are first 3 steps
- Test Steps:
  1. Load chapter context: Real-world Case Study (chapter-09-real-world-case-study)
  2. Set active file: fixtures/case_data.json
  3. Submit prompt to coach: "i am new what are first 3 steps"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Chapter, Objective; and should NOT include: Context:
- Actual LLM Result: Chapter 09: Real-world Case Study. Objective: End-to-end scenario with fixtures and helper libraries.. Active file: fixtures/case_data.json. Next action: run robot suites/case_study.robot and inspect terminal + artifacts. Ask specific topics (import, debug, reports, quality) for targeted steps.

### 106. chapter-09-real-world-case-study-NEXT_ACTION (PASS)
- Category: workflow (medium)
- Prompt: what should i do next
- Test Steps:
  1. Load chapter context: Real-world Case Study (chapter-09-real-world-case-study)
  2. Set active file: fixtures/case_data.json
  3. Submit prompt to coach: "what should i do next"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Next action; and should NOT include: Context:
- Actual LLM Result: Chapter 09: Real-world Case Study. Objective: End-to-end scenario with fixtures and helper libraries.. Active file: fixtures/case_data.json. Next action: run robot suites/case_study.robot and inspect terminal + artifacts. Ask specific topics (import, debug, reports, quality) for targeted steps.

### 107. chapter-09-real-world-case-study-GENERIC_HELP (PASS)
- Category: fallback (medium)
- Prompt: help me
- Test Steps:
  1. Load chapter context: Real-world Case Study (chapter-09-real-world-case-study)
  2. Set active file: fixtures/case_data.json
  3. Submit prompt to coach: "help me"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Chapter, Objective; and should NOT include: Context:
- Actual LLM Result: Chapter 09: Real-world Case Study. Objective: End-to-end scenario with fixtures and helper libraries.. Active file: fixtures/case_data.json. Next action: run robot suites/case_study.robot and inspect terminal + artifacts. Ask specific topics (import, debug, reports, quality) for targeted steps.

### 108. chapter-09-real-world-case-study-VARIABLES_EXPLANATION (PASS)
- Category: variables (medium)
- Prompt: how do variables work in this chapter
- Test Steps:
  1. Load chapter context: Real-world Case Study (chapter-09-real-world-case-study)
  2. Set active file: fixtures/case_data.json
  3. Submit prompt to coach: "how do variables work in this chapter"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Chapter, Objective; and should NOT include: Context:
- Actual LLM Result: Chapter 09: Real-world Case Study. Objective: End-to-end scenario with fixtures and helper libraries.. Active file: fixtures/case_data.json. Next action: run robot suites/case_study.robot and inspect terminal + artifacts. Ask specific topics (import, debug, reports, quality) for targeted steps.

### 109. chapter-10-final-capstone-project-EXPLAIN_PROGRAM (PASS)
- Category: core-content (critical)
- Prompt: explain this program to me
- Test Steps:
  1. Load chapter context: Final Capstone Project (chapter-10-final-capstone-project)
  2. Set active file: configs/execution.yaml
  3. Submit prompt to coach: "explain this program to me"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Robot Framework, IDE; and should NOT include: Context:
- Actual LLM Result: This is Robot Framework IDE — Browser-first LocalAI Dev Platform. You load a chapter, edit multi-file tests, run Robot CLI in-browser, then inspect artifacts (output.xml/log.html/report.html). Flow: Chapter → Edit → Execute CLI → Review Artifacts → Ask AI Coach.

### 110. chapter-10-final-capstone-project-IMPORT_ZIP (PASS)
- Category: ui-flow (critical)
- Prompt: how to import zip files?
- Test Steps:
  1. Load chapter context: Final Capstone Project (chapter-10-final-capstone-project)
  2. Set active file: configs/execution.yaml
  3. Submit prompt to coach: "how to import zip files?"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Import expects a ZIP, tests/*.robot; and should NOT include: Context:
- Actual LLM Result: Import expects a ZIP with project-style paths (example: tests/*.robot, resources/*.resource). On import, current file tree is replaced by ZIP contents. Use Help → Download sample import zip for a known-good structure.

### 111. chapter-10-final-capstone-project-RUN_COMMAND (PASS)
- Category: command (critical)
- Prompt: which command should i run now
- Test Steps:
  1. Load chapter context: Final Capstone Project (chapter-10-final-capstone-project)
  2. Set active file: configs/execution.yaml
  3. Submit prompt to coach: "which command should i run now"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: run; and should NOT include: Context:
- Actual LLM Result: Chapter 10: Final Capstone Project. Objective: Production-style nested Robot Framework example with 20+ files.. Active file: configs/execution.yaml. Next action: run robot suites/main.robot and inspect terminal + artifacts. Ask specific topics (import, debug, reports, quality) for targeted steps.

### 112. chapter-10-final-capstone-project-REPORT_FILES (PASS)
- Category: artifacts (critical)
- Prompt: how do i generate report.html and log.html
- Test Steps:
  1. Load chapter context: Final Capstone Project (chapter-10-final-capstone-project)
  2. Set active file: configs/execution.yaml
  3. Submit prompt to coach: "how do i generate report.html and log.html"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: --output artifacts/output.xml, report.html; and should NOT include: Context:
- Actual LLM Result: Use explicit artifact flags: `robot --output artifacts/output.xml --log artifacts/log.html --report artifacts/report.html <suite>.robot` No artifacts listed yet. Then click an artifact in left panel to preview.

### 113. chapter-10-final-capstone-project-DEBUG_FAILURE (PASS)
- Category: debug (critical)
- Prompt: tests failed, help debug
- Test Steps:
  1. Load chapter context: Final Capstone Project (chapter-10-final-capstone-project)
  2. Set active file: configs/execution.yaml
  3. Submit prompt to coach: "tests failed, help debug"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Debug checklist, Re-run:; and should NOT include: Context:
- Actual LLM Result: Debug checklist: 1) Re-run: robot suites/main.robot 2) Structure check: Settings=no, Test Cases=no, Keywords=no 3) Validate file path passed to robot command. 4) If fetch/network appears, retry runtime bootstrap and verify connectivity. Terminal tail: Robot IDE ready | Run complete

### 114. chapter-10-final-capstone-project-FETCH_FAILURE (PASS)
- Category: debug (high)
- Prompt: fetch failed error, what now
- Test Steps:
  1. Load chapter context: Final Capstone Project (chapter-10-final-capstone-project)
  2. Set active file: configs/execution.yaml
  3. Submit prompt to coach: "fetch failed error, what now"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: retry runtime bootstrap, Debug checklist; and should NOT include: Context:
- Actual LLM Result: Debug checklist: 1) Re-run: robot suites/main.robot 2) Structure check: Settings=no, Test Cases=no, Keywords=no 3) Validate file path passed to robot command. 4) If fetch/network appears, retry runtime bootstrap and verify connectivity. Terminal tail: Robot IDE ready | Run complete

### 115. chapter-10-final-capstone-project-QUALITY_IMPROVEMENT (PASS)
- Category: quality (high)
- Prompt: how can i improve quality of this chapter
- Test Steps:
  1. Load chapter context: Final Capstone Project (chapter-10-final-capstone-project)
  2. Set active file: configs/execution.yaml
  3. Submit prompt to coach: "how can i improve quality of this chapter"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Quality upgrades, Current structure; and should NOT include: Context:
- Actual LLM Result: Chapter focus: Production-style nested Robot Framework example with 20+ files. Quality upgrades: - clear test names by behavior - reusable keywords in resource files - avoid duplicate steps Current structure: Settings=missing, Test Cases=missing, Keywords=missing

### 116. chapter-10-final-capstone-project-ARTIFACT_MISSING (PASS)
- Category: artifacts (high)
- Prompt: artifact not visible in left panel
- Test Steps:
  1. Load chapter context: Final Capstone Project (chapter-10-final-capstone-project)
  2. Set active file: configs/execution.yaml
  3. Submit prompt to coach: "artifact not visible in left panel"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: artifacts, left panel; and should NOT include: Context:
- Actual LLM Result: Use explicit artifact flags: `robot --output artifacts/output.xml --log artifacts/log.html --report artifacts/report.html <suite>.robot` No artifacts listed yet. Then click an artifact in left panel to preview.

### 117. chapter-10-final-capstone-project-BEGINNER_FIRST_STEPS (PASS)
- Category: beginner-guidance (high)
- Prompt: i am new what are first 3 steps
- Test Steps:
  1. Load chapter context: Final Capstone Project (chapter-10-final-capstone-project)
  2. Set active file: configs/execution.yaml
  3. Submit prompt to coach: "i am new what are first 3 steps"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Chapter, Objective; and should NOT include: Context:
- Actual LLM Result: Chapter 10: Final Capstone Project. Objective: Production-style nested Robot Framework example with 20+ files.. Active file: configs/execution.yaml. Next action: run robot suites/main.robot and inspect terminal + artifacts. Ask specific topics (import, debug, reports, quality) for targeted steps.

### 118. chapter-10-final-capstone-project-NEXT_ACTION (PASS)
- Category: workflow (medium)
- Prompt: what should i do next
- Test Steps:
  1. Load chapter context: Final Capstone Project (chapter-10-final-capstone-project)
  2. Set active file: configs/execution.yaml
  3. Submit prompt to coach: "what should i do next"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Next action; and should NOT include: Context:
- Actual LLM Result: Chapter 10: Final Capstone Project. Objective: Production-style nested Robot Framework example with 20+ files.. Active file: configs/execution.yaml. Next action: run robot suites/main.robot and inspect terminal + artifacts. Ask specific topics (import, debug, reports, quality) for targeted steps.

### 119. chapter-10-final-capstone-project-GENERIC_HELP (PASS)
- Category: fallback (medium)
- Prompt: help me
- Test Steps:
  1. Load chapter context: Final Capstone Project (chapter-10-final-capstone-project)
  2. Set active file: configs/execution.yaml
  3. Submit prompt to coach: "help me"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Chapter, Objective; and should NOT include: Context:
- Actual LLM Result: Chapter 10: Final Capstone Project. Objective: Production-style nested Robot Framework example with 20+ files.. Active file: configs/execution.yaml. Next action: run robot suites/main.robot and inspect terminal + artifacts. Ask specific topics (import, debug, reports, quality) for targeted steps.

### 120. chapter-10-final-capstone-project-VARIABLES_EXPLANATION (PASS)
- Category: variables (medium)
- Prompt: how do variables work in this chapter
- Test Steps:
  1. Load chapter context: Final Capstone Project (chapter-10-final-capstone-project)
  2. Set active file: configs/execution.yaml
  3. Submit prompt to coach: "how do variables work in this chapter"
  4. Validate response content rules (must include / must not include)
- Expected Result: Response should include: Chapter, Objective; and should NOT include: Context:
- Actual LLM Result: Chapter 10: Final Capstone Project. Objective: Production-style nested Robot Framework example with 20+ files.. Active file: configs/execution.yaml. Next action: run robot suites/main.robot and inspect terminal + artifacts. Ask specific topics (import, debug, reports, quality) for targeted steps.

