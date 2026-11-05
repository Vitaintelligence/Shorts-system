import path from "node:path";
import { writeText } from "../fsutil";
import type { SampleInput } from "../types";

export async function writeScript(input: SampleInput, workDir: string): Promise<string> {
  const captionLines = input.captions
    .map((cue) => `- ${cue.startSeconds.toFixed(2)}s–${cue.endSeconds.toFixed(2)}s: ${cue.text}`)
    .join("\n");
  const script = `# Script

Status: pipeline proof. This is not a marketing script.

Disclaimer: ${input.disclaimer}

## Voiceover

None. The sample has no approved spoken script.

## On-screen title card

- Eyebrow: ${input.titleCard.eyebrow}
- Title: ${input.titleCard.title}
- Subtitle: ${input.titleCard.subtitle}

## Burned-in captions

${captionLines}

## Call to action

None.
`;
  const file = path.join(workDir, "script.md");
  await writeText(file, script);
  return file;
}
