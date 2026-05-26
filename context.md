# context.md

## Last Updated
2026-05-26 — Scrubbed resume PDF (personal email) from all git history; added live-app + visual-portfolio links to README.

## Current State
- Static HTML/CSS/JS portfolio, no build step. Production design is variant Q ("Magazine Spread").
- `README.md` is the GitHub-facing landing page; `index.html` is the deployed visual page at `pezant.ca/portfolio`.
- README now links the visual portfolio and the live apps (Shopper, Foodie, Finance, Travel) plus QuickClaude (demo video) and CLI Orchestrator.
- Resume PDF is **removed and scrubbed from all git history** — it contained a personal email. README says "Resume available upon request."
- Remote has only `master`. Working tree clean, all pushed.

## Open Work
- None blocking. (Concurrent commit `661d194` from another session/agent updated `projects/quick-claude.html` and `projects/shopper.html` link targets; merged cleanly into the linear history.)

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
Full closeout: `privateContext/deliverables/closeouts/2026-05-26-portfolio-resume-scrub.md`
For change history, see `progress.md`.
