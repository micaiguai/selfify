import { PathLike } from "node:fs"
import { access } from "node:fs/promises"

export async function fileExists(filePath: PathLike) {
  try {
    await access(filePath)
    return true
  } catch (error) {
    return false
  }
}
