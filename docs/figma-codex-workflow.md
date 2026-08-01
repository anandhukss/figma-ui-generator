# Design to React with the Codex SDK

This repository exposes one server-side orchestration function:

```ts
generateFromDesign({
  designUrl,
  targetRoute,
  targetFile,
})
```

`designUrl` accepts either a Google Stitch project/screen URL or an exact Figma selection URL containing `node-id`. The URL host selects the design provider automatically: Figma URLs use the remote Figma MCP server and Stitch URLs use Stitch MCP.

It creates one Codex SDK thread in the checked-out Git repository and configures exactly one required remote design MCP server, named `figma` or `stitch`. The same thread performs four turns:

1. Inspect the exact frame through the selected design MCP, inspect relevant source files directly, and return a read-only structured plan.
2. Implement only the plan after the orchestrator validates every inspected component and proposed file against the live checkout.
3. Run `npm run lint`, repair failures, run `npm run build`, and repair failures.
4. Inspect the final diff and return a commit message and pull-request draft as data.

The orchestrator does not commit, push, open a pull request, use a Filesystem MCP, parse Figma itself, or generate intermediate context, HTML, catalogs, screenshots, or blueprints.

## Repository and hallucination controls

`AGENTS.md` contains permanent repository instructions. It requires semantic token and existing-component inspection, forbids broad repository traversal, protects shared UI primitives, and limits page-generation changes to the requested page and route registration.

The structured plan is an in-memory thread response, not a generated file or component catalog. Before implementation, the orchestrator verifies that:

- The selected design MCP completed at least one tool call.
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
- Implementations that do not reuse any component from the approved plan.

Codex must run and repair lint/build inside the thread. The Node orchestrator then independently runs `npm run lint` and `npm run build`; only those independent results determine a successful workflow result.

## Configuration

Copy `.env.example` to `.env` for local use. CI should provide the same values as secrets or environment variables:

```env
CODEX_API_KEY=
FIGMA_MCP_URL=https://mcp.figma.com/mcp
STITCH_MCP_URL=https://stitch.googleapis.com/mcp
STITCH_MCP_API_KEY=
STITCH_MCP_API_KEY_HEADER=X-Goog-Api-Key
```

`FIGMA_MCP_URL` defaults to `https://mcp.figma.com/mcp`. Figma uses OAuth; do not put a personal access token or OAuth token in this repository. Authenticate the Codex credential store once on the machine that runs the SDK:

```bash
codex mcp add figma --url https://mcp.figma.com/mcp
codex mcp login figma
codex mcp list
```

The SDK-launched Codex process must use the same `CODEX_HOME` and user account that owns those stored credentials. The orchestrator sets `auth = "oauth"` and registers only the selected provider in each run.

`STITCH_MCP_URL` defaults to `https://stitch.googleapis.com/mcp`, so it may be omitted unless a different endpoint is required. `STITCH_MCP_API_KEY` is optional only for Stitch servers that authenticate another way. When present, Codex sends it in the `X-Goog-Api-Key` header by default and resolves the value at runtime through `env_http_headers`; the secret is not written into Codex configuration or prompts.

The generation run is deliberately non-interactive: it uses `workspace-write`, `approvalPolicy: "never"`, requires the selected design server to initialize, and disables web search and subagents. Figma OAuth must therefore be completed before generation starts. Figma tools marked as writes require approval and cannot run in this read-only design-inspection workflow. The process also removes `GH_TOKEN` and `GITHUB_TOKEN` from the Codex child-process environment; publishing credentials belong to the later GitHub Action step, not the implementation agent.

## Local invocation

The reusable API lives in `scripts/generate-from-design.ts`. For Figma, supply an exact frame or layer URL:

```bash
npm run design:generate -- \
  --design-url "https://www.figma.com/design/FILE_KEY/FILE_NAME?node-id=54-8712" \
  --target-route "/new-page" \
  --target-file "src/pages/new-page.tsx"
```

For Stitch:

```bash
npm run design:generate -- \
  --design-url "https://stitch.withgoogle.com/projects/PROJECT_ID" \
  --target-route "/new-page" \
  --target-file "src/pages/new-page.tsx"
```

By default, generation refuses to start in a dirty worktree. This protects local changes and matches the clean-checkout assumption of GitHub Actions. Programmatic callers can set `requireCleanWorktree: false` only when they intentionally manage an existing diff.

Progress events are streamed while Codex works. Logs identify completed design MCP calls, commands, and changed files without printing MCP credentials.

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
4. Supply `CODEX_API_KEY` and make the selected provider's credentials available to Codex.
5. Import and call `generateFromDesign(...)`.
6. Require `status === "completed"` and use the returned commit and pull-request metadata.
7. Commit the already validated working tree, push the branch, and open the pull request.

Commit and pull-request mutations intentionally remain outside the orchestrator so the GitHub Action can apply repository permissions, branch policy, retry, and audit rules.

Figma's documented remote MCP setup uses interactive OAuth. A fresh GitHub-hosted runner does not retain that login. Until a supported headless credential flow is available, use a locked-down self-hosted runner with a persistent, pre-authenticated Codex credential store for Figma runs. Do not commit or upload the credential store as a repository artifact.
