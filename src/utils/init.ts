import { basename } from "path";
import { Meta } from "../types";
import { __workspace, execAsync } from ".";
import { input } from "@inquirer/prompts";

export async function initMeta() {
  let name = basename(__workspace)
  let author = (await execAsync('git config --get user.email')).stdout.trim()

  try {
    name = await input({
      message: 'Please input project name',
      default: name
    })
    author = await input({
      message: 'Please input author',
      default: author
    })
  } catch (error: any) {
    if (error.name === 'ExitPromptError') {
      process.exit(0)
    }
  }

  const meta = {} as Meta
  meta.name = name
  meta.author = author
  return meta
}
