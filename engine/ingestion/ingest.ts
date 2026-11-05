import { readFile } from "node:fs/promises";
import path from "node:path";
import { writeJson } from "../fsutil";
import { assertSampleInput } from "../schema";
import type { SampleInput } from "../types";

export async function ingest(inputPath: string, workDir: string): Promise<SampleInput> {
  const raw: unknown = JSON.parse(await readFile(inputPath, "utf8"));
  const input = assertSampleInput(raw);
  await writeJson(path.join(workDir, "ingest.json"), {
    stage: "ingestion",
    sourcePath: inputPath,
    input,
  });
  return input;
}
