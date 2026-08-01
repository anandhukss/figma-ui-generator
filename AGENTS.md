# Automated UI implementation rules

These rules apply to Codex and other automated coding agents working in this repository.

## Design and repository inspection

1. Inspect the exact supplied design through the configured design MCP before planning code changes.
2. Read source files directly. Do not create component catalogs, token catalogs, context JSON, intermediate HTML, screenshots, or blueprint files.
3. Start repository inspection with:
   - `src/index.css`
   - `src/components/ui`
   - `src/components/shared`
   - `src/components/layout`
   - `src/styles`, `src/lib`, and `src/theme` when present
4. Read `src/App.tsx` only when route registration is required.
5. Do not recursively traverse the repository or inspect unrelated feature modules and pages.

## Component reuse

- Inspect an existing component implementation before using it.
- Never create or recreate `Card`, `Button`, `Avatar`, `Checkbox`, `Table`, `Badge`, or `StatusBadge`.
- Do not modify `src/components/ui` during page-generation tasks.
- Keep page-specific composition inside the requested target page.
- Prefer existing shared and layout components over new abstractions.

## Styling

- Read semantic tokens from `src/index.css` and reuse their Tailwind names.
- Prefer `bg-background`, `bg-card`, `bg-primary`, `text-foreground`, `text-muted-foreground`, and `border-border` over raw values.
- Do not add hexadecimal, RGB, HSL, or arbitrary Tailwind colour values to generated TSX.
- If a design colour has no appropriate semantic token, report the mismatch instead of silently adding a hardcoded colour.

## Scope and validation

- New routed screens belong in `src/pages` at the exact requested target path.
- Modify only the target page and the approved route-registration file.
- Do not modify dependencies, build configuration, existing primitives, or unrelated pages.
- Do not commit, push, invoke GitHub APIs or GitHub CLI, or open a pull request.
- Run `npm run lint` and `npm run build` after implementation and fix failures within the approved files.
