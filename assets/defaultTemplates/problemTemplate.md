```leetecho
## {{ frontendId }}. {{title }} - {{ titleTranslated }}
```

-----
```leetecho
Tags / 题目标签：{{#each tags}}{{ this }} {{/each}}
```

```leetecho
Link / 题目链接：[LeetCode](https://leetcode.com/problems/{{ titleSlug }}/description/)  /  [LeetCode-CN](https://leetcode-cn.com/problems/{{ titleSlug }}/description/)
```

## Latest Accepted Solution

```leetecho
| Language | Runtime | Memory |
|:---:|:---:|:---:|
| {{ lastAcSubmission.language }}  | {{ lastAcSubmission.runtime }} | {{ lastAcSubmission.memory }} |

\`\`\`{{ lastAcSubmission.language }}

{{ lastAcSubmission.code }}

\`\`\`
```

## Notes
```leetecho
{{#each notes}}

{{ this }}

{{/each}}
```