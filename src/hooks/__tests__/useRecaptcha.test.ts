import { renderHook, act } from '@testing-library/react'
import { useRecaptcha } from '../useRecaptcha'

// Mock fetch
global.fetch = jest.fn()

describe('useRecaptcha', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('initializes with default values', () => {
    const { result } = renderHook(() => useRecaptcha())
    
    expect(result.current.isVerified).toBe(false)
    expect(result.current.token).toBeNull()
    expect(result.current.error).toBeNull()
    expect(result.current.isLoading).toBe(false)
  })

  it('handles successful verification', async () => {
    const mockResponse = { success: true }
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponse)
    })
    
    const { result } = renderHook(() => useRecaptcha())
    
    await act(async () => {
      await result.current.verify('test-token')
    })
    
    expect(result.current.isVerified).toBe(true)
    expect(result.current.token).toBe('test-token')
    expect(result.current.error).toBeNull()
  })

  it('handles verification failure', async () => {
    const mockResponse = { success: false, error: 'Invalid token' }
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponse)
    })
    
    const { result } = renderHook(() => useRecaptcha())
    
    await act(async () => {
      await result.current.verify('invalid-token')
    })
    
    expect(result.current.isVerified).toBe(false)
    expect(result.current.error).toBe('Invalid token')
  })
})