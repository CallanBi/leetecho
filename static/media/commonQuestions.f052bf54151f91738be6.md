# 常见问题和迭代计划
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

---

# 迭代计划

---

- 【P1】I18n 建设
- 【P1】题目详情可新增、修改和删除笔记
- 【P1】header 搜索栏保存用户输入历史
- 【P2】生成自定义题集语法改为光标插入代码块，而不是复制到剪切板
- 【P2】支持 Gitee，Coding 等更多平台
- 【P3】用户态过期登出提示信息以及登录错误信息，直接以红色字体显示在登录页上