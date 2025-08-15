import { defineConfig } from 'tsdown'
import { readFileSync } from 'node:fs'

const packageJson = JSON.parse(readFileSync('./package.json', 'utf-8'))

export default defineConfig({
  entry: 'src/index.ts',
  format: 'esm',
})
