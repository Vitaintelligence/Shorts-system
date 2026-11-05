import path from "node:path";
import { writeJson } from "../fsutil";

export async function planAnimation(workDir: string): Promise<void> {
  await writeJson(path.join(workDir, "animation.json"), {
    stage: "animation",
    mode: "none",
    reason:
      "The sample uses a flat title card and a burned-in caption. It does not animate a scene or imply app UI that was not recorded.",
  });
}
