import { Meta } from "../types";
import { resolve } from "path";
import { isFileExists } from "../utils";
import { writeFile } from "fs/promises";
import { definePlugin } from "../utils/definePlugin";

const file = resolve('.github/FUNDING.yml')

export const fundingPlugin = definePlugin({
  when: async() => await isFileExists(file),
  async exec(meta) {
    const content = `github: [${meta.author}]
`
    await writeFile(
      file, 
      content
    )
  }
}) 
