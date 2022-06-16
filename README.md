[action-image]: https://github.com/cezaraugusto/edge-location/workflows/CI/badge.svg
[action-url]: https://github.com/cezaraugusto/edge-location/actions?query=workflow%3ACI
[npm-image]: https://img.shields.io/npm/v/edge-location.svg
[npm-url]: https://npmjs.org/package/edge-location

# edge-location [![workflow][action-image]][action-url] [![npm][npm-image]][npm-url]

> Approximates the current location of the Edge browser across platforms.

# Usage

**Via Node.js:**

```js
// Returns the path to edge as a string.
const braveLocation = require('edge-location')

console.log(braveLocation())
// /Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge
```

**Via CLI:**

```bash
> npx edge-location
# /Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge
```

## Related projects

* [chrome-location](https://github.com/hughsk/chrome-location/pulls)
* [chrome-location2](https://github.com/cezaraugusto/chrome-location2) (like Chromium location with fallback support to Chromium)
* [firefox-location](https://github.com/hughsk/firefox-location/pulls)
* [vivaldi-location](https://github.com/jandrey/vivaldi-location)
* [opera-location](https://github.com/jandrey/opera-location)

## License

MIT (c) Cezar Augusto.
