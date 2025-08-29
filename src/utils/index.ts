import { exec } from "child_process"
import { PathLike } from "node:fs"
import { access } from "node:fs/promises"
import { basename } from "node:path"
import { cwd } from "node:process"
import { fileURLToPath } from "node:url"
import { resolve as originResolve } from "path"
import { promisify } from "util"

export const __filename = fileURLToPath(import.meta.url)
export const __dirname = basename(__filename)
export const __workspace = cwd()

export async function isFileExists(filePath: PathLike) {
  try {
    await access(filePath)
    return true
  } catch (error) {
    return false
  }
}

export function resolve(...paths: string[]) {
  return originResolve(__workspace, ...paths)
}

export const execAsync = promisify(exec)

