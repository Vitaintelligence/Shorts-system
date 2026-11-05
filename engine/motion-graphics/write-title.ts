import path from "node:path";
import { writeJson } from "../fsutil";
import type { SampleInput } from "../types";
import { titleWindow } from "./timing";

export async function writeTitle(input: SampleInput, workDir: string): Promise<void> {
  await writeJson(path.join(workDir, "motion.json"), {
    stage: "motion-graphics",
    mode: "title-card",
    safeArea: { top: 220, right: 80, bottom: 280, left: 80 },
    window: titleWindow({
      captions: input.captions,
      durationSeconds: input.format.durationSeconds,
    }),
    titleCard: input.titleCard,
  });
}
