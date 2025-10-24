[npm-version-image]: https://img.shields.io/npm/v/edge-location.svg?color=0078D7
[npm-version-url]: https://www.npmjs.com/package/edge-location
[npm-downloads-image]: https://img.shields.io/npm/dm/edge-location.svg?color=2ecc40
[npm-downloads-url]: https://www.npmjs.com/package/edge-location
[action-image]: https://github.com/cezaraugusto/edge-location/actions/workflows/ci.yml/badge.svg?branch=main
[action-url]: https://github.com/cezaraugusto/edge-location/actions

> Approximates the current location of the Edge browser across platforms.

# edge-location [![Version][npm-version-image]][npm-version-url] [![Downloads][npm-downloads-image]][npm-downloads-url] [![workflow][action-image]][action-url]

<img alt="Edge" align="right" src="https://cdn.jsdelivr.net/gh/extension-js/media@db5deb23fbfa85530f8146718812972998e13a4d/browser_logos/svg/edge.svg" width="10.5%" />

* Finds Edge in the following channel order: `stable` / `beta` / `dev` / `canary`.
* Supports macOS / Windows / Linux
* Works both as an ES module or CommonJS

## Support table

This table lists the default locations where Edge is typically installed for each supported platform and channel. The package checks these paths (in order) and returns the first one found. 

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

Returns the first existing path found, or <code>null</code> if none are found.

## Usage

**Via Node.js:**

```js
import edgeLocation from "edge-location";

console.log(edgeLocation());
// /Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge
```

**Via CLI:**

```bash
npx edge-location
# /Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge
```

## Related projects

* [chrome-location](https://github.com/hughsk/chrome-location)
* [chrome-location2](https://github.com/cezaraugusto/chrome-location2) (like `chromium-location` with fallback support to Chromium)
* [firefox-location](https://github.com/hughsk/firefox-location)
* [brave-location](https://github.com/cezaraugusto/brave-location)
* [vivaldi-location](https://github.com/jandrey/vivaldi-location)
* [opera-location](https://github.com/jandrey/opera-location)

## License

MIT (c) Cezar Augusto.
