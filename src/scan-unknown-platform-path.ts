import which from 'which';

type WhichLike = { sync: (cmd: string) => string };
type Deps = { which?: WhichLike };

export default function scanUnknownPlatform(allowFallback = false, deps?: Deps) {
  const w = deps?.which ?? which;
  const candidatesAll = [
    'microsoft-edge',
    'microsoft-edge-beta',
    'microsoft-edge-dev',
    'microsoft-edge-canary',
  ];

  const candidates = allowFallback ? candidatesAll : [candidatesAll[0]];

  for (const cmd of candidates) {
    try {
      const resolved = w.sync(cmd);
      if (resolved) return resolved;
    } catch (_) {}
  }

  return null;
}
