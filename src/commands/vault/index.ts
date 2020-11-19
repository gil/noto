import chalk from 'chalk'

import Command from '../../base'

export default class Vault extends Command {
  static description = 'set the current vault or list all your vaults'

  static args = [
    {
      name: 'name',
      required: false,
      description: 'the name of the vault to select. When omitted, a list of all vaults will be printed',
    },
  ]

  async run() {
    const {args} = this.parse(Vault)

    if (args.name) {
      const vaultName = args.name.toLowerCase()
      if (!this.store.getVaults()[vaultName]) {
        this.error(`Couldn't find vault ${chalk.magentaBright(vaultName)}`)
      }
      this.store.setCurrentVault(vaultName)
      await this.store.save()
      this.log(`Current vault set to ${chalk.magentaBright(vaultName)}.`)
    } else {
      Object.entries(this.store.getVaults())
      .forEach(([name, dir]) => this.log(`${chalk.magentaBright(name + ':')} ${dir}`))
    }
  }
}
