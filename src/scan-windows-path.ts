import * as fs from 'fs';
import * as path from 'path';
import * as process from 'process';

const { env } = process;

export default function scanWindowsPath() {
  let browserPath = null;

  const prefixes = [
    env.LOCALAPPDATA,
    env.PROGRAMFILES,
    env['PROGRAMFILES(X86)'],
  ];

  const suffix = '\\Microsoft\\Edge\\Application\\msedge.exe';

  for (const prefix of prefixes) {
    if (!prefix) continue;

    const exe = path.join(prefix, suffix);

    if (fs.existsSync(exe)) {
      browserPath = exe;
      break;
    }
  }

  return browserPath;
}
