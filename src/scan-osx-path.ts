import fs from 'node:fs';
// @ts-expect-error userhome is not typed
import userhome from 'userhome';

type FsLike = { existsSync: (path: string) => boolean };
type Deps = { fs?: FsLike; userhome?: (path: string) => string };

export default function scanOsxPath(allowFallback = false, deps?: Deps) {
  const f: FsLike = deps?.fs ?? fs;
  const uh = deps?.userhome ?? userhome;
  const apps = [
    { app: 'Microsoft Edge.app', exec: 'Microsoft Edge' },
    { app: 'Microsoft Edge Beta.app', exec: 'Microsoft Edge Beta' },
    { app: 'Microsoft Edge Dev.app', exec: 'Microsoft Edge Dev' },
    { app: 'Microsoft Edge Canary.app', exec: 'Microsoft Edge Canary' },
  ];

  const systemBase = '/Applications';
  const userBase = uh('Applications');

  const channels = allowFallback ? apps : [apps[0]];

  for (const { app, exec } of channels) {
    const systemPath = `${systemBase}/${app}/Contents/MacOS/${exec}`;
    if (f.existsSync(systemPath)) return systemPath;

    const userPath = `${userBase}/${app}/Contents/MacOS/${exec}`;
    if (f.existsSync(userPath)) return userPath;
  }

  return null;
}
