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
    const vaultName = args.name.toLowerCase()

    if (!this.store.getVaults()[vaultName]) {
      this.error(`Couldn't find vault ${chalk.magentaBright(vaultName)}`)
    }

    this.store.removeVault(vaultName)
    this.log(`Removed vault ${chalk.magentaBright(vaultName)}.`)

    const vaultsLeftKeys = Object.keys(this.store.getVaults())
    if (this.store.getCurrentVault() === vaultName && vaultsLeftKeys.length > 0) {
      this.store.setCurrentVault(vaultsLeftKeys[0])
      this.log(`Current vault set to ${chalk.magentaBright(vaultsLeftKeys[0])}.`)
    }

    await this.store.save()
  }
}
