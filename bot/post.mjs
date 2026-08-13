#!/usr/bin/env node
/**
 * dsh-suite X poster — X API v2 (POST /2/tweets) with hand-rolled OAuth 1.0a.
 *
 * Zero dependencies (Node crypto for HMAC-SHA1). Posts the English tweet, then
 * replies with the Chinese tweet (one thread), reading copy from
 * bot/out/latest-digest.json (written by digest.mjs).
 *
 * Env: X_API_KEY, X_API_SECRET, X_ACCESS_TOKEN, X_ACCESS_SECRET.
 * If ANY is missing → dry-run: print the tweets to the log and write
 * bot/out/latest-digest.md, then exit 0 (so the workflow's snapshot-commit step
 * still runs and nothing fails).
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { createHmac, randomBytes } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const BOT_DIR = dirname(fileURLToPath(import.meta.url))
const OUT_DIR = join(BOT_DIR, 'out')
const DIGEST_JSON = join(OUT_DIR, 'latest-digest.json')
const DIGEST_MD = join(OUT_DIR, 'latest-digest.md')
const TWEET_ENDPOINT = 'https://api.x.com/2/tweets'

// RFC 3986 percent-encoding for OAuth 1.0a: encodeURIComponent leaves !'()*
// unencoded, which OAuth requires to be encoded.
function oauthEncode(str) {
  return encodeURIComponent(str)
    .replace(/[!'()*]/g, (c) => '%' + c.charCodeAt(0).toString(16).toUpperCase())
}

function oauthParams(consumerKey, token) {
  return {
    oauth_consumer_key: consumerKey,
    oauth_nonce: randomBytes(16).toString('base64').replace(/[^a-zA-Z0-9]/g, '').slice(0, 32),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
    oauth_token: token,
    oauth_version: '1.0',
  }
}

// Signature base string covers the OAuth params only — X API v2 accepts a JSON
// request body, which is NOT folded into the signature (only query/form params
// are). Key = consumerSecret & tokenSecret, both percent-encoded.
function sign(method, url, params, consumerSecret, tokenSecret) {
  const key = `${oauthEncode(consumerSecret)}&${oauthEncode(tokenSecret)}`
  const paramString = Object.keys(params)
    .sort()
    .map((k) => `${oauthEncode(k)}=${oauthEncode(params[k])}`)
    .join('&')
  const base = `${method}&${oauthEncode(url)}&${oauthEncode(paramString)}`
  return createHmac('sha1', key).update(base).digest('base64')
}

function authHeader(oauth) {
  return 'OAuth ' + Object.keys(oauth)
    .sort()
    .map((k) => `${k}="${oauthEncode(oauth[k])}"`)
    .join(', ')
}

async function postTweet(text, replyToId) {
  const oauth = oauthParams(process.env.X_API_KEY, process.env.X_ACCESS_TOKEN)
  oauth.oauth_signature = sign(
    'POST', TWEET_ENDPOINT, oauth,
    process.env.X_API_SECRET, process.env.X_ACCESS_SECRET,
  )
  const body = replyToId
    ? { text, reply: { in_reply_to_tweet_id: replyToId } }
    : { text }
  const res = await fetch(TWEET_ENDPOINT, {
    method: 'POST',
    headers: { Authorization: authHeader(oauth), 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const raw = await res.text()
  if (!res.ok) throw new Error(`X API ${res.status}: ${raw.slice(0, 300)}`)
  return JSON.parse(raw)
}

function missingSecrets() {
  return ['X_API_KEY', 'X_API_SECRET', 'X_ACCESS_TOKEN', 'X_ACCESS_SECRET']
    .filter((k) => !process.env[k])
}

async function main() {
  let digest
  try {
    digest = JSON.parse(await readFile(DIGEST_JSON, 'utf8'))
  } catch {
    console.error('[post] missing bot/out/latest-digest.json — run digest.mjs first')
    process.exit(1)
  }
  const { en, zh } = digest.copy

  const missing = missingSecrets()
  if (missing.length > 0) {
    // Dry-run: print + persist, exit 0 (workflow proceeds to commit snapshot).
    const md = renderMarkdown(digest, 'dry-run')
    await mkdir(OUT_DIR, { recursive: true })
    await writeFile(DIGEST_MD, md)
    console.log(`[post] DRY-RUN (missing: ${missing.join(', ')}) — nothing posted`)
    console.log(`[post] EN (${en.length}c): ${en}`)
    console.log(`[post] ZH (${zh.length}c): ${zh}`)
    console.log(`[post] wrote ${DIGEST_MD}`)
    return
  }

  const main = await postTweet(en, null)
  console.log(`[post] posted EN tweet id=${main.data.id}`)
  const reply = await postTweet(zh, main.data.id)
  console.log(`[post] posted ZH reply id=${reply.data.id}`)
  await mkdir(OUT_DIR, { recursive: true })
  await writeFile(DIGEST_MD, renderMarkdown(digest, `posted ${main.data.id}/${reply.data.id}`))
}

function renderMarkdown(digest, tag) {
  return [
    `# DSH Daily Digest — ${digest.generatedAt}`,
    '',
    `- mode: ${digest.mode}  ·  copy via: ${digest.copy.via}  ·  status: ${tag}`,
    '',
    '## EN (main tweet)',
    '',
    digest.copy.en,
    '',
    '## ZH (reply)',
    '',
    digest.copy.zh,
    '',
  ].join('\n')
}

main().catch((e) => { console.error('[post] failed:', e.message); process.exit(1) })
