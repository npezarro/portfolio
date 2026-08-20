# progress.md

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
