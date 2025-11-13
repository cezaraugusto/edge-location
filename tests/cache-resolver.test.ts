import { describe, expect, test } from 'vitest';
import { resolveFromPlaywrightCache } from '../src/resolve-playwright-cache';

const makeFs = (entries: Record<string, 'file' | 'dir'>) => {
  return {
    existsSync: (p: string) => Boolean(entries[p]),
    readdirSync: (p: string) => {
      const prefix = p.endsWith('/') ? p : p + '/';
      const names = Object.keys(entries)
        .filter((k) => k.startsWith(prefix))
        .map((k) => k.slice(prefix.length).split('/')[0]);
      const unique = Array.from(new Set(names));
      return unique.map((name) => ({ name, isDirectory: true })) as any;
    },
  };
};

describe('resolveFromPlaywrightCache', () => {
  test('macOS resolves Edge binary', () => {
    const home = '/Users/alice';
    const base = `${home}/Library/Caches/ms-playwright/msedge-123`;
    const bin = `${base}/Microsoft Edge.app/Contents/MacOS/Microsoft Edge`;
    const fs = makeFs({
      [`${home}/Library/Caches/ms-playwright`]: 'dir',
      [`${base}`]: 'dir',
      [bin]: 'file',
    });
    const out = resolveFromPlaywrightCache({
      fs,
      env: { HOME: home } as any,
      platform: 'darwin',
    });
    expect(out).toBe(bin);
  });

  test('Linux resolves Edge binary', () => {
    const home = '/home/alice';
    const base = `${home}/.cache/ms-playwright/msedge-123`;
    const bin = `${base}/msedge`;
    const fs = makeFs({
      [`${home}/.cache/ms-playwright`]: 'dir',
      [`${base}`]: 'dir',
      [bin]: 'file',
    });
    const out = resolveFromPlaywrightCache({
      fs,
      env: { HOME: home } as any,
      platform: 'linux',
    });
    expect(out).toBe(bin);
  });

  test('Windows resolves Edge binary (win64 preferred)', () => {
    const lad = 'C:/Users/Alice/AppData/Local';
    const base = `${lad}/ms-playwright/msedge-123`;
    const bin64 = `${base}/msedge-win64/msedge.exe`;
    const fs = makeFs({
      [`${lad}/ms-playwright`]: 'dir',
      [`${base}`]: 'dir',
      [bin64]: 'file',
    });
    const out = resolveFromPlaywrightCache({
      fs,
      env: {} as any,
      platform: 'win32',
      localAppData: lad,
    } as any);
    expect(out).toBe(bin64);
  });
});
