import fs from 'node:fs';
import scanOsxPath from './scan-osx-path';
import scanWindowsPath from './scan-windows-path';
import scanUnknownPlatformPath from './scan-unknown-platform-path';

export default function locateEdge(allowFallback = false) {
  // 0) Environment override (allow developers/CI to force a path)
  const envPath = process.env.EDGE_BINARY;
  if (envPath && fs.existsSync(envPath)) return envPath;

  let found: string | null = null;
  switch (process.platform) {
    case 'darwin':
      found = scanOsxPath(allowFallback);
      break;
    case 'win32':
      found = scanWindowsPath(allowFallback);
      break;
    default:
      found = scanUnknownPlatformPath(allowFallback);
      break;
  }

  return found;
}

export function getInstallGuidance(): string {
  return [
    "We couldn't find a Microsoft Edge browser on this machine.",
    '',
    "Here's the fastest way to get set up:",
    '',
    '1) Install Edge via Playwright (recommended for CI/dev)',
    '   npx playwright install msedge',
    '',
    "Then re-run your command — we'll detect it automatically.",
    '',
    'Alternatively, install Microsoft Edge from the official site and re-run.',
  ].join('\n');
}

export function locateEdgeOrExplain(
  options?: boolean | { allowFallback?: boolean },
): string {
  const allowFallback =
    typeof options === 'boolean' ? options : Boolean(options?.allowFallback);
  const found = locateEdge(allowFallback) || locateEdge(true);
  if (typeof found === 'string' && found) return found;
  throw new Error(getInstallGuidance());
}
