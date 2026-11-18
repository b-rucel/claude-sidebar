# claude-sidebar

A live sidebar pane for Claude Code: one narrow column that keeps agent state,
context usage, tool activity and git status in view while you work.

The pane opens at session start and can be reopened at any time with `/sidebar`.

## Panels

| Panel | Shows |
| --- | --- |
| **AGENT** | A single working/ready dot with the number of tool calls still running. |
| **CONTEXT** | A block bar of context used, plus tokens against the model window. |
| **USAGE** | Session cost, and a small bar per rate limit when the host reports any. |
| **ACTIVITY** | The most recent tool calls, grey once finished, amber while running. |
| **WORKSPACE** | Branch, changed and untracked counts, or `Not a git repository.` |

The pane is fixed at 30 columns by 24 rows, has a transparent background, and
scrolls its activity list to fit the remaining height.

## Requirements

A Claude Code build that exposes the `claude-code` module hooks API: `atom`,
`read` and `update`, `$.ui.open`, `$.ui.resolve`, `$.command.register`,
`$.session.usage` and `$.process.run`.

## Install

```sh
git clone https://github.com/b-rucel/claude-sidebar.git ~/.claude/mods/claude-sidebar
```

Restart Claude Code. The mod is picked up from `~/.claude/mods/` by its
`.claude-plugin/plugin.json`.

## Structure

```
.claude-plugin/plugin.json   name, version, types entry
hooks/hooks.json             registers ./register.tsx as the only module
hooks/register.tsx           the whole pane: events, atoms, render
types/index.d.ts             state shapes, and the PluginState augmentation
.claude-plugin/types/        vendored claude-code type definitions
```

`register.tsx` keeps three atoms — the tool-call list, the last git reading and a
render tick — and repaints from them on `ui.render`. Git is read through
`$.process.run` with an argv array and no shell.

## Behaviour worth knowing

- The pane opens on every `session.start`, so it costs screen space from the
  first turn.
- Git is read twice per tool call: `git branch --show-current` and
  `git status --porcelain`. In a very large repository that shows up as latency
  between a tool finishing and the next token.
- Only the last 100 tool calls are retained, and only the visible tail is drawn.

## License

MIT
