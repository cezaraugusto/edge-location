[npm-version-image]: https://img.shields.io/npm/v/edge-location.svg?color=0078D7
[npm-version-url]: https://www.npmjs.com/package/edge-location
[npm-downloads-image]: https://img.shields.io/npm/dm/edge-location.svg?color=2ecc40
[npm-downloads-url]: https://www.npmjs.com/package/edge-location
[action-image]: https://github.com/cezaraugusto/edge-location/actions/workflows/ci.yml/badge.svg?branch=main
[action-url]: https://github.com/cezaraugusto/edge-location/actions

> Approximates the current location of the Edge browser across platforms.

# edge-location [![Version][npm-version-image]][npm-version-url] [![Downloads][npm-downloads-image]][npm-downloads-url] [![workflow][action-image]][action-url]

<img alt="Edge" align="right" src="https://cdn.jsdelivr.net/gh/extension-js/media@db5deb23fbfa85530f8146718812972998e13a4d/browser_logos/svg/edge.svg" width="10.5%" />

* By default checks only `stable`. Optionally can cascade to `beta` / `dev` / `canary`.
* Supports macOS / Windows / Linux
* Works both as an ES module or CommonJS

## Support table

This table lists the default locations where Edge is typically installed for each supported platform and channel. By default, only the Stable channel is checked. When fallback is enabled, the package checks these paths (in order) and returns the first one found.

<table>
  <thead>
    <tr>
      <th>Platform</th>
      <th>Channel</th>
      <th>Paths checked</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="4" align="center"><img alt="" width="64" height="64" src="https://cdn.jsdelivr.net/gh/extension-js/media@db5deb23fbfa85530f8146718812972998e13a4d/platform_logos/macos.png" /><br><strong>macOS</strong></td>
      <td align="center">Edge (Stable)</td>
      <td>
        <ul>
          <li><code>/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge</code></li>
          <li><code>~/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge</code></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td align="center">Edge Beta</td>
      <td>
        <ul>
          <li><code>/Applications/Microsoft Edge Beta.app/Contents/MacOS/Microsoft Edge Beta</code></li>
          <li><code>~/Applications/Microsoft Edge Beta.app/Contents/MacOS/Microsoft Edge Beta</code></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td align="center">Edge Dev</td>
      <td>
        <ul>
          <li><code>/Applications/Microsoft Edge Dev.app/Contents/MacOS/Microsoft Edge Dev</code></li>
          <li><code>~/Applications/Microsoft Edge Dev.app/Contents/MacOS/Microsoft Edge Dev</code></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td align="center">Edge Canary</td>
      <td>
        <ul>
          <li><code>/Applications/Microsoft Edge Canary.app/Contents/MacOS/Microsoft Edge Canary</code></li>
          <li><code>~/Applications/Microsoft Edge Canary.app/Contents/MacOS/Microsoft Edge Canary</code></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td rowspan="4" align="center"><img alt="" width="64" height="64" src="https://cdn.jsdelivr.net/gh/extension-js/media@db5deb23fbfa85530f8146718812972998e13a4d/platform_logos/windows.png" /><br><strong>Windows</strong></td>
      <td align="center">Edge (Stable)</td>
      <td>
        <ul>
          <li><code>%LOCALAPPDATA%\\Microsoft\\Edge\\Application\\msedge.exe</code></li>
          <li><code>%PROGRAMFILES%\\Microsoft\\Edge\\Application\\msedge.exe</code></li>
          <li><code>%PROGRAMFILES(X86)%\\Microsoft\\Edge\\Application\\msedge.exe</code></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td align="center">Edge Beta</td>
      <td>
        <ul>
          <li><code>%LOCALAPPDATA%\\Microsoft\\Edge Beta\\Application\\msedge.exe</code></li>
          <li><code>%PROGRAMFILES%\\Microsoft\\Edge Beta\\Application\\msedge.exe</code></li>
          <li><code>%PROGRAMFILES(X86)%\\Microsoft\\Edge Beta\\Application\\msedge.exe</code></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td align="center">Edge Dev</td>
      <td>
        <ul>
          <li><code>%LOCALAPPDATA%\\Microsoft\\Edge Dev\\Application\\msedge.exe</code></li>
          <li><code>%PROGRAMFILES%\\Microsoft\\Edge Dev\\Application\\msedge.exe</code></li>
          <li><code>%PROGRAMFILES(X86)%\\Microsoft\\Edge Dev\\Application\\msedge.exe</code></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td align="center">Edge Canary</td>
      <td>
        <ul>
          <li><code>%LOCALAPPDATA%\\Microsoft\\Edge SxS\\Application\\msedge.exe</code></li>
          <li><code>%PROGRAMFILES%\\Microsoft\\Edge SxS\\Application\\msedge.exe</code></li>
          <li><code>%PROGRAMFILES(X86)%\\Microsoft\\Edge SxS\\Application\\msedge.exe</code></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td rowspan="4" align="center"><img alt="" width="64" height="64" src="https://cdn.jsdelivr.net/gh/extension-js/media@db5deb23fbfa85530f8146718812972998e13a4d/platform_logos/linux.png" /><br><strong>Linux/other</strong></td>
      <td align="center">Edge (Stable)</td>
      <td>
        <ul>
          <li><code>microsoft-edge</code> (on <code>$PATH</code>)</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td align="center">Edge Beta</td>
      <td>
        <ul>
          <li><code>microsoft-edge-beta</code> (on <code>$PATH</code>)</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td align="center">Edge Dev</td>
      <td>
        <ul>
          <li><code>microsoft-edge-dev</code> (on <code>$PATH</code>)</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td align="center">Edge Canary</td>
      <td>
        <ul>
          <li><code>microsoft-edge-canary</code> (on <code>$PATH</code>)</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

Returns the first existing path found (given selected channels), or <code>null</code> if none are found.

## Usage

**Via Node.js (strict by default):**

```js
import edgeLocation from "edge-location";

// Strict (Stable only)
console.log(edgeLocation());
// => "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge" or null

// Enable fallback (Stable / Beta / Dev / Canary)
console.log(edgeLocation(true));
// => first found among Stable/Beta/Dev/Canary or null
```

**Via CLI:**

```bash
npx edge-location
# Strict (Stable only)

npx edge-location --fallback
# Enable cascade (Stable / Beta / Dev / Canary)
```

## Related projects

* [brave-location](https://github.com/cezaraugusto/brave-location)
* [chrome-location2](https://github.com/cezaraugusto/chrome-location2)
* [firefox-location2](https://github.com/cezaraugusto/firefox-location2)
* [opera-location2](https://github.com/cezaraugusto/opera-location2)
* [vivaldi-location2](https://github.com/cezaraugusto/vivaldi-location2)
* [yandex-location2](https://github.com/cezaraugusto/yandex-location2)

## License

MIT (c) Cezar Augusto.
