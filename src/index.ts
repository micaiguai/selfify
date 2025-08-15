#!/usr/bin/env zx
import { $ } from 'zx'
import { PackageJson} from 'type-fest'

const packageJsonRaw = await $`cat package.json`
const json: PackageJson.PackageJsonStandard = JSON.parse(packageJsonRaw.stdout)
const foldername = await $`basename $(pwd)`
const gitUsername = await $`git config --get user.name`

const basename = foldername.stdout.replace('\n', '')
const author = gitUsername.stdout.replace('\n', '')

json.name = basename
json.version = '0.0.1'
json.description = `${basename} description`
json.author = author

await $`echo ${JSON.stringify(json, null, 2)} > package.json`

export {}
