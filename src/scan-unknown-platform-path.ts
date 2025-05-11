import which from 'which';

export default function scanUnknownPlatform() {
  let browserPath = null;

  try {
    browserPath = which.sync('microsoft-edge');
  } catch (err) {
    browserPath = null;
  }

  return browserPath;
}
