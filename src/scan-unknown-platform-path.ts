import which from 'which';

type WhichLike = { sync: (cmd: string) => string };
type Deps = { which?: WhichLike };

export default function scanUnknownPlatform(deps?: Deps) {
  const w = deps?.which ?? which;
  const candidates = [
    'microsoft-edge',
    'microsoft-edge-beta',
    'microsoft-edge-dev',
    'microsoft-edge-canary',
  ];

  for (const cmd of candidates) {
    try {
      const resolved = w.sync(cmd);
      if (resolved) return resolved;
    } catch (_) {}
  }

  return null;
}
