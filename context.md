# context.md

## Last Updated
2026-10-17 — Claims reconciled against `privateContext/career-reference/01-master-fact-sheet.md` (00b7cd4) plus three review fixes (94117c3: +12% credited to Profile-to-Posts, anti-scraping tile scoped to ~23M high-risk profiles, bakeoff calibration described as in-progress). Deployed and verified. **Patent section is now stale:** a 2026-10-17 audit found 4 granted US patents (12,632,669 B2 + design D1,140,936 / D1,151,643 / D1,151,644) and 26 EU designs; the site still says "1 granted, 1 pending". Updating it awaits Nick's OK. Full closeout: `privateContext/deliverables/closeouts/2026-10-17-portfolio-claims-reconcile-and-patent-audit.md`.

## Reconcile against the master resume when refreshing this
The canonical facts live in `privateContext/career-reference/01-master-fact-sheet.md` (and `projects/builder-portfolio.md` for builder counts with re-measure commands); never use figures it lists as retired. The portfolio drifts behind it — check that before any refresh. As of 2026-09-09 the resume itself was ALSO stale on the learning-agent run count ("900+"; actual 1,200+) — verify live counts (learning-agent journal `run #N`, `~/repos` git-repo count) rather than trusting either surface.

## Current State
- Static HTML/CSS/JS portfolio, no build step. Production design is variant Q ("Magazine Spread"). 27 generated detail pages.
- `README.md` is the GitHub-facing landing page; `index.html` is the deployed visual page at `pezant.ca/portfolio`.
- README **and** the visual site now cover the live apps: Shopper, Foodie (both public), Finance, Travel, Employ (gated), plus QuickClaude (demo video) and CLI Orchestrator (multi-model orchestration).
- **Separate GitHub profile README** now exists at `github.com/npezarro/npezarro` (created 2026-07-14) — distinct repo from this one; renders on the profile page.
- Synthetic Panel is deliberately NOT listed: it's an internal `/api/*`-only service (`/panel` 404s), not a public product.
- New detail pages: `projects/foodie.html` (browser mock), `projects/finance.html` (arch diagram, NO real balances), `projects/cli-orchestrator.html` (terminal). All live (HTTP 200).
- Resume PDF is **removed and scrubbed from all git history** — it contained a personal email. README says "Resume available upon request."
- Agent Guidance links point at **`npezarro/openAgentGuidance`** (public mirror). `npezarro/agentGuidance` is private as of 2026-08-19; do not link it from here.
- Remote has only `master`. Working tree clean, all pushed/deployed.

## Outbound links (check before trusting)
- **All 18 design variants `a/`–`s/` are deployed and publicly reachable**, not just production. Variants `a/`, `b/`, `c/` link projects *straight to GitHub* rather than to the detail page, so a link fix that only touches `index.html` + `generate-pages.js` leaves those three stale. `privateContext/deploy-notes/portfolio.md` does not yet cover deploying the variant dirs; they are SSH-user owned, so plain `scp <d>/index.html` works.
- **A linked repo going private silently breaks every link to it.** The check is a visibility sweep, not a liveness sweep: `gh repo view npezarro/<repo> --json isPrivate` over everything linked. Verified 2026-08-21: `openAgentGuidance`, `autonomousDev`, `claudeNet`, `claude-bakeoff`, `cli-orchestrator`, `page-reader`, `browser-agent` all public.
- The Learning Agent entry still mentions the private knowledge-base wiki. Intentional: private project, no clickable link, claim is true of the private system.

## Open Work
- **Foodie thumbnail:** Live Products card is text-only; browser-agent screenshot capture failed (`image readback failed`, occluded Chrome). Swap in a real screenshot later.
- **Deploy notes gap (low):** `privateContext/deploy-notes/portfolio.md` documents `index.html`, `assets/` and `projects/` but not the 18 variant dirs. Worth one line.
- **Concurrent autonomous agent** also commits + deploys this repo (deploys `projects/` as `rsa-key-20211029`). Expect non-fast-forward pushes — fetch+rebase before pushing. It tends to drop "gated/dead" live + GitHub links from the Finance entry.

## Environment Notes
- **Deploy target:** Oracle ARM VM (since 2026-09-30), Apache serves static files directly; `projects/` owned by `opc` (staged sudo cp)
- **Deploy method:** SCP to `/var/www/html/portfolio/` (see privateContext for SSH creds/commands)
- **Base path:** `/portfolio`
- **Build:** none (static); `generate-pages.js` regenerates `projects/*.html`
- **Node version:** 20.x (only needed to run generate-pages.js)

## Security (read before editing)
- Pre-commit/pre-push hook blocks the `pezant.ca` domain + VM IP (public repo).
- **Intentional exception:** `README.md` deliberately contains `pezant.ca` links (visual portfolio + live apps). Committed/pushed with `--no-verify`. Do NOT remove them as "violations."
- **Never** re-add a resume PDF or any personal email.

## Active Branch
`master`

---
Full closeout: `privateContext/deliverables/closeouts/2026-08-21-portfolio-openagentguidance-repoint.md`
Earlier: `privateContext/deliverables/closeouts/2026-05-26-portfolio-resume-scrub.md`
For change history, see `progress.md`.
