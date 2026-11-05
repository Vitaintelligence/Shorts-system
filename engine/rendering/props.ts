import type { RenderProps, SampleInput } from "../types";

export function toRenderProps(input: SampleInput): RenderProps {
  return {
    id: input.id,
    titleCard: input.titleCard,
    captions: input.captions,
    durationSeconds: input.format.durationSeconds,
  };
}
