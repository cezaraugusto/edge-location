import { describe, expect, test, afterEach, vi } from 'vitest';

describe('edge-location fallbacks', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  test('macOS: strict null, fallback finds Beta', async () => {
    const scanOsxPath = (await import('../src/scan-osx-path')).default as any;
    const strict = scanOsxPath(false, {
      fs: { existsSync: (p: string) => p.includes('Microsoft Edge Beta.app') },
      userhome: () => '/Users/test/Applications',
    });
    const fallback = scanOsxPath(true, {
      fs: { existsSync: (p: string) => p.includes('Microsoft Edge Beta.app') },
      userhome: () => '/Users/test/Applications',
    });
    expect(strict).toBeNull();
    expect(fallback).toMatch(/Microsoft Edge Beta\.app/);
  });

  test('Windows: strict null, fallback finds Beta', async () => {
    const scanWindowsPath = (await import('../src/scan-windows-path'))
      .default as any;
    const strict = scanWindowsPath(false, {
      fs: { existsSync: (p: string) => p.includes('Edge Beta') },
      env: {
        LOCALAPPDATA: 'C\\Local',
        PROGRAMFILES: undefined,
        'PROGRAMFILES(X86)': undefined,
      } as any,
    });
    const fallback = scanWindowsPath(true, {
      fs: { existsSync: (p: string) => p.includes('Edge Beta') },
      env: {
        LOCALAPPDATA: 'C\\Local',
        PROGRAMFILES: undefined,
        'PROGRAMFILES(X86)': undefined,
      } as any,
    });
    expect(strict).toBeNull();
    expect(fallback).toMatch(/Edge Beta/);
  });

  test('Linux/other: strict only stable; fallback tries beta/dev', async () => {
    const scanUnknown = (await import('../src/scan-unknown-platform-path'))
      .default as any;
    const calls: string[] = [];
    const strict = scanUnknown(false, {
      which: {
        sync: (cmd: string) => {
          calls.push(cmd);
          throw new Error('nf');
        },
      },
    });
    const res = scanUnknown(true, {
      which: {
        sync: (cmd: string) => {
          calls.push(cmd);
          if (cmd === 'microsoft-edge-beta')
            return '/usr/bin/microsoft-edge-beta';
          throw new Error('nf');
        },
      },
    });
    expect(strict).toBeNull();
    if (res) expect(res).toBe('/usr/bin/microsoft-edge-beta');
    expect(calls.includes('microsoft-edge')).toBe(true);
  });

  test('macOS: returns null when nothing found', async () => {
    const scanOsxPath = (await import('../src/scan-osx-path')).default as any;
    expect(
      scanOsxPath(false, {
        fs: { existsSync: () => false },
        userhome: () => '/Users/test/Applications',
      }),
    ).toBeNull();
  });

  test('Windows: returns null when nothing found', async () => {
    const scanWindowsPath = (await import('../src/scan-windows-path'))
      .default as any;
    expect(
      scanWindowsPath(false, {
        fs: { existsSync: () => false },
        env: {
          LOCALAPPDATA: 'C\\Local',
          PROGRAMFILES: undefined,
          'PROGRAMFILES(X86)': undefined,
        } as any,
      }),
    ).toBeNull();
  });

  test('Linux/other: returns null when which finds nothing', async () => {
    const scanUnknown = (await import('../src/scan-unknown-platform-path'))
      .default as any;
    expect(
      scanUnknown(false, {
        which: {
          sync: () => {
            throw new Error('nf');
          },
        },
      }),
    ).toBeNull();
  });
});
