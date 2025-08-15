#!/usr/bin/env zx
import { $ } from 'zx'

const packageJsonRaw = await $`cat package.json`
const json: Record<string, any> = JSON.parse(packageJsonRaw.stdout)
const foldername = await $`basename $(pwd)`
const gitUsername = await $`git config --get user.name`

const basename = foldername.stdout.replace('\n', '')
const author = gitUsername.stdout.replace('\n', '')
const description = `${basename} description`
const repository = `https://github.com/${author}/${basename}`
const sponsor = `https://github.com/sponsors/${author}`

json.name = basename
json.version = '0.0.1'
json.description = description
json.author = author
if (json.homepage) {
  json.homepage = `${repository}#readme`
}
if (json.funding) {
  json.funding = sponsor
}
if (json.publisher) {
  json.publisher = author
}
if (json.exports) {
  json.exports = {
    '.': './dist/index.js',
    [basename]: `./dist/${basename}.js`,
  }
}
if (json.bin) {
  json.bin = {
    [basename]: `dist/${basename}.js`,
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
if (json.contributes) {
  json.contributes = {
    commands: [],
    configuration: {
      type: 'object',
      title: `${basename}`,
      properties: {}
    }
  }
}
const readme = `# ${basename}
${description}
`

await $`echo ${JSON.stringify(json, null, 2)} > package.json`
await $`echo ${readme} > README.md`

export {}
