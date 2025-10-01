import { vi } from 'vitest'

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

if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    },
    writable: true,
  })

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
}
