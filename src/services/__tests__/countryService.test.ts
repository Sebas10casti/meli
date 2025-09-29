import getCountries from '../countryService'

// Mock fetch
global.fetch = jest.fn()

describe('countryService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('fetches countries data successfully', async () => {
    const mockCountriesData = { countries: [{ id: 'US', name: 'United States' }] }
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockCountriesData)
    })

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
    ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'))

    await expect(getCountries(new Headers()))
      .rejects.toThrow('Network error')
  })

  it('uses correct API endpoint', async () => {
    const mockCountriesData = { countries: [] }
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockCountriesData)
    })

    await getCountries(new Headers())

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/classified_locations/countries'),
      expect.any(Object)
    )
  })
})
