import Command from '@oclif/command'
import store from './store'
import {IConfig} from '@oclif/config'

export default abstract class extends Command {
  store: typeof store

  constructor(argv: string[], config: IConfig) {
    super(argv, config)
    this.store = store
  }

  async init() {
    await store.init(this.config.configDir)
  }
}
