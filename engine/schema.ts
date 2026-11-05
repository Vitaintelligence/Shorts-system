import { MASTER } from "./format";
import type { CaptionCue, SampleInput, TitleCard } from "./types";

const TOP_LEVEL = [
  "schemaVersion",
  "id",
  "createdFor",
  "disclaimer",
  "source",
  "app",
  "format",
  "titleCard",
  "captions",
  "callToAction",
] as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function fail(message: string): never {
  throw new Error(`Invalid sample input: ${message}`);
}

function assertOnlyKeys(value: Record<string, unknown>, allowed: readonly string[], label: string) {
  for (const key of Object.keys(value)) {
    if (!allowed.includes(key)) {
      fail(`${label} has unexpected field "${key}"`);
    }
  }
}

function assertString(value: unknown, label: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    fail(`${label} must be a non-empty string`);
  }
  return value.trim();
}

function assertTitle(value: unknown): TitleCard {
  if (!isRecord(value)) {
    fail("titleCard must be an object");
  }
  assertOnlyKeys(value, ["eyebrow", "title", "subtitle"], "titleCard");
  return {
    eyebrow: assertString(value.eyebrow, "titleCard.eyebrow"),
    title: assertString(value.title, "titleCard.title"),
    subtitle: assertString(value.subtitle, "titleCard.subtitle"),
  };
}

function assertCaption(value: unknown, index: number, durationSeconds: number): CaptionCue {
  if (!isRecord(value)) {
    fail(`captions[${index}] must be an object`);
  }
  assertOnlyKeys(value, ["id", "startSeconds", "endSeconds", "text"], `captions[${index}]`);
  const id = assertString(value.id, `captions[${index}].id`);
  const text = assertString(value.text, `captions[${index}].text`);
  const startSeconds = value.startSeconds;
  const endSeconds = value.endSeconds;
  if (typeof startSeconds !== "number" || typeof endSeconds !== "number") {
    fail(`captions[${index}] times must be numbers`);
  }
  if (startSeconds < 0 || endSeconds <= startSeconds || endSeconds > durationSeconds + 0.001) {
    fail(`captions[${index}] must sit inside the duration`);
  }
  return { id, startSeconds, endSeconds, text };
}

/**
 * Validates the placeholder manifest used by `npm run produce:sample`.
 * The sample path refuses product claims: no app record, no CTA, no recording.
 */
export function assertSampleInput(value: unknown): SampleInput {
  if (!isRecord(value)) {
    fail("root value must be an object");
  }
  assertOnlyKeys(value, TOP_LEVEL, "root");
  if (value.schemaVersion !== 1) {
    fail("schemaVersion must be 1");
  }
  const id = assertString(value.id, "id");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) {
    fail("id must be a lowercase slug");
  }
  const createdFor = assertString(value.createdFor, "createdFor");
  const disclaimer = assertString(value.disclaimer, "disclaimer");
  if (disclaimer.length < 20) {
    fail("disclaimer must state that this manifest is not a product claim");
  }
  if (!isRecord(value.source)) {
    fail("source must be an object");
  }
  assertOnlyKeys(value.source, ["kind", "note"], "source");
  if (value.source.kind !== "none") {
    fail('sample source.kind must be "none" (attach no fake recording)');
  }
  const note = assertString(value.source.note, "source.note");
  if (value.app !== null) {
    fail("sample app must be null so the proof render cannot name a product");
  }
  if (value.callToAction !== null) {
    fail("sample callToAction must be null");
  }
  if (!isRecord(value.format)) {
    fail("format must be an object");
  }
  assertOnlyKeys(value.format, ["width", "height", "fps", "durationSeconds"], "format");
  if (value.format.width !== MASTER.width || value.format.height !== MASTER.height || value.format.fps !== MASTER.fps) {
    fail(`format must be ${MASTER.width}x${MASTER.height} at ${MASTER.fps}fps`);
  }
  const durationSeconds = value.format.durationSeconds;
  if (typeof durationSeconds !== "number" || durationSeconds < 3 || durationSeconds > 12) {
    fail("durationSeconds must be between 3 and 12 for the sample skeleton");
  }
  if (!Array.isArray(value.captions) || value.captions.length === 0) {
    fail("captions must contain at least one cue");
  }
  const captions = value.captions.map((cue, index) => assertCaption(cue, index, durationSeconds));
  const firstStart = Math.min(...captions.map((cue) => cue.startSeconds));
  if (firstStart < 1.5) {
    fail("the first caption must start at 1.5s or later so the title card is readable");
  }
  const titleCard = assertTitle(value.titleCard);
  return {
    schemaVersion: 1,
    id,
    createdFor,
    disclaimer,
    source: { kind: "none", note },
    app: null,
    format: {
      width: MASTER.width,
      height: MASTER.height,
      fps: MASTER.fps,
      durationSeconds,
    },
    titleCard,
    captions,
    callToAction: null,
  };
}
