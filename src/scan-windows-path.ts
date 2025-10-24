import * as fs from 'fs';
import * as path from 'path';
import * as process from 'process';

const { env } = process;

type FsLike = { existsSync: (path: string) => boolean };
type Deps = { fs?: FsLike; env?: NodeJS.ProcessEnv };

export default function scanWindowsPath(deps?: Deps) {
  const f: FsLike = deps?.fs ?? fs;
  const e = deps?.env ?? env;
  const prefixes = [
    e.LOCALAPPDATA,
    e.PROGRAMFILES,
    e['PROGRAMFILES(X86)'],
  ].filter(Boolean);

  const suffixes = [
    '\\Microsoft\\Edge\\Application\\msedge.exe',
    '\\Microsoft\\Edge Beta\\Application\\msedge.exe',
    '\\Microsoft\\Edge Dev\\Application\\msedge.exe',
    '\\Microsoft\\Edge SxS\\Application\\msedge.exe', // Canary
  ];

  for (const prefix of prefixes) {
    for (const suffix of suffixes) {
      const exe = path.join(prefix as string, suffix);
      if (f.existsSync(exe)) return exe;
    }
  }

  return null;
}
