# ai-dev-toolkit

A Claude Code marketplace: one git repository holding the skills, agents, commands, and hooks worth reusing across every project.

No server, no build step. Claude Code clones the repository and reads `.claude-plugin/marketplace.json`.

## Install

```
/plugin marketplace add ok2ju/ai-dev-toolkit
/plugin install core@ai-dev-toolkit
```

## Plugins

| Plugin | Holds |
|--------|-------|
| [`core`](plugins/core) | Habits worth having in every repository, and the [explore-plan-ship workflow](plugins/core/WORKFLOW.md) they fit into. |

## Working on it locally

```
# point Claude at the checkout, which tests the real install path
/plugin marketplace add ~/Projects/ai-dev-toolkit
/plugin install core@ai-dev-toolkit

# after editing files
/plugin marketplace update ai-dev-toolkit
```

Restart the session after any hook change — hooks load only at session start. Leave `autoUpdate` off, so your configuration breaks when you choose, not mid-task.

## Adding a plugin

One new folder plus one new entry in `.claude-plugin/marketplace.json`. Whenever it takes more than that, the setup has grown a layer it never earned.

```
plugins/<name>/
├── .claude-plugin/plugin.json   # the only required file
├── skills/<skill>/SKILL.md
├── agents/<agent>.md
├── commands/<command>.md
├── hooks/hooks.json             # only when hooks are needed
├── scripts/                     # hook scripts live here
├── .mcp.json                    # only when the plugin owns an MCP server
└── README.md
```

Split plugins by the job they do, never by file type — nobody wants half a workflow. Names are the public interface: short, lowercase, dashes, and a rename breaks every existing install.

Bump the plugin version on any change, and the marketplace version whenever a plugin is added or dropped. Both manifests must agree, which the validator enforces.

## Validate

```
node scripts/validate.mjs     # structure, names, versions, frontmatter, hook paths
node --test scripts/validate.test.mjs   # the validator's own checks
```

CI runs both on every push.

## Before making this public

Skills carry client names, internal URLs, and ticket workflows. Open up one plugin at a time, and read any hook script before installing it — hooks execute code on your machine, and that is the only real security boundary here.
