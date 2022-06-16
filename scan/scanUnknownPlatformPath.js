const which = require('which');

module.exports = function scanUnknownPlatform () {
  let browserPath = null

  try {
    browserPath = which.sync('microsoft-edge');
  } catch (err) {
    browserPath = null;
  }

  return browserPath
}
