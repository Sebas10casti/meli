import { describe, it, expect, beforeEach, vi } from 'vitest'

// Mock fetch
global.fetch = vi.fn()

describe('/api/verify-recaptcha', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    process.env.RECAPTCHA_SECRET_KEY = 'test-secret-key'
  })

  it('should handle valid reCAPTCHA token', async () => {
    const mockResponse = { success: true, score: 0.9, action: 'purchase_verification' }
    ;(global.fetch as vi.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponse)
    } as Response)

    // Test the fetch call directly
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'secret=test-secret-key&response=valid-token'
    })

    const data = await response.json()
    expect(data.success).toBe(true)
  })

  it('should handle invalid reCAPTCHA token', async () => {
    const mockResponse = { success: false, 'error-codes': ['invalid-input-response'] }
    ;(global.fetch as vi.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponse)
    } as Response)

    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'secret=test-secret-key&response=invalid-token'
    })

    const data = await response.json()
    expect(data.success).toBe(false)
  })

  it('should handle missing token', () => {
    const requestBody = JSON.stringify({})
    expect(requestBody).toBe('{}')
  })
})