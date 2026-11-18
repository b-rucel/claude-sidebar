export type Call = { id: string; tool: string; isDone: boolean }
export type Git = { branch: string; changed: number; untracked: number }

declare module 'claude-code' {
  interface PluginState {
    'claude-sidebar': {
      calls: Shaped<Call[]>
      git: Shaped<Git | null>
      tick: Shaped<number>
    }
  }
}
