import React, { type ComponentType } from "react";
import { Composition } from "remotion";
import { MASTER, secondsToFrames } from "../format";
import sampleInput from "../../projects/incoming/sample/input.json";
import type { SampleInput } from "../types";
import { toRenderProps } from "./props";
import { SampleShort } from "./SampleShort";

const defaultProps = toRenderProps(sampleInput as SampleInput);

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="SampleShort"
      // Composition props are typed as Record<string, unknown>; SampleShort's props are narrower.
      component={SampleShort as unknown as ComponentType<Record<string, unknown>>}
      durationInFrames={secondsToFrames(defaultProps.durationSeconds)}
      fps={MASTER.fps}
      width={MASTER.width}
      height={MASTER.height}
      defaultProps={defaultProps}
      calculateMetadata={({ props }) => {
        const durationSeconds = Number(props.durationSeconds);
        return {
          durationInFrames: secondsToFrames(durationSeconds),
          fps: MASTER.fps,
          width: MASTER.width,
          height: MASTER.height,
        };
      }}
    />
  );
};
