import path from "node:path";
import { writeJson } from "../fsutil";
import type { SampleInput } from "../types";

export async function analyze(input: SampleInput, workDir: string): Promise<{ status: "skipped"; features: [] }> {
  const analysis = {
    stage: "video-analysis",
    status: "skipped" as const,
    reason:
      "The sample manifest has no source recording. Fill docs/APP_ANALYSIS_TEMPLATE.md from a real recording before any marketing claim.",
    features: [] as [],
    app: input.app,
  };
  await writeJson(path.join(workDir, "analysis.json"), analysis);
  return { status: "skipped", features: [] };
}
