import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join, relative, resolve, sep } from 'node:path'
import process from 'node:process'

const root = resolve(import.meta.dirname, '..')
const sourceRoot = join(root, 'src')
const projectRoot = join(sourceRoot, 'projects', 'r-ui-lib')
const locales = ['en', 'pt-BR']
const requiredPages = [
  'index.md',
  'player/index.md',
  'technical/integration.md',
  'technical/components-and-themes.md',
  'technical/component-examples.md',
  'technical/playground.md',
  'technical/loaders-and-validation.md',
  'changelog.md'
]
const flightSafetyPages = [
  'index.md',
  'changelog.md',
  'player/index.md',
  'player/sensors.md',
  'player/avionics-computer.md',
  'player/modular-table.md',
  'player/avionics-network.md',
  'player/computer-craft.md',
  'technical/development.md'
]
const failures = []

for (const locale of locales) {
  for (const page of requiredPages) {
    const path = join(projectRoot, locale, page)
    if (!existsSync(path)) failures.push(`Missing ${locale} pilot page: ${relative(root, path)}`)
  }
}

for (const locale of locales) {
  for (const page of flightSafetyPages) {
    const path = join(sourceRoot, 'projects', 'flight-safety-instruments', locale, page)
    if (!existsSync(path)) failures.push(`Missing ${locale} Fly by Instruments page: ${relative(root, path)}`)
  }
}

const config = readFileSync(join(root, '.vitepress', 'config.ts'), 'utf8')
if (!config.includes("source.match(/^projects\\/([^/]+)\\/(en|pt-BR)\\/(.+)$/)")) {
  failures.push('VitePress project rewrite does not match projects/<slug>/<locale>/... source paths.')
}
for (const locale of locales) {
  if (!config.includes(`'/${locale}/mods/r-ui-lib/`)) failures.push(`Missing ${locale} R-Ui Lib navigation or sidebar.`)
  if (!config.includes(`'/${locale}/mods/flight-safety-instruments/`)) failures.push(`Missing ${locale} Fly by Instruments navigation or sidebar.`)
  if (!config.includes(`'/${locale}/mods/flight-safety-instruments/player/computer-craft'`)) failures.push(`Missing ${locale} Computer Craft player guide navigation.`)
  if (!config.includes(`'/${locale}/mods/flight-safety-instruments/player/sensors'`)) failures.push(`Missing ${locale} sensor player guide navigation.`)
}

const manifest = JSON.parse(readFileSync(join(root, 'catalog', 'projects.json'), 'utf8'))
const pilot = manifest.projects.find((project) => project.slug === 'r-ui-lib')
if (!pilot || pilot.status !== 'published' || pilot.kind !== 'library') {
  failures.push('Project catalog must mark the R-Ui Lib pilot as a published library.')
}
if (manifest.projects.some((project) => project.status === 'published' && project.slug !== 'r-ui-lib')) {
  failures.push('Only the reviewed R-Ui Lib pilot should be marked as published in this first delivery.')
}
for (const project of manifest.projects.filter((entry) => entry.documentedVersion)) {
  for (const locale of locales) {
    const overview = join(sourceRoot, 'projects', project.slug, locale, 'index.md')
    if (!existsSync(overview)) {
      failures.push(`Missing ${locale} overview for versioned project ${project.slug}.`)
    } else if (!readFileSync(overview, 'utf8').includes(project.documentedVersion)) {
      failures.push(`The ${locale} overview for ${project.slug} does not state documented version ${project.documentedVersion}.`)
    }
    const sidebarLabel = `{ text: '${project.name} - ${project.documentedVersion}', items:`
    if (!config.includes(sidebarLabel)) {
      failures.push(`Missing versioned ${locale} sidebar title for ${project.slug}: ${project.name} ${project.documentedVersion}.`)
    }
  }
}
for (const slug of ['r-ui-lib', 'flight-safety-instruments']) {
  for (const locale of locales) {
    const changelog = join(sourceRoot, 'projects', slug, locale, 'changelog.md')
    if (existsSync(changelog) && !/^## \[\d+\.\d+\.\d+\]/m.test(readFileSync(changelog, 'utf8'))) {
      failures.push(`The ${locale} changelog page for ${slug} must include release entries in its body.`)
    }
  }
}

function markdownFiles(directory) {
  if (!existsSync(directory)) return []
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name)
    return entry.isDirectory() ? markdownFiles(path) : entry.name.endsWith('.md') ? [path] : []
  })
}

for (const locale of locales) {
  const oldComputerCraftPages = markdownFiles(join(sourceRoot, 'projects', 'flight-safety-instruments', locale, 'player', 'cc-tweaked'))
  if (oldComputerCraftPages.length) failures.push(`${locale} Fly by Instruments Computer Craft content should be consolidated into one player page.`)
  const developerPages = markdownFiles(join(sourceRoot, 'projects', 'flight-safety-instruments', locale, 'technical'))
  for (const path of developerPages) {
    if (relative(join(sourceRoot, 'projects', 'flight-safety-instruments', locale, 'technical'), path).split(sep).join('/') !== 'development.md') {
      failures.push(`Fly by Instruments developer docs should be limited to mod development topics: ${relative(root, path)}`)
    }
  }
}

const allMarkdown = markdownFiles(sourceRoot)
for (const path of allMarkdown) {
  const projectRelativePath = relative(join(sourceRoot, 'projects'), path).split(sep).join('/').toLowerCase()
  if (/(^|\/)(history|[^/]*(?:prd|plan|agent)[^/]*)($|\/)/.test(projectRelativePath)) {
    failures.push(`Project history, PRDs, planning documents, and agent guides are not publishable: ${relative(root, path)}`)
  }
}
const routeToSource = new Map(allMarkdown.map((path) => [routePath(relative(sourceRoot, path)), path]))

for (const path of allMarkdown) {
  const body = readFileSync(path, 'utf8').replace(/^---\n[\s\S]*?\n---\n/, '')
  for (const match of body.matchAll(/!?\[[^\]]*\]\(([^\s)]+)(?:\s+"[^"]*")?\)/g)) {
    const target = match[1]
    if (/^(?:[a-z]+:|#|\/\/)/i.test(target)) continue
    const pathname = decodeURIComponent(target.split(/[?#]/, 1)[0])
    if (!pathname.startsWith('/')) {
      const sourceRelativeAsset = resolve(path, '..', pathname)
      if (sourceRelativeAsset.startsWith(sourceRoot) && existsSync(sourceRelativeAsset)) continue
    }
    const base = routePath(relative(sourceRoot, path))
    const resolved = new URL(pathname, `https://docs.invalid${base}`)
    const route = resolved.pathname.replace(/\.md$/, '')
    const directoryRoute = route.endsWith('/') ? route : `${route}/`
    const indexRoute = route.endsWith('/index') ? `${route.slice(0, -6)}/` : undefined
    const resolvedFile = routeToSource.get(directoryRoute) ?? routeToSource.get(route) ?? (indexRoute && routeToSource.get(indexRoute))
    if (resolvedFile) continue

    const assetPath = resolve(sourceRoot, `.${resolved.pathname}`)
    if (assetPath.startsWith(sourceRoot) && existsSync(assetPath)) continue
    const noSlash = resolve(sourceRoot, `.${resolved.pathname}`)
    if (noSlash.startsWith(sourceRoot) && existsSync(noSlash)) continue
    if (!resolvedFile) {
      failures.push(`Unresolved local link in ${relative(root, path)}: ${target}`)
    }
  }
}

function rewriteSource(path) {
  const match = path.match(/^projects\/([^/]+)\/(en|pt-BR)\/(.+)$/)
  return match ? `${match[2]}/mods/${match[1]}/${match[3]}` : path
}

function routePath(sourcePath) {
  const rewritten = rewriteSource(sourcePath.split(sep).join('/'))
  return '/' + rewritten.replace(/(?:^|\/)index\.md$/, '/').replace(/\.md$/, '')
}

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join('\n'))
  process.exitCode = 1
} else {
  console.log(`Documentation check passed: ${requiredPages.length} translated R-Ui Lib pages, ${flightSafetyPages.length} translated Fly by Instruments pages, project routes, navigation, and local links.`)
}
