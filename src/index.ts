#!/usr/bin/env node
import { capitalCase } from 'change-case'
import { __workspace, execAsync, isFileExists, resolve } from './utils/index'
import { readFile, writeFile } from 'node:fs/promises'
import { basename } from 'node:path'

const meta = {
  name: '',
  author: '',
}

const packageJsonRaw = await readFile(resolve('package.json'), 'utf-8')
const json: Record<string, any> = JSON.parse(packageJsonRaw)
meta.name = basename(__workspace)
meta.author = (await execAsync('git config --get user.name')).stdout.trim()
const isFundingExist = await isFileExists('.github/FUNDING.yml')
const repository = `https://github.com/${meta.author}/${meta.name}`
const sponsor = `https://github.com/sponsors/${meta.author}`
const description = `The project of ${meta.name}`

json.name = meta.name
json.description = `The project of ${meta.name}`
json.author = meta.author
json.homepage = repository
if (json.displayName) {
  json.displayName = capitalCase(meta.name)
}
if (json.funding) {
  json.funding = sponsor
}
if (json.publisher) {
  json.publisher = meta.author
}
if (json.exports) {
  json.exports = {
    '.': './dist/index.js',
    [meta.name]: `./dist/index.js`,
  }
}
if (json.bin) {
  json.bin = {
    [meta.name]: `./dist/index.js`,
  }
}
if (json.repository) {
  json.repository = {
    type: 'git',
    url: repository
  }
}
if (json.bugs) {
  json.bugs = {
    url: `${repository}/issues`
  }
}
if (json.sponsor) {
  json.sponsor = {
    url: sponsor
  }
}
if (json.contributes?.configuration) {
  json.contributes.configuration.title = meta.name
}
const readme = `# ${meta.name}
${description}
`

await writeFile(
  resolve('package.json'), 
  JSON.stringify(json, null, 2)
)
await writeFile(
  resolve('README.md'), 
  readme
)
isFundingExist && await writeFile(
  resolve('.github/FUNDING.yml'),
  `github: [${meta.author}]`
)

export {}
