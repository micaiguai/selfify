import { resolve } from "path";
import { getDescription, isFileExists } from "../utils";
import { readFile, writeFile } from "fs/promises";
import { definePlugin } from "../utils/definePlugin";
import { capitalCase } from "change-case";

const file = resolve('package.json')

export const packagePlugin = await definePlugin({
  when: async() => await isFileExists(file),
  async exec(meta) {
    const raw = await readFile(resolve('package.json'), 'utf-8')
    const json: Record<string, any> = JSON.parse(raw)
    const repository = `https://github.com/${meta.author}/${meta.name}`
    const sponsor = `https://github.com/sponsors/${meta.author}`
    const description = getDescription(meta)

    json.name = meta.name
    json.description = description
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

    const content = JSON.stringify(json, null, 2) + '\n'

    await writeFile(
      resolve('package.json'), 
      content
    )
  }
}) 
