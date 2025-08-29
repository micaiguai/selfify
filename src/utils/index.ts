import { exec } from "child_process"
import { PathLike } from "node:fs"
import { access } from "node:fs/promises"
import { basename } from "node:path"
import { fileURLToPath } from "node:url"
import { resolve } from "path/posix"
import { promisify } from "util"

export const __filename = fileURLToPath(import.meta.url)
export const __dirname = basename(__filename)

export async function isFileExists(filePath: PathLike) {
  try {
    await access(filePath)
    return true
  } catch (error) {
    return false
  }
}

export function resolveDir(...paths: string[]) {
  return resolve(__dirname, ...paths)
}

export const execAsync = promisify(exec)

