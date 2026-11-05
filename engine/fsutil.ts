import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

export async function writeJson(file: string, data: unknown): Promise<void> {
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

export async function writeText(file: string, text: string): Promise<void> {
  await mkdir(path.dirname(file), { recursive: true });
  const body = text.endsWith("\n") ? text : `${text}\n`;
  await writeFile(file, body, "utf8");
}
