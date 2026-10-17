# progress.md

## 2026-10-17 — Review fixes + patent audit
- `94117c3` Three Codex-review fixes verified against career-reference dossiers: SEO tile credits +12% to Profile-to-Posts crosslinking (EBR mentioned separately, no measured lift); anti-scraping tile now "~23M / High-Risk Profiles Measured" with 900M+ as context; bakeoff copy says calibration labeling in progress (no validated rankings). Redeployed index.html + projects/claude-bakeoff.html, verified live.
- Patent audit (no site change yet): 4 granted US patents, 26 EU designs, pending US/PCT/CN; site patent section pending Nick's decision.

## 2026-10-14 — Claims reconciled with career-reference fact sheet (for Anthropic/OpenAI follow-ups)
- `00b7cd4` Rewrote every retired/unsourced claim to the approved wording in `privateContext/career-reference/01-master-fact-sheet.md`: patents now "one granted (US 12,632,669 B2, granted 2026-05-19) + one pending"; LinkedIn copy = founding PM on Games / core prompt engineer + SEO lead on Collaborative Articles (~1M weekly search sessions); dropped 900K, -95% scraping, 66-77%, 4-turn, three-layer, "built Games from zero"; earlier roles use fact-sheet wording.
- Counts re-measured: 146 GitHub repos (140+), autonomous dev 388 runs (370+, daily, since 2026-03), learning agent 1,294 (1,200+, every 8h), bakeoff 108 runs/340 evals, 18,000+ sessions. Bakeoff entry gains the judge-calibration story.
- README access labels: Travel + Employ are public (Google sign-in), Finance private.
- LinkedIn URL `in/npezarro` -> `in/nicholaspezarro` in 31 places (index, 27 detail pages, 18 variants).
- All 18 variants a/-s/ patched for the same claims.
- Also fixed public `claude-bakeoff` README (cd73f2c): removed the unsourced "~80% judge agreement".
- Deployed root + variants (scp) + projects/ (staged sudo cp; projects/ now owned by `opc` on the Oracle VM); CF purged; sha256 parity verified; live sweep shows 0 stale strings. Change list for Nick: GDoc 19-W_i9nmIrgcY7NC6onEWvPR9IWQuoPpAGjh1ur4SNY, Notion 3f993b317d77814292d1d97618fd8c2e.

## 2026-09-09 — Positioning + stale-count refresh (reconcile against master resume)
- `e469c50` Audited the portfolio against `privateContext/bakeoff/tasks/anthropic-growth-pm/workspace/master-resume-onepager.md` (Nick's stated source-of-truth resume). It had drifted; brought it current:
  - **Positioning:** hero, `<meta>`/`og:description`, and README Background now lead with "AI product leader who designs the behavioral and evaluation systems behind LLM products at scale" (was "Senior Product Manager"). Kept the two `Senior Product Manager` job-title lines in Experience untouched.
  - **Ecosystem size:** `30+` → `120-repo` (hero, meta/OG, masthead num+label `120+ / Repo Ecosystem`, README intro). Actual `~/repos` git-repo count is 130; master resume says "120-repo ecosystem".
  - **Autonomous Dev:** "running continuously for months across 30+ repos" → "running for over a year, 330+ runs across 30+ repos" (README, `index.html` featured card copy left as-is, `projects/autonomous-dev.html`, `generate-pages.js` source). Kept autonomous-dev's own working-set "30+ repos" (accurate; distinct from the 120-repo ecosystem).
  - **Learning Agent:** README "Has run 900+ times." → "1,200+ times." (journal shows run #1216+). The count lives ONLY in README — not in `index.html` or the detail page.
  - **Production stat:** sidebar `1yr+` → `18mo+`.
- No CSS change → no `?v` bump. Deployed `index.html` (scp) + `projects/autonomous-dev.html` (staged sudo cp); purged Cloudflare. Verified: sha256 parity local↔VM on both files, live pages carry the new copy, stale strings gone, edge `DYNAMIC`.
- **Outbound-link sweep (all live):** 14 linked GitHub repos all public; patents (Google Patents 200, lens.org 202), QuickClaude YouTube (200), Shopper/Foodie (200) all resolve. The featured Medium article 403s to curl (Cloudflare bot-block) but renders fully via page-reader `--stealth` — link is good.
- **Not changed (deliberate):** patents section left without a "Granted" label. Master resume tags US20240273306 "(Granted)" but the public number carries the `A1` (application-publication) suffix; did not add an unverified status claim to a public job-facing page. Flag for Nick to confirm. The 18 design variants `a/`–`s/` (reference-only, obscure paths) were not repositioned; only link-rot matters there and all repos are public.

## 2026-05-26 — Resume scrub + live-app links
- `86bbf83` Remove resume PDF (personal email), link visual portfolio + live apps
  - Deleted `Nicholas Pezarro Resume.pdf` (contained `n.pezarro@gmail.com`); replaced README link with "Resume available upon request."
  - Added `pezant.ca/portfolio` link to intro; added Live Products section (Shopper, Finance, Travel).
  - **Scrubbed the PDF from all git history** via `git-filter-repo --invert-paths` + force-push. Verified 0 occurrences across all refs; PDF 404s on GitHub.
- `04adca2` Document intentional `pezant.ca` README exception + resume-scrub policy in CLAUDE.md.
- `661d194` (concurrent, npezarro) Point Shopper at live site, QuickClaude at demo video, drop private-repo links in `generate-pages.js` + detail pages.
- `ddf35b1` Add Foodie + QuickClaude to Live Products, CLI Orchestrator to Dev Tools.
- (post-closeout) Repointed README QuickClaude link to the public YouTube demo (`X8jcoXETMjU`) instead of the detail page; added `context.md` + `progress.md`.

## 2026-05-26 — Auto-Shorts real interface screenshots
- `395a5ac` Switch Auto Shorts detail page from flow diagram to real screenshots: dashboard as split-hero, video library in a new "Interface" gallery.
  - Added optional `gallery[]` field + `galleryHtml` render block to `generate-pages.js`; new `.project-gallery` rule in `project.css`; bumped `project.css?v=2`→`?v=3`.
  - Images `assets/screenshots/auto-shorts-{dashboard,library}.png`.
  - Regenerated 26 pages; deployed via staged sudo-copy to `/var/www/html/portfolio/`. Verified live: page + both images 200.

## 2026-05-26 — Roll README changes into the visual site
- `b7cdd51` Add Foodie + Finance (Live Products) and CLI Orchestrator (Dev Tools) to `index.html`; 3 new `generate-pages.js` entries → 26 detail pages.
  - Foodie/Finance cards are text-only (no screenshots; browser-agent capture failed with `image readback failed`).
  - Finance detail page uses an arch diagram with NO real balances (per Nick: don't publish financial data).
  - Foodie = browser mock, CLI Orchestrator = terminal mock.
- Deployed `index.html` via SCP; `projects/` pages already deployed by the concurrent autonomous agent (owns those files as `rsa-key-20211029`). Verified live: index cards + all 3 detail pages return HTTP 200, no `$` data on Finance.
- Concurrent agent commits since: `847180d` (LinkedIn URL fix), `dd2c89f`/`22b5273` (dropped Finance GitHub + live links).

## 2026-07-14 — Add Employ to Live Products; refresh stats
- `353f8fa` Added Employ (`pezant.ca/employ`) to Live Products in `README.md` and `index.html`; new `employ` entry in `generate-pages.js` → 27 detail pages (`projects/employ.html`, arch-diagram visual, OAuth-gated). Fixed prev/next nav chain finance↔employ↔autonomous-dev.
  - Refreshed two stale README lines: "30+ guidance files plus a 50+ page synthesized knowledge-base wiki"; learning agent "Has run 900+ times."
- Deployed `index.html` (direct scp, ssh-user owned) + `projects/{employ,autonomous-dev,finance}.html` (sudo cp, rsa-key owned) to `/var/www/html/portfolio/`. Verified live: employ.html HTTP 200, index shows the card, `cf-cache-status: DYNAMIC` (real origin).
- Note: Synthetic Panel deliberately NOT added — it's an internal `/api/*`-only service, `/panel` 404s (not a public product). See closeout.
- Full closeout: privateContext/deliverables/closeouts/2026-07-14-resume-portfolio-refresh-url-liveness.md

## 2026-08-19 — Repoint Agent Guidance at the public openAgentGuidance mirror
- `fa7dbe8` The linked repo `npezarro/agentGuidance` went private, so every link to it was a 404 for anyone without access: `README.md`, `generate-pages.js`, the generated `projects/agent-guidance.html`, and variants `a/`, `b/`, `c/` (which link straight to GitHub rather than to the detail page). All repointed to `npezarro/openAgentGuidance` (public).
  - Rewrote the copy in all 21 surfaces to describe what is actually behind the link: 19 on-demand guidance files, the hook set, 8 subagent definitions. Dropped the "cross-referenced knowledge base wiki" and "30+ guidance pages" claims, which describe the private original, not the mirror.
  - Arch diagram Topic Layer changed from `Guidance Files / Agent Profiles / KnowledgeBase` to `Guidance Files / Hooks / Subagents`.
  - Learning Agent entry still mentions the knowledge-base wiki; left as-is (private project, no clickable link, and the claim is true of the private system).
- No CSS change, so no `?v=` bump. Deployed root + 18 variant `index.html` (plain scp) and `projects/agent-guidance.html` (staged sudo cp); purged the Cloudflare cache. Verified: sha256 parity local↔VM on 6 files, live pages carry the new copy with zero `npezarro/agentGuidance` occurrences, and the GitHub target returns 200.
- Follow-up (resolved same day): the openAgentGuidance repo's own GitHub description still read "Distilled, screened operating lessons...", the pre-2026-08-19 lessons model rather than the harness mirror it is now — the first line a visitor arriving from the portfolio reads. Replaced via `gh repo edit`; verified in the anonymous `<meta name="description">`. Logged in that repo's `progress.md`.
