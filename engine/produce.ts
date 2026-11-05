import path from "node:path";
import { fileURLToPath } from "node:url";
import { mkdir } from "node:fs/promises";
import { muxSilentBed } from "./audio/bed";
import { buildCaptions } from "./captions/build-captions";
import { concept } from "./creative/concept";
import { assemble } from "./editing/assemble";
import { exportPlatforms } from "./editing/export-platforms";
import { capture } from "./exec";
import { ingest } from "./ingestion/ingest";
import { planAnimation } from "./animation/plan";
import { writeTitle } from "./motion-graphics/write-title";
import { checkMaster } from "./quality/check";
import { renderPicture } from "./rendering/render";
import { toRenderProps } from "./rendering/props";
import { writeScript } from "./scriptwriting/write-script";
import { analyze } from "./video-analysis/analyze";
import { prepareVoice } from "./voice/prepare-voice";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

async function main() {
  await capture("ffmpeg", ["-version"], root);
  await capture("ffprobe", ["-version"], root);

  const inputPath = path.join(root, "projects/incoming/sample/input.json");
  const workDir = path.join(root, "projects/production/sample");
  const mediaDir = path.join(workDir, "media");
  await mkdir(mediaDir, { recursive: true });

  console.log("Shorts Studio · sample pipeline");
  console.log("→ ingestion");
  const input = await ingest(inputPath, workDir);
  console.log("→ video-analysis");
  await analyze(input, workDir);
  console.log("→ creative");
  await concept(workDir);
  console.log("→ scriptwriting");
  await writeScript(input, workDir);
  console.log("→ voice");
  const voice = await prepareVoice(workDir);
  console.log("→ captions");
  const srt = await buildCaptions(input, workDir);
  console.log("→ motion-graphics");
  await writeTitle(input, workDir);
  console.log("→ animation");
  await planAnimation(workDir);
  console.log("→ editing");
  await assemble(input, workDir);

  const props = toRenderProps(input);
  const propsPath = path.join(mediaDir, "render-props.json");
  const picturePath = path.join(mediaDir, "picture.mp4");
  const masterPath = path.join(mediaDir, "master.mp4");

  console.log("→ rendering");
  await renderPicture(props, propsPath, picturePath, workDir, root);
  console.log("→ audio");
  await muxSilentBed(picturePath, masterPath, voice, workDir, root);
  console.log("→ quality");
  await checkMaster(masterPath, srt, props, voice, workDir, root);
  console.log("→ export");
  const exports = await exportPlatforms(root, input.id, masterPath, srt);

  console.log("Sample pipeline passed.");
  for (const file of exports) {
    console.log(`  ${file}`);
  }
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(message);
  process.exitCode = 1;
});
