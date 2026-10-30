import { defineConfig } from 'vitepress'
import process from 'node:process'

function rewriteProjectPage(source: string): string | undefined {
  const match = source.match(/^projects\/([^/]+)\/(en|pt-BR)\/(.+)$/)
  return match ? `${match[2]}/mods/${match[1]}/${match[3]}` : undefined
}

function translatedPath(relativePath: string, locale: string): string | undefined {
  const projectPage = relativePath.match(/^projects\/([^/]+)\/(en|pt-BR)\/(.+?)(?:\.md)?$/)
  if (projectPage) {
    const [, project, , page] = projectPage
    return `/${locale}/mods/${project}/${page === 'index' ? '' : page.replace(/\/index$/, '/')}`
  }

  const rewrittenProjectPage = relativePath.match(/^(?:en|pt-BR)\/mods\/([^/]+)\/(.+?)(?:\.md)?$/)
  if (rewrittenProjectPage) {
    const [, project, page] = rewrittenProjectPage
    return `/${locale}/mods/${project}/${page === 'index' ? '' : page.replace(/\/index$/, '/')}`
  }

  if (relativePath === 'index.md' || relativePath === 'en/index.md' || relativePath === 'pt-BR/index.md') {
    return locale === 'en' ? '/en/' : '/pt-BR/'
  }
  if (relativePath === 'en/mods/index.md' || relativePath === 'pt-BR/mods/index.md') {
    return locale === 'en' ? '/en/mods/' : '/pt-BR/mods/'
  }

  return locale === 'en' ? '/en/' : '/pt-BR/'
}

export default defineConfig({
  title: 'Radaeli Mods',
  description: 'Player guides and technical documentation for Radaeli Minecraft mods.',
  lang: 'en-US',
  base: process.env.VITEPRESS_BASE ?? '/',
  srcDir: 'src',
  cleanUrls: true,
  rewrites: (source) => rewriteProjectPage(source) ?? source,
  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      title: 'Radaeli Mods',
      description: 'Player guides and technical documentation for Radaeli Minecraft mods.',
      themeConfig: {
        nav: [
          {
            text: 'Mods',
            items: [
              { text: 'Project catalog', link: '/en/mods/' },
              { text: 'R-Ui Lib', link: '/en/mods/r-ui-lib/' },
              { text: 'Fly by Instruments', link: '/en/mods/flight-safety-instruments/' },
              { text: 'Hotbar Locker', link: '/en/mods/hotbar-locker/' },
              { text: 'Sophisticated Backpacks: Digital Storage Expansion', link: '/en/mods/sophisticated-backpack-is-addon/' }
            ]
          }
        ],
        sidebar: {
          '/en/mods/r-ui-lib/': [
            { text: 'R-Ui Lib - 0.8.0', items: [
              { text: 'Overview', link: '/en/mods/r-ui-lib/' },
              { text: 'Changelog', link: '/en/mods/r-ui-lib/changelog' }
            ] },
            { text: 'For players', items: [{ text: 'Install and requirements', link: '/en/mods/r-ui-lib/player/' }] },
            {
              text: 'For developers',
              items: [
                { text: 'Integration', link: '/en/mods/r-ui-lib/technical/integration' },
                { text: 'Components and themes', link: '/en/mods/r-ui-lib/technical/components-and-themes' },
                { text: 'Component examples', link: '/en/mods/r-ui-lib/technical/component-examples' },
                { text: 'Playground', link: '/en/mods/r-ui-lib/technical/playground' },
                { text: 'Loaders and validation', link: '/en/mods/r-ui-lib/technical/loaders-and-validation' }
              ]
            },
          ],
          '/en/mods/flight-safety-instruments/': [
            { text: 'Fly by Instruments - 0.2.0', items: [
              { text: 'Overview', link: '/en/mods/flight-safety-instruments/' },
              { text: 'Changelog', link: '/en/mods/flight-safety-instruments/changelog' }
            ] },
            { text: 'For players', items: [
              { text: 'Install and use', link: '/en/mods/flight-safety-instruments/player/' },
              { text: 'Sensors', link: '/en/mods/flight-safety-instruments/player/sensors' },
              { text: 'Avionics Computer and GPWS', link: '/en/mods/flight-safety-instruments/player/avionics-computer' },
              { text: 'Modular Table', link: '/en/mods/flight-safety-instruments/player/modular-table' },
              { text: 'Avionics Wire', link: '/en/mods/flight-safety-instruments/player/avionics-network' },
              { text: 'Computer Craft', link: '/en/mods/flight-safety-instruments/player/computer-craft' }
            ] },
            { text: 'For developers', items: [{ text: 'Development setup', link: '/en/mods/flight-safety-instruments/technical/development' }] }
          ],
          '/en/mods/hotbar-locker/': [
            { text: 'Hotbar Locker - 0.4.0', items: [
              { text: 'Overview', link: '/en/mods/hotbar-locker/' },
              { text: 'Changelog', link: '/en/mods/hotbar-locker/changelog' }
            ] },
            { text: 'For players', items: [
              { text: 'Install and use', link: '/en/mods/hotbar-locker/player/' },
              { text: 'Configuration', link: '/en/mods/hotbar-locker/player/configuration' }
            ] }
          ],
          '/en/mods/sophisticated-backpack-is-addon/': [
            { text: 'Sophisticated Backpacks: Digital Storage Expansion - 0.3.0', items: [
              { text: 'Overview', link: '/en/mods/sophisticated-backpack-is-addon/' },
              { text: 'Changelog', link: '/en/mods/sophisticated-backpack-is-addon/changelog' }
            ] },
            { text: 'For players', items: [
              { text: 'Install and use', link: '/en/mods/sophisticated-backpack-is-addon/player/' },
              { text: 'Linking', link: '/en/mods/sophisticated-backpack-is-addon/player/linking' },
              { text: 'Filters and source priority', link: '/en/mods/sophisticated-backpack-is-addon/player/filters' },
              { text: 'Upgrade catalog', link: '/en/mods/sophisticated-backpack-is-addon/player/upgrades' },
              { text: 'Configuration', link: '/en/mods/sophisticated-backpack-is-addon/player/configuration' }
            ] }
          ]
        },
      }
    },
    'pt-BR': {
      label: 'Português (Brasil)',
      lang: 'pt-BR',
      link: '/pt-BR/',
      title: 'Radaeli Mods',
      description: 'Guias para jogadores e documentação técnica dos mods de Minecraft do Radaeli.',
      themeConfig: {
        nav: [
          {
            text: 'Mods',
            items: [
              { text: 'Catálogo de projetos', link: '/pt-BR/mods/' },
              { text: 'R-Ui Lib', link: '/pt-BR/mods/r-ui-lib/' },
              { text: 'Fly by Instruments', link: '/pt-BR/mods/flight-safety-instruments/' },
              { text: 'Hotbar Locker', link: '/pt-BR/mods/hotbar-locker/' },
              { text: 'Sophisticated Backpacks: Digital Storage Expansion', link: '/pt-BR/mods/sophisticated-backpack-is-addon/' }
            ]
          }
        ],
        sidebar: {
          '/pt-BR/mods/r-ui-lib/': [
            { text: 'R-Ui Lib - 0.8.0', items: [
              { text: 'Visão geral', link: '/pt-BR/mods/r-ui-lib/' },
              { text: 'Changelog', link: '/pt-BR/mods/r-ui-lib/changelog' }
            ] },
            { text: 'Para jogadores', items: [{ text: 'Instalação e requisitos', link: '/pt-BR/mods/r-ui-lib/player/' }] },
            {
              text: 'Para desenvolvedores',
              items: [
                { text: 'Integração', link: '/pt-BR/mods/r-ui-lib/technical/integration' },
                { text: 'Componentes e temas', link: '/pt-BR/mods/r-ui-lib/technical/components-and-themes' },
                { text: 'Exemplos de componentes', link: '/pt-BR/mods/r-ui-lib/technical/component-examples' },
                { text: 'Playground', link: '/pt-BR/mods/r-ui-lib/technical/playground' },
                { text: 'Loaders e validação', link: '/pt-BR/mods/r-ui-lib/technical/loaders-and-validation' }
              ]
            },
          ],
          '/pt-BR/mods/flight-safety-instruments/': [
            { text: 'Fly by Instruments - 0.2.0', items: [
              { text: 'Visão geral', link: '/pt-BR/mods/flight-safety-instruments/' },
              { text: 'Changelog', link: '/pt-BR/mods/flight-safety-instruments/changelog' }
            ] },
            { text: 'Para jogadores', items: [
              { text: 'Instalação e uso', link: '/pt-BR/mods/flight-safety-instruments/player/' },
              { text: 'Sensors', link: '/pt-BR/mods/flight-safety-instruments/player/sensors' },
              { text: 'Avionics Computer e GPWS', link: '/pt-BR/mods/flight-safety-instruments/player/avionics-computer' },
              { text: 'Modular Table', link: '/pt-BR/mods/flight-safety-instruments/player/modular-table' },
              { text: 'Avionics Wire', link: '/pt-BR/mods/flight-safety-instruments/player/avionics-network' },
              { text: 'Computer Craft', link: '/pt-BR/mods/flight-safety-instruments/player/computer-craft' }
            ] },
            { text: 'Para desenvolvedores', items: [{ text: 'Ambiente de desenvolvimento', link: '/pt-BR/mods/flight-safety-instruments/technical/development' }] }
          ],
          '/pt-BR/mods/hotbar-locker/': [
            { text: 'Hotbar Locker - 0.4.0', items: [
              { text: 'Visão geral', link: '/pt-BR/mods/hotbar-locker/' },
              { text: 'Changelog', link: '/pt-BR/mods/hotbar-locker/changelog' }
            ] },
            { text: 'Para jogadores', items: [
              { text: 'Instalação e uso', link: '/pt-BR/mods/hotbar-locker/player/' },
              { text: 'Configurações', link: '/pt-BR/mods/hotbar-locker/player/configuration' }
            ] }
          ],
          '/pt-BR/mods/sophisticated-backpack-is-addon/': [
            { text: 'Sophisticated Backpacks: Digital Storage Expansion - 0.3.0', items: [
              { text: 'Visão geral', link: '/pt-BR/mods/sophisticated-backpack-is-addon/' },
              { text: 'Changelog', link: '/pt-BR/mods/sophisticated-backpack-is-addon/changelog' }
            ] },
            { text: 'Para jogadores', items: [
              { text: 'Instalação e uso', link: '/pt-BR/mods/sophisticated-backpack-is-addon/player/' },
              { text: 'Vínculo', link: '/pt-BR/mods/sophisticated-backpack-is-addon/player/linking' },
              { text: 'Filtros e prioridade de origem', link: '/pt-BR/mods/sophisticated-backpack-is-addon/player/filters' },
              { text: 'Catálogo de upgrades', link: '/pt-BR/mods/sophisticated-backpack-is-addon/player/upgrades' },
              { text: 'Configurações', link: '/pt-BR/mods/sophisticated-backpack-is-addon/player/configuration' }
            ] }
          ]
        },
      }
    }
  },
  themeConfig: {
    i18nRouting: (_data, route, targetLocale) => translatedPath(route.data.relativePath, targetLocale === 'root' ? 'en' : targetLocale),
    search: {
      provider: 'local',
      options: {
        locales: {
          'pt-BR': {
            translations: {
              button: { buttonText: 'Buscar', buttonAriaLabel: 'Buscar' },
              modal: {
                displayDetails: 'Exibir lista detalhada',
                resetButtonTitle: 'Limpar busca',
                backButtonTitle: 'Fechar busca',
                noResultsText: 'Nenhum resultado',
                footer: {
                  selectText: 'selecionar',
                  selectKeyAriaLabel: 'Enter',
                  navigateText: 'navegar',
                  navigateUpKeyAriaLabel: 'Seta para cima',
                  navigateDownKeyAriaLabel: 'Seta para baixo',
                  closeText: 'fechar',
                  closeKeyAriaLabel: 'Esc'
                }
              }
            }
          }
        }
      }
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/radaelilucca' }],
    footer: {
      message: "Official document for Radaeli's Minecraft Projects.",
      copyright: 'Project names and trademarks belong to their respective owners.'
    }
  }
})
