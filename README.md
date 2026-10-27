# Radaeli Mods Documentation

The VitePress site for player guides and technical documentation for Minecraft projects maintained in the parent workspace.

## Requirements

- Node.js 22 (see `.nvmrc`)
- pnpm 12.15.0 (pinned in `package.json`)

## Local development

From this folder:

```sh
pnpm install --frozen-lockfile
pnpm run dev
```

Run `pnpm run check` to verify required translated pages and local links. Build the static site with `pnpm run build` and preview it with `pnpm run preview`.

## Deploy to GitHub Pages

The `Deploy GitHub Pages` workflow builds and deploys the site to [https://mods.radaeli.dev/](https://mods.radaeli.dev/) when changes reach `master`. It also supports a manual run from the Actions tab on that branch.

In the repository settings, open **Pages**, select **GitHub Actions** as the build and deployment source, and set the custom domain to `mods.radaeli.dev`. The VitePress base path is `/` both in GitHub Actions and during local development. Set `VITEPRESS_BASE` only when intentionally building for a different path.

Point the `mods` DNS record to `radaelilucca.github.io`. Once GitHub verifies the domain and provisions its certificate, enable **Enforce HTTPS** in the Pages settings.

## Add a project

1. Add one record to `catalog/projects.json`. Keep its slug stable, verify the canonical display name and supported Minecraft/loader versions, and leave its public status as `planned` until the pages are reviewed. Use the canonical name exactly in public titles and navigation; do not derive it from the slug or repository name.
2. Add one directory under `src/projects/<slug>/` with `en/` and `pt-BR/` trees. Keep assets inside that project directory so both translations can share them.
3. Start with the matching files in `templates/`. For mods, put an official CurseForge link at the beginning of each overview, immediately after its title, using the same URL in both languages. If the URL is missing while creating or updating documentation, ask the user for it instead of guessing. Each language should offer equivalent player and technical pages where applicable. Add a single `changelog.md` page per language containing the complete release history from the source repository's `CHANGELOG.md`; translate it for pt-BR and retain a link to the canonical file.
4. Classify pages by audience and use context. `For players` includes installation, gameplay, in-game integrations, and APIs players use while playing. Keep `Install and use` focused on requirements and first steps; group player guides by function (for example, `Sensors` for block placement, interface configuration, and redstone output). Gather CC:Tweaked and Lua gameplay integration in one `Computer Craft` page with a section and examples for each peripheral. `For developers` is only for building, extending, or contributing to the mod. Do not move player-facing features into developer docs merely because they expose an API or require code. Keep developer sections small or omit them for player-facing mods; libraries can have extensive developer documentation.
5. Add reviewed pages to both locale sidebars in `.vitepress/config.ts` and to the corresponding language catalog pages. Place `Changelog` in each mod's main sidebar group alongside `Overview`/`Visão geral`, using the label `Changelog`. Show each project's `documentedVersion` beside its canonical name in the top-level sidebar group in both languages, formatted as `Project name - version`. Document implemented, verified behavior only. Never publish PRDs, planning documents, agent guides/instructions, or project-history/archived-plan pages in the portal. Do not paraphrase or turn excluded planning material into portal pages.
6. Run `pnpm run check` and `pnpm run build` before marking the project published in the internal catalog.

Files in `maintenance/`, `catalog/`, and `templates/` are contributor resources, not site pages.
