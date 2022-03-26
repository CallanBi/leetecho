# Leetecho 文档
___

# 快速开始

___

##  0x1💡 安装 Leetecho

前往 [首页](./)，选择 Mac 客户端或 Windows 客户端安装 Leetecho。

## 0x2 🔑 创建 Github Token

创建 GitHub 账号，并创建一个仓库 Token。

登录 GitHub 之后，点击 [这里](https://github.com/settings/tokens/new) 创建一个 Token。

权限勾上第一行 repo 的相关权限即可。

Token 生成之后记得把 Token 记下，因为一旦关闭网页将不能再看到它。

![](../../public/img/token-generate.png)

## 0x3 🗄创建 Github 仓库

在 Github 上创建你希望存储 LeetCode 笔记的公开仓库，名称自拟，如 `my-leetcode-notes`。

## 0x4 💻 登录 Leetecho

在登录界面输入你 LeetCode 的帐号和密码（目前仅支持`leetcode-cn.com`站点，`leetcode.com`正在建设中）。

进入右侧导航的远程设置，将你的仓库名、分支名（一般是 `main` 或 `master`），Token 等信息填入对应输入框。

![](../../public/img/remote-settings.png)

检查仓库连接成功后，点击发布。

稍等几分钟发布完毕，你的第一个 Leetecho 笔记集合就在你创建的仓库中展示啦！

___

# Leetecho 模板语法

___

Leetecho 约定了一套模板语法，方便用户自定义渲染需要的内容。

模板语法使用 \`\`\`leetecho\`\`\` 包裹，如下面的例子：

![](../../public/img/leetecho-syntax.png)


Leetecho 会根据包裹内的内容进行渲染。

## 变量

标识变量可以用双大括号`{{  }}` 。Leetecho 借用 [Handlebars](https://handlebarsjs.com/) 的能力来解析这一套语法。对于想要获得更高自定义自由度的用户，可以参考 [Handlebars 的文档](https://handlebarsjs.com/guide/)。下面只介绍最基本的用法。

希望自定义显示变量，可将变量包裹在双大括号中，如 `{{ updateTime }}`。

封面模板和题目模板中的变量不同。对于对象型的变量，层级较低的的变量可以使用句点表达式`.`访问，如 `{{ profile.userName }}`。

对于数组型的变量（如 `notes`），可以使用遍历语法进行访问：

```markdown
{{#each notes}}

{{ this.content }}

{{/each}}
```
也可以使用句点表达式：`notes.[0].content` 来访问数组的单个元素。

期望了解封面模板和题目模版中有哪些变量，可以参考下文。



## 封面模板

### 封面模板中的变量

封面模板提供如下变量供用户使用。

1.  `profile`：用户数据，对象型变量
    - `numSolved` ：解决的题目总数
    - `numTotal`：所有题目数
    - `acEasy`：解决的难度为简单的问题数
    - `acMedium`：解决的难度为中等的问题数
    - `acHard`：解决的难度为困难的问题数
    - `userName`：用户名
    - `endPoint`：LeetCode 域名，枚举值为 `CN` 和 `US`

2. `updateTime`：用户点击发布时的时间

### 封面模板中的习题集语法

#### 0x1 :allProblems{} 所有习题集

在封面模板中，对于所有习题集，Leetecho 提供如下模板语法进行渲染：


```markdown
|  #  | Title |  Title-CN  | Difficulty | Last Submission Time |
|:---:|:-----:|:-----:|:----------:|:----------:|
:allProblems{}
```

`:allProblems{}` 需要与 Markdown 表格的表头一起使用。我们将表头代码写在`:allProblems{}`的上一行。


经过发布流程，封面会被处理成真正符合 Markdown 语法的文件，像这样：

![](../../public/img/allProblems-output.png)

#### 0x2 :problemFilter{} 自定义题集筛选

Leetecho 集成了一套筛选组件能力生成`:problemFilter`：

![](../../public/img/problem-filter-input.png)

在上面的筛选组件点击确定后，将生成如下代码存入剪切板：

![](../../public/img/problem-filter-output.png)

之后将剪切板的代码复制到模板内即可。


## 题目模版

题目模版中提供的变量如下。

1.  `lastAcceptedSubmissionDetail`：最后一次 Accepted的提交的 详情数据，对象型变量
    - `id` ：提交的数字 id
    - `code`：提交的代码
    - `runtime`：提交代码的运行时长
    - `memory`：提交代码所消耗的内存
    - `rawMemory`：以 KB 为单位的运行内存
    - `statusDisplay`：提交状态，只有一个枚举值 `Accepted`
    - `timestamp`：秒级时间戳
    - `lang`：编程语言
    - `passedTestCaseCnt`: 通过的测试用例
    - `totalTestCaseCnt`: 所有测试用例
    - `sourceUrl`: 题目在 LeetCode URL 路径，不包括域名
    - `submissionComment`： 提交的评论
    - `time`: `yyyy/MM/dd H:mm`格式的的格式化时间

2. `notes`: 笔记列表，数组型变量；其元素是一个对象型变量
    - `content`：笔记内容
    - `id`：笔记 id
    - `summary`: 笔记的摘要
    - `updatedAt`：笔记更新时间

3. `translatedTitle`：题目标题的中文翻译（如有）

4. `questionFrontendId` 题目展示在前端的 id

5. `titleSlug`: 题目的唯一标识字符串

6. `title`: 题目标题

7. `difficulty`: 枚举值，为`Easy | Medium | Hard`

8. `lastSubmittedAt`: 最后一次提交（无论是否 AC）的秒级时间戳

9. `numSubmitted`: 题目提交总数

10. `questionId`: 题目数字 id

11. `categoryTitle`: 题目类型的标题

12. `content`：题目描述

13. `translatedContent`: 题目描述的中文翻译（如有）

14. `isPaidOnly`: 是否是付费题目，布尔值

15. `likes`: 点赞数

16. `dislikes`: 点踩数

17. `isLiked`: 用户是否点赞了题目，布尔值

18. `similarQuestions`: 相似题目

19. `contributors`: 题目贡献者

20. `langToValidPlayground`: 题目中可以使用 LeetCode Playground 的编程语言

21. `topicTags`: 题目的标签，数组型变量，元素类型为对象型变量
    - `name`: 标签名称
    - `slug`: 标签唯一表示
    - `translatedName`: 标签名称的中文翻译

22. `companyTagStats`: 出过该题的公司的信息

23. `codeSnippets`: 不同语言的初始化代码，数组形变量
    - `lang`: 语言
    - `langSlug`: 语言的唯一标识符
    - `code`: 初始化代码

24. `stats`: 对于题目提交总数、题目通过总数、题目通过率的字符串描述

25. `hints`: 解题提示，数组形变量

26. `status`: 题目状态，只有一个枚举值 `ac`

27. `sampleTestCase`: 默认测试用例的例子

28. `book`: 包含该题目的书，对象型变量
    - `id`: 书 id
    - `bookName`: 书名
    - `pressName`：出版社名
    - `source`：书籍来源
    - `shortDescription`：书籍短描述
    - `fullDescription`：书籍长描述
    - `bookImgUrl`: 书籍图片
    - `pressImgUrl`: 出版社图片

29. `isSubscribed`: 是否订阅图片

30. `exampleTestcases`: 所有测试用例例子










