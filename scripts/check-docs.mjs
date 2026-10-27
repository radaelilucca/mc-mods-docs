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
  'history/archived-plans.md'
]
const flightSafetyPages = [
  'index.md',
  'player/index.md',
  'technical/cc-tweaked.md',
  'technical/sensors.md',
  'technical/avionics-network.md',
  'technical/modular-table.md',
  'technical/fms.md',
  'technical/gpws.md'
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
    if (!existsSync(path)) failures.push(`Missing ${locale} Flight Safety Instruments page: ${relative(root, path)}`)
  }
}

const config = readFileSync(join(root, '.vitepress', 'config.ts'), 'utf8')
if (!config.includes("source.match(/^projects\\/([^/]+)\\/(en|pt-BR)\\/(.+)$/)")) {
  failures.push('VitePress project rewrite does not match projects/<slug>/<locale>/... source paths.')
}
for (const locale of locales) {
  if (!config.includes(`'/${locale}/mods/r-ui-lib/`)) failures.push(`Missing ${locale} R-Ui Lib navigation or sidebar.`)
  if (!config.includes(`'/${locale}/mods/flight-safety-instruments/`)) failures.push(`Missing ${locale} Flight Safety Instruments navigation or sidebar.`)
}

const manifest = JSON.parse(readFileSync(join(root, 'catalog', 'projects.json'), 'utf8'))
const pilot = manifest.projects.find((project) => project.slug === 'r-ui-lib')
if (!pilot || pilot.status !== 'published' || pilot.kind !== 'library') {
  failures.push('Project catalog must mark the R-Ui Lib pilot as a published library.')
}
if (manifest.projects.some((project) => project.status === 'published' && project.slug !== 'r-ui-lib')) {
  failures.push('Only the reviewed R-Ui Lib pilot should be marked as published in this first delivery.')
}

function markdownFiles(directory) {
  if (!existsSync(directory)) return []
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name)
    return entry.isDirectory() ? markdownFiles(path) : entry.name.endsWith('.md') ? [path] : []
  })
}

const allMarkdown = markdownFiles(sourceRoot)
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
  console.log(`Documentation check passed: ${requiredPages.length} translated R-Ui Lib pages, ${flightSafetyPages.length} translated Flight Safety Instruments pages, project routes, navigation, and local links.`)
}
