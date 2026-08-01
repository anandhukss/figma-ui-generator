# Design to React with the Codex SDK

This repository exposes one server-side orchestration function:

```ts
generateFromDesign({
  designUrl,
  targetRoute,
  targetFile,
})
```

`designUrl` accepts a Google Stitch project/screen URL for the current configuration. It also validates exact Figma selection URLs containing `node-id`, ready for the later Figma MCP adapter; until that adapter is configured, the active MCP server remains Stitch and may return a safe blocked result for a Figma URL it cannot retrieve.

It creates one Codex SDK thread in the checked-out Git repository and configures one required remote MCP server named `stitch`. The same thread performs four turns:

1. Inspect the exact frame through Stitch MCP, inspect relevant source files directly, and return a read-only structured plan.
2. Implement only the plan after the orchestrator validates every inspected component and proposed file against the live checkout.
3. Run `npm run lint`, repair failures, run `npm run build`, and repair failures.
4. Inspect the final diff and return a commit message and pull-request draft as data.

The orchestrator does not commit, push, open a pull request, use a Filesystem MCP, parse Figma itself, or generate intermediate context, HTML, catalogs, screenshots, or blueprints.

## Repository and hallucination controls

`AGENTS.md` contains permanent repository instructions. It requires semantic token and existing-component inspection, forbids broad repository traversal, protects shared UI primitives, and limits page-generation changes to the requested page and route registration.

The structured plan is an in-memory thread response, not a generated file or component catalog. Before implementation, the orchestrator verifies that:

- Stitch completed at least one MCP tool call.
- The planning turn made no repository changes.
- `src/index.css` was inspected.
- Every claimed component source exists and was inspected.
- Every inspected path is inside an approved design-system directory.
- The only proposed changes are the exact target page and `src/App.tsx`.

After implementation and again after validation and handoff, deterministic policy checks reject:

- Any unexpected changed file.
- A missing target-page change or missing route registration.
- Hardcoded hexadecimal, RGB, HSL, or arbitrary Tailwind colours in the target page.
- Definitions that recreate Card, Button, Avatar, Checkbox, Table, Badge, or StatusBadge.
- Planned components that the target page does not actually reference.

Codex must run and repair lint/build inside the thread. The Node orchestrator then independently runs `npm run lint` and `npm run build`; only those independent results determine a successful workflow result.

## Configuration

Copy `.env.example` to `.env` for local use. CI should provide the same values as secrets or environment variables:

```env
CODEX_API_KEY=
STITCH_MCP_URL=https://stitch.googleapis.com/mcp
STITCH_MCP_API_KEY=
STITCH_MCP_API_KEY_HEADER=X-Goog-Api-Key
```

`STITCH_MCP_URL` defaults to `https://stitch.googleapis.com/mcp`, so it may be omitted unless a different endpoint is required. `STITCH_MCP_API_KEY` is optional only for servers that authenticate another way. When present, Codex sends it in the `X-Goog-Api-Key` header by default and resolves the value at runtime through `env_http_headers`; the secret is not written into Codex configuration or prompts.

The runner is deliberately non-interactive: it uses `workspace-write`, `approvalPolicy: "never"`, requires Stitch to initialize, and disables web search and subagents. It also removes `GH_TOKEN` and `GITHUB_TOKEN` from the Codex child-process environment; publishing credentials belong to the later GitHub Action step, not the implementation agent. Run it only in an isolated CI checkout with scoped credentials.

## Local invocation

The reusable API lives in `scripts/generate-from-design.ts`. A thin CLI wrapper is available for local testing:

```bash
npm run design:generate -- \
  --design-url "https://stitch.withgoogle.com/projects/PROJECT_ID" \
  --target-route "/new-page" \
  --target-file "src/pages/new-page.tsx"
```

By default, generation refuses to start in a dirty worktree. This protects local changes and matches the clean-checkout assumption of GitHub Actions. Programmatic callers can set `requireCleanWorktree: false` only when they intentionally manage an existing diff.

Progress events are streamed while Codex works. Logs identify completed Stitch calls, commands, and changed files without printing MCP credentials.

The eventual GitHub issue form maps directly to the current function inputs:

- Design URL → `designUrl`
- Requested application route → `targetRoute`
- Requested page path → `targetFile`

The issue cannot grant broader write scope. Page-specific composition stays in the target page; changes to shared components or design-system primitives require a separate reviewed task.

## Next GitHub Actions phase

The future workflow will:

1. Check out a dedicated branch.
2. Install dependencies.
3. Read `designUrl`, `targetRoute`, and `targetFile` from workflow inputs.
4. Supply `CODEX_API_KEY` and Stitch MCP credentials from GitHub Secrets.
5. Import and call `generateFromDesign(...)`.
6. Require `status === "completed"` and use the returned commit and pull-request metadata.
7. Commit the already validated working tree, push the branch, and open the pull request.

Commit and pull-request mutations intentionally remain outside the orchestrator so the GitHub Action can apply repository permissions, branch policy, retry, and audit rules.
