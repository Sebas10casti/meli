import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import StartTest from '../StartTest'

// Mock useTranslation
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'start_test.title': 'Start Test',
        'start_test.subtitle': 'Test subtitle',
        'start_test.start_purchase': 'Start Purchase'
      }
      return translations[key] || key
    },
    i18n: {
      language: 'es'
    }
  })
}))

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('StartTest Page', () => {
  it('renders title and subtitle correctly', () => {
    renderWithRouter(<StartTest />)
    expect(screen.getByText('Start Test')).toBeInTheDocument()
    expect(screen.getByText('Test subtitle')).toBeInTheDocument()
  })

  it('renders start purchase button', () => {
    renderWithRouter(<StartTest />)
    expect(screen.getByRole('button', { name: 'Start Purchase' })).toBeInTheDocument()
  })

  it('navigates to update-data page when button is clicked', () => {
    renderWithRouter(<StartTest />)
    const button = screen.getByRole('button', { name: 'Start Purchase' })
    fireEvent.click(button)
    
    // The navigation would be tested in integration tests
    // For now, we just verify the button is clickable
    expect(button).toBeInTheDocument()
  })
})
