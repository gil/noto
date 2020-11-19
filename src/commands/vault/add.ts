import chalk from 'chalk'
import fs from 'fs-extra'

import Command from '../../base'

export default class VaultAdd extends Command {
  static description = 'add a new vault'

  static args = [
    {
      name: 'name',
      required: true,
      description: 'the name of the vault to add',
    },
    {
      name: 'path',
      required: true,
      description: 'path to the directory of your vault',
    },
  ]

  async run() {
    const {args} = this.parse(VaultAdd)
    const vaultName = args.name.toLowerCase()

    if (this.store.getVaults()[vaultName]) {
      this.error(`There's already a vault called ${chalk.magentaBright(vaultName)}`)
    } else if (!fs.pathExistsSync(args.path)) {
      this.error(`Couldn't find the directory: ${chalk.magentaBright(args.path)}`)
    }

    this.store.addVault(vaultName, args.path)
    this.log(`Added vault ${chalk.magentaBright(vaultName)} from: ${args.path}`)
    this.store.setCurrentVault(vaultName)
    this.log(`Current vault set to ${chalk.magentaBright(vaultName)}.`)
    await this.store.save()
  }
}
