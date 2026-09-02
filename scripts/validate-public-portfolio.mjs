import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, statSync } from "node:fs";
import { dirname, extname, normalize, resolve } from "node:path";

const root = process.cwd();
const trackedFiles = execFileSync("git", ["ls-files", "-z"], { encoding: "utf8" })
  .split("\0")
  .filter(Boolean);
const markdownFiles = trackedFiles.filter((file) => extname(file).toLowerCase() === ".md");
const svgFiles = trackedFiles.filter((file) => extname(file).toLowerCase() === ".svg");
const failures = new Map();

function fail(check, message) {
  const messages = failures.get(check) ?? [];
  messages.push(message);
  failures.set(check, messages);
}

function readText(file) {
  return readFileSync(resolve(root, file), "utf8");
}

function localTarget(rawTarget) {
  const target = rawTarget.trim().replace(/^<|>$/g, "").split(/\s+["']/)[0];
  if (!target || /^(?:https?:|mailto:|tel:|data:|#)/i.test(target)) return null;
  return decodeURIComponent(target.split("#")[0].split("?")[0]);
}

for (const file of markdownFiles) {
  const source = readText(file);
  const fences = source.match(/^```/gm)?.length ?? 0;
  if (fences % 2 !== 0) fail("MARKDOWN", `${file}: unbalanced fenced code block`);
  if (/^#{1,6}(?:\s*)$/m.test(source)) fail("MARKDOWN", `${file}: empty heading`);

  const linkPattern = /!?\[[^\]]*\]\(([^)]+)\)/g;
  for (const match of source.matchAll(linkPattern)) {
    const target = localTarget(match[1]);
    if (!target) continue;
    const absolute = resolve(root, dirname(file), target);
    if (!absolute.startsWith(`${root}/`) && absolute !== root) {
      fail("LINKS", `${file}: link escapes repository: ${target}`);
    } else if (!existsSync(absolute)) {
      fail("LINKS", `${file}: missing local target: ${target}`);
    }
  }

  for (const match of source.matchAll(/```mermaid\s*\n([\s\S]*?)```/g)) {
    const diagram = match[1].trim();
    if (!/^(?:flowchart|graph|sequenceDiagram|classDiagram|stateDiagram(?:-v2)?|erDiagram|journey|gantt|pie|mindmap|timeline)\b/.test(diagram)) {
      fail("MERMAID", `${file}: unsupported or missing Mermaid diagram declaration`);
    }
    for (const [open, close] of [["[", "]"], ["(", ")"], ["{", "}"]]) {
      const opens = diagram.split(open).length - 1;
      const closes = diagram.split(close).length - 1;
      if (opens !== closes) fail("MERMAID", `${file}: unbalanced ${open}${close}`);
    }
  }
}

const readmeMermaidCount = (readText("README.md").match(/```mermaid\s*\n/g) ?? []).length;
if (readmeMermaidCount !== 1) fail("MERMAID", `README.md: expected exactly one Mermaid diagram, found ${readmeMermaidCount}`);

for (const file of svgFiles) {
  const source = readText(file);
  if (!/^\s*(?:<\?xml[^>]*>\s*)?<svg\b[\s\S]*<\/svg>\s*$/i.test(source)) {
    fail("ASSETS", `${file}: invalid SVG document boundary`);
  }
  if (/<script\b|\bon\w+\s*=|(?:href|src)\s*=\s*["'](?:javascript:|https?:|data:text\/html)/i.test(source)) {
    fail("ASSETS", `${file}: unsafe executable or external SVG content`);
  }
  if (statSync(resolve(root, file)).size === 0) fail("ASSETS", `${file}: empty asset`);
}

const forbiddenPaths = [
  /(^|\/)(?:docs\/private|engine-contracts|user-stories|tests\/enterprise|tests\/09-enterprise|tests\/10-engine-integrity)(\/|$)/i,
  /(?:business[_ -]?rules|enterprise[_ -]?automation[_ -]?knowledge[_ -]?base)/i,
];
for (const file of trackedFiles) {
  if (forbiddenPaths.some((pattern) => pattern.test(normalize(file)))) {
    fail("REPOSITORY SCOPE", `${file}: content falls outside the approved repository scope`);
  }
}

const secretPatterns = [
  /-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/,
  /\bgh[pousr]_[A-Za-z0-9]{20,}\b/,
  /\bgithub_pat_[A-Za-z0-9_]{20,}\b/,
  /\bAKIA[0-9A-Z]{16}\b/,
  /\b(?:sk_live|sk_test)_[A-Za-z0-9]{16,}\b/,
  /\b(?:api[_-]?key|client[_-]?secret|access[_-]?token|auth[_-]?token)\s*[:=]\s*["'][^"']{8,}["']/i,
];
for (const file of trackedFiles) {
  const absolute = resolve(root, file);
  if (!existsSync(absolute) || statSync(absolute).isDirectory()) continue;
  const content = readFileSync(absolute);
  if (content.includes(0)) continue;
  const source = content.toString("utf8");
  if (secretPatterns.some((pattern) => pattern.test(source))) {
    fail("SECRET SCAN", `${file}: credential-like content detected`);
  }
}

const checks = ["MARKDOWN", "LINKS", "MERMAID", "ASSETS", "REPOSITORY SCOPE", "SECRET SCAN"];
try {
  execFileSync(process.execPath, ["scripts/validate-certification-evidence.mjs"], { stdio: "inherit" });
} catch {
  fail("CERTIFICATION EVIDENCE", "published certification evidence is inconsistent");
}
checks.push("CERTIFICATION EVIDENCE");
for (const check of checks) {
  const messages = failures.get(check) ?? [];
  console.log(`${check}: ${messages.length === 0 ? "PASS" : "FAIL"}`);
  for (const message of messages) console.error(`  - ${message}`);
}

if (failures.size > 0) {
  console.log("PUBLIC PORTFOLIO VALIDATION: FAIL");
  process.exit(1);
}

console.log("PUBLIC PORTFOLIO VALIDATION: PASS");
