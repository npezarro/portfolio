# context.md

## Last Updated
2026-08-21 — Repointed the Agent Guidance entry from the now-private `agentGuidance` to the public `openAgentGuidance` mirror (22 files) and rewrote its copy to match the mirror's actual contents; deployed + verified. Earlier: Employ added to Live Products (27 detail pages).

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
- **Deploy target:** GCP VM, Apache serves static files directly
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
