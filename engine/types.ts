export interface CaptionCue {
  id: string;
  startSeconds: number;
  endSeconds: number;
  text: string;
}

export interface TitleCard {
  eyebrow: string;
  title: string;
  subtitle: string;
}

export interface SampleInput {
  schemaVersion: 1;
  id: string;
  createdFor: string;
  disclaimer: string;
  source: {
    kind: "none";
    note: string;
  };
  app: null;
  format: {
    width: number;
    height: number;
    fps: number;
    durationSeconds: number;
  };
  titleCard: TitleCard;
  captions: CaptionCue[];
  callToAction: null;
}

export interface RenderProps {
  id: string;
  titleCard: TitleCard;
  captions: CaptionCue[];
  durationSeconds: number;
}

export interface TitleWindow {
  inSeconds: number;
  outSeconds: number;
}
