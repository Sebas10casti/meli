import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock para i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      changeLanguage: vi.fn(),
      language: 'es',
    },
  }),
  initReactI18next: {
    type: '3rdParty',
    init: vi.fn(),
  },
}))

// Mock para react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useLocation: () => ({
      pathname: '/es',
      search: '',
      hash: '',
      state: null,
    }),
    useNavigate: () => vi.fn(),
  }
})

// Mock para localStorage
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  },
  writable: true,
})

// Mock para window.location
Object.defineProperty(window, 'location', {
  value: {
    pathname: '/es',
    search: '',
    hash: '',
    host: 'localhost',
    hostname: 'localhost',
    href: 'http://localhost:3000/es',
    origin: 'http://localhost:3000',
    port: '3000',
    protocol: 'http:',
  },
  writable: true,
})
