# Rebrand a site (no install needed)

1. **Copy the site folder** you want to rebrand, and give the copy the new client's name (for example `E:\code\new-client`). The old site stays untouched.
2. **Drag the `rebrand` folder** from this zip into the root of the copied site folder, next to `src`, `package.json` and `CLAUDE.md`. You can drop it straight into VS Code's Explorer sidebar.
3. Open `rebrand/REBRAND.md` in VS Code, fill it in (leave unknowns blank), and drop the new logo file into the `rebrand` folder.
4. In the Claude Code panel, set the mode to **Auto** and paste:
   ```
   Read rebrand/INSTRUCTIONS.md and follow it to rebrand this site.
   ```
5. When it's done, read `rebrand/REPORT.md`, check the site with `npm run dev`, then deploy it as a **new** Vercel project.

Tip: if browsers still show the old favicon, open the site in a private window. Browsers cache icons.
