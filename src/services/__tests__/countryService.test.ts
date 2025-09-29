import { describe, it, expect, beforeEach, vi } from 'vitest'
import getCountries from '../countryService'

// Mock fetch
global.fetch = vi.fn()

describe('countryService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fetches countries data successfully', async () => {
    const mockCountriesData = { countries: [{ id: 'US', name: 'United States' }] }
    ;(global.fetch as vi.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      json: () => Promise.resolve(mockCountriesData)
    } as Response)

    const result = await getCountries(new Headers())

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/classified_locations/countries'),
      expect.objectContaining({
        headers: expect.any(Headers),
        signal: expect.any(AbortSignal)
      })
    )
    expect(result).toEqual(mockCountriesData)
  })

  it('handles fetch errors', async () => {
    ;(global.fetch as vi.MockedFunction<typeof fetch>).mockRejectedValueOnce(new Error('Network error'))

    await expect(getCountries(new Headers()))
      .rejects.toThrow('Network error')
  })

  it('uses correct API endpoint', async () => {
    const mockCountriesData = { countries: [] }
    ;(global.fetch as vi.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      json: () => Promise.resolve(mockCountriesData)
    } as Response)

    await getCountries(new Headers())

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/classified_locations/countries'),
      expect.any(Object)
    )
  })
})
