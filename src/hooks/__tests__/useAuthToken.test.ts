import { renderHook, act } from '@testing-library/react'
import { useAuthToken } from '../useAuthToken'

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

describe('useAuthToken', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    localStorageMock.getItem.mockReturnValue(null)
  })

  it('initializes with no token', () => {
    const { result } = renderHook(() => useAuthToken())
    
    expect(result.current.token).toBeNull()
    expect(result.current.hasValidToken()).toBe(false)
  })

  it('sets token from query parameter', () => {
    const { result } = renderHook(() => useAuthToken())
    
    act(() => {
      result.current.setTokenFromQuery('test-token')
    })
    
    expect(result.current.token).toBe('test-token')
    expect(result.current.hasValidToken()).toBe(true)
  })

  it('returns correct auth headers when token exists', () => {
    const { result } = renderHook(() => useAuthToken())
    
    act(() => {
      result.current.setTokenFromQuery('test-token')
    })
    
    const headers = result.current.getAuthHeaders()
    
    expect(headers).toEqual({
      'Authorization': 'Bearer test-token',
      'Content-Type': 'application/json',
    })
  })
})