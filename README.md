# Verdant Banking

A responsive, design-system-driven banking interface built with React, TypeScript, Vite, and Tailwind CSS v4.

## Routes

- `/` — account overview
- `/accounts` — account management
- `/transactions` — searchable activity
- `/payments` — recipients and scheduled payments
- `/cards` — card controls
- `/design-system` — visual token and component reference

## Development

```bash
npm install
npm run dev
```

Use `npm run lint` for lint validation and `npm run build` for the TypeScript and production build checks.

## Figma generation

The server-side `generateFromDesign(...)` orchestration API creates one Codex SDK thread, connects it to Stitch MCP, validates a read-only design/repository plan, implements only the requested page and route registration, and repairs lint/build failures in the same thread. Repository policy checks and independent lint/build runs gate the final result.

```bash
npm run design:generate -- \
  --design-url "https://stitch.withgoogle.com/projects/PROJECT_ID" \
  --target-route "/new-page" \
  --target-file "src/pages/new-page.tsx"
```

See [the Codex workflow documentation](docs/figma-codex-workflow.md) for environment setup, behavior, and the planned GitHub Actions integration.
