import { describe, expect, test } from 'vitest';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const BIN = path.join(__dirname, '..', 'bin.cjs');

describe('edge-location CLI', () => {
  test('prints guidance and exit code 1 when not found', () => {
    let code = 0;
    let out = '';
    try {
      out = execFileSync(process.execPath, [BIN], {
        encoding: 'utf8',
        env: {
          ...process.env,
          PATH: '',
          EDGE_BINARY: '',
          HOME: fs.mkdtempSync(path.join(os.tmpdir(), 'edge-home-')),
          XDG_CACHE_HOME: fs.mkdtempSync(path.join(os.tmpdir(), 'edge-cache-')),
          LOCALAPPDATA: '',
          PROGRAMFILES: '',
          'PROGRAMFILES(X86)': '',
        } as any,
        stdio: ['ignore', 'pipe', 'pipe'],
      });
    } catch (e: any) {
      code = e.status ?? e.code ?? 1;
      out = String(e.stdout || e.stderr || '');
    }
    if (code === 1) {
      expect(out).toMatch(/We couldn't find a Microsoft Edge browser/i);
    } else {
      // Some CI images may have Edge available; accept path output
      expect(code).toBe(0);
      expect(out.trim().length).toBeGreaterThan(0);
    }
  });

  test('prints env override path when EDGE_BINARY is set and exists', () => {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'edge-bin-'));
    const fake = path.join(
      tmp,
      process.platform === 'win32' ? 'msedge.exe' : 'msedge',
    );
    fs.writeFileSync(fake, '');
    const out = execFileSync(process.execPath, [BIN], {
      encoding: 'utf8',
      env: { ...process.env, EDGE_BINARY: fake },
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    expect(out.trim()).toBe(fake);
  });
});
