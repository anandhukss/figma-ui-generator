import "dotenv/config";

import { generateFromDesign } from "./generate-from-design.js";

function argument(name: string) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

async function main() {
  const designUrl = argument("--design-url") ?? process.env.DESIGN_URL;
  const targetRoute = argument("--target-route") ?? process.env.TARGET_ROUTE;
  const targetFile = argument("--target-file") ?? process.env.TARGET_FILE;
  if (!designUrl || !targetRoute || !targetFile) {
    throw new Error(
      "Usage: npm run design:generate -- --design-url <url> --target-route </route> --target-file <src/pages/page.tsx>",
    );
  }

  const result = await generateFromDesign({ designUrl, targetRoute, targetFile });
  console.log("\nWorkflow result:");
  console.log(JSON.stringify(result, null, 2));
  if (result.status !== "completed") process.exitCode = 1;
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : "Figma generation failed");
  process.exitCode = 1;
});
