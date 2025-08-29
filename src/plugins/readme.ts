import { Meta } from "../types";
import { resolve } from "path";
import { getDescription, isFileExists } from "../utils";
import { writeFile } from "fs/promises";
import { definePlugin } from "../utils/definePlugin";

const file = resolve('README.md')

export const readmePlugin = definePlugin({
  when: async() => await isFileExists(file),
  async exec(meta) {
    const content = `# ${meta.name}
      ${getDescription(meta)}
    `
    await writeFile(
      file, 
      content
    )
  }
}) 
