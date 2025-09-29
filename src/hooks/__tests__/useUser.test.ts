import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useUser } from '../useUser'

// Mock dependencies
vi.mock('../useAuthToken', () => ({
  useAuthToken: () => ({
    getAuthHeaders: vi.fn(() => ({ 'Authorization': 'Bearer token' })),
    hasValidToken: vi.fn(() => true)
  })
}))

vi.mock('../useCache', () => ({
  useCache: vi.fn(() => ({
    data: { first_name: 'John', last_name: 'Doe', address: { address: '123 Main St', city: 'City', state: 'State' } },
    isLoading: false,
    error: null
  }))
}))

vi.mock('../../services/userService', () => ({
  getUser: vi.fn()
}))

describe('useUser Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns user data and loading state', () => {
    const { result } = renderHook(() => useUser('123'))
    
    expect(result.current.userData).toBeDefined()
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBeNull()
  })

  it('provides getFullName helper function', () => {
    const { result } = renderHook(() => useUser('123'))
    
    const fullName = result.current.getFullName()
    expect(fullName).toBe('John Doe')
  })

  it('provides getFullAddress helper function', () => {
    const { result } = renderHook(() => useUser('123'))
    
    const fullAddress = result.current.getFullAddress()
    expect(fullAddress).toBe('123 Main St, City, State')
  })
})
