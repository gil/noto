import * as chalk from 'chalk'

import Command from '../../base'

export default class Sync extends Command {
  static description = 'list all your vaults'

  async run() {
    Object.entries(this.store.getVaults())
    .forEach(([name, dir]) => this.log(`${chalk.magentaBright(name + ':')} ${dir}`))
  }
}
