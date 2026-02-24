# Robot Syntax Highlighting Evaluation Report

- Generated: 2026-02-24T18:20:23.346Z
- Total cases: 51
- Passed: 51
- Failed: 0
- Pass rate: 100%

| # | Case | Expected Tokens | Actual Tokens | Snapshot | Status |
|---|---|---|---|---|---|
| 1 | HEADER | header | header | a0b4e2416bff | PASS |
| 2 | HEADER_PIPE | header | header | f4fccceb5a88 | PASS |
| 3 | HEADER_TRAILING_COMMENT | header | header, comment | 57445c1dba5d | PASS |
| 4 | VARIABLE | variable, keywordCall, argument | keywordCall, variable, argument | ab010aac76fc | PASS |
| 5 | VARIABLE_PIPE | variable, keywordCall, argument | keywordCall, variable, argument | f1ae4ab76c23 | PASS |
| 6 | VARIABLE_TRAILING_COMMENT | variable, keywordCall, argument | keywordCall, variable, argument, comment | 665ccbd080be | PASS |
| 7 | COMMENT_LINE | comment | comment | 90a99522163d | PASS |
| 8 | COMMENT_LINE_PIPE | comment | comment | a3ecb03a2c8f | PASS |
| 9 | COMMENT_LINE_TRAILING_COMMENT | comment | comment | 2cd3ea3d7726 | PASS |
| 10 | INLINE_COMMENT | comment | keywordCall, argument, comment | ddc98d9d822d | PASS |
| 11 | INLINE_COMMENT_PIPE | comment | keywordCall, argument, comment | 3e1ae3bbcc03 | PASS |
| 12 | INLINE_COMMENT_TRAILING_COMMENT | comment | keywordCall, argument, comment | 6185be7f87ab | PASS |
| 13 | SETTING_KEYWORD | setting | header, setting, keywordCall, error, argument | ee435f1a7129 | PASS |
| 14 | SETTING_KEYWORD_PIPE | setting | header, setting, keywordCall, error, argument | 9aede1b48c2e | PASS |
| 15 | SETTING_KEYWORD_TRAILING_COMMENT | setting | header, setting, keywordCall, error, argument, comment | 9c0c54828049 | PASS |
| 16 | TESTCASE_NAME | testCaseName | header, testCaseName | 211ae0c860c3 | PASS |
| 17 | TESTCASE_NAME_PIPE | testCaseName | header, testCaseName | a4806579cbfe | PASS |
| 18 | TESTCASE_NAME_TRAILING_COMMENT | testCaseName | header, testCaseName, comment | b096af3809d5 | PASS |
| 19 | KEYWORD_DEF | keywordDefinition | header, keywordDefinition | 0160bdd53820 | PASS |
| 20 | KEYWORD_DEF_PIPE | keywordDefinition | header, keywordDefinition | 2d4fce24e96a | PASS |
| 21 | KEYWORD_DEF_TRAILING_COMMENT | keywordDefinition | header, keywordDefinition, comment | ab36fee64d34 | PASS |
| 22 | KEYWORD_CALL | keywordCall, argument | header, testCaseName, keywordCall, error, argument | d823953359d4 | PASS |
| 23 | KEYWORD_CALL_PIPE | keywordCall, argument | header, testCaseName, keywordCall, error, argument | 2c40db0ed028 | PASS |
| 24 | KEYWORD_CALL_TRAILING_COMMENT | keywordCall, argument | header, testCaseName, keywordCall, error, argument, comment | b90e34e83045 | PASS |
| 25 | CONTROL_IF | control, variable | header, testCaseName, control, variable, argument | 341d4206cdd8 | PASS |
| 26 | CONTROL_IF_PIPE | control, variable | header, testCaseName, control, variable, argument | 7d6ca6a4c466 | PASS |
| 27 | CONTROL_IF_TRAILING_COMMENT | control, variable | header, testCaseName, control, variable, argument, comment | a755d0e104bf | PASS |
| 28 | CONTROL_FOR | control, variable | header, testCaseName, control, variable, argument | e9524d2312c4 | PASS |
| 29 | CONTROL_FOR_PIPE | control, variable | header, testCaseName, control, variable, argument | 40fdaf837d22 | PASS |
| 30 | CONTROL_FOR_TRAILING_COMMENT | control, variable | header, testCaseName, control, variable, argument, comment | 7204b62f6c9e | PASS |
| 31 | SETTING_BRACKET | setting | setting, keywordCall, error, argument | 6dbc520b0c5e | PASS |
| 32 | SETTING_BRACKET_PIPE | setting | setting, keywordCall, error, argument | eb3ca607b8db | PASS |
| 33 | SETTING_BRACKET_TRAILING_COMMENT | setting | setting, keywordCall, error, argument, comment | 0df609797892 | PASS |
| 34 | DICT_VAR | variable | keywordCall, variable, argument | 78d48cfdef83 | PASS |
| 35 | DICT_VAR_PIPE | variable | keywordCall, variable, argument | 3a163f64efb9 | PASS |
| 36 | DICT_VAR_TRAILING_COMMENT | variable | keywordCall, variable, argument, comment | a6b10a9f36a9 | PASS |
| 37 | LIST_VAR | variable | keywordCall, variable, argument | 67bba22e6900 | PASS |
| 38 | LIST_VAR_PIPE | variable | keywordCall, variable, argument | 12c6930239d3 | PASS |
| 39 | LIST_VAR_TRAILING_COMMENT | variable | keywordCall, variable, argument, comment | f5b507f8c0a8 | PASS |
| 40 | PERCENT_VAR | variable | keywordCall, variable, argument | ab010aac76fc | PASS |
| 41 | PERCENT_VAR_PIPE | variable | keywordCall, variable, argument | f1ae4ab76c23 | PASS |
| 42 | PERCENT_VAR_TRAILING_COMMENT | variable | keywordCall, variable, argument, comment | 665ccbd080be | PASS |
| 43 | MIXED | keywordDefinition, setting, variable, keywordCall | header, keywordDefinition, setting, keywordCall, error, variable, argument | 3d682060500a | PASS |
| 44 | MIXED_PIPE | keywordDefinition, setting, variable, keywordCall | header, keywordDefinition, setting, keywordCall, error, variable, argument | e5a47e190e76 | PASS |
| 45 | MIXED_TRAILING_COMMENT | keywordDefinition, setting, variable, keywordCall | header, keywordDefinition, setting, keywordCall, error, variable, argument, comment | 789a76940113 | PASS |
| 46 | CROSS_FILE_RESOURCE_KEYWORD | setting, keywordCall | header, setting, keywordCall, error, argument, testCaseName | ceec0fe899f4 | PASS |
| 47 | CROSS_FILE_RESOURCE_KEYWORD_PIPE | setting, keywordCall | header, setting, keywordCall, error, argument, testCaseName | 5ebe68062fbd | PASS |
| 48 | CROSS_FILE_RESOURCE_KEYWORD_TRAILING_COMMENT | setting, keywordCall | header, setting, keywordCall, error, argument, testCaseName, comment | 445f84559077 | PASS |
| 49 | UNKNOWN_KEYWORD_ERROR | keywordCall, error | header, testCaseName, keywordCall, error | 50831cd927ef | PASS |
| 50 | UNKNOWN_KEYWORD_ERROR_PIPE | keywordCall, error | header, testCaseName, keywordCall, error | b80cef8b5459 | PASS |
| 51 | UNKNOWN_KEYWORD_ERROR_TRAILING_COMMENT | keywordCall, error | header, testCaseName, keywordCall, error, comment | 738fb03ac3cd | PASS |

## Failed Case Details

All highlighting cases passed.
