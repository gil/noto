import {Command} from '@oclif/command'
import {spawn} from 'child_process'
import * as chalk from 'chalk'

export function run(cliCmd: Command, cmd: string): Promise<number> {
  return new Promise(resolve => {
    const sh = spawn('sh', ['-c', cmd])
    sh.stdout.on('data', data => cliCmd.log(data.toString()))
    sh.stderr.on('data', data => cliCmd.log(chalk.redBright(data.toString())))
    sh.on('close', resolve)
  })
}
