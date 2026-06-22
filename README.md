[npm-version-image]: https://img.shields.io/npm/v/edge-location.svg?color=0971fe
[npm-version-url]: https://www.npmjs.com/package/edge-location
[npm-downloads-image]: https://img.shields.io/npm/dm/edge-location.svg?color=2ecc40
[npm-downloads-url]: https://www.npmjs.com/package/edge-location
[action-image]: https://github.com/cezaraugusto/edge-location/actions/workflows/ci.yml/badge.svg?branch=main
[action-url]: https://github.com/cezaraugusto/edge-location/actions
[npm-provenance-image]: https://img.shields.io/badge/provenance-verified-0971fe?logo=npm&logoColor=white
[npm-provenance-url]: https://www.npmjs.com/package/edge-location

> Approximates the current location of the Edge browser across platforms.

# edge-location [![Version][npm-version-image]][npm-version-url] [![Downloads][npm-downloads-image]][npm-downloads-url] [![workflow][action-image]][action-url] [![Provenance][npm-provenance-image]][npm-provenance-url]

<img alt="Edge" align="right" src="https://cdn.jsdelivr.net/gh/extension-js/media@db5deb23fbfa85530f8146718812972998e13a4d/browser_logos/svg/edge.svg" width="10.5%" />

- By default checks only `stable`. Optionally can cascade to `beta` / `dev` / `canary`.
- Supports macOS / Windows / Linux
- Works both as an ES module or CommonJS

## Installation

```bash
npm i edge-location
```

## Usage

**Via Node.js (strict by default):**

```js
import edgeLocation from 'edge-location'

// Strict (Stable only)
console.log(edgeLocation())
// => "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge" or null

// Enable fallback (Stable / Beta / Dev / Canary)
console.log(edgeLocation(true))
// => first found among Stable/Beta/Dev/Canary or null

// Throw with an install guide when not found
import {locateEdgeOrExplain, getInstallGuidance} from 'edge-location'
try {
  const path = locateEdgeOrExplain({allowFallback: true})
  console.log(path)
} catch (e) {
  console.error(String(e))
  // Or print getInstallGuidance() explicitly
}
```

**CommonJS:**

```js
const api = require('edge-location')
const locateEdge = api.default || api
```

**Via CLI:**

```bash
npx edge-location
# Strict (Stable only)

npx edge-location --fallback
# Enable cascade (Stable / Beta / Dev / Canary)

# Respect environment overrides
EDGE_BINARY=/custom/path/to/msedge npx edge-location

# If not found, install Edge via Playwright and re-run
npx playwright install msedge
```

### Environment overrides

If this environment variable is set and points to an existing binary, it takes precedence:

- `EDGE_BINARY`

### When nothing is found

When nothing is found, the helper throws with this message:

```
We couldn't find a Microsoft Edge browser on this machine.

To install one:

1) Install Edge via Playwright (recommended for CI/dev)
   npx playwright install msedge

Re-run your command afterward and it will be detected automatically.

Alternatively, install Microsoft Edge from the official site and re-run.
```

## Support table

By default, only the Stable channel is checked. When fallback is enabled, Beta, Dev, and Canary are also checked (in that order) and the first existing path is returned.

<details>
<summary>Default locations checked per platform and channel</summary>

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

</details>

Returns the first existing path found (given selected channels), or <code>null</code> if none are found.

## API

- `default export locateEdge(allowFallback?: boolean): string | null`
  - Returns the first existing path among the selected channels or `null`.
  - When `allowFallback` is `true`, checks Stable → Beta → Dev → Canary.

- `locateEdgeOrExplain(options?: boolean | { allowFallback?: boolean }): string`
  - Returns a path if found, otherwise throws an `Error` with a friendly installation guide.

- `getEdgeVersion(bin: string, opts?: { allowExec?: boolean }): string | null`
  - Cross-platform version resolver that does not execute the browser by default.
  - Windows: reads PE file metadata via PowerShell (no GUI spawn).
  - macOS: reads `Info.plist` (no GUI spawn).
  - Linux/other: returns `null` unless `allowExec` is `true`, then tries `--version`.

- `getInstallGuidance(): string`
  - Returns the same guidance text used by `locateEdgeOrExplain()`.

## Related projects

- [brave-location](https://github.com/cezaraugusto/brave-location)
- [chrome-location2](https://github.com/cezaraugusto/chrome-location2)
- [chromium-location](https://github.com/cezaraugusto/chromium-location)
- [firefox-location2](https://github.com/cezaraugusto/firefox-location2)
- [safari-location2](https://github.com/cezaraugusto/safari-location2)
- [opera-location2](https://github.com/cezaraugusto/opera-location2)
- [vivaldi-location2](https://github.com/cezaraugusto/vivaldi-location2)
- [waterfox-location](https://github.com/cezaraugusto/waterfox-location)
- [librewolf-location](https://github.com/cezaraugusto/librewolf-location)
- [yandex-location](https://github.com/cezaraugusto/yandex-location)

## License

MIT (c) Cezar Augusto.
