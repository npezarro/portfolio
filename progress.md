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
