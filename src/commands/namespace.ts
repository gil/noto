import chalk from 'chalk'
import fg from 'fast-glob'

import Command from '../base'
import untildify from 'untildify'

export default class Namespace extends Command {
  static description = 'list all namespaces and count notes on each'

  async run() {
    const log = this.log
    const currentVault = this.store.getCurrentVault()
    const vaultDir = this.store.getVaults()[currentVault]
    const counts = {} as any

    const entries = await fg('**/*.md', {cwd: untildify(vaultDir)})

    entries.forEach(file => {
      const pathParts = file.split('/')
      const fileName = pathParts.pop()!
      const boundary = pathParts.join('/') + '/'
      const namespaces = fileName.split('.').slice(0, -2)

      counts[boundary] = counts[boundary] ?? {count: 0}
      let currentLevel = counts[boundary]

      namespaces.forEach(namespace => {
        currentLevel[namespace] = currentLevel[namespace] ?? {count: 0}
        currentLevel = currentLevel[namespace]
      })

      currentLevel.count++
    })

    function printCounts(obj: any, space = '', color = chalk.cyanBright) {
      for (const key in obj) {
        if (key !== 'count') {
          log(`${space}${(color(key))}: ${obj[key].count}`)
          printCounts(obj[key], space + '\t', chalk.yellowBright)
        }
      }
    }

    printCounts(counts)
    log(`${chalk.blueBright('Total')}: ${entries.length}`)
  }
}
