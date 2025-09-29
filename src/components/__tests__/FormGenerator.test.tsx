import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { FormGenerator } from '../FormGenerator'
import { FormConfig } from '@/config/formConfig'

// Mock the useTranslations hook
jest.mock('@/hooks/useTranslations', () => ({
  useTranslations: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'update_information.form.fullname': 'Full Name',
        'update_information.form.country': 'Country',
        'update_information.form.address': 'Address',
        'update_information.form.submit_button': 'Submit',
        'update_information.form.cancel_button': 'Cancel'
      }
      return translations[key] || key
    }
  })
}))

// Mock GoogleCaptcha component
jest.mock('../GoogleCaptcha', () => ({
  GoogleCaptcha: () => <div data-testid="google-captcha">Google Captcha</div>
}))

const mockFormConfig: FormConfig = {
  id: 'test-form',
  fields: [
    {
      id: 'fullname',
      type: 'text',
      label: 'update_information.form.fullname',
      required: true,
      gridCols: '12'
    }
  ],
  submitButton: {
    text: 'update_information.form.submit_button',
    variant: 'primary'
  }
}

describe('FormGenerator Component', () => {
  const mockOnChange = jest.fn()
  const mockOnSubmit = jest.fn()

  const defaultProps = {
    config: mockFormConfig,
    formData: {},
    onChange: mockOnChange,
    onSubmit: mockOnSubmit
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders form fields', () => {
    render(<FormGenerator {...defaultProps} />)
    
    expect(screen.getByText('Full Name')).toBeInTheDocument()
  })

  it('renders submit button', () => {
    render(<FormGenerator {...defaultProps} />)
    
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument()
  })

  it('renders with custom className', () => {
    const { container } = render(<FormGenerator {...defaultProps} className="custom-form" />)
    
    expect(container.firstChild).toHaveClass('custom-form')
  })
})