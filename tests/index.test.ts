import {expect, test, describe} from 'vitest'

import edgeLocation from '../src/index'

describe('edge-location module', () => {
  it('returns a string path', () => {
    expect(typeof edgeLocation()).toBe('string')
  })

  it('returns a valid path that exists', () => {
    const location = edgeLocation()

    expect(location).toBeTruthy()
  })
})
