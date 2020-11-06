import cli from 'cli-ux'
import * as chalk from 'chalk'

import Command from '../base'
import {run} from '../command-runner'

export default class Sync extends Command {
  static description = 'sync your notes to git'

  async run() {
    const currentVault = this.store.getCurrentVault()
    const allVaults = this.store.getVaults()
    const vaults = [[currentVault, allVaults[currentVault]]]

    cli.action.start(chalk.blueBright('Syncing vaults'))

    for (let i = 0; i < vaults.length; i++) {
      const [vaultName, vaultDir] = vaults[i]
      const syncCmd = `
        cd ${vaultDir} &&
        git -c rebase.autoStash=true pull --rebase &&
        git add . &&
        git commit -vam "Updating notes: $(date)" &&
        git push
`

      this.log(`${chalk.magentaBright(vaultName + ':')} ${vaultDir}`)

      // eslint-disable-next-line no-await-in-loop
      await run(this, syncCmd)
    }
  }
}
