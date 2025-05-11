import fs from 'node:fs';
// @ts-expect-error userhome is not typed
import userhome from 'userhome';

export default function scanOsxPath() {
  const defaultPath =
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge';
  const alternativePath = userhome(defaultPath.slice(1));

  if (fs.existsSync(defaultPath)) return defaultPath;

  return alternativePath;
}
