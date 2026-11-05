import path from "node:path";
import { MASTER } from "../format";
import { writeJson } from "../fsutil";

export interface VoicePlan {
  mode: "silent-bed";
  sampleRate: number;
  channels: number;
  codec: "aac";
  reason: string;
}

export async function prepareVoice(workDir: string): Promise<VoicePlan> {
  const plan: VoicePlan = {
    mode: "silent-bed",
    sampleRate: MASTER.audioSampleRate,
    channels: MASTER.audioChannels,
    codec: "aac",
    reason: "No voiceover is generated. The sample has no approved script to perform and no voice provider is called.",
  };
  await writeJson(path.join(workDir, "voice.json"), { stage: "voice", ...plan });
  return plan;
}
