# Robot Syntax Highlighting Evaluation Report

- Generated: 2026-02-24T18:07:24.049Z
- Total cases: 30
- Passed: 30
- Failed: 0
- Pass rate: 100%

| # | Case | Expected Tokens | Actual Tokens | Status |
|---|---|---|---|---|
| 1 | HEADER | header | header | PASS |
| 2 | HEADER_PIPE | header | header | PASS |
| 3 | VARIABLE | variable, keywordCall, argument | keywordCall, variable, argument | PASS |
| 4 | VARIABLE_PIPE | variable, keywordCall, argument | keywordCall, variable, argument | PASS |
| 5 | COMMENT_LINE | comment | comment | PASS |
| 6 | COMMENT_LINE_PIPE | comment | comment | PASS |
| 7 | INLINE_COMMENT | comment | keywordCall, argument, comment | PASS |
| 8 | INLINE_COMMENT_PIPE | comment | keywordCall, argument, comment | PASS |
| 9 | SETTING_KEYWORD | setting | header, setting, keywordCall, argument | PASS |
| 10 | SETTING_KEYWORD_PIPE | setting | header, setting, keywordCall, argument | PASS |
| 11 | TESTCASE_NAME | testCaseName | header, testCaseName | PASS |
| 12 | TESTCASE_NAME_PIPE | testCaseName | header, testCaseName | PASS |
| 13 | KEYWORD_DEF | keywordDefinition | header, keywordDefinition | PASS |
| 14 | KEYWORD_DEF_PIPE | keywordDefinition | header, keywordDefinition | PASS |
| 15 | KEYWORD_CALL | keywordCall, argument | header, testCaseName, keywordCall, argument | PASS |
| 16 | KEYWORD_CALL_PIPE | keywordCall, argument | header, testCaseName, keywordCall, argument | PASS |
| 17 | CONTROL_IF | control, variable | header, testCaseName, control, variable, argument | PASS |
| 18 | CONTROL_IF_PIPE | control, variable | header, testCaseName, control, variable, argument | PASS |
| 19 | CONTROL_FOR | control, variable | header, testCaseName, control, variable, argument | PASS |
| 20 | CONTROL_FOR_PIPE | control, variable | header, testCaseName, control, variable, argument | PASS |
| 21 | SETTING_BRACKET | setting | setting, keywordCall, argument | PASS |
| 22 | SETTING_BRACKET_PIPE | setting | setting, keywordCall, argument | PASS |
| 23 | DICT_VAR | variable | keywordCall, variable, argument | PASS |
| 24 | DICT_VAR_PIPE | variable | keywordCall, variable, argument | PASS |
| 25 | LIST_VAR | variable | keywordCall, variable, argument | PASS |
| 26 | LIST_VAR_PIPE | variable | keywordCall, variable, argument | PASS |
| 27 | PERCENT_VAR | variable | keywordCall, variable, argument | PASS |
| 28 | PERCENT_VAR_PIPE | variable | keywordCall, variable, argument | PASS |
| 29 | MIXED | keywordDefinition, setting, variable, keywordCall | header, keywordDefinition, setting, keywordCall, variable, argument | PASS |
| 30 | MIXED_PIPE | keywordDefinition, setting, variable, keywordCall | header, keywordDefinition, setting, keywordCall, variable, argument | PASS |

## Failed Case Details

All highlighting cases passed.
