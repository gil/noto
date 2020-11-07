import * as fs from 'fs-extra'
import * as path from 'path'

let configFile: string

let state = {
  currentVault: '',
  vaults: {},
}

export default {
  async init(configDir: string) {
    configFile = path.join(configDir, 'config.json')
    if (await fs.pathExists(configFile)) {
      state = await fs.readJSON(configFile)
    }
  },

  async save() {
    await fs.ensureFile(configFile)
    await fs.writeJSON(configFile, state)
  },

  getCurrentVault: (): string => state.currentVault,
  setCurrentVault: (vault: string) => {
    state.currentVault = vault
  },

  getVaults: (): {[vault: string]: string} => state.vaults,
}
