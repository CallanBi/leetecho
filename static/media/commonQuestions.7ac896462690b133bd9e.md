# 错误信息对照和常见问题
---
## 错误码、错误信息以及对应解法
---
### 检查仓库时的错误
#### userName, repoName, token are required
远程设置参数错误，未找到用户名或仓库名或 token。若在远程设置页正确设置后还出现此错误，请联系开发者。
#### Repo init error: xxx
本地仓库初始化错误。请联系开发者。
#### Repo connection error：xxx
github 连接超时。常发生于中国内地用户中。解决办法参考 Q&A 第一条。

### 发布时的错误
 #### Error invoking remote method 'publish': Error: 5000003 Repo connection error, connect ETIMEDOUT 20.205.243.166:443
github 连接超时。常发生于中国内地用户中。解决办法参考 Q&A 第一条。
#### Error invoking remote method 'publish': Error: 1 1 request to https://leetcode-cn.com/graphql failed, reason: read ECONNRESET
在通过 GraphQL 获取 LeetCode 数据时，LeetCode 服务突然关闭了 TCP 会话的连接端。推测可能是 LeetCode 服务器因负载高而干掉一些链接。推荐重试几次。
#### 429 Too Many Requests
在单个节点流量过大时，LeetCode 服务器会采取熔断，禁止请求发送一段时间。若遇到此类问题，请反馈给开发者调整并发请求数。

---
Q&A
---
### 0x1 Github 连接总是超时？

对于中国内地用户，可采取以下方法解决：

1. 【建议】使用代理软件（如 Proxifier）代理你的 VPN 的端口并其对 Leetecho 生效。

2. 在终端中：

```bash
export https_proxy=http://127.0.0.1:7890 http_proxy=http://127.0.0.1:7890 all_proxy=socks5://127.0.0.1:7890
```

- 其中 7890 为你的 VPN 的端口号。

3. 使用工具或手动修改 host 文件，可参考 github-host。

### 0x2 检查仓库连接为什么那么久？

如果没抛出错误，也有可能是因为中国内地连接 github 不稳定原因造成的。解决办法依然参考 Github 连接超时。

### 0x3 为什么只支持 leetcode-cn.com， 暂时不支持 leetcode.com ?

leetcode.com 的鉴权和 CN 有所不同，实现起来稍烦琐；此外，i18n 建设也需要一段时间。后续将会支持 leetcode.com，敬请期待。


### 0x4 笔记是 Leetecho 服务器自己维护的吗？

 Leetecho 没有服务器，笔记来源上是从 LeetCode Notebook 上拉下来用户的笔记：

 [LeetCode NoteBook - CN](https://leetcode-cn.com/notes/)

 [LeetCode NoteBook](https://leetcode.com/notes/)


 在 Leetecho 0.0.2 版本中，已经实现代理 LeetCode Notebook 笔记，从而笔记的 CURD 操作可以在 Leetecho 闭环。
### 0x5 生成的本地文件在哪？

所有在同一计算机中 LeetCode 登录用户的本地文件存放在 `${My Documents}/Leetecho Files/${endPoint}/${username}/` 中。

其中，`${My Documents}` 指用户的「我的文档」/ 「文档」/ 「文稿」文件夹;

`${endPoint}` 指 LeetCode 用户所属域名，枚举为 `CN` 和 `US`；

 `${username}` 指 LeetCode 用户名。


