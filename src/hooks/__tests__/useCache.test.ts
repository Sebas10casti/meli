import { renderHook, act } from '@testing-library/react'
import { useCache } from '../useCache'

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

describe('useCache', () => {
  const mockFetchData = jest.fn()
  const config = {
    key: 'test-key',
    timestampKey: 'test-timestamp',
    expiryTime: 1000,
    fallbackData: { name: 'fallback' },
    fetchData: mockFetchData
  }

  beforeEach(() => {
    jest.clearAllMocks()
    localStorageMock.getItem.mockReturnValue(null)
    mockFetchData.mockResolvedValue({ name: 'fresh data' })
  })

  it('initializes with null when no cache', async () => {
    const { result } = renderHook(() => useCache(config))
    
    expect(result.current.data).toBeNull()
    expect(result.current.error).toBeNull()
    
    // Wait for async effects to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })
  })

  it('has setCachedData function', async () => {
    const { result } = renderHook(() => useCache(config))
    
    expect(typeof result.current.setCachedData).toBe('function')
    
    // Wait for async effects to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })
  })

  it('has clearCache function', async () => {
    const { result } = renderHook(() => useCache(config))
    
    expect(typeof result.current.clearCache).toBe('function')
    
    // Wait for async effects to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })
  })
})