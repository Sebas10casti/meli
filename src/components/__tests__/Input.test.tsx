import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Input from '../Input'

describe('Input Component', () => {
  it('renders input with label and placeholder', () => {
    render(
      <Input 
        label="Test Input" 
        placeholder="Enter text" 
        name="test"
      />
    )
    expect(screen.getByLabelText('Test Input')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
  })

  it('shows error message when error prop is provided', () => {
    render(
      <Input 
        name="test"
        error="This field is required"
      />
    )
    expect(screen.getByText('This field is required')).toBeInTheDocument()
    expect(screen.getByText('This field is required')).toHaveClass('text-red-600')
  })

  it('handles onChange events correctly', () => {
    const handleChange = vi.fn()
    render(
      <Input 
        name="test"
        onChange={handleChange}
      />
    )
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'test value' } })
    expect(handleChange).toHaveBeenCalledTimes(1)
  })
})
