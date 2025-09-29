import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Header from '../Header'

describe('Header Component', () => {
  it('renders header with Mercado Libre logo', () => {
    render(<Header />)
    const logo = screen.getByAltText('Mercado Libre')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('src', expect.stringContaining('mercadolibre'))
  })

  it('has correct link to Mercado Libre website', () => {
    render(<Header />)
    const link = screen.getByRole('link', { name: 'Mercado Libre' })
    expect(link).toHaveAttribute('href', 'https://www.mercadolibre.com/')
  })

  it('applies correct styling to header', () => {
    render(<Header />)
    const header = screen.getByRole('banner')
    expect(header).toHaveStyle({
      backgroundColor: '#ffe600',
      display: 'flex',
      alignItems: 'center'
    })
  })
})
