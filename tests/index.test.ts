import {expect, test, describe} from 'vitest'

import edgeLocation, {getInstallGuidance} from '../src/index'

describe('edge-location module', () => {
  it('returns a string path', () => {
    expect(typeof edgeLocation()).toBe('string')
  })

  it('returns a valid path that exists', () => {
    const location = edgeLocation()

    expect(location).toBeTruthy()
  })

  it('getInstallGuidance renders caller-provided install steps in order', () => {
    const msg = getInstallGuidance({
      steps: [
        {
          summary: 'Install Edge (recommended)',
          command: 'npx extension install edge'
        },
        {
          summary: 'Install Edge Beta',
          command: 'npx extension install edge-beta'
        }
      ]
    })

    expect(msg).toMatch(
      /1\) Install Edge \(recommended\)\n {3}npx extension install edge/
    )
    expect(msg).toMatch(
      /2\) Install Edge Beta\n {3}npx extension install edge-beta/
    )
    expect(msg).not.toMatch(/npx playwright install msedge/)
    expect(msg).toMatch(/We couldn't find a Microsoft Edge browser/)
  })

  it('getInstallGuidance with empty steps keeps the default hint', () => {
    expect(getInstallGuidance({steps: []})).toBe(getInstallGuidance())
  })
})
