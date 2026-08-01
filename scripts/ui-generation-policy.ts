import { execFile } from "node:child_process";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

const INSPECTION_PREFIXES = [
  "src/components/ui/",
  "src/components/shared/",
  "src/components/layout/",
  "src/styles/",
  "src/lib/",
  "src/theme/",
] as const;
const PROTECTED_COMPONENT_NAMES = [
  "Card",
  "Button",
  "Avatar",
  "Checkbox",
  "Table",
  "Badge",
  "StatusBadge",
] as const;

export const implementationPlanSchema = {
  type: "object",
  properties: {
    status: { type: "string", enum: ["planned", "blocked"] },
    summary: { type: "string" },
    inspectedFiles: { type: "array", items: { type: "string" } },
    componentsToReuse: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          sourcePath: { type: "string" },
        },
        required: ["name", "sourcePath"],
        additionalProperties: false,
      },
    },
    filesToCreate: { type: "array", items: { type: "string" } },
    filesToModify: { type: "array", items: { type: "string" } },
    blockers: { type: "array", items: { type: "string" } },
  },
  required: [
    "status",
    "summary",
    "inspectedFiles",
    "componentsToReuse",
    "filesToCreate",
    "filesToModify",
    "blockers",
  ],
  additionalProperties: false,
} as const;

export interface UiImplementationPlan {
  status: "planned" | "blocked";
  summary: string;
  inspectedFiles: string[];
  componentsToReuse: Array<{
    name: string;
    sourcePath: string;
  }>;
  filesToCreate: string[];
  filesToModify: string[];
  blockers: string[];
}

export interface ScriptVerification {
  passed: boolean;
  output: string;
}

function normalizeRepositoryPath(value: string) {
  const normalized = value.trim().replaceAll("\\", "/").replace(/^\.\//, "");
  if (!normalized || path.posix.isAbsolute(normalized) || normalized.split("/").includes("..")) {
    return undefined;
  }
  return normalized;
}

async function isFile(repositoryRoot: string, repositoryPath: string) {
  try {
    return (await stat(path.resolve(repositoryRoot, repositoryPath))).isFile();
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return false;
    throw error;
  }
}

function allowedInspectionPath(repositoryPath: string, targetFile: string) {
  return (
    repositoryPath === "src/main.tsx" ||
    repositoryPath === "src/index.css" ||
    repositoryPath === "src/App.tsx" ||
    repositoryPath === targetFile ||
    INSPECTION_PREFIXES.some((prefix) => repositoryPath.startsWith(prefix))
  );
}

export async function validateImplementationPlan(input: {
  plan: UiImplementationPlan;
  repositoryRoot: string;
  targetFile: string;
  routeFile: string;
}) {
  const errors: string[] = [];
  const allowedChanges = new Set([input.targetFile, input.routeFile]);
  const targetExists = await isFile(input.repositoryRoot, input.targetFile);

  if (input.plan.status !== "planned") return input.plan.blockers;
  if (input.plan.componentsToReuse.length === 0) {
    errors.push("The plan does not reuse any existing repository component");
  }

  const inspectedFiles = new Set<string>();
  for (const rawPath of input.plan.inspectedFiles) {
    const repositoryPath = normalizeRepositoryPath(rawPath);
    if (!repositoryPath || !allowedInspectionPath(repositoryPath, input.targetFile)) {
      errors.push(`Unapproved inspected path: ${rawPath}`);
      continue;
    }
    if (!(await isFile(input.repositoryRoot, repositoryPath))) {
      errors.push(`Claimed inspected file does not exist: ${repositoryPath}`);
      continue;
    }
    inspectedFiles.add(repositoryPath);
  }
  if (!inspectedFiles.has("src/index.css")) {
    errors.push("The plan did not inspect src/index.css for semantic tokens");
  }

  for (const component of input.plan.componentsToReuse) {
    const sourcePath = normalizeRepositoryPath(component.sourcePath);
    if (!sourcePath || !INSPECTION_PREFIXES.some((prefix) => sourcePath.startsWith(prefix))) {
      errors.push(`Component ${component.name} uses an unapproved source path`);
      continue;
    }
    if (!(await isFile(input.repositoryRoot, sourcePath))) {
      errors.push(`Component source does not exist: ${sourcePath}`);
    }
    if (!inspectedFiles.has(sourcePath)) {
      errors.push(`Component source was not inspected: ${sourcePath}`);
    }
  }

  const plannedCreates = input.plan.filesToCreate.map(normalizeRepositoryPath);
  const plannedModifies = input.plan.filesToModify.map(normalizeRepositoryPath);
  for (const [kind, paths] of [
    ["create", plannedCreates],
    ["modify", plannedModifies],
  ] as const) {
    for (const repositoryPath of paths) {
      if (!repositoryPath || !allowedChanges.has(repositoryPath)) {
        errors.push(`Unapproved file proposed for ${kind}: ${repositoryPath ?? "invalid path"}`);
      }
    }
  }

  if (targetExists && !plannedModifies.includes(input.targetFile)) {
    errors.push(`Existing target file must be listed in filesToModify: ${input.targetFile}`);
  }
  if (!targetExists && !plannedCreates.includes(input.targetFile)) {
    errors.push(`New target file must be listed in filesToCreate: ${input.targetFile}`);
  }
  if (plannedCreates.includes(input.routeFile)) {
    errors.push(`Route registration file already exists and cannot be recreated: ${input.routeFile}`);
  }

  return errors;
}

export async function validateGeneratedChanges(input: {
  repositoryRoot: string;
  targetRoute: string;
  targetFile: string;
  routeFile: string;
  changedFiles: string[];
  componentsToReuse: UiImplementationPlan["componentsToReuse"];
}) {
  const errors: string[] = [];
  const allowedChanges = new Set([input.targetFile, input.routeFile]);
  for (const changedFile of input.changedFiles) {
    if (!allowedChanges.has(changedFile)) errors.push(`Unexpected changed file: ${changedFile}`);
  }
  if (!input.changedFiles.includes(input.targetFile)) {
    errors.push(`Target page was not changed: ${input.targetFile}`);
    return errors;
  }

  const targetSource = await readFile(path.resolve(input.repositoryRoot, input.targetFile), "utf8");
  const hardcodedColour = /#[0-9a-f]{3,8}\b|\b(?:rgb|rgba|hsl|hsla)\s*\(|\[[#][0-9a-f]{3,8}\]/i;
  if (hardcodedColour.test(targetSource)) {
    errors.push("Target page contains a hardcoded or arbitrary colour value");
  }
  const protectedDefinition = new RegExp(
    `\\b(?:function|class|const|let|var)\\s+(?:${PROTECTED_COMPONENT_NAMES.join("|")})\\b`,
  );
  if (protectedDefinition.test(targetSource)) {
    errors.push("Target page defines a protected design-system component");
  }
  for (const component of input.componentsToReuse) {
    if (!new RegExp(`\\b${component.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`).test(targetSource)) {
      errors.push(`Planned component is not referenced by the target page: ${component.name}`);
    }
  }

  const routeSource = await readFile(path.resolve(input.repositoryRoot, input.routeFile), "utf8");
  if (!routeSource.includes(input.targetRoute)) {
    errors.push(`Route registration does not contain ${input.targetRoute}`);
  }
  return errors;
}

export async function verifyNpmScript(
  repositoryRoot: string,
  scriptName: "lint" | "build",
): Promise<ScriptVerification> {
  const executable = process.platform === "win32" ? "npm.cmd" : "npm";
  try {
    const result = await execFileAsync(executable, ["run", scriptName], {
      cwd: repositoryRoot,
      encoding: "utf8",
      maxBuffer: 10 * 1024 * 1024,
    });
    return { passed: true, output: `${result.stdout}${result.stderr}`.trim() };
  } catch (error) {
    const failure = error as Error & { stdout?: string; stderr?: string };
    return {
      passed: false,
      output: `${failure.stdout ?? ""}${failure.stderr ?? ""}${failure.message}`.trim().slice(-12_000),
    };
  }
}
