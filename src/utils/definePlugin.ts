import { Meta, Plugin } from "../types"

export function definePlugin({
  when,
  exec
}: Plugin) {
  return {
    when,
    exec
  }
}
