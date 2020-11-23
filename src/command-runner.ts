import {Command} from '@oclif/command'
import {spawn, SpawnOptions} from 'child_process'
import chalk from 'chalk'
import untildify from 'untildify'

export function run(cliCmd: Command, cmd: string, options?: SpawnOptions, stdinContent?: string): Promise<number> {
  if (options?.cwd) {
    options.cwd = untildify(options.cwd)
  }

  return new Promise(resolve => {
    const sh = spawn('sh', ['-c', cmd], options)
    sh.stdout.on('data', data => cliCmd.log(data.toString()))
    sh.stderr.on('data', data => cliCmd.log(chalk.yellowBright(data.toString())))

    if (stdinContent) {
      sh.stdin.setDefaultEncoding('utf-8')
      sh.stdin.write(stdinContent)
      sh.stdin.end()
    }

    sh.on('close', resolve)
  })
}
