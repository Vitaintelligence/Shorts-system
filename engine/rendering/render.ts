import { mkdir } from "node:fs/promises";
import path from "node:path";
import { run } from "../exec";
import { writeJson } from "../fsutil";
import type { RenderProps } from "../types";

export async function renderPicture(
  props: RenderProps,
  propsPath: string,
  picturePath: string,
  workDir: string,
  root: string,
): Promise<void> {
  await mkdir(path.dirname(picturePath), { recursive: true });
  await writeJson(propsPath, props);
  await run(
    "npx",
    [
      "remotion",
      "render",
      "engine/rendering/index.ts",
      "SampleShort",
      picturePath,
      `--props=${propsPath}`,
      "--codec=h264",
      "--pixel-format=yuv420p",
      "--crf=20",
      "--concurrency=1",
    ],
    root,
  );
  await writeJson(path.join(workDir, "render.json"), {
    stage: "rendering",
    composition: "SampleShort",
    picture: path.relative(workDir, picturePath),
    props: path.relative(workDir, propsPath),
    codec: "h264",
    pixelFormat: "yuv420p",
  });
}
