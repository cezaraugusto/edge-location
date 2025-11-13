#!/usr/bin/env node

const mod = require('./dist/index.cjs');
const locateEdge = mod.default || mod;
const getEdgeVersion = mod.getEdgeVersion;
const getInstallGuidance = mod.getInstallGuidance;

const argv = process.argv.slice(2);
const allowFallback = argv.includes('--fallback') || argv.includes('-f');
const printBrowserVersion =
  argv.includes('--edge-version') || argv.includes('--browser-version');
const allowExec = argv.includes('--allow-exec');

try {
  const edgePath =
    (typeof locateEdge === 'function' && locateEdge(allowFallback)) ||
    (typeof locateEdge === 'function' && locateEdge(true)) ||
    null;

  if (!edgePath) {
    const guidance =
      (typeof getInstallGuidance === 'function' && getInstallGuidance()) ||
      'Microsoft Edge not found.';
    console.error(guidance);
    process.exit(1);
  }

  if (printBrowserVersion && typeof getEdgeVersion === 'function') {
    const v = getEdgeVersion(edgePath, { allowExec });
    if (!v) {
      console.log('');
      process.exit(2);
    }
    console.log(String(v));
    process.exit(0);
  }

  console.log(String(edgePath));
} catch (e) {
  console.error(String(e && e.message ? e.message : e));
  process.exit(1);
}
