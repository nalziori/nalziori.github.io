// ponytail: workaround for Next 16.3 static export — segment prefetch files are written as nested
// folders (__next.ko/__PAGE__.txt) but the client requests them dot-joined (__next.ko.__PAGE__.txt),
// which 404s on any static host. Writes the dot-joined copies; delete once Next writes them itself.
import { copyFileSync, readdirSync } from "node:fs";
import { join, relative, sep } from "node:path";

let written = 0;

function flatten(segmentDir, parent) {
  for (const entry of readdirSync(segmentDir, { withFileTypes: true, recursive: true })) {
    if (!entry.isFile() || !entry.name.endsWith(".txt")) continue;
    const file = join(entry.parentPath, entry.name);
    copyFileSync(file, join(parent, relative(parent, file).split(sep).join(".")));
    written++;
  }
}

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const path = join(dir, entry.name);
    if (entry.name.startsWith("__next.")) flatten(path, dir);
    else walk(path);
  }
}

walk("out");
console.log(`flatten-segments: wrote ${written} dot-joined segment files`);
