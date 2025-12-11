#!/usr/bin/env node

import { __workspace } from './utils/index'
import { initMeta } from './utils/init'
import { packagePlugin } from './plugins/package'
import { licensePlugin } from './plugins/license'
import { readmePlugin } from './plugins/readme'
import { Selfify } from './utils/selfify'
import { fundingPlugin } from './plugins/funding'

const meta = await initMeta()

const instance = new Selfify(meta, [
  packagePlugin,
  licensePlugin,
  readmePlugin,
  fundingPlugin
])

instance.exec()
