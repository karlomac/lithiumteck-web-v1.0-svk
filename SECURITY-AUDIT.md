# Security Audit — Lithiumteck Web v1.0 (2026-11-13)

## Scope
- **Target(s) audited:** Source/workspace `/data/projects/lithiumteck-web-v1.0-svk` (commit context: `main@50de22a`, includes SvelteKit app, `Dockerfile`, `docker-compose.yml`, `.env.example`, deploy docs). Black-box probes (non-destructive, read-only): `https://www.lithiumteck.com/`, `/health`, `/api/health`, `/_/`, `/api/collections`.
- **Access level:** Source access to this repo; **no** access to the external PocketBase instance/admin, no runtime credentials/tokens, no hosting/Dokploy/Traefik dashboard or logs, no staging environment details. No production/staging data accessed.
- **Out of scope / not tested:** External PocketBase configuration (API rules, auth, admin UI exposure, file storage, hooks, rate limiting, backups, version/encryption), DNS/registrar, TLS termination/proxy/WAF configuration beyond observed responses, container/host hardening, Dokploy runtime env/secrets, and any live in-app behavior (live site currently not serving the app — see below). No load/DoS, no exploitation beyond minimal confirmation probes.
- **Testing window:** 2026-11-13 (UTC).
- **ROE assumption:** Audit performed for the owner/operator of this repo/site; only non-destructive checks used. Proceeding on this basis.

## Executive summary
Current codebase is a **static SvelteKit marketing site** (no auth, no forms/actions, no API beyond `/health`, no AI/LLM/chat feature, no service worker, no PocketBase client usage in `src/`) with a small attack surface in app code. **No Critical/High code-level findings confirmed.** Main gaps are defensive hardening: no CSP/security-header configuration in the app, third-party assets loaded without SRI/CSP constraints, and **unverifiable external/backend/infra posture** (separately deployed PocketBase and Dokploy/Traefik) which must be audited in those systems. Live probes to `https://www.lithiumteck.com` returned `404 page not found` (proxy) for `/`, `/health`, and common PocketBase paths, so live app headers/routing and backend exposure could not be validated. No AI endpoints exist today; “AI attack/probing” risk is currently limited to generic automated probing/scraping and to future AI features if added without controls.

## Skills available for this audit
- **`security-audit-svelte-pocketbase`** (loaded): structured audit for SvelteKit + PocketBase (+ AI features) covering collection rules/auth/admin/files/hooks/rate limits, SvelteKit boundary/CSRF/CSP/headers/env/secrets, AI/LLM (OWASP LLM Top 10 mapping), infra/deployment, PWA/client, and reporting. References used: `02-pocketbase-backend.md`, `03-sveltekit-app.md`, `04-ai-llm-features.md`, `05-infra-deployment.md`, `06-pwa-client.md`, `07-methodology-and-reporting.md`.
- Other installed skills (not primary for this audit): `orca-cli`, `orchestration`, `find-skills`, `kilo-config`, `skill-creator`, etc. No dedicated `pentest`/`threat-model` skill beyond the above was available in-session.

## Findings summary

| # | Severity | Title | Area |
|---|---|---|---|
| 1 | Medium (potential) | Missing CSP and app-level security headers (live posture unverified) | SvelteKit / Infra |
| 2 | Low | Third-party resources loaded without SRI and unconstrained by CSP | SvelteKit / Supply chain |
| 3 | Low | `POCKETBASE_URL` required by compose but unused by app (config/operability risk) | Infra / Config |
| 4 | Low | Placeholder/public contact details and permissive `robots.txt` (info exposure) | PWA-client / Content |
| 5 | Informational | No AI/LLM/chat feature present; baseline protections for AI probing/future AI features not enforced in-app | AI feature / App |
| 6 | Informational | External PocketBase and live deployment security not testable from available access | PocketBase / Infra |

## Detailed findings

### [Medium] (potential) Missing CSP and app-level security headers (live posture unverified)
**Area:** SvelteKit / Infra  
**Location:** `svelte.config.js` (no `kit.csp`), `src/hooks.server.ts` (absent), `src/app.html` (inline script), `docker-compose.yml`/`Dockerfile` (no header middleware), live `https://www.lithiumteck.com/` (currently 404 proxy).  
**Description:** No Content Security Policy or standard security headers are configured in application code. `src/app.html` contains an inline `<script>` setting dark mode (`src/app.html:8-11`), which complicates a strict nonce/hash CSP unless refactored. A CSP and headers (HSTS, `X-Content-Type-Options: nosniff`, frame protection via `X-Frame-Options`/`frame-ancestors`, `Referrer-Policy`, restrictive `Permissions-Policy`) provide defense-in-depth against XSS, clickjacking, MIME sniffing, and data leakage.  
**Evidence:** `svelte.config.js` only sets `adapter-node`; no `hooks.server.*` exists in `src/`; live probes returned `HTTP/2 404` with `content-type: text/plain; charset=utf-8`, `x-content-type-options: nosniff`, `content-length: 19` (proxy response, not the app) — app-served headers/CSP could not be confirmed. No `{@html}` usage found in `src/` (`grep` clean). **Not independently verified on a live app response** (site not routing to app at test time).  
**Impact:** If the app becomes reachable without proxy-injected headers and any future XSS/vector is introduced (e.g. unsafe rendering, compromised third-party asset), lack of CSP/headers increases exploitability and blast radius (script execution, framing, referrer leakage). Current static pages with no untrusted rendering reduce immediate risk.  
**Remediation:** Add `kit.csp` in `svelte.config.js` (prefer nonce/hash; refactor or nonce the inline dark-mode script) and/or set headers in `hooks.server.ts` `handle` and/or at Traefik/Dokploy. Ensure production responses include at least: `Content-Security-Policy` (tight `script-src`/`style-src`/`font-src`/`img-src`/`connect-src`/`frame-ancestors`), `Strict-Transport-Security` (after TLS confirmed stable), `X-Content-Type-Options: nosniff`, `Referrer-Policy`, and restrictive `Permissions-Policy`. Verify on live app responses. (Refs: `03-sveltekit-app.md` §3, `05-infra-deployment.md`.)

### [Low] Third-party resources loaded without SRI and unconstrained by CSP
**Area:** SvelteKit / Supply chain  
**Location:** `src/app.html:6-7` (`https://fonts.googleapis.com/...`, `https://fonts.gstatic.com` fonts via CSS, Material Symbols stylesheet).  
**Description:** External Google Fonts/Material Symbols are loaded without Subresource Integrity (`integrity`/`crossorigin`) and there is no CSP restricting allowed script/style/font/connect origins. A compromised third-party asset or supply-chain issue could inject/alter client-side resources.  
**Evidence:** Source inspection of `src/app.html` shows two external `<link rel="stylesheet">` tags with no `integrity` attribute. No CSP present (Finding 1).  
**Impact:** Limited for a static site with no auth/session handling in-app, but a compromised third-party resource could deface pages, run scripts in users’ browsers (phishing/malvertising/cryptomining) if delivered in that context.  
**Remediation:** Self-host fonts/icons where feasible; otherwise pin with SRI where compatible (note: dynamically served CSS/font URLs can complicate SRI), and enforce a strict CSP allowlisting only required origins. Review necessity of each external dependency. (Refs: `06-pwa-client.md` §5, `03-sveltekit-app.md` §3.)

### [Low] `POCKETBASE_URL` required by compose but unused by app (config/operability risk)
**Area:** Infra / Config  
**Location:** `docker-compose.yml:15` (`POCKETBASE_URL: ${POCKETBASE_URL:?Set POCKETBASE_URL...}`), `package.json` (declares `pocketbase` dependency), `src/**` (no PocketBase client/hooks/server usage found).  
**Description:** Compose hard-requires `POCKETBASE_URL` to start the container, but the application code does not currently read or use it. Misconfiguration or missing env can block startup; conversely, operators may assume backend integration/security is active when it is not.  
**Evidence:** `grep -rn 'POCKETBASE|pocketbase|\$env/' src` returned no matches; `docker-compose.yml` enforces required var.  
**Impact:** Availability/deployment friction and false assumptions about backend connectivity/protections; not a direct exploit.  
**Remediation:** If PocketBase is not yet integrated, make the var optional in compose/Dokploy or document clearly as reserved; when integrating, consume it only server-side (e.g. `$env/static/private`/`dynamic/private`), never expose tokens/privileged clients to the browser, and enforce authZ in SvelteKit before any privileged server-side calls. (Refs: `03-sveltekit-app.md` §4, `05-infra-deployment.md` §5.)

### [Low] Placeholder/public contact details and permissive `robots.txt` (info exposure)
**Area:** PWA-client / Content  
**Location:** `src/routes/+page.svelte:246` (`mailto:hello@example.com`), `src/routes/portfolio/+page.svelte`/`src/routes/plugins/+page.svelte` (multiple `href="#"` placeholders), `static/robots.txt` (`User-agent: *` / `Disallow:` empty).  
**Description:** Placeholder contact/social links and fully permissive crawling increase low-value reconnaissance/scraping noise and may confuse users; not a direct vulnerability.  
**Evidence:** Source inspection of listed files; `static/robots.txt` allows all crawlers.  
**Impact:** Minor information quality/recon surface; facilitates automated scraping/indexing (expected for a public marketing site, but intentionality should be explicit).  
**Remediation:** Replace placeholders with real/approved destinations or remove; keep `robots.txt` permissive only if desired for SEO, and pair with rate-limiting/bot protections at the edge if scraping/abuse becomes an issue. (Refs: `06-pwa-client.md` general hygiene, reporting note on reconnaissance.)

### [Informational] No AI/LLM/chat feature present; baseline protections for AI probing/future AI features not enforced in-app
**Area:** AI feature / App  
**Location:** Repository-wide (`src/**`, `package.json`): no chat UI, no LLM SDK/API calls, no AI-related endpoints/routes/tooling found.  
**Description:** The audit explicitly considered AI attacks/probing. **No AI/LLM feature is implemented in this codebase**, so prompt injection, model output XSS, excessive agency, context/data exfiltration via LLM, and token/cost abuse vectors are **not currently applicable** in-app. Generic automated probing (scanners/bots) is possible against any public site but there are no sensitive/authenticated/AI endpoints exposed by this app code.  
**Evidence:** Code search for `openai|anthropic|llm|chat|prompt|ai|tool|embedding|rag` in `src`/`package.json` showed no AI integration (matches were unrelated UI text/icons/keywords). Only server route is `GET /health`.  
**Impact:** Current AI-specific attack surface: none identified. Future risk if AI/chat is added without controls (OWASP LLM Top 10).  
**Remediation:** If/when adding AI features, implement per `04-ai-llm-features.md`: isolate system/user/context data, treat all injected context as untrusted, never render raw model output via `{@html}` without robust allowlist sanitization, execute tools with the requesting user’s least-privilege scope (never superuser) and require confirmation for destructive actions, avoid secrets in prompts, cap tokens/time/cost, authenticate and rate-limit chat endpoints per user, and log safely. For general probing/scraping/abuse, enforce edge rate limiting/WAF/bot management in Dokploy/Traefik or upstream CDN and keep sensitive/admin surfaces (e.g. external PocketBase `/_/`) off the public internet. (Refs: `04-ai-llm-features.md`, `02-pocketbase-backend.md` §3/§6, `05-infra-deployment.md`.)

### [Informational] External PocketBase and live deployment security not testable from available access
**Area:** PocketBase / Infra  
**Location:** External PocketBase instance (URL configured via `POCKETBASE_URL`, not audited); Dokploy/Traefik/host environment for `https://www.lithiumteck.com`; live app not reachable during probes.  
**Description:** Core backend and deployment controls for this stack live outside this repo and could not be verified.  
**Evidence:** No PocketBase admin/source/rules access provided. Live probes: `GET /`, `/health`, `/api/health`, `/_/`, `/api/collections` on `www.lithiumteck.com` all returned `404` plain-text proxy responses (2026-11-13). `docker-compose.yml`/`Dockerfile` show intended proxy-header handling, internal networking (`expose`/`dokploy-network`) and `/health` checks, but runtime/proxy/TLS/header/WAF/rate-limit/secret-management posture is unconfirmed. `pnpm audit --prod` reported no known vulnerabilities. `.env` is gitignored; `.env.example` contains placeholders only.  
**Impact:** Undetected Critical/High issues may exist on the external PocketBase instance or deployment (common in this stack: permissive collection rules, exposed `/_/` admin UI, weak superuser controls, missing rate limits, public file access, staging/prod drift).  
**Remediation:** Perform a follow-up audit with authorized access to: PocketBase collections/rules/auth/file rules/hooks/rate limits/backups/admin exposure and version; Dokploy/Traefik routing, TLS/HSTS, header injection, WAF/rate limiting, network isolation, secrets, logs; and a working staging/production URL serving the app. Prioritize verifying PocketBase `list/view/create/update/delete` rules with real low-privilege requests, restricting `/_/`, enabling rate limiting, and confirming backups/restores. (Refs: `02-pocketbase-backend.md`, `05-infra-deployment.md`, `07-methodology-and-reporting.md`.)

## Not tested
- **PocketBase (external):** collection API rules, field-level create/update protections, ownership checks, cross-collection filters, auth methods/verification/OAuth linking/token hygiene, superuser accounts/IP restrictions/MFA, admin UI (`/_/`) exposure and login rate limiting, file view rules/storage ACLs/upload constraints, hooks (SSRF/email abuse/raw SQL), built-in rate limiting, version/CVE status, DB encryption, backups/restore — **no access/instance details provided**.
- **Live app & edge:** actual app responses, CSP/headers/HSTS as served, TLS/proxy config, WAF/rate limiting, routing correctness (site returned proxy 404), error verbosity in production, source map exposure on live host.
- **Infra/ops:** Dokploy env/secrets, container user/permissions hardening at runtime, host/SSH/firewall, inter-service networking to PocketBase, staging-vs-prod parity/data handling, secret rotation, DNS/MFA, multi-app credential isolation.
- **Abuse testing:** load/DoS, automated brute-force, or exploit chains (explicitly out of scope / non-destructive).

## Regression notes
No prior audit report provided; regression comparison not performed.


---

# Re-audit after remediation (2026-11-15)

## Scope of re-audit
Same repo/source access; production build executed locally (`pnpm run build`, adapter-node `node build` on `127.0.0.1:4174`) and responses inspected. No external backend/PocketBase or edge/proxy access (still outside available access).

## Remediations applied (commit set on top of `50de22a`)
1. **CSP + security headers** — `svelte.config.js` now configures `kit.csp` (`auto` mode, nonces) restricting `default-src 'self'`, `script-src 'self'` + nonce, `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`, `font-src 'self' https://fonts.gstatic.com`, `img-src 'self' data: https://lh3.googleusercontent.com`, `connect-src 'self'`, `object-src 'none'`, `base-uri 'self'`, `frame-ancestors 'none'`, `form-action 'self'`. New `src/hooks.server.js` sets `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options: DENY`, `Permissions-Policy` (camera/mic/geo/payment/usb denied), `COOP: same-origin`, `CORP: same-origin`, and `Strict-Transport-Security` on HTTPS requests.
2. **Inline script removed** — dark-mode bootstrap `<script>` deleted from `src/app.html` (`class="dark"` is set statically on `<html>` / via layout `onMount`), enabling the nonce-based CSP without inline-script exceptions.
3. **Third-party assets constrained** — `preconnect` hints added; origins for Google Fonts/Material Symbols/lh3 images are now allowlisted by the CSP. (SRI remains infeasible for Google-served CSS; self-hosting fonts is the next step if stricter posture wanted.)
4. **`POCKETBASE_URL` made optional** in `docker-compose.yml` (was a hard startup requirement while unused by app code).
5. **Placeholder contacts replaced** — `mailto:hello@example.com` → `mailto:contact@lithiumteck.com`; dead `href="#"` footer links in `/portfolio` and `/plugins` footers replaced with a real mailto contact link (also resolves those a11y/lint errors).
6. Re-verified `pnpm audit --prod`: no known vulnerabilities.

## Post-fix verification evidence (local production build, 2026-11-15)
- `GET /health` → `200 OK` with `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `X-Frame-Options: DENY`, `Permissions-Policy`, `COOP/CORP`. (HSTS appears in local HTTP test; browsers ignore HSTS on plain HTTP — will enforce on prod HTTPS.)
- `GET /` → `200 OK` with `content-security-policy: default-src 'self'; connect-src 'self'; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://lh3.googleusercontent.com; object-src 'none'; script-src 'self' 'nonce-…'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; base-uri 'self'; form-action 'self'; frame-ancestors 'none'` and nonce-annotated SvelteKit scripts.
- `GET /portfolio`, `GET /plugins` → `200 OK`.
- Unsolicited `POST /` → `405` (SvelteKit cross-origin/CSRF protection active; no form actions exist).
- Source greps re-run: no `{@html}`/`innerHTML`/`eval`/`new Function`; no secrets/tokens/keys in `src`/`static`; no `<script>` in `src/app.html`; no `href="#"` placeholders remain.
- `lint` improved vs baseline (44→36 problems — placeholder-link errors removed; remaining errors are pre-existing code-quality issues unrelated to security: a11y click handlers, each-block keys, `svelte/no-navigation-without-resolve`, and TS errors in `tests/syntax.test.js` under `svelte-check`).

## Finding status after remediation

| # | Original severity | Title | Status |
|---|---|---|---|
| 1 | Medium (potential) | Missing CSP and app-level security headers | **Remediated (verified locally)** |
| 2 | Low | Third-party resources without SRI / unconstrained | **Partially remediated** — CSP now constrains origins; SRI still absent (Google-hosted CSS) — self-host fonts to fully close |
| 3 | Low | `POCKETBASE_URL` required but unused | **Remediated** (optional in compose) |
| 4 | Low | Placeholder contacts / permissive `robots.txt` | **Partially remediated** — placeholders fixed; `robots.txt` remains intentionally permissive (public marketing site; add edge bot/rate limits if abuse observed) |
| 5 | Informational | No AI feature; future AI-path controls | Unchanged — no AI feature exists; guidance preserved in report (`04-ai-llm-features.md` requirements) |
| 6 | Informational | External PocketBase / deployment posture unverified | **Unchanged — requires access** (rules, admin `/_/` exposure, rate limits, TLS/proxy headers, secrets) |

## Residual risks / next steps
- Verify headers/CSP as served through Dokploy/Traefik once the domain routes to the app (proxy may strip/override; CSP is set app-side and should survive, but confirm).
- External PocketBase audit remains the top open item (potential Critical/High configuration issues live there, not in this repo).
- Consider self-hosting Google Fonts (e.g. `@fontsource/space-grotesk`) + Material Symbols icons to drop external origins entirely.
