# X 日报机器人 / X Daily Digest Bot

> Data-driven "DSH ecosystem daily digest" posted to X(Twitter). 数据驱动的「DSH 生态日报」，每天自动发到 X。

The bot composes tweets ONLY from our own assets — `data/plugins.json` (catalog), `data/compat-report.json`
(daily compat CI), and the `dsh-plugin` GitHub topic — then diffs them against a git-tracked snapshot to
report **new plugins / star-gain top-3 / compat changes**. No hype, no invented numbers.

机器人只用自己的资产拼装文案——`data/plugins.json`（目录）、`data/compat-report.json`（每日兼容 CI）、以及
`dsh-plugin` GitHub topic，再和 git 跟踪的快照做 diff，报出**新增插件 / 涨星 Top3 / 兼容状态变化**。不空喊、不编数字。

## How it works / 工作原理

```
digest.mjs  collect -> diff vs bot/state/last-snapshot.json -> copy (LLM or template)
post.mjs    X API v2 POST /2/tweets (OAuth 1.0a) - EN main + ZH reply thread
            (missing X secrets -> dry-run: log + bot/out/latest-digest.md, exit 0)
workflow    daily 13:30 UTC (21:30 Beijing) -> digest -> post -> commit snapshot
```

- First run (no snapshot) posts a **launch** tweet instead of a diff.
- With `DEEPSEEK_API_KEY` the copy is LLM-written (DeepSeek `deepseek-chat`); without it, a deterministic
  template copy is used — the bot always has something to say.
- The snapshot advances only after a successful post **or** a dry-run (never after a hard API failure), so a
  failed day is re-reported the next day.

## GitHub Secrets to configure / 需要配置的 GitHub Secrets

在仓库 Settings → Secrets and variables → Actions 里配 6 个变量：

| Secret | Required | Purpose |
|---|---|---|
| `X_API_KEY` | ✅ | X 开发者 app 的 API Key（consumer key） |
| `X_API_SECRET` | ✅ | X app 的 API Key Secret（consumer secret） |
| `X_ACCESS_TOKEN` | ✅ | 用户上下文 access token |
| `X_ACCESS_SECRET` | ✅ | 用户上下文 access token secret |
| `BEARER_TOKEN` | ⭕ optional | App-only Bearer token（当前 post.mjs 未用，为未来只读接口预留） |
| `DEEPSEEK_API_KEY` | ⭕ optional | DeepSeek API key（缺省则用模板文案降级） |

> 缺任意一个 `X_*` 密钥时，整条管线进入 **dry-run**：把要发的内容打印到日志并写入 `bot/out/latest-digest.md`，
> 退出码 0，不报错。缺 `DEEPSEEK_API_KEY` 时只有文案降级，不影响流程。

## Getting X developer credentials / 申请 X 开发者账号

1. 到 <https://developer.x.com> 申请 **Free** tier 的开发者账号（需绑定手机号 + 描述用途）。
2. 创建 Project + App，App 权限选 **Read and Write**，User authentication 选 **OAuth 1.0a**（read/write）。
3. App 页面拿到 **API Key / API Key Secret**（即 `X_API_KEY` / `X_API_SECRET`）。
4. 在 App 的 **Keys and Tokens → Authentication Tokens** 里为自己账号生成 **Access Token & Secret**（即
   `X_ACCESS_TOKEN` / `X_ACCESS_SECRET`）。
5. （可选）App 页面还能生成 **Bearer Token**，配到 `BEARER_TOKEN`。

> Free tier 限制：每月约 1500 条 tweet、每天最多约 50 条 POST；日报每天 2 条（主贴 + 回复）绰绰有余。

## Run locally / 本地手动跑

```sh
# 1. 生成日报（无 DEEPSEEK_API_KEY 用模板文案）
node bot/digest.mjs
# -> 写入 bot/out/latest-digest.{json,md} + 更新 bot/state/last-snapshot.json

# 2. 发推（缺 X 密钥则 dry-run）
node bot/post.mjs

# 3. 带密钥完整跑一次（每行密钥各自填）
DEEPSEEK_API_KEY=sk-xxx \
X_API_KEY=... X_API_SECRET=... \
X_ACCESS_TOKEN=... X_ACCESS_SECRET=... \
node bot/digest.mjs && node bot/post.mjs
```

## Files / 文件

```
bot/
├── digest.mjs   数据收集 + diff + 文案生成（LLM / 模板降级）+ 快照更新
├── post.mjs     X API v2 发推（手写 OAuth 1.0a HMAC-SHA1 签名）+ dry-run
├── state/
│   └── last-snapshot.json   昨日快照（git 跟踪，由 workflow 每日提交）
└── out/         最新日报产物（.gitignore 忽略，不进库）
```
