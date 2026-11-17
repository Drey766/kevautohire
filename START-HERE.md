# iMtalii Car Rentals: Claude Code kit (unattended build)

One prompt builds the whole site in 9 phases. Claude commits after each phase and ticks it off in `docs/PROGRESS.md`.

```
CLAUDE.md                     always-loaded rules, guardrails, design essentials
docs/BRIEF.md                 full spec: "Grand Arrival" design, personality mandate, pages, data
docs/PHASES.md                the 9 phases (with screenshot checks if browser tools are installed)
docs/PROGRESS.md              progress log
src/data/fleet.json           29 cars: IM-001 is their own Prado TX, plus 28 samples in KES/day
data-raw/car-notes.json       source text for rewriting samples (git-ignored, never shipped)
assets/                       logo traced to SVG, originals, their own wedding convoy photo
scripts/prepare-assets.mjs    favicon, Apple icon, share image
.claude/                      pre-approved build commands + content audit
```

## Steps (VS Code)
1. Unzip into a new folder, for example `E:\code\imtalii` (right-click the zip → **Extract All**, or in PowerShell):
   ```powershell
   Expand-Archive "$HOME\Downloads\imtalii-claude-code-kit.zip" -DestinationPath E:\code\imtalii
   ```
2. Use **File → Open Folder** to open `imtalii`. Check that `CLAUDE.md`, `docs`, `src`, `assets` and `.claude` are at the top level.
3. In the Claude Code panel, set the mode to **Auto** and paste:
   ```
   Read CLAUDE.md and docs/PROGRESS.md, then build the whole site by running every phase in docs/PHASES.md in order without stopping for approval. Commit and update docs/PROGRESS.md after each phase. Finish with the Phase 9 report.
   ```

## If it stops partway
New conversation, mode still on Auto:
```
Read CLAUDE.md and docs/PROGRESS.md, then continue from the first unticked phase in docs/PHASES.md. Keep running all remaining phases without stopping.
```

## Important: most of the fleet is a sample
Their Prado TX (IM-001) is real, from their own posts, and uses their own wedding convoy photo. The other 28 cars, photos and rates come from another Nairobi luxury car-hire site, purely to show off the design. While `NEXT_PUBLIC_DEMO_MODE=true`, the site says so, tags those cars "Sample", hides the source and isn't indexed by Google. Share the preview privately. Before launch, iMtalii's real fleet, photos and rates go in, and demo mode goes off.

## Good to know
- Confirmed details: both phone numbers (call and WhatsApp), the Gmail address, Bruce House on Standard Street, 24/7 support, nationwide delivery, and services (airport transfers, chauffeur, self-drive, weddings, VIP and executive).
- No deposit, insurance, waiting-time, delivery-fee or decoration-price details appear. Those are in the README checklist for iMtalii to confirm.
- Booking emails need a sending domain they own. Gmail can receive the requests but can't be the verified sender.
