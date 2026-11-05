import path from "node:path";
import { writeJson } from "../fsutil";

export async function concept(workDir: string): Promise<{ status: "blocked" }> {
  const record = {
    stage: "creative",
    status: "blocked" as const,
    conceptCount: 0,
    reason:
      "No concepts are generated without an analysis of demonstrated features. Use docs/CONCEPTS_TEMPLATE.md once a recording has been analyzed.",
  };
  await writeJson(path.join(workDir, "concept.json"), record);
  return { status: "blocked" };
}
