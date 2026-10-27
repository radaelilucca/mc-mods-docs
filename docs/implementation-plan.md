# Implementation plan — Radaeli mod documentation portal

## Approved decisions

- Create an independent VitePress site in the workspace root at `mod-docs/`.
- Provide English and Brazilian Portuguese, grouping source files by project.
- Keep the portal as the future canonical source; retain existing repository documentation until the portal has a public URL.
- Include maintained first-party mods and libraries. Exclude dependencies, test fixtures, copies, and third-party forks from the initial public catalog.
- Start with the site foundation and a complete R-Ui Lib pilot.
- Use VitePress rewrites to map `src/projects/<slug>/<locale>/...` to `/<locale>/mods/<slug>/...`.
- Publish reviewed player and technical documentation. Contextualize historical plans; do not publish raw logs.
- Keep one current documentation tree per project with supported game/loader versions, rather than duplicating pages per release.
- Use VitePress 1.6.4, TypeScript configuration, Node.js 22, pnpm 12.15.0, local search, and the default theme.
- Defer hosting, domain, publication, and repository pushes.

## Structure and editorial model

- `.vitepress/config.ts` owns localization, route rewrites, localized navigation and sidebars, and local-search translations.
- `src/` contains all pages generated into the website. Keep project source and shared project media grouped in `src/projects/<slug>/`.
- The site root offers explicit English and Portuguese choices. Locale home pages link to their project catalogs and featured projects.
- Each project begins with an overview, player guides, technical references, and a clearly marked history area where reviewed historical material belongs.
- Stable English slugs are used in both languages. Translate titles, navigation, descriptions, and prose; preserve API identifiers and code.
- `catalog/`, `maintenance/`, and `templates/` hold private-to-the-repository planning and contributor material and remain outside the published source tree.
- Preserve repository originals until the documentation portal has a public URL. Record migration sources and status in the internal catalog.

## R-Ui Lib pilot

- Publish an overview and player-facing installation/requirements guide.
- Cover consumer integration, public UI component families and themes, the development playground, supported loader targets, and build/validation workflow.
- Keep client-only integration details in the technical section. Explain that the library requires a consuming mod to provide player-visible screens.
- Verify component claims and development behavior against the current R-Ui Lib sources, its agent instructions, and its checked-in documentation.
- Summarize the toolkit PRD and foundation plan as historical context. Link to their originals and identify future API/milestones as proposals.
- Provide equivalent English and pt-BR versions and locale-specific navigation.

## Interfaces and maintenance

- VitePress routes translate project source paths to stable locale-prefixed URLs.
- The internal project catalog records each workspace candidate, its category and inclusion status. A project becomes public only after its translated pages and support facts have been reviewed.
- Contributors receive `docs:dev`, `docs:build`, `docs:preview`, and `docs:check` scripts, a frozen pnpm lockfile, shared page templates, and instructions for adding/modifying projects.
- Keep each project's sidebar and language switch behavior aligned with its actual pages.

## Acceptance checks

- `pnpm install --frozen-lockfile`, `pnpm run docs:check`, and `pnpm run docs:build` work in the standalone `mod-docs/` directory.
- The root page lets readers choose a language; each locale home, catalog, and R-Ui Lib section opens directly and survives refresh.
- Internal links, rewritten project routes, language switching, sidebars, and translated local search work in both locales.
- The pilot covers player installation and troubleshooting plus technical integration, components, themes, playground, loaders, and validation.
- Original library docs are unchanged; published historical pages distinguish shipped behavior from proposals.
- Hosting and public-link substitution are scheduled only after the portal URL exists.

## Implementation record

- Started: 2026-10-26
- Status: Foundation and the R-Ui Lib pilot are implemented in English and pt-BR.
- Validation: `pnpm install --frozen-lockfile`, `pnpm run docs:check`, `pnpm run docs:build`, and `pnpm audit` passed; 0 known dependency vulnerabilities.
