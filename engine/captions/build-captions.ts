import path from "node:path";
import { writeJson, writeText } from "../fsutil";
import type { SampleInput } from "../types";
import { renderSrt } from "./srt";

export async function buildCaptions(input: SampleInput, workDir: string): Promise<string> {
  const srt = renderSrt(input.captions);
  const srtPath = path.join(workDir, "captions.srt");
  await writeText(srtPath, srt);
  await writeJson(path.join(workDir, "captions.json"), {
    stage: "captions",
    burnedIn: true,
    srt: "captions.srt",
    cues: input.captions,
  });
  return srt;
}
