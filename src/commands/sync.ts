import {Command} from '@oclif/command'
import {spawn} from 'child_process'
import cli from 'cli-ux'
import * as chalk from 'chalk'
import config from '../utils/config'

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

    cli.action.start(chalk.cyan('Syncing notes'))

    await new Promise(resolve => {
      const cmd = spawn('sh', ['-c', syncCmd])
      cmd.stdout.on('data', data => this.log(data.toString()))
      cmd.stderr.on('data', data => this.log(data.toString()))
      cmd.on('close', resolve)
    })
  }
}
