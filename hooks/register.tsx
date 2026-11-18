import { atom, read, update } from 'claude-code'
import type { EngineInterface, Register } from 'claude-code'

import type { Call, Git } from '../types'

const PANE = 'sidebar'
const calls = atom({ plugin: 'claude-sidebar', key: 'calls' } as const, [], { shape: 'calls-1' })
const git = atom({ plugin: 'claude-sidebar', key: 'git' } as const, null, { shape: 'git-1' })
const tick = atom({ plugin: 'claude-sidebar', key: 'tick' } as const, 0, { shape: 'tick-1' })

const bar = (pct: number, width = 12) => {
  const fill = Math.round((Math.min(100, Math.max(0, pct)) / 100) * width)
  return '█'.repeat(fill) + '░'.repeat(width - fill)
}

const fmt = (n: number) =>
  n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}M` : n >= 1000 ? `${Math.round(n / 1000)}k` : `${n}`

async function refreshGit($: EngineInterface) {
  const [br, st] = await Promise.all([
    $.process.run(['git', 'branch', '--show-current']),
    $.process.run(['git', 'status', '--porcelain']),
  ])
  if (br.exitCode !== 0) return update($, git, () => null as Git | null)
  const lines: string[] = st.stdout.split('\n').filter(Boolean)
  const untracked = lines.filter(l => l.startsWith('??')).length
  const next: Git = {
    branch: br.stdout.trim() || '(detached)',
    changed: lines.length - untracked,
    untracked,
  }
  return update($, git, () => next as Git | null)
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({ name: 'sidebar', description: 'Open the status sidebar pane' })
    void $.ui.open({ id: PANE, title: 'Sidebar', backgroundColor: 'transparent', rows: 24, columns: 30 })
    void refreshGit($)
    return next(e)
  })

  on('command.run', { command: 'sidebar' }, async $ => {
    await $.ui.open({ id: PANE, title: 'Sidebar', backgroundColor: 'transparent', rows: 24, columns: 30 })
    return { text: 'Sidebar pane opened.' }
  })

  on('tool.call', async ($, e, next) => {
    const call: Call = { id: e.tool_use_id, tool: e.tool, isDone: false }
    await update($, calls, list => [...list, call].slice(-100))
    const ran = await next(e)
    await update($, calls, list => list.map(c => (c.id === call.id ? { ...c, isDone: true } : c)))
    void refreshGit($)
    return ran
  })

  on('session.measure', async ($, e, next) => {
    await update($, tick, n => n + 1)
    return next(e)
  })

  on('ui.render', { component: 'Pane', requestId: PANE }, async ($, e) => {
    const { Box, Text } = $.ui.resolve(e)
    const list = await read($, calls)
    const g = await read($, git)
    await read($, tick)
    const u = await $.session.usage()
    const room = Math.max(2, (e.viewport?.rows ?? 24) - 20)
    const running = list.filter(c => !c.isDone).length
    const pct = u.context.percent ?? 0
    const level = (n: number) => (n >= 85 ? '#f87171' : n >= 60 ? '#fbbf24' : '#34d399')

    const Panel = (props: { title: string; children?: unknown }) => (
      <Box flexDirection="column" borderStyle="round" borderColor="#7c6fb0" paddingX={1}>
        <Text bold color="#c4b5fd">✦ {props.title}</Text>
        {props.children}
      </Box>
    )
    const Bar = (props: { pct: number }) => (
      <Box flexGrow={1} marginRight={2} overflow="hidden">
        <Box width={`${Math.min(100, Math.max(0, props.pct))}%`} overflow="hidden">
          <Text wrap="truncate-end" color={level(props.pct)}>{'█'.repeat(200)}</Text>
        </Box>
        <Box flexGrow={1} overflow="hidden">
          <Text wrap="truncate-end" dimColor>{'░'.repeat(200)}</Text>
        </Box>
      </Box>
    )
    const Row = (props: { left: unknown; right?: unknown }) => (
      <Box justifyContent="space-between">
        {props.left}
        {props.right}
      </Box>
    )

    return (
      <Box flexDirection="column">
        <Panel title="AGENT">
          <Row
            left={<Text color={running > 0 ? '#fbbf24' : '#34d399'}>● {running > 0 ? 'Working' : 'Ready'}</Text>}
            right={<Text dimColor>{running > 0 ? `${running} running` : 'idle'}</Text>}
          />
        </Panel>
        <Panel title="CONTEXT">
          <Row
            left={<Bar pct={pct} />}
            right={<Text color={level(pct)}>{pct.toFixed(0)}%</Text>}
          />
          <Row
            left={<Text dimColor>Tokens</Text>}
            right={<Text dimColor>{fmt(u.context.tokens ?? 0)} / {fmt(u.context.window)}</Text>}
          />
        </Panel>
        {(u.cost || u.rateLimits.length > 0) && (
          <Panel title="USAGE">
            {u.cost && <Row left={<Text>Cost</Text>} right={<Text bold>${u.cost.usd.toFixed(2)}</Text>} />}
            {u.rateLimits.map(r => (
              <Row
                left={<Text>{r.kind.replace('_', ' ')}</Text>}
                right={<Text color={level(r.percentUsed)}>{bar(r.percentUsed, 6)} {Math.round(r.percentUsed)}%</Text>}
              />
            ))}
          </Panel>
        )}
        <Panel title="ACTIVITY">
          {list.length === 0 && <Text dimColor>No tool calls yet.</Text>}
          {list.slice(-room).map(c => (
            <Row
              left={<Text color={c.isDone ? '#6b7280' : '#fbbf24'}>{c.tool}</Text>}
              right={<Text color={c.isDone ? '#6b7280' : '#fbbf24'}>{c.isDone ? '✓' : '…'}</Text>}
            />
          ))}
        </Panel>
        <Panel title="WORKSPACE">
          {g ? (
            <Box flexDirection="column">
              <Text color="#93c5fd">{g.branch}</Text>
              <Row
                left={<Text dimColor>{g.changed} changed</Text>}
                right={<Text dimColor>{g.untracked} new</Text>}
              />
            </Box>
          ) : (
            <Text dimColor>Not a git repository.</Text>
          )}
        </Panel>
      </Box>
    )
  })
}
