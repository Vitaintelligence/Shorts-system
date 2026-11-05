import { copyFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { MASTER, PLATFORMS, type Platform } from "../format";
import { writeJson, writeText } from "../fsutil";

const SAFE_AREA: Record<Platform, string> = {
  instagram:
    "Keep type inside the central band. Instagram Reels covers the lower caption area and the right edge with buttons. The sample uses 220px top and 280px bottom padding.",
  tiktok:
    "Keep type inside the central band. TikTok covers the right edge and the bottom description. The sample uses the same 1080x1920 master as the other platforms.",
  youtube:
    "YouTube Shorts uses the same 9:16 master. Keep type clear of the bottom title and subscribe chrome. Verify on a phone before a real publish.",
};

export async function exportPlatforms(
  root: string,
  id: string,
  masterPath: string,
  srt: string,
): Promise<string[]> {
  const written: string[] = [];
  for (const platform of PLATFORMS) {
    const dir = path.join(root, "exports", platform);
    await mkdir(dir, { recursive: true });
    const base = path.join(dir, id);
    const videoPath = `${base}.mp4`;
    const srtPath = `${base}.srt`;
    const sidecarPath = `${base}.json`;
    await copyFile(masterPath, videoPath);
    await writeText(srtPath, srt);
    await writeJson(sidecarPath, {
      platform,
      master: true,
      container: "mp4",
      videoCodec: MASTER.videoCodec,
      audioCodec: MASTER.audioCodec,
      width: MASTER.width,
      height: MASTER.height,
      fps: MASTER.fps,
      captions: "burned-in",
      srt: `${id}.srt`,
      safeArea: SAFE_AREA[platform],
    });
    written.push(path.relative(root, videoPath));
  }
  return written;
}
