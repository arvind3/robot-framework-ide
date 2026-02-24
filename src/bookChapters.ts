export type FileMap = Record<string, string>
export type Chapter = { id: string; slug: string; title: string; objective: string; entrypoint: string; files: FileMap }

export const bookChapters: Chapter[] = [
  {
    id: "01",
    slug: "chapter-01-introduction",
    title: "Introduction",
    objective: "Minimal Robot suite and shared resource file.",
    entrypoint: "main.robot",
    files: {
      "main.robot": `*** Settings ***
Resource    resources/common.resource

*** Test Cases ***
Welcome Message Is Available
    \${message}=    Get Welcome Message
    Should Be Equal    \${message}    Hello from chapter 01
`,
      "resources/common.resource": `*** Keywords ***
Get Welcome Message
    [Return]    Hello from chapter 01
`,
    },
  },
  {
    id: "02",
    slug: "chapter-02-installation-concepts",
    title: "Installation Concepts",
    objective: "Dependency and environment awareness in a chapter bundle.",
    entrypoint: "main.robot",
    files: {
      "libraries/install_notes.py": `def installation_tip():
    return "Use pinned dependencies for reproducibility."
`,
      "main.robot": `*** Settings ***
Resource    resources/environment.resource
Library    libraries/install_notes.py

*** Test Cases ***
Environment Should Be Ready
    Validate Environment
    \${tip}=    Installation Tip
    Should Contain    \${tip}    pinned
`,
      "resources/environment.resource": `*** Keywords ***
Validate Environment
    Log    Browser runtime prepared for Robot execution.
`,
    },
  },
  {
    id: "03",
    slug: "chapter-03-robot-framework-basics",
    title: "Robot Framework Basics",
    objective: "Core suite, keywords, and data structure.",
    entrypoint: "suite.robot",
    files: {
      "data/test_data.json": `{
  "user": "learner_user",
  "status": "active"
}
`,
      "resources/user_keywords.resource": `*** Keywords ***
Prepare User
    [Return]    learner_user

Verify User Is Active
    [Arguments]    \${user}
    Should Be Equal    \${user}    learner_user
`,
      "suite.robot": `*** Settings ***
Resource    resources/user_keywords.resource

*** Test Cases ***
Validate Basic Flow
    \${user}=    Prepare User
    Verify User Is Active    \${user}
`,
    },
  },
  {
    id: "04",
    slug: "chapter-04-multi-file-architecture",
    title: "Multi-file Architecture",
    objective: "Nested folders with resources and Python helpers.",
    entrypoint: "suites/main.robot",
    files: {
      "helpers/constants.py": `DEFAULT_TIMEOUT = 30
`,
      "libraries/session.py": `def open_session():
    return "session-04"
`,
      "resources/auth.resource": `*** Keywords ***
Authenticate User
    [Arguments]    \${session}
    Should Contain    \${session}    session-
`,
      "resources/order.resource": `*** Keywords ***
Create Order
    [Arguments]    \${session}
    Log    Order created for \${session}
`,
      "suites/main.robot": `*** Settings ***
Resource    ../resources/auth.resource
Resource    ../resources/order.resource
Library    ../libraries/session.py

*** Test Cases ***
Run Multi File Scenario
    \${session}=    Open Session
    Authenticate User    \${session}
    Create Order    \${session}
`,
    },
  },
  {
    id: "05",
    slug: "chapter-05-advanced-keywords",
    title: "Advanced Keywords",
    objective: "Composable keyword architecture with explicit assertions.",
    entrypoint: "main.robot",
    files: {
      "keywords/advanced.resource": `*** Keywords ***
Build Greeting
    [Arguments]    \${name}    \${time_of_day}
    \${greeting}=    Set Variable    Good \${time_of_day}, \${name}
    [Return]    \${greeting}
`,
      "main.robot": `*** Settings ***
Resource    keywords/advanced.resource
Resource    resources/assertions.resource

*** Test Cases ***
Advanced Keyword Flow
    \${result}=    Build Greeting    Tester    evening
    Assert Greeting Prefix    \${result}
`,
      "resources/assertions.resource": `*** Keywords ***
Assert Greeting Prefix
    [Arguments]    \${message}
    Should Start With    \${message}    Good
`,
      "variables/flags.yaml": `retry_count: 2
enable_metrics: true
`,
    },
  },
  {
    id: "06",
    slug: "chapter-06-python-integration",
    title: "Python Integration",
    objective: "Robot suites that call Python libraries.",
    entrypoint: "suites/python_integration.robot",
    files: {
      "libraries/math_lib.py": `def add_numbers(left, right):
    return int(left) + int(right)
`,
      "libraries/string_lib.py": `def build_label(text):
    return f"label::{text}"
`,
      "resources/python_keywords.resource": `*** Keywords ***
Validate Label
    [Arguments]    \${label}
    Should Start With    \${label}    label::
`,
      "suites/python_integration.robot": `*** Settings ***
Library    ../libraries/math_lib.py
Library    ../libraries/string_lib.py
Resource    ../resources/python_keywords.resource

*** Test Cases ***
Python Library Keywords Work
    \${sum}=    Add Numbers    4    6
    Should Be Equal As Integers    \${sum}    10
    \${label}=    Build Label    robot
    Validate Label    \${label}
`,
    },
  },
  {
    id: "07",
    slug: "chapter-07-best-practices",
    title: "Best Practices",
    objective: "Stable data and reusable keywords.",
    entrypoint: "main.robot",
    files: {
      "data/orders.json": `{
  "orders": ["order_2026", "order_2027"]
}
`,
      "data/users.json": `{
  "users": ["stable_user", "backup_user"]
}
`,
      "main.robot": `*** Settings ***
Resource    resources/best_practices.resource

*** Test Cases ***
Best Practice Scenario
    \${user}=    Resolve Stable User
    \${order}=    Resolve Stable Order
    Should Not Be Empty    \${user}
    Should Not Be Empty    \${order}
`,
      "resources/best_practices.resource": `*** Keywords ***
Resolve Stable User
    [Return]    stable_user

Resolve Stable Order
    [Return]    order_2026
`,
    },
  },
  {
    id: "08",
    slug: "chapter-08-enterprise-patterns",
    title: "Enterprise Patterns",
    objective: "Shared resources and execution profiles.",
    entrypoint: "suites/enterprise.robot",
    files: {
      "configs/env.yaml": `region: us-east
retries: 2
`,
      "libraries/profile_library.py": `def profile_message(profile_name):
    return f"Enterprise profile active: {profile_name}"
`,
      "resources/shared.resource": `*** Keywords ***
Log Shared Setup
    Log    Shared setup complete.
`,
      "suites/enterprise.robot": `*** Settings ***
Resource    ../resources/shared.resource
Variables    ../variables/profile.py
Library    ../libraries/profile_library.py

*** Test Cases ***
Enterprise Profile Is Applied
    \${message}=    Profile Message    \${PROFILE_NAME}
    Should Contain    \${message}    \${PROFILE_NAME}
    Log Shared Setup
`,
      "variables/profile.py": `PROFILE_NAME = "staging"
`,
    },
  },
  {
    id: "09",
    slug: "chapter-09-real-world-case-study",
    title: "Real-world Case Study",
    objective: "End-to-end scenario with fixtures and helper libraries.",
    entrypoint: "suites/case_study.robot",
    files: {
      "fixtures/case_data.json": `{
  "seed": "rws",
  "expected": "created"
}
`,
      "libraries/case_helpers.py": `def build_case_user(prefix):
    return f"{prefix}_case_user"
`,
      "resources/auth.resource": `*** Keywords ***
Authenticate Case User
    [Arguments]    \${user}
    Log    Authenticated \${user}
`,
      "resources/orders.resource": `*** Keywords ***
Submit Case Order
    [Arguments]    \${user}
    [Return]    order created for \${user}
`,
      "suites/case_study.robot": `*** Settings ***
Resource    ../resources/auth.resource
Resource    ../resources/orders.resource
Library    ../libraries/case_helpers.py

*** Test Cases ***
Run Case Study
    \${user}=    Build Case User    rws
    Authenticate Case User    \${user}
    \${result}=    Submit Case Order    \${user}
    Should Contain    \${result}    created
`,
    },
  },
  {
    id: "10",
    slug: "chapter-10-final-capstone-project",
    title: "Final Capstone Project",
    objective: "Production-style nested Robot Framework example with 20+ files.",
    entrypoint: "suites/main.robot",
    files: {
      "configs/execution.yaml": `retry_count: 1
capture_artifacts: false
`,
      "data/orders.json": `{
  "default_quantity": 2,
  "allowed_status": ["new", "canceled"]
}
`,
      "data/users.json": `{
  "primary": "demo_user",
  "secondary": "audit_user"
}
`,
      "docs/readme.txt": `Capstone support files for the Robot Framework book.
This folder demonstrates non-code artifacts included in larger suites.
`,
      "fixtures/expected_totals.json": `{
  "daily_total": 2,
  "canceled_total": 1
}
`,
      "fixtures/sample_payload.json": `{
  "event": "order.create",
  "user": "demo_user"
}
`,
      "helpers/string_helper.py": `def normalize(value):
    return str(value).strip().lower()
`,
      "helpers/time_helper.py": `from datetime import datetime


def current_hour():
    return datetime.utcnow().hour
`,
      "keywords/api.robot": `*** Keywords ***
Call Mock API
    [Arguments]    \${endpoint}
    Should Not Be Empty    \${endpoint}
    Log    Calling API endpoint \${endpoint}
`,
      "keywords/logging.robot": `*** Keywords ***
Log Step
    [Arguments]    \${message}
    Log    STEP: \${message}
`,
      "keywords/navigation.robot": `*** Keywords ***
Go To Dashboard
    Log    Navigating to dashboard
`,
      "libraries/assertions.py": `def assert_text_contains(text, expected):
    if expected not in text:
        raise AssertionError(f"Expected '{expected}' in '{text}'")
`,
      "libraries/data_factory.py": `def build_user_name(prefix):
    return f"{prefix}_user"
`,
      "resources/auth.resource": `*** Keywords ***
Login As User
    [Arguments]    \${user}
    Should Not Be Empty    \${user}
    Log    Logged in \${user}
`,
      "resources/common.resource": `*** Keywords ***
Open Capstone Session
    [Arguments]    \${environment}
    Should Not Be Empty    \${environment}
    Log    Opened session in \${environment}
`,
      "resources/orders.resource": `*** Keywords ***
Create Order For User
    [Arguments]    \${user}    \${quantity}
    Should Be Equal As Integers    \${quantity}    2
    Log    Created order for \${user}

Cancel Order For User
    [Arguments]    \${user}
    Log    Canceled order for \${user}
`,
      "resources/reports.resource": `*** Keywords ***
Generate Daily Report
    Log    Generated daily report
`,
      "suites/auth/login.robot": `*** Test Cases ***
Login Path Smoke
    Log    Login suite smoke check
`,
      "suites/auth/logout.robot": `*** Test Cases ***
Logout Path Smoke
    Log    Logout suite smoke check
`,
      "suites/main.robot": `*** Settings ***
Resource    ../resources/common.resource
Resource    ../resources/auth.resource
Resource    ../resources/orders.resource
Resource    ../resources/reports.resource
Resource    ../keywords/logging.robot
Library    ../libraries/data_factory.py
Library    ../libraries/assertions.py
Variables    ../variables/env.py

*** Test Cases ***
Capstone End To End
    \${user}=    Build User Name    demo
    Open Capstone Session    \${ENVIRONMENT}
    Log Step    Login sequence
    Login As User    \${user}
    Create Order For User    \${user}    2
    Cancel Order For User    \${user}
    Generate Daily Report
    Assert Text Contains    \${user}    demo
`,
      "suites/orders/cancel_order.robot": `*** Test Cases ***
Cancel Order Smoke
    Log    Order cancel smoke check
`,
      "suites/orders/create_order.robot": `*** Test Cases ***
Create Order Smoke
    Log    Order create smoke check
`,
      "suites/reports/daily_report.robot": `*** Test Cases ***
Daily Report Smoke
    Log    Report smoke check
`,
      "suites/shared/health_check.robot": `*** Test Cases ***
Health Check
    Log    Shared health check
`,
      "suites/shared/smoke.robot": `*** Test Cases ***
Global Smoke
    Log    Global smoke suite
`,
      "variables/env.py": `ENVIRONMENT = "training"
`,
    },
  },
]
