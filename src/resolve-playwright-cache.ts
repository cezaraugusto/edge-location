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
    if (platform === 'darwin') {
      const home = deps?.homeDir ?? env.HOME ?? '';
      if (!home) return null;
      const base = path.join(home, 'Library', 'Caches', 'ms-playwright');
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
      return firstExisting(f, candidates);
    }

    if (platform === 'win32') {
      const lad = deps?.localAppData ?? env.LOCALAPPDATA;
      if (!lad) return null;
      const base = path.join(lad, 'ms-playwright');
      const dirs = listDirs(f, base).filter((d) => /^msedge(-|$)/i.test(d));
      const candidates: string[] = [];
      for (const d of dirs) {
        candidates.push(path.join(base, d, 'msedge.exe'));
        candidates.push(path.join(base, d, 'msedge', 'msedge.exe'));
        candidates.push(path.join(base, d, 'msedge-win64', 'msedge.exe'));
        candidates.push(path.join(base, d, 'msedge-win32', 'msedge.exe'));
      }
      return firstExisting(f, candidates);
    }

    // linux and others
    const xdg = env.XDG_CACHE_HOME;
    const home = deps?.homeDir ?? env.HOME ?? '';
    const cacheBase = xdg || (home ? path.join(home, '.cache') : undefined);
    if (!cacheBase) return null;
    const base = path.join(cacheBase, 'ms-playwright');
    const dirs = listDirs(f, base).filter((d) => /^msedge(-|$)/i.test(d));
    const candidates: string[] = [];
    for (const d of dirs) {
      candidates.push(path.join(base, d, 'msedge'));
      candidates.push(path.join(base, d, 'msedge', 'msedge'));
      candidates.push(path.join(base, d, 'msedge-linux', 'msedge'));
      candidates.push(path.join(base, d, 'msedge-linux-64', 'msedge'));
    }
    return firstExisting(f, candidates);
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
