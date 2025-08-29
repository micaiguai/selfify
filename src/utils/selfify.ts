import { Meta, Plugin } from "../types";

export class Selfify {
  meta: Meta
  plugins: Plugin[]

  constructor(meta: Meta, plugins: Plugin[]) {
    this.meta = meta
    this.plugins = plugins
  }

  async exec() {
    await Promise.all(
      this.plugins.map(async plugin => {
        if (plugin.when && !(await plugin.when())) return
        await plugin.exec(this.meta)
      })
    )
  }
}
