import { describe, it, expect } from 'vitest'
import { delay } from '../utils'

describe('utils', () => {
  it('delay function resolves after specified time', async () => {
    const start = Date.now()
    await delay(100)
    const end = Date.now()
    
    expect(end - start).toBeGreaterThanOrEqual(90) // Allow some margin
  })

  it('delay function returns a promise', () => {
    const result = delay(10)
    expect(result).toBeInstanceOf(Promise)
  })

  it('delay function with zero milliseconds', async () => {
    const start = Date.now()
    await delay(0)
    const end = Date.now()
    
    expect(end - start).toBeLessThan(10) // Should be very fast
  })
})
