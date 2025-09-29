import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Header from '../Header'

describe('Header Component', () => {
  it('renders header with Mercado Libre logo', () => {
    render(<Header />)
    
    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()
  })

  it('renders logo with correct attributes', () => {
    render(<Header />)
    
    const logo = screen.getByAltText('Mercado Libre')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('src', 'https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/6.6.150/mercadolibre/logo_large_plus@2x.webp')
  })

  it('renders logo link with correct href', () => {
    render(<Header />)
    
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', 'https://www.mercadolibre.com/')
    expect(link).toHaveAttribute('aria-label', 'Mercado Libre')
  })

  it('applies correct styling to header', () => {
    render(<Header />)
    
    const header = screen.getByRole('banner')
    expect(header).toHaveStyle({
      backgroundColor: '#ffe600',
      display: 'flex',
      alignItems: 'center',
      padding: '12px 24px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    })
  })

  it('applies correct styling to logo', () => {
    render(<Header />)
    
    const logo = screen.getByAltText('Mercado Libre')
    expect(logo).toHaveStyle({
      height: '40px',
      display: 'block'
    })
  })

  it('has proper accessibility attributes', () => {
    render(<Header />)
    
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('aria-label', 'Mercado Libre')
    
    const logo = screen.getByAltText('Mercado Libre')
    expect(logo).toHaveAttribute('alt', 'Mercado Libre')
  })
})
