import { readFileSync } from "node:fs";
import process from "node:process";

const recordPath = "certification/omniqa-ci-v1.2.json";
const readmePath = "README.md";
const showcasePath = "docs/OmniQA_CI_v1.2_Showcase.md";
const workflowPath = ".github/workflows/omniqa-certification-evidence.yml";

const record = JSON.parse(readFileSync(recordPath, "utf8"));
const readme = readFileSync(readmePath, "utf8");
const showcase = readFileSync(showcasePath, "utf8");
const workflow = readFileSync(workflowPath, "utf8");
const failures = [];

function verify(condition, message) {
  if (!condition) failures.push(message);
}

function verifyPassingCount(gate, label) {
  verify(gate?.result === "PASS", `${label}: result must be PASS`);
  verify(Number.isInteger(gate?.passed) && gate.passed >= 0, `${label}: passed must be a non-negative integer`);
  verify(Number.isInteger(gate?.total) && gate.total >= 0, `${label}: total must be a non-negative integer`);
  verify(gate?.passed === gate?.total, `${label}: passed and total must match`);
}

verify(record.schemaVersion === 1, "schemaVersion must be 1");
verify(record.certificationVersion === "OmniQA CI v1.2", "certificationVersion must be OmniQA CI v1.2");
verify(record.displayName === "OmniQA Full CI/CD — Postman API Contract + 3-Browser Certification", "displayName is not authoritative");
verify(/^\d+$/.test(record.runId), "runId must contain digits only");
verify(/^[0-9a-f]{40}$/.test(record.certifiedCommit), "certifiedCommit must be a full Git commit SHA");
verify(record.certificationDate === "September 2, 2026", "certificationDate is not authoritative");
verify(record.duration?.display === "14m 33s", "duration display is not authoritative");
verify(record.duration?.totalSeconds === 14 * 60 + 33, "duration seconds do not equal 14m 33s");
verify(record.conclusion === "100% GREEN", "conclusion must be 100% GREEN");

const expectedPipeline = [
  "Lint",
  "Typecheck",
  "Runtime",
  "Foundation",
  "Full Unit",
  "API/Integration",
  "Postman/Newman HTTP API Contract",
  "Chromium",
  "Firefox",
  "WebKit",
];
verify(JSON.stringify(record.pipeline) === JSON.stringify(expectedPipeline), "pipeline order or gate names are inconsistent");

verify(record.gates?.lint?.result === "PASS", "Lint must pass");
verify(record.gates?.typecheck?.result === "PASS", "Typecheck must pass");
verify(record.gates?.typecheck?.errors === 0, "Typecheck errors must be zero");
verify(record.gates?.runtime?.result === "PASS", "Runtime must pass");
verifyPassingCount(record.gates?.foundation, "Foundation");
verifyPassingCount(record.gates?.fullUnit, "Full Unit");
verifyPassingCount(record.gates?.apiIntegration, "API/Integration");

const postman = record.gates?.postmanNewman;
verify(postman?.result === "PASS", "Postman/Newman must pass");
verify(postman?.requestsPassed === 46 && postman.requestsTotal === 46, "Postman/Newman requests must be 46/46");
verify(postman?.assertionsPassed === 51 && postman.assertionsTotal === 51, "Postman/Newman assertions must be 51/51");

const browsers = record.gates?.browsers;
verifyPassingCount(browsers?.chromium, "Chromium");
verifyPassingCount(browsers?.firefox, "Firefox");
verifyPassingCount(browsers?.webkit, "WebKit");
verifyPassingCount(browsers?.combined, "Browser total");
const calculatedBrowserPassed = browsers.chromium.passed + browsers.firefox.passed + browsers.webkit.passed;
const calculatedBrowserTotal = browsers.chromium.total + browsers.firefox.total + browsers.webkit.total;
verify(calculatedBrowserPassed === browsers.combined.passed, "combined browser passed count is inconsistent");
verify(calculatedBrowserTotal === browsers.combined.total, "combined browser total is inconsistent");
verify(browsers.combined.passed === 216 && browsers.combined.total === 216, "browser certification must be 216/216");
verify(record.retries === 0, "retries must be zero");
verify(record.arbitraryWaits === 0, "arbitrary waits must be zero");

const requiredDocumentEvidence = [
  record.displayName,
  record.runId,
  record.certifiedCommit,
  record.certificationDate,
  record.duration.display,
  record.conclusion,
  "782 / 782",
  "888 / 888",
  "11 / 11",
  "46 / 46 requests",
  "51 / 51 assertions",
  "72 / 72",
  "216 / 216",
];
for (const evidence of requiredDocumentEvidence) {
  verify(readme.includes(evidence), `README.md is missing certification evidence: ${evidence}`);
  verify(showcase.includes(evidence), `${showcasePath} is missing certification evidence: ${evidence}`);
}

const expectedWorkflowIdentity = `name: ${record.displayName}`;
const expectedRunIdentity = `run-name: ${record.displayName}`;
verify(workflow.includes(expectedWorkflowIdentity), "public workflow name is inconsistent");
verify(workflow.includes(expectedRunIdentity), "public run-name is inconsistent");
verify(workflow.includes("workflow_dispatch:"), "workflow_dispatch trigger is required");
verify(!workflow.includes("pull_request:"), "certification-evidence workflow must not run for pull requests");

if (failures.length > 0) {
  console.error("CERTIFICATION EVIDENCE VALIDATION: FAIL");
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}

if (process.argv.includes("--summary")) {
  console.log(`# ${record.displayName}`);
  console.log();
  console.log(`## ${record.conclusion}`);
  console.log();
  console.log("**Pipeline**");
  console.log();
  console.log(record.pipeline.join(" → "));
  console.log();
  console.log("| Certification layer | Certified result |");
  console.log("| --- | ---: |");
  console.log(`| Foundation | ${record.gates.foundation.passed}/${record.gates.foundation.total} |`);
  console.log(`| Full Unit | ${record.gates.fullUnit.passed}/${record.gates.fullUnit.total} |`);
  console.log(`| API/Integration | ${record.gates.apiIntegration.passed}/${record.gates.apiIntegration.total} |`);
  console.log(`| Postman/Newman | ${postman.requestsPassed}/${postman.requestsTotal} requests · ${postman.assertionsPassed}/${postman.assertionsTotal} assertions |`);
  console.log(`| Chromium | ${browsers.chromium.passed}/${browsers.chromium.total} |`);
  console.log(`| Firefox | ${browsers.firefox.passed}/${browsers.firefox.total} |`);
  console.log(`| WebKit | ${browsers.webkit.passed}/${browsers.webkit.total} |`);
  console.log(`| Browser total | ${browsers.combined.passed}/${browsers.combined.total} |`);
  console.log(`| Retries | ${record.retries} |`);
  console.log(`| Arbitrary waits | ${record.arbitraryWaits} |`);
  console.log();
  console.log(`**Authoritative certification duration:** ${record.duration.display}`);
  console.log();
  console.log(`**Authoritative Run ID:** ${record.runId}`);
  console.log();
  console.log("This workflow verifies the integrity and consistency of OmniQA's published Quality Engineering certification evidence.");
} else {
  console.log("CERTIFICATION EVIDENCE VALIDATION: PASS");
  console.log(`BROWSER TOTAL VERIFIED: ${browsers.combined.passed}/${browsers.combined.total}`);
  console.log(`POSTMAN/NEWMAN VERIFIED: ${postman.requestsPassed}/${postman.requestsTotal} requests, ${postman.assertionsPassed}/${postman.assertionsTotal} assertions`);
}
