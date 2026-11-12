#!/usr/bin/env node
// Builds index.json: one entry per deployment folder (a top-level directory
// holding testnet_deployments.json), newest folder first. A folder whose book
// has no AddressManager yet (tokens only) is left out. The UIs read this
// file to populate their deployment selector and to pick the default.
//
//   node scripts/build-index.mjs            # writes index.json
//   node scripts/build-index.mjs --check    # exits 1 when index.json is stale
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = join(new URL(".", import.meta.url).pathname, "..");
const BOOK = "testnet_deployments.json";

function git(...args) {
  return execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim();
}

function label(name) {
  return name
    .split(/[-_]+/)
    .filter(Boolean)
    .map((w) => (/^\d/.test(w) ? w : w[0].toUpperCase() + w.slice(1)))
    .join(" ");
}

/** Unix seconds (git %ct) to a UTC ISO string; null for an uncommitted folder. */
function isoUtc(seconds) {
  return seconds ? new Date(Number(seconds) * 1000).toISOString() : null;
}

function bookInfo(file) {
  const json = JSON.parse(readFileSync(file, "utf8"));
  for (const [network, sets] of Object.entries(json)) {
    if (!sets || typeof sets !== "object") continue;
    for (const [set, addresses] of Object.entries(sets)) {
      if (addresses && typeof addresses === "object" && "AddressManager" in addresses) {
        return { network, set, addressManager: addresses.AddressManager };
      }
    }
  }
  return null;
}

const folders = readdirSync(root, { withFileTypes: true })
  .filter((d) => d.isDirectory() && !d.name.startsWith(".") && existsSync(join(root, d.name, BOOK)))
  .map((d) => d.name);

const deployments = folders.flatMap((name) => {
  const book = `${name}/${BOOK}`;
  const info = bookInfo(join(root, book));
  if (!info) return [];
  const created = isoUtc(git("log", "--diff-filter=A", "--format=%ct", "--reverse", "--", book).split("\n")[0]);
  const updated = isoUtc(git("log", "-1", "--format=%ct", "--", name));
  const commitFile = join(root, name, "COMMIT");
  const commit = existsSync(commitFile) ? readFileSync(commitFile, "utf8").trim() : null;
  return {
    name,
    label: label(name),
    path: name,
    book,
    abi: existsSync(join(root, name, "abi")) ? `${name}/abi` : null,
    readme: existsSync(join(root, name, "README.md")) ? `${name}/README.md` : null,
    network: info.network,
    set: info.set,
    addressManager: info.addressManager,
    consensusCommit: commit,
    createdAt: created,
    updatedAt: updated,
  };
});

// Newest folder first: ordered by the commit that added the folder's book.
deployments.sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? "") || a.name.localeCompare(b.name));

const index = {
  $schema: "./index.schema.json",
  repository: "genlayerlabs/genlayer-networks",
  generatedAt: new Date().toISOString(),
  commit: git("rev-parse", "HEAD"),
  deployments,
};

const out = join(root, "index.json");
const next = JSON.stringify(index, null, 2) + "\n";
if (process.argv.includes("--check")) {
  const current = existsSync(out) ? JSON.parse(readFileSync(out, "utf8")) : null;
  const same =
    current && JSON.stringify(current.deployments) === JSON.stringify(index.deployments);
  if (!same) {
    console.error("index.json is stale: run `node scripts/build-index.mjs`");
    process.exit(1);
  }
  console.log("index.json is up to date");
} else {
  writeFileSync(out, next);
  console.log(`index.json: ${deployments.length} deployments (${deployments.map((d) => d.name).join(", ")})`);
}
