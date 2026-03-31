import fs from 'node:fs';
import path from 'node:path';

type FsLike = Pick<typeof fs, 'existsSync' | 'readdirSync'>;
type EnvLike = NodeJS.ProcessEnv;

export function resolveFromPlaywrightCache(deps?: {
  fs?: FsLike;
  env?: EnvLike;
  platform?: NodeJS.Platform;
  homeDir?: string;
  localAppData?: string;
}): string | null {
  const f: FsLike = deps?.fs ?? fs;
  const env: EnvLike = deps?.env ?? process.env;
  const platform: NodeJS.Platform = deps?.platform ?? process.platform;

  try {
    const override = String(env.PLAYWRIGHT_BROWSERS_PATH || '').trim();
    const overrideBase =
      override && override !== '0' ? path.resolve(override) : '';

    if (platform === 'darwin') {
      const home = deps?.homeDir ?? env.HOME ?? '';
      const bases: string[] = [];
      if (overrideBase) bases.push(overrideBase);
      if (home) bases.push(path.join(home, 'Library', 'Caches', 'ms-playwright'));
      if (bases.length === 0) return null;

      for (const base of bases) {
        const dirs = listDirs(f, base).filter((d) => /^msedge(-|$)/i.test(d));
        const candidates: string[] = [];
        for (const d of dirs) {
          // Common layouts observed for Playwright browser downloads
          candidates.push(
            path.join(
              base,
              d,
              'Microsoft Edge.app',
              'Contents',
              'MacOS',
              'Microsoft Edge',
            ),
          );
          // Alternate folder names occasionally seen
          candidates.push(
            path.join(base, d, 'msedge.app', 'Contents', 'MacOS', 'msedge'),
          );
          // Channel subfolders
          candidates.push(
            path.join(
              base,
              d,
              'msedge-mac',
              'Microsoft Edge.app',
              'Contents',
              'MacOS',
              'Microsoft Edge',
            ),
          );
          candidates.push(
            path.join(
              base,
              d,
              'msedge-mac-arm64',
              'Microsoft Edge.app',
              'Contents',
              'MacOS',
              'Microsoft Edge',
            ),
          );
        }
        const found = firstExisting(f, candidates);
        if (found) return found;
      }

      return null;
    }

    if (platform === 'win32') {
      const lad = deps?.localAppData ?? env.LOCALAPPDATA;
      const bases: string[] = [];
      if (overrideBase) bases.push(overrideBase);
      if (lad) bases.push(path.join(lad, 'ms-playwright'));
      if (bases.length === 0) return null;

      for (const base of bases) {
        const dirs = listDirs(f, base).filter((d) => /^msedge(-|$)/i.test(d));
        const candidates: string[] = [];
        for (const d of dirs) {
          candidates.push(path.join(base, d, 'msedge.exe'));
          candidates.push(path.join(base, d, 'msedge', 'msedge.exe'));
          candidates.push(path.join(base, d, 'msedge-win64', 'msedge.exe'));
          candidates.push(path.join(base, d, 'msedge-win32', 'msedge.exe'));
        }
        const found = firstExisting(f, candidates);
        if (found) return found;
      }

      return null;
    }

    // linux and others
    const xdg = env.XDG_CACHE_HOME;
    const home = deps?.homeDir ?? env.HOME ?? '';
    const cacheBase = xdg || (home ? path.join(home, '.cache') : undefined);
    const bases: string[] = [];
    if (overrideBase) bases.push(overrideBase);
    if (cacheBase) bases.push(path.join(cacheBase, 'ms-playwright'));
    if (bases.length === 0) return null;

    for (const base of bases) {
      const dirs = listDirs(f, base).filter((d) => /^msedge(-|$)/i.test(d));
      const candidates: string[] = [];
      for (const d of dirs) {
        candidates.push(path.join(base, d, 'msedge'));
        candidates.push(path.join(base, d, 'msedge', 'msedge'));
        candidates.push(path.join(base, d, 'msedge-linux', 'msedge'));
        candidates.push(path.join(base, d, 'msedge-linux-64', 'msedge'));
      }
      const found = firstExisting(f, candidates);
      if (found) return found;
    }

    return null;
  } catch {
    return null;
  }
}

function listDirs(f: FsLike, dir: string): string[] {
  try {
    return f
      .readdirSync(dir, { withFileTypes: true } as any)
      .filter((e: any) => {
        if (!e) return false;
        const v = (e as any).isDirectory;
        return typeof v === 'function' ? v.call(e) : Boolean(v);
      })
      .map((e: any) => e.name || String(e));
  } catch {
    return [];
  }
}

function firstExisting(f: FsLike, candidates: string[]): string | null {
  for (const c of candidates) {
    try {
      if (c && f.existsSync(c)) return c;
    } catch {}
  }
  return null;
}
