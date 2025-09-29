import { renderHook, act } from '@testing-library/react'
import { useTranslations } from '../useTranslations'

// Mock useParams
jest.mock('next/navigation', () => ({
  useParams: () => ({ lang: 'en' })
}))

// Mock dynamic imports
jest.mock('@/app/translations/en.json', () => ({
  default: {
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'form.title': 'Form Title'
  }
}))

describe('useTranslations', () => {
  it('loads translations for default locale', async () => {
    const { result } = renderHook(() => useTranslations())
    
    expect(result.current.isLoading).toBe(true)
    expect(result.current.locale).toBe('en')
    
    await act(async () => {
      // Wait for translations to load
    })
    
    expect(result.current.isLoading).toBe(false)
    // Test that the t function exists and works
    expect(typeof result.current.t).toBe('function')
  })

  it('returns default value for missing keys', async () => {
    const { result } = renderHook(() => useTranslations())
    
    await act(async () => {
      // Wait for translations to load
    })
    
    expect(result.current.t('missing.key', 'Default Value')).toBe('Default Value')
  })

  it('formats numbers correctly', async () => {
    const { result } = renderHook(() => useTranslations())
    
    await act(async () => {
      // Wait for translations to load
    })
    
    expect(result.current.f(1234.56)).toBe('1,234.56')
  })
})