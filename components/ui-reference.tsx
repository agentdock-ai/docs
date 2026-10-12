import { readFile } from "node:fs/promises";
import { join } from "node:path";
import {
  UIReferenceClient,
  type UIReferenceEntry,
} from "./ui-reference-client";
import { uiReferenceEntries } from "./ui-reference-data";

const sourceRoot = join(process.cwd(), "components");

export async function UIReference() {
  const sourceCache = new Map<string, string>();
  const resolved = await Promise.all(
    uiReferenceEntries.map(async (entry) => {
      let source = sourceCache.get(entry.file);
      if (!source) {
        const sourcePath = entry.file.startsWith("ui/")
          ? join(sourceRoot, entry.file)
          : join(sourceRoot, "agentdock-ui", entry.file);
        source = await readFile(sourcePath, "utf8");
        sourceCache.set(entry.file, source);
      }
      return { ...entry, source };
    }),
  );

  return <UIReferenceClient entries={resolved} />;
}
