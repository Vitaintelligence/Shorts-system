import type { TitleWindow } from "../types";

export function titleWindow(input: {
  captions: { startSeconds: number }[];
  durationSeconds: number;
}): TitleWindow {
  const firstCaption = Math.min(...input.captions.map((cue) => cue.startSeconds));
  return {
    inSeconds: 0,
    outSeconds: Math.min(input.durationSeconds, firstCaption + 0.4),
  };
}
