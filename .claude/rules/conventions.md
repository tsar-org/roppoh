# Available Tools & Environment

This document describes the tools and environment available in this project.

## Tool Versions

This project manages the following tools via `mise.toml`:

| Tool      | Version | Purpose                              |
| --------- | ------- | ------------------------------------ |
| **Bun**   | 1.2.0   | JavaScript Runtime & Package Manager |
| **Turbo** | latest  | Monorepo task execution              |

## Package Manager: Bun Only

**⚠️ IMPORTANT**: Always use **Bun** as the package manager.

❌ **DO NOT use**:

- `npm`
- `yarn`
- `pnpm`

✅ **Use**:

- `bun` (default package manager)
- `bunx` (for running tools without installing)
