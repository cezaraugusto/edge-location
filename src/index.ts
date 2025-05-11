import scanOsxPath from './scan-osx-path';
import scanWindowsPath from './scan-windows-path';
import scanUnknownPlatformPath from './scan-unknown-platform-path';

export default function locateEdge() {
  switch (process.platform) {
    case 'darwin':
      return scanOsxPath();
    case 'win32':
      return scanWindowsPath();
    default:
      return scanUnknownPlatformPath();
  }
}
