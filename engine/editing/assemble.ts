import path from "node:path";
import { MASTER, secondsToFrames } from "../format";
import { writeJson } from "../fsutil";
import { titleWindow } from "../motion-graphics/timing";
import type { SampleInput } from "../types";

export async function assemble(input: SampleInput, workDir: string): Promise<void> {
  const window = titleWindow({
    captions: input.captions,
    durationSeconds: input.format.durationSeconds,
  });
  const segments = [
    {
      type: "title-card",
      startFrame: secondsToFrames(window.inSeconds),
      endFrame: secondsToFrames(window.outSeconds),
    },
    ...input.captions.map((cue) => ({
      type: "caption",
      id: cue.id,
      text: cue.text,
      startFrame: secondsToFrames(cue.startSeconds),
      endFrame: secondsToFrames(cue.endSeconds),
    })),
  ];
  await writeJson(path.join(workDir, "edit.json"), {
    stage: "editing",
    width: MASTER.width,
    height: MASTER.height,
    fps: MASTER.fps,
    durationFrames: secondsToFrames(input.format.durationSeconds),
    segments,
  });
}
