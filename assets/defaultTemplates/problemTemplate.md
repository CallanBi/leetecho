```leetecho
## {{ questionFrontendId }}. {{title }} - {{ translatedTitle }}
```

-----
```leetecho
Tags - 题目标签：{{#each topicTags}}{{ this.name }} - {{ this.translatedName }} {{/each}}

## Description - 题目描述

### EN:
{{ content }}

### ZH-CN:
{{ translatedContent }}

```

```leetecho
Link - 题目链接：[LeetCode](https://leetcode.com/problems/{{ titleSlug }}/description/)  -  [LeetCode-CN](https://leetcode-cn.com/problems/{{ titleSlug }}/description/)
```

## Latest Accepted Solution

```leetecho
| Language | Runtime | Memory | Submission Time |
|:---:|:---:|:---:|:---:|
| {{ lastAcceptedSubmissionDetail.lang }}  | {{ lastAcceptedSubmissionDetail.runtime }} | {{ lastAcceptedSubmissionDetail.memory }} | {{ lastAcceptedSubmissionDetail.time }} |

\`\`\`{{ lastAcSubmission.lang }}

{{ lastAcceptedSubmissionDetail.code }}

\`\`\`
```

## Notes
```leetecho
{{#each notes}}

{{ this.content }}

{{/each}}
```