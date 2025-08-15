#!/usr/bin/env node

console.log('hello')
// import { $ } from 'zx'
// import { type PackageJson } from 'type-fest'

// const packageJsonRaw = await $`cat package.json`
// const json: PackageJson.PackageJsonStandard = JSON.parse(packageJsonRaw.stdout)
// const foldername = await $`basename $(pwd)`
// const gitUsername = await $`git config --get user.name`

// const basename = foldername.stdout.replace('\n', '')
// const author = gitUsername.stdout.replace('\n', '')
// const description = `${basename} description`

// json.name = basename
// json.version = '0.0.1'
// json.description = description
// json.author = author
// const readme = `# ${basename}
// ${description}
// `

// await $`echo ${JSON.stringify(json, null, 2)} > package.json`
// await $`echo ${readme} > README.md`

// export {}
