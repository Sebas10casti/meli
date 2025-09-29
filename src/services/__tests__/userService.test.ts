import { getUser } from '../userService'

// Mock fetch
global.fetch = jest.fn()

describe('userService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('fetches user data successfully', async () => {
    const mockUserData = { id: 1, name: 'John Doe' }
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockUserData)
    })

    const result = await getUser({ userId: '123', headers: new Headers() })

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/users/123'),
      expect.objectContaining({
        headers: expect.any(Headers),
        signal: expect.any(AbortSignal)
      })
    )
    expect(result).toEqual(mockUserData)
  })

  it('handles fetch errors', async () => {
    ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'))

    await expect(getUser({ userId: '123', headers: new Headers() }))
      .rejects.toThrow('Network error')
  })

  it('uses correct API endpoint', async () => {
    const mockUserData = { id: 1, name: 'John Doe' }
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockUserData)
    })

    await getUser({ userId: '123', headers: new Headers() })

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/users/123'),
      expect.any(Object)
    )
  })
})
