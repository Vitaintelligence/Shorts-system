import type { CaptionCue } from "../types";

function pad(value: number, width: number): string {
  return value.toString().padStart(width, "0");
}

export function toSrtTime(seconds: number): string {
  const totalMs = Math.round(seconds * 1000);
  const ms = totalMs % 1000;
  const totalSeconds = Math.floor(totalMs / 1000);
  const secs = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const mins = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);
  return `${pad(hours, 2)}:${pad(mins, 2)}:${pad(secs, 2)},${pad(ms, 3)}`;
}

export function renderSrt(cues: CaptionCue[]): string {
  return cues
    .map((cue, index) => {
      const text = cue.text.replace(/\r?\n/g, " ").trim();
      return `${index + 1}\n${toSrtTime(cue.startSeconds)} --> ${toSrtTime(cue.endSeconds)}\n${text}\n`;
    })
    .join("\n");
}
