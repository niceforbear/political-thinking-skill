#!/usr/bin/env node
/**
 * political-thinking-skill installer
 *
 * Usage:
 *   npx political-thinking-skill                 # auto-detect skills dir, install
 *   npx political-thinking-skill --list          # show known skills locations
 *   npx political-thinking-skill --target <dir>  # install into a custom directory
 *   npx political-thinking-skill --uninstall     # remove from auto-detected dir
 *
 * Zero dependencies (Node >= 16.7). The skill payload (SKILL.md, references/,
 * docs) is copied into <skills-dir>/political-thinking/.
 */
"use strict";

const fs = require("fs");
const os = require("os");
const path = require("path");

const SKILL_NAME = "political-thinking";
// Payload items shipped inside this npm package (relative to package root).
const PAYLOAD = [
  "SKILL.md",
  "README.md",
  "README.zh-CN.md",
  "LICENSE",
  "references",
];

function home() {
  return os.homedir();
}

/** Known agent skills directories, in detection priority order. */
function knownLocations() {
  return [
    { agent: "Qoder", dir: path.join(home(), ".qoder", "skills") },
    { agent: "Qoder CN", dir: path.join(home(), ".qoder-cn", "skills") },
    { agent: "QoderWork", dir: path.join(home(), ".qoderwork", "skills") },
    { agent: "QoderWork CN", dir: path.join(home(), ".qoderworkcn", "skills") },
    { agent: "WorkBuddy", dir: path.join(home(), ".workbuddy", "skills") },
    { agent: "Claude Code", dir: path.join(home(), ".claude", "skills") },
    { agent: "Codex CLI", dir: path.join(home(), ".codex", "skills") },
    { agent: "Generic (XDG)", dir: path.join(home(), ".config", "agents", "skills") },
  ];
}

function packageRoot() {
  return path.resolve(__dirname, "..");
}

function detectTarget() {
  for (const loc of knownLocations()) {
    if (fs.existsSync(loc.dir)) {
      return { ...loc, existed: true };
    }
  }
  return null;
}

function copyPayload(dest) {
  fs.mkdirSync(dest, { recursive: true });
  const root = packageRoot();
  let copied = 0;
  for (const item of PAYLOAD) {
    const src = path.join(root, item);
    if (!fs.existsSync(src)) continue;
    fs.cpSync(src, path.join(dest, item), { recursive: true });
    copied += 1;
  }
  if (!fs.existsSync(path.join(dest, "SKILL.md"))) {
    throw new Error("payload incomplete: SKILL.md missing from package");
  }
  return copied;
}

function install(targetDir) {
  const dest = path.join(targetDir, SKILL_NAME);
  if (fs.existsSync(dest)) {
    fs.rmSync(dest, { recursive: true, force: true });
    console.log(`  (replaced existing installation at ${dest})`);
  }
  const n = copyPayload(dest);
  console.log("");
  console.log(`✓ Installed ${SKILL_NAME} (${n} items) → ${dest}`);
  console.log("");
  console.log("Next steps:");
  console.log("  1. Restart / reload your agent so it picks up the new skill.");
  console.log("  2. Ask your agent, e.g.:");
  console.log('       "用政治思维帮我分析一下：我们部门的新方案推行阻力很大，怎么办？"');
  console.log('       "Use the political-thinking skill to analyze my promotion situation."');
  console.log("");
  console.log("No other requirements — the skill is pure Markdown, no runtime needed.");
}

function uninstall(targetDir) {
  const dest = path.join(targetDir, SKILL_NAME);
  if (!fs.existsSync(dest)) {
    console.log(`Nothing to remove at ${dest}`);
    return;
  }
  fs.rmSync(dest, { recursive: true, force: true });
  console.log(`✓ Removed ${dest}`);
}

function usage() {
  console.log(`political-thinking-skill installer

Usage:
  npx political-thinking-skill                 Install into auto-detected skills dir
  npx political-thinking-skill --list          Show known skills locations
  npx political-thinking-skill --target <dir>  Install into a custom directory
  npx political-thinking-skill --uninstall     Remove from auto-detected dir
  npx political-thinking-skill --help          Show this help`);
}

function main() {
  const argv = process.argv.slice(2);
  if (argv.includes("--help") || argv.includes("-h")) {
    usage();
    return;
  }

  if (argv.includes("--list")) {
    console.log("Known agent skills locations:");
    for (const loc of knownLocations()) {
      const mark = fs.existsSync(loc.dir) ? "✓ exists" : "- missing";
      console.log(`  [${mark}] ${loc.agent}: ${loc.dir}`);
    }
    return;
  }

  const ti = argv.indexOf("--target");
  let target;
  if (ti !== -1) {
    target = argv[ti + 1];
    if (!target) {
      console.error("--target requires a directory argument");
      process.exit(2);
    }
    target = path.resolve(target);
  } else {
    const detected = detectTarget();
    if (!detected) {
      console.error("No known skills directory found on this machine.");
      console.error("Pass one explicitly:  npx political-thinking-skill --target <skills-dir>");
      knownLocations().forEach((l) => console.error(`  e.g. ${l.dir}`));
      process.exit(2);
    }
    target = detected.dir;
    console.log(`Detected ${detected.agent} skills dir: ${target}`);
  }

  if (argv.includes("--uninstall")) {
    uninstall(target);
    return;
  }

  install(target);
}

try {
  main();
} catch (err) {
  console.error(`✗ ${err.message}`);
  process.exit(1);
}
