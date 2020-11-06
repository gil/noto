import * as fs from 'fs-extra'
import * as path from 'path'

let configFile: string

let state = {
  currentVault: 'life',
  vaults: {
    life: '~/dev/notes',
    work: '~/dev/notes',
  },
}

export default {
  async init(configDir: string) {
    configFile = path.join(configDir, 'config.json')
    if (await fs.pathExists(configFile)) {
      state = await fs.readJSON(configFile)
    }
  },

  async save() {
    await fs.writeJSON(configFile, state)
  },

  getCurrentVault: () => state.currentVault,

  getVaults: () => state.vaults,
}
