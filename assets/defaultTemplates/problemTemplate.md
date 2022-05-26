```leetecho
# {{ questionFrontendId }}. {{title }} - {{ translatedTitle }}
```

```leetecho
## Tags - 题目标签

{{#each topicTags}} <img src="https://img.shields.io/badge/{{ deleteHyphen this.name }}-{{ deleteHyphen this.translatedName }}-blue.svg">  {{/each}}


## Description - 题目描述

### EN:
{{ content }}

### ZH-CN:
{{ translatedContent }}

```

```leetecho
## Link - 题目链接

[LeetCode](https://leetcode.com/problems/{{ titleSlug }}/description/)  -  [LeetCode-CN](https://leetcode.cn/problems/{{ titleSlug }}/description/)
```

## Latest Accepted Submissions - 最近一次 AC 的提交

```leetecho
| Language | Runtime | Memory | Submission Time |
|:---:|:---:|:---:|:---:|
| {{ lastAcceptedSubmissionDetail.lang }}  | {{ lastAcceptedSubmissionDetail.runtime }} | {{ lastAcceptedSubmissionDetail.memory }} | {{ lastAcceptedSubmissionDetail.time }} |

\`\`\`{{ lastAcceptedSubmissionDetail.lang }}

{{ lastAcceptedSubmissionDetail.code }}

\`\`\`
```

## My Notes - 我的笔记
```leetecho
{{#each notes}}

{{ this.content }}

{{/each}}
```