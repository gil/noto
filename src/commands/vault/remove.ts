import * as chalk from 'chalk'

import Command from '../../base'

export default class VaultRemove extends Command {
  static description = 'remove given vault'

  static args = [
    {
      name: 'name',
      required: true,
      description: 'the name of the vault to add',
    },
  ]

  async run() {
    const {args} = this.parse(VaultRemove)

    if (!this.store.getVaults()[args.name]) {
      this.error(`Couldn't find vault ${chalk.magentaBright(args.name)}`)
    }

    this.store.removeVault(args.name)
    this.log(`Removed vault ${chalk.magentaBright(args.name)}.`)

    const vaultsLeftKeys = Object.keys(this.store.getVaults())
    if (this.store.getCurrentVault() === args.name && vaultsLeftKeys.length > 0) {
      this.store.setCurrentVault(vaultsLeftKeys[0])
      this.log(`Current vault set to ${chalk.magentaBright(vaultsLeftKeys[0])}.`)
    }

    await this.store.save()
  }
}
