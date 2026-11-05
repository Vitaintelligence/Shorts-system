import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { MASTER } from "../format";
import { titleWindow } from "../motion-graphics/timing";
import type { RenderProps } from "../types";

const FONT = '"Liberation Sans", "DejaVu Sans", sans-serif';

export const SampleShort: React.FC<RenderProps> = (props) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const window = titleWindow({
    captions: props.captions,
    durationSeconds: props.durationSeconds,
  });
  const titleIn = Math.round(window.inSeconds * fps);
  const titleOut = Math.round(window.outSeconds * fps);
  const titleOpacity = interpolate(frame, [titleIn, titleIn + 10, Math.max(titleIn + 11, titleOut - 8), titleOut], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const drift = interpolate(frame, [0, Math.max(1, durationInFrames - 1)], [0, 1]);
  const active = props.captions.find((cue) => {
    const start = Math.round(cue.startSeconds * fps);
    const end = Math.round(cue.endSeconds * fps);
    return frame >= start && frame < end;
  });
  const captionOpacity = active
    ? interpolate(frame, [Math.round(active.startSeconds * fps), Math.round(active.startSeconds * fps) + 6], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  return (
    <AbsoluteFill style={{ backgroundColor: "#10131a", fontFamily: FONT, color: "#f4f1ea" }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(120% 70% at ${46 + drift * 8}% ${20 + drift * 12}%, #2a3548 0%, rgba(16,19,26,0) 58%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 220,
          left: 80,
          right: 80,
          height: 8,
          borderRadius: 999,
          background: "#e2b340",
        }}
      />
      <AbsoluteFill
        style={{
          opacity: titleOpacity,
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "220px 80px 280px",
        }}
      >
        <div style={{ letterSpacing: 6, fontSize: 28, textTransform: "uppercase", color: "#e2b340" }}>
          {props.titleCard.eyebrow}
        </div>
        <div style={{ marginTop: 28, fontSize: 92, fontWeight: 700, lineHeight: 1.02, maxWidth: 900 }}>
          {props.titleCard.title}
        </div>
        <div style={{ marginTop: 24, fontSize: 40, color: "#d5d0c6" }}>{props.titleCard.subtitle}</div>
        <div style={{ marginTop: 48, fontSize: 26, letterSpacing: 1, color: "#9aa3b2" }}>
          {MASTER.width}×{MASTER.height} · {MASTER.fps} fps
        </div>
      </AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: 80,
          right: 80,
          bottom: 300,
          opacity: captionOpacity,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            maxWidth: 920,
            background: "rgba(8, 10, 14, 0.78)",
            borderRadius: 18,
            padding: "22px 32px",
            fontSize: 42,
            lineHeight: 1.25,
            textAlign: "center",
          }}
        >
          {active?.text ?? ""}
        </div>
      </div>
    </AbsoluteFill>
  );
};
