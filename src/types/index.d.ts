export interface Meta {
  name: string
  author: string
}

export interface Plugin {
  when?: () => boolean | Promise<boolean>
  exec: (meta: Meta) => Promise<void> | void
}
