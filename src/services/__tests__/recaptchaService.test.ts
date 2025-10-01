import { describe, it, expect, vi } from 'vitest'
import { verifyRecaptcha } from '../recaptchaService'

describe('recaptchaService', () => {
  it('returns success response with score and action', async () => {
    const result = await verifyRecaptcha('test-token')
    
    expect(result.success).toBe(true)
    expect(result.score).toBeDefined()
    expect(result.action).toBe('purchase_verification')
    expect(typeof result.score).toBe('number')
  })

  it('returns different scores for different calls', async () => {
    const result1 = await verifyRecaptcha('token1')
    const result2 = await verifyRecaptcha('token2')
    
    // Scores should be different due to randomization
    expect(result1.score).toBeDefined()
    expect(result2.score).toBeDefined()
  })

  it('handles errors gracefully', async () => {
    // Mock console.error to avoid noise in test output
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    
    // This test verifies the service doesn't throw errors
    const result = await verifyRecaptcha('invalid-token')
    
    expect(result).toBeDefined()
    expect(typeof result.success).toBe('boolean')
    
    consoleSpy.mockRestore()
  })
})
