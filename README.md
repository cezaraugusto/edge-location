[npm-image]: https://img.shields.io/npm/v/edge-location.svg
[npm-url]: https://npmjs.org/package/edge-location
[action-image]: https://github.com/cezaraugusto/edge-location/workflows/CI/badge.svg
[action-url]: https://github.com/cezaraugusto/edge-location/actions?query=workflow%3ACI
[downloads-image]: https://img.shields.io/npm/dm/edge-location.svg
[downloads-url]: https://npmjs.org/package/edge-location

# edge-location [![npm][npm-image]][npm-url] [![workflow][action-image]][action-url] [![downloads][downloads-image]][downloads-url] 

> Approximates the current location of the Edge browser across platforms.

# Usage

**Via Node.js:**

```js
// ESM
import edgeLocation from 'edge-location'

// Returns the path to Edge as a string
console.log(edgeLocation)
// /Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge

// CommonJS
const edgeLocation = require('edge-location')
```

## Supported Platforms

- macOS (darwin)
- Windows (win32)
- Linux (default fallback)

## Related projects

* [chrome-location](https://github.com/hughsk/chrome-location)
* [chrome-location2](https://github.com/cezaraugusto/chrome-location2) (like `chromium-location` with fallback support to Chromium)
* [firefox-location](https://github.com/hughsk/firefox-location)
* [brave-location](https://github.com/cezaraugusto/brave-location)
* [vivaldi-location](https://github.com/jandrey/vivaldi-location)
* [opera-location](https://github.com/jandrey/opera-location)

## License

MIT (c) Cezar Augusto.
