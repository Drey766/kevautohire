# Build phases

The site is built. It was first built in 9 phases for an earlier client and then rebranded for Kev Auto Hire on 2026-11-17 (see `rebrand/REPORT.md` and the git history).

For further work: read `CLAUDE.md` and `docs/PROGRESS.md`, make the change, run `npm run lint` and `npm run build`, commit, and note it in `docs/PROGRESS.md`.

**Visual check:** if Playwright or Chrome DevTools MCP tools are available, start `npm run dev`, take viewport screenshots at 375×812 and 1280×800 of the pages you touched, and fix layout, spacing, contrast and overflow before committing. Otherwise note "visual check skipped".

**When Kev Auto Hire's real fleet arrives:**
1. Add each vehicle to `src/data/fleet.json` with `sample: false`, `contentStatus: "confirmed"`, `driveOptions: ["chauffeur"]` and photos in `public/fleet/<ref>/`.
2. Remove the sample cars, the sample host from `images.remotePatterns` and `imgOptTimeoutInSeconds` in `next.config.ts`.
3. Set `NEXT_PUBLIC_DEMO_MODE=false`, then run the `audit-content` skill.
