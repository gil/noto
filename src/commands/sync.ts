import {Command} from '@oclif/command'
import cli from 'cli-ux'
import * as chalk from 'chalk'

import config from '../utils/config'
import {run} from './command-runner'

export default class Sync extends Command {
  static description = 'sync your notes to git'

  async run() {
    const syncCmd = `
      cd ${config.notesDir()} &&
      git -c rebase.autoStash=true pull --rebase &&
      git add . &&
      git commit -vam "Updating notes: $(date)" &&
      git push
`

    this.log(`${chalk.magentaBright('Vault:')} ${config.notesDir()}`)
    cli.action.start(chalk.blueBright('Syncing notes'))
    await run(this, syncCmd)
  }
}
