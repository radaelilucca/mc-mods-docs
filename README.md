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

1. Add one record to `catalog/projects.json`. Keep its slug stable, verify its display name and supported Minecraft/loader versions, and leave its public status as `planned` until the pages are reviewed.
2. Add one directory under `src/projects/<slug>/` with `en/` and `pt-BR/` trees. Keep assets inside that project directory so both translations can share them.
3. Start with the matching files in `templates/`. Each language should offer equivalent player, technical, and historical pages where applicable.
4. Add reviewed pages to both locale sidebars in `.vitepress/config.ts` and to the corresponding language catalog pages. Keep the current implementation separate from proposals and archived plans.
5. Run `pnpm run check` and `pnpm run build` before marking the project published in the internal catalog.

Files in `maintenance/`, `catalog/`, and `templates/` are contributor resources, not site pages.
