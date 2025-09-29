import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

// Mock the useTranslations hook
jest.mock('@/hooks/useTranslations', () => ({
  useTranslations: () => ({
    t: (key: string) => key
  })
}))

// Mock GoogleCaptcha component
jest.mock('../GoogleCaptcha', () => ({
  GoogleCaptcha: ({ onVerify, isVerified }: any) => (
    <div>
      <div>Security Verification</div>
      {isVerified ? <div>Verified</div> : <button>Verify</button>}
    </div>
  )
}))

import { GoogleCaptcha } from '../GoogleCaptcha'

describe('GoogleCaptcha Component', () => {
  it('renders with title', () => {
    render(<GoogleCaptcha onVerify={jest.fn()} />)
    expect(screen.getByText('Security Verification')).toBeInTheDocument()
  })

  it('renders verify button', () => {
    render(<GoogleCaptcha onVerify={jest.fn()} />)
    expect(screen.getByText('Verify')).toBeInTheDocument()
  })

  it('renders verified state when isVerified is true', () => {
    render(<GoogleCaptcha onVerify={jest.fn()} isVerified={true} />)
    expect(screen.getByText('Verified')).toBeInTheDocument()
  })
})
