import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Input } from '../Input'

describe('Input Component', () => {
  it('renders text input with default props', () => {
    render(<Input />)
    
    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'text')
  })

  it('renders with label', () => {
    render(<Input label="Test Label" />)
    
    expect(screen.getByText('Test Label')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('renders with required indicator', () => {
    render(<Input label="Test Label" required />)
    
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('renders with error message', () => {
    render(<Input error="Test error" />)
    
    expect(screen.getByText('Test error')).toBeInTheDocument()
    expect(screen.getByText('Test error')).toHaveClass('text-red-600')
  })

  it('renders different input types', () => {
    const { rerender } = render(<Input type="email" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email')

    rerender(<Input type="password" />)
    expect(screen.getByDisplayValue('')).toHaveAttribute('type', 'password')

    rerender(<Input type="number" />)
    expect(screen.getByRole('spinbutton')).toBeInTheDocument()
  })

  it('renders textarea when type is textarea', () => {
    render(<Input type="textarea" />)
    
    const textarea = screen.getByRole('textbox')
    expect(textarea.tagName).toBe('TEXTAREA')
  })

  it('renders select when type is select', () => {
    render(
      <Input type="select">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </Input>
    )
    
    const select = screen.getByRole('combobox')
    expect(select.tagName).toBe('SELECT')
    expect(screen.getByText('Option 1')).toBeInTheDocument()
    expect(screen.getByText('Option 2')).toBeInTheDocument()
  })

  it('handles value changes', () => {
    const handleChange = jest.fn()
    render(<Input onChange={handleChange} />)
    
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'test value' } })
    
    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('handles blur events', () => {
    const handleBlur = jest.fn()
    render(<Input onBlur={handleBlur} />)
    
    const input = screen.getByRole('textbox')
    fireEvent.blur(input)
    
    expect(handleBlur).toHaveBeenCalledTimes(1)
  })

  it('applies disabled state', () => {
    render(<Input disabled />)
    
    const input = screen.getByRole('textbox')
    expect(input).toBeDisabled()
  })

  it('applies custom className', () => {
    render(<Input className="custom-class" />)
    
    const container = screen.getByRole('textbox').closest('div')
    expect(container).toHaveClass('custom-class')
  })

  it('applies custom inputClassName', () => {
    render(<Input inputClassName="custom-input-class" />)
    
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('custom-input-class')
  })

  it('shows placeholder text', () => {
    render(<Input placeholder="Enter text here" />)
    
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('placeholder', 'Enter text here')
  })

  it('uses name as id when id is not provided', () => {
    render(<Input name="testName" />)
    
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('id', 'testName')
  })

  it('uses provided id over name', () => {
    render(<Input id="customId" name="testName" />)
    
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('id', 'customId')
  })

  it('applies error styling when error is present', () => {
    render(<Input error="Test error" />)
    
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('border-red-300')
  })

  it('renders textarea with correct rows', () => {
    render(<Input type="textarea" rows={5} />)
    
    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveAttribute('rows', '5')
  })

  it('handles select option changes', () => {
    const handleChange = jest.fn()
    render(
      <Input type="select" onChange={handleChange}>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </Input>
    )
    
    const select = screen.getByRole('combobox')
    fireEvent.change(select, { target: { value: 'option2' } })
    
    expect(handleChange).toHaveBeenCalledTimes(1)
  })
})
