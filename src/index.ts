#!/usr/bin/env node
import { capitalCase } from 'change-case'
import { $ } from 'zx'
import { fileExists } from './utils/index'

const packageJsonRaw = await $`cat package.json`
const json: Record<string, any> = JSON.parse(packageJsonRaw.stdout)
const foldername = await $`basename $(pwd)`
const gitUsername = await $`git config --get user.name`
const isFundingExist = await fileExists('.github/FUNDING.yml')

const basename = foldername.stdout.replace('\n', '')
const author = gitUsername.stdout.replace('\n', '')
const description = `${basename} description`
const repository = `https://github.com/${author}/${basename}`
const sponsor = `https://github.com/sponsors/${author}`

json.name = basename
json.description = description
json.author = author
json.homepage = `${repository}#readme`
if (json.displayName) {
  json.displayName = capitalCase(basename)
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
    [basename]: `./dist/index.js`,
  }
}
if (json.bin) {
  json.bin = {
    [basename]: `./dist/index.js`,
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
  json.contributes.configuration.title = basename
}
const readme = `# ${basename}
${description}
`

await $`echo ${JSON.stringify(json, null, 2)} > package.json`
await $`echo ${readme} > README.md`
if (isFundingExist) {
  await $`echo 'github: [${author}]' > .github/FUNDING.yml`
}

export {}
