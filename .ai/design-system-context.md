# AI implementation context

This repository is designed for automated Figma-to-code workflows. The interface is a banking product named Verdant. Tailwind CSS v4 and semantic CSS variables are the primary and exclusive component styling system.

## Required workflow

Future UI agents must:

1. Read `.ai/component-catalog.json`.
2. Read `.ai/design-tokens.json`.
3. Read `.ai/page-catalog.json`.
4. Inspect only the components referenced by those files.
5. Reuse existing components before creating new ones.
6. Use semantic design tokens.
7. Never hard-code colours when a semantic token exists.
8. Never recreate an existing Button, Input, Select, Card, Table, Badge, Dialog, Sidebar, PageHeader, AccountCard, TransactionTable, or layout.
9. Place routed screens in `src/pages`.
10. Place reusable banking components in `src/components/banking`.
11. Place generic reusable components in `src/components/shared`.
12. Keep page-specific UI inside the relevant page unless it is reused.
13. Do not add APIs, database code, authentication, or business logic for UI-only generation tasks.
14. Do not inspect the entire repository.
15. Use one or two existing pages as visual and structural references.

## Conventions

- Pages use `space-y-6`; the layout supplies `p-4 md:p-6 lg:p-8` and a `max-w-screen-2xl` content boundary.
- Cards use `rounded-xl border border-border bg-card shadow-sm` and normally `p-6` through `CardContent`.
- Controls use `rounded-md`, status badges use `rounded-full`, and overlays use `shadow-lg`.
- Page titles use `text-2xl font-semibold tracking-tight`; section titles use `text-lg font-semibold`; supporting copy uses `text-sm text-muted-foreground`.
- Currency formatting belongs in `AmountDisplay` or the shared `formatCurrency` function.
- Variant classes must be statically enumerable. Never generate Tailwind classes from arbitrary strings.
- The `/design-system` route is the canonical visual component and token reference.

## Figma mapping examples

```json
{"figmaComponent":"Button / Primary / Large","codeComponent":"Button","sourcePath":"src/components/ui/button.tsx","importPath":"@/components/ui/button","props":{"variant":"default","size":"lg"}}
```

```json
{"figmaStyle":{"surface":"card","radius":12,"padding":24},"codeMapping":{"component":"Card","classes":"bg-card rounded-xl border border-border p-6"}}
```
