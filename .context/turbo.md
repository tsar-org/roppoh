# Turbo Tasks Guide

This document describes the Turbo tasks defined in `turbo.json` and when to use them.

## Overview

Turbo is a monorepo task orchestration tool that efficiently executes tasks across multiple workspaces. It provides:

- **Parallel Execution**: Run tasks in multiple workspaces simultaneously
- **Smart Caching**: Skip tasks if nothing changed
- **Dependency Management**: Automatically run dependent tasks in correct order
- **Performance**: Optimize task execution across the monorepo

### Task Execution

```bash
# Run a turbo task
bun turbo <task-name>

# Force execution (skip cache)
bun turbo --force <task-name>

# Run tasks in specific workspace
bun turbo <task-name> --filter=<workspace>

# Watch mode (if supported)
bun turbo <task-name> --watch
```

## Available Tasks

### 1. `build`

**Description**: Build all workspaces

**Task file**: `turbo.json` - `tasks.build`

**What it does**:
See [turbo.json](./turbo.json) for full configuration

**Cache**: Enabled ✅

**Dependencies**: Runs `^build` (dependent workspace builds first)

**When to use**:

- ✅ Before deploying to production
- ✅ Validating entire project builds successfully
- ✅ Creating production bundles
- ✅ Part of CI/CD pipeline
- ✅ Before pushing code to remote
- ✅ When you need a clean build output

**Command**:

```bash
bun turbo build
```

**Workspace Order**:

1. `packages/better-auth-database` builds first
2. `apps/roppoh` builds after (depends on packages build)

**Notes**:

- First run builds everything
- Subsequent runs skip unchanged workspaces (cached)
- Use `bun turbo --force build` to rebuild everything
- Output goes to `dist/` directories in each workspace

**Related Scripts**:

- `apps/roppoh`: `bun run build` (React Router build)

---

### 2. `check:type`

**Description**: Type checking across all workspaces

**Task file**: `turbo.json` - `tasks.check:type`

**What it does**:
See [turbo.json](./turbo.json) for full configuration

**Cache**: Enabled ✅

**Dependencies**: Runs after `^build` (dependent workspace builds first)

**When to use**:

- ✅ Before committing code
- ✅ Verifying TypeScript compilation (no output)
- ✅ Catching type errors early
- ✅ During development workflow
- ✅ Part of pre-commit hooks
- ✅ CI/CD validation

**Command**:

```bash
bun turbo check:type
```

**What's Checked**:

1. TypeScript compilation errors
2. Type safety across all `.ts` and `.tsx` files
3. Strict mode compliance

**Notes**:

- Does NOT emit JavaScript output (just checks)
- Fast compared to `build`
- First run performs full type check
- Subsequent runs skip unchanged files (cached)
- Use `bun turbo --force check:type` to re-type-check everything

**Related Scripts**:

- `apps/roppoh`: `bun run check:type`
- Root: `turbo check:type` + `react-router typegen`

---

### 3. `cf-typegen`

**Description**: Generate CloudFlare Worker type definitions

**Task file**: `turbo.json` - `tasks.cf-typegen`

**What it does**:
See [turbo.json](./turbo.json) for full configuration

**Cache**: Enabled ✅

**Dependencies**: Runs after `^build` (dependent workspace builds first)

**Output**: Generates `worker-configuration.d.ts`

**When to use**:

- ✅ After adding CloudFlare Worker configuration
- ✅ Before type checking CloudFlare-related code
- ✅ When CloudFlare environment variables change
- ✅ Part of CI/CD pipeline
- ✅ Automatic pre-commit check

**Command**:

```bash
bun turbo cf-typegen
```

**What's Generated**:

- `worker-configuration.d.ts` - Type definitions for CloudFlare environment/config
- Enables strongly-typed CloudFlare API access

**Notes**:

- Runs `wrangler types --strict-vars=false`
- Outputs file tracked by Turbo cache
- Safe to run frequently (cached)

**Related Scripts**:

- `apps/roppoh`: `bun run cf-typegen`

---

### 4. `test`

**Description**: Run tests across workspaces

**Task file**: `turbo.json` - `tasks.test`

**What it does**:
See [turbo.json](./turbo.json) for full configuration

**Cache**: Disabled ❌

**Dependencies**: None (runs independently)

**When to use**:

- ✅ Running test suite before committing
- ✅ Validating code changes don't break tests
- ✅ CI/CD pipeline validation
- ✅ Pre-push verification
- ✅ Local development testing
- ✅ Continuous integration

**Command**:

```bash
bun turbo test
```

**Test Types** (in `apps/roppoh`):

- Unit tests: `bun run test:unit` or `bun turbo test --filter=roppoh`
- Visual tests: `bun run test:visual` or `bun turbo test --filter=roppoh`
- All tests: `bun turbo test`

**Notes**:

- Cache is **disabled** intentionally (tests must always run)
- Tests run in each workspace's context
- Test files use `.test.ts` / `.test.tsx` naming
- Failures block progress

**Related Scripts**:

- `apps/roppoh`: `bun run test`
- `apps/roppoh`: `bun run test:unit`
- `apps/roppoh`: `bun run test:visual`

---

## Caching Strategy

### Cached Tasks ✅

- `build` - Skip if source code unchanged
- `check:type` - Skip if TypeScript files unchanged
- `cf-typegen` - Skip if CloudFlare config unchanged

### Non-Cached Tasks ❌

- `test` - Always runs (tests should always execute)

### Force Execution

```bash
# Re-run all builds (ignore cache)
bun turbo --force build

# Re-run type check (ignore cache)
bun turbo --force check:type

# Re-generate CloudFlare types (ignore cache)
bun turbo --force cf-typegen
```

### When Cache Gets Stale

Cache is invalidated when:

- Source code changes
- Dependencies change (`bun.lock`)
- Configuration files change

To manually invalidate:

```bash
# Clear Turbo cache
rm -rf .turbo

# Or use mise task
mise run clear-cache
```
