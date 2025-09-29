import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';
import { GoogleCaptcha } from './GoogleCaptcha';
import { type FormConfig, type FormField } from '../config/formConfig';
import { useTranslation } from 'react-i18next';

/**
 * Props for the FormGenerator component.
 * @typedef {Object} FormGeneratorProps
 * @property {FormConfig} config - The configuration object for the form, including fields and button settings.
 * @property {Record<string, any>} formData - The current form data, keyed by field id.
 * @property {(fieldId: string, value: any) => void} onChange - Callback when a field value changes.
 * @property {(e: React.FormEvent) => void} onSubmit - Callback when the form is submitted.
 * @property {boolean} [isLoading] - Whether the form is in a loading state.
 * @property {Record<string, string>} [errors] - Validation errors keyed by field id.
 * @property {() => void} [onCancel] - Callback when the cancel button is clicked.
 * @property {string} [className] - Additional class names for the form container.
 * @property {boolean} [showRecaptcha] - Whether to show the Google reCAPTCHA.
 * @property {boolean} [recaptchaVerified] - Whether the reCAPTCHA has been verified.
 * @property {string} [recaptchaError] - Error message for the reCAPTCHA.
 * @property {(token: string | null) => void} [onRecaptchaVerify] - Callback when reCAPTCHA is verified.
 * @property {(error: string) => void} [onRecaptchaError] - Callback when reCAPTCHA verification fails.
 * @property {boolean} [isDataLoading] - Whether form data (e.g., select options) is loading.
 * @property {{ isLoading: boolean }} [recaptcha] - reCAPTCHA loading state.
 */
interface FormGeneratorProps {
  config: FormConfig;
  formData: Record<string, any>;
  onChange: (fieldId: string, value: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading?: boolean;
  errors?: Record<string, string>;
  onCancel?: () => void;
  className?: string;
  showRecaptcha?: boolean;
  recaptchaVerified?: boolean;
  recaptchaError?: string;
  onRecaptchaVerify?: (token: string | null) => void;
  onRecaptchaError?: (error: string) => void;
  isDataLoading?: boolean;
  recaptcha?: {
    isLoading: boolean;
  };
}

/**
 * FormGenerator dynamically renders a form based on a configuration object.
 * Handles validation, error display, and supports Google reCAPTCHA.
 *
 * @param {FormGeneratorProps} props - The props for the FormGenerator component.
 * @returns {JSX.Element} The rendered form.
 */
const FormGenerator = ({
  config,
  formData,
  onChange,
  onSubmit,
  isLoading = false,
  errors = {},
  onCancel,
  className = '',
  showRecaptcha = false,
  recaptchaVerified = false,
  recaptchaError,
  onRecaptchaVerify,
  onRecaptchaError,
  isDataLoading = false,
  recaptcha
}: FormGeneratorProps) => {
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const { t } = useTranslation();

  /**
   * Handles changes to a form field and clears its validation error if present.
   * @param {string} fieldId - The id of the field being changed.
   * @param {any} value - The new value of the field.
   */
  const handleFieldChange = (fieldId: string, value: any) => {
    onChange(fieldId, value);

    if (validationErrors[fieldId]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  };

  /**
   * Handles blur event for a form field and validates its value.
   * @param {string} fieldId - The id of the field being blurred.
   * @param {any} value - The value of the field.
   */
  const handleFieldBlur = (fieldId: string, value: any) => {
    const field = config.fields.find(f => f.id === fieldId);
    if (field) {
      const error = validateField(field, value);
      if (error) {
        setValidationErrors(prev => ({
          ...prev,
          [fieldId]: error
        }));
      } else {
        setValidationErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[fieldId];
          return newErrors;
        });
      }
    }
  };

  /**
   * Validates a single form field based on its configuration.
   * @param {FormField} field - The field configuration.
   * @param {any} value - The value to validate.
   * @returns {string|null} The error message if invalid, otherwise null.
   */
  const validateField = (field: FormField, value: any): string | null => {
    if (field.required && (!value || value.toString().trim() === '')) {
      return t(field.validation?.message || `${field.id}_required`);
    }

    if (field.validation?.minLength && value && value.length < field.validation.minLength) {
      return t(field.validation.message || `${field.id}_min_length`);
    }

    if (field.validation?.maxLength && value && value.length > field.validation.maxLength) {
      return t(field.validation.message || `${field.id}_max_length`);
    }

    if (field.validation?.pattern && value) {
      const regex = new RegExp(field.validation.pattern);
      if (!regex.test(value)) {
        return t(field.validation.message || `${field.id}_invalid`);
      }
    }

    return null;
  };

  /**
   * Validates all form fields and sets validation errors.
   * @returns {boolean} True if the form is valid, false otherwise.
   */
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    config.fields.forEach(field => {
      const value = formData[field.id];
      const error = validateField(field, value);
      if (error) {
        newErrors[field.id] = error;
        isValid = false;
      }
    });

    setValidationErrors(newErrors);
    return isValid;
  };

  /**
   * Checks if the form is valid (all required fields are filled).
   * @returns {boolean} True if the form is valid, false otherwise.
   */
  const isFormValid = (): boolean => {
    return config.fields.every(field => {
      if (!field.required) return true;
      const value = formData[field.id];
      return value && value.toString().trim() !== '';
    });
  };

  /**
   * Handles the form submission event.
   * @param {React.FormEvent} e - The form event.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(e);
    }
  };

  /**
   * Renders a single form field based on its configuration.
   * @param {FormField} field - The field configuration.
   * @returns {JSX.Element} The rendered field.
   */
  const renderField = (field: FormField) => {
    const fieldError = errors[field.id] || validationErrors[field.id];
    const fieldValue = formData[field.id] || '';

    if (field.type === 'select' && field.options) {
      return (
        <Input
          key={field.id}
          type="select"
          id={field.id}
          label={t(field.label)}
          value={fieldValue}
          onChange={(e) => handleFieldChange(field.id, e.target.value)}
          onBlur={(e) => handleFieldBlur(field.id, e.target.value)}
          required={field.required}
          disabled={field.disabled || isDataLoading}
          error={fieldError}
        >
          <option value="">
            {isDataLoading ? t('inputs.loading_options') : t('inputs.select_option')}
          </option>
          {field.options && field.options.length > 0 && field.options.map((option, index) => (
            <option key={option.value || `option-${index}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </Input>
      );
    }

    if (field.type === 'textarea') {
      return (
        <Input
          key={field.id}
          type="textarea"
          id={field.id}
          label={t(field.label)}
          value={fieldValue}
          onChange={(e) => handleFieldChange(field.id, e.target.value)}
          onBlur={(e) => handleFieldBlur(field.id, e.target.value)}
          placeholder={field.placeholder ? t(field.placeholder) : undefined}
          required={field.required}
          disabled={field.disabled}
          rows={field.rows}
          error={fieldError}
        />
      );
    }

    return (
      <Input
        key={field.id}
        type={field.type}
        id={field.id}
        label={t(field.label)}
        value={fieldValue}
        onChange={(e) => handleFieldChange(field.id, e.target.value)}
        onBlur={(e) => handleFieldBlur(field.id, e.target.value)}
        placeholder={field.placeholder ? t(field.placeholder) : undefined}
        required={field.required}
        disabled={field.disabled}
        error={fieldError}
        className={field.gridCols ? `col-span-${field.gridCols}` : ''}
      />
    );
  };

  // Fields to be displayed side by side (e.g., gridCols === '6')
  const sideBySideFields = config.fields.filter(field => field.gridCols === '6');
  // Fields to be displayed full width (e.g., gridCols === '12' or not set)
  const fullWidthFields = config.fields.filter(field => field.gridCols === '12' || !field.gridCols);

  return (
    <div className={`space-y-6 ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-6">
          {sideBySideFields.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              {sideBySideFields.map((field) => renderField(field))}
            </div>
          )}
          {fullWidthFields.map((field) => renderField(field))}
        </div>

        {showRecaptcha && (
          <div className="border-t border-gray-200 pt-4">
            <GoogleCaptcha
              onVerify={onRecaptchaVerify || (() => {})}
              onError={onRecaptchaError || (() => {})}
              isVerified={recaptchaVerified}
              isLoading={recaptcha?.isLoading || false}
            />
            {recaptchaError && (
              <p className="text-sm text-red-600 mt-2">{recaptchaError}</p>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
          {config.cancelButton && onCancel && (
            <Button
              type="button"
              onClick={onCancel}
              variant={config.cancelButton.variant || 'secondary'}
              disabled={isLoading}
              className="w-full sm:w-auto"
            >
              {t(config.cancelButton.text)}
            </Button>
          )}

          <Button
            type="submit"
            variant={config.submitButton.variant || 'primary'}
            disabled={isLoading || !isFormValid() || (showRecaptcha && !recaptchaVerified)}
            loading={isLoading}
            className="w-full sm:w-auto"
          >
            {isLoading ? t(config.submitButton?.loadingText || '') : t(config.submitButton.text)}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormGenerator;
