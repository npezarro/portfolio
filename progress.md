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

## 2026-05-26 — Roll README changes into the visual site
- `b7cdd51` Add Foodie + Finance (Live Products) and CLI Orchestrator (Dev Tools) to `index.html`; 3 new `generate-pages.js` entries → 26 detail pages.
  - Foodie/Finance cards are text-only (no screenshots; browser-agent capture failed with `image readback failed`).
  - Finance detail page uses an arch diagram with NO real balances (per Nick: don't publish financial data).
  - Foodie = browser mock, CLI Orchestrator = terminal mock.
- Deployed `index.html` via SCP; `projects/` pages already deployed by the concurrent autonomous agent (owns those files as `rsa-key-20211029`). Verified live: index cards + all 3 detail pages return HTTP 200, no `$` data on Finance.
- Concurrent agent commits since: `847180d` (LinkedIn URL fix), `dd2c89f`/`22b5273` (dropped Finance GitHub + live links).
