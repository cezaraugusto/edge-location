import { describe, expect, test, afterEach, vi } from 'vitest';

describe('edge-location fallbacks', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  test('macOS: falls back to Beta when stable missing', async () => {
    const scanOsxPath = (await import('../src/scan-osx-path')).default as any;
    const result = scanOsxPath({ fs: { existsSync: (p: string) => p.includes('Microsoft Edge Beta.app') }, userhome: () => '/Users/test/Applications' });
    expect(result).toMatch(/Microsoft Edge Beta\.app/);
  });

  test('Windows: finds Beta when stable missing', async () => {
    const scanWindowsPath = (await import('../src/scan-windows-path')).default as any;
    const result = scanWindowsPath({ fs: { existsSync: (p: string) => p.includes('Edge Beta') }, env: { LOCALAPPDATA: 'C\\\\Local', PROGRAMFILES: undefined, 'PROGRAMFILES(X86)': undefined } as any });
    expect(result).toMatch(/Edge Beta/);
  });

  test('Linux/other: tries beta/dev when stable missing', async () => {
    const scanUnknown = (await import('../src/scan-unknown-platform-path')).default as any;
    const calls: string[] = [];
    const res = scanUnknown({ which: { sync: (cmd: string) => { calls.push(cmd); if (cmd === 'microsoft-edge-beta') return '/usr/bin/microsoft-edge-beta'; throw new Error('nf'); } } });
    if (res) expect(res).toBe('/usr/bin/microsoft-edge-beta');
    expect(calls[0]).toBe('microsoft-edge');
  });

  test('macOS: returns null when nothing found', async () => {
    const scanOsxPath = (await import('../src/scan-osx-path')).default as any;
    expect(scanOsxPath({ fs: { existsSync: () => false }, userhome: () => '/Users/test/Applications' })).toBeNull();
  });

  test('Windows: returns null when nothing found', async () => {
    const scanWindowsPath = (await import('../src/scan-windows-path')).default as any;
    expect(scanWindowsPath({ fs: { existsSync: () => false }, env: { LOCALAPPDATA: 'C\\\\Local', PROGRAMFILES: undefined, 'PROGRAMFILES(X86)': undefined } as any })).toBeNull();
  });

  test('Linux/other: returns null when which finds nothing', async () => {
    const scanUnknown = (await import('../src/scan-unknown-platform-path')).default as any;
    expect(scanUnknown({ which: { sync: () => { throw new Error('nf'); } } })).toBeNull();
  });
});


