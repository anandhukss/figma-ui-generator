import assert from "node:assert/strict";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test, { type TestContext } from "node:test";

import {
  validateGeneratedChanges,
  validateImplementationPlan,
  type UiImplementationPlan,
} from "./ui-generation-policy.js";

async function fixture(t: TestContext) {
  const repositoryRoot = await mkdtemp(path.join(tmpdir(), "ui-generation-policy-"));
  t.after(async () => rm(repositoryRoot, { recursive: true, force: true }));
  await Promise.all([
    mkdir(path.join(repositoryRoot, "src/components/ui"), { recursive: true }),
    mkdir(path.join(repositoryRoot, "src/pages"), { recursive: true }),
  ]);
  await Promise.all([
    writeFile(path.join(repositoryRoot, "src/main.tsx"), "import './index.css'\n"),
    writeFile(path.join(repositoryRoot, "src/index.css"), ":root { --primary: #cb3cff; }\n"),
    writeFile(path.join(repositoryRoot, "src/components/ui/card.tsx"), "export const Card = () => null\n"),
    writeFile(path.join(repositoryRoot, "src/App.tsx"), "const route = '/sample'\n"),
  ]);
  return repositoryRoot;
}

test("accepts a scoped plan backed by real component files", async (t) => {
  const repositoryRoot = await fixture(t);
  const plan: UiImplementationPlan = {
    status: "planned",
    summary: "Create the requested page and register its route.",
    inspectedFiles: [
      "src/main.tsx",
      "src/index.css",
      "src/components/ui/card.tsx",
      "src/App.tsx",
    ],
    componentsToReuse: [{ name: "Card", sourcePath: "src/components/ui/card.tsx" }],
    filesToCreate: ["src/pages/sample-page.tsx"],
    filesToModify: ["src/App.tsx"],
    blockers: [],
  };

  const errors = await validateImplementationPlan({
    plan,
    repositoryRoot,
    targetFile: "src/pages/sample-page.tsx",
    routeFile: "src/App.tsx",
  });
  assert.deepEqual(errors, []);
});

test("rejects hardcoded colours and recreated primitives", async (t) => {
  const repositoryRoot = await fixture(t);
  await writeFile(
    path.join(repositoryRoot, "src/pages/sample-page.tsx"),
    "const Card = () => <section className=\"bg-[#cb3cff]\" />\nexport { Card }\n",
  );

  const errors = await validateGeneratedChanges({
    repositoryRoot,
    targetRoute: "/sample",
    targetFile: "src/pages/sample-page.tsx",
    routeFile: "src/App.tsx",
    changedFiles: ["src/pages/sample-page.tsx", "src/App.tsx"],
    componentsToReuse: [{ name: "Card", sourcePath: "src/components/ui/card.tsx" }],
  });
  assert.ok(errors.some((error) => error.includes("hardcoded")));
  assert.ok(errors.some((error) => error.includes("protected")));
});
