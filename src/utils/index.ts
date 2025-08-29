import { exec } from "child_process"
import { PathLike } from "node:fs"
import { access } from "node:fs/promises"
import { resolve } from "path/posix"
import { promisify } from "util"

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

