import React, { useState, useEffect } from 'react';
import { Input } from './Input';
import { Button } from './Button';
import { GoogleCaptcha } from './GoogleCaptcha';
import { FormConfig, FormField } from '@/config/formConfig';
import { useTranslations } from '@/hooks/useTranslations';

interface FormGeneratorProps {
  config: FormConfig;
  formData: Record<string, any>;
  onChange: (fieldId: string, value: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading?: boolean;
  errors?: Record<string, string>;
  onCancel?: () => void;
  className?: string;
  // reCAPTCHA props
  showRecaptcha?: boolean;
  recaptchaVerified?: boolean;
  recaptchaError?: string;
  onRecaptchaVerify?: (token: string | null) => void;
  onRecaptchaError?: (error: string) => void;
  // Loading states for dynamic data
  isDataLoading?: boolean;
  // reCAPTCHA object
  recaptcha?: {
    isLoading: boolean;
  };
}

export const FormGenerator: React.FC<FormGeneratorProps> = ({
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
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const {t} = useTranslations();


  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleFieldChange = (fieldId: string, value: any) => {
    onChange(fieldId, value);
    
    // Clear validation error when user starts typing
    if (validationErrors[fieldId]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  };

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

  // Validate a single field
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

  // Validate all fields
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

  // Check if form is valid (all required fields filled)
  const isFormValid = (): boolean => {
    return config.fields.every(field => {
      if (!field.required) return true;
      const value = formData[field.id];
      return value && value.toString().trim() !== '';
    });
  };

  // Handle form submission with validation
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(e);
    }
  };

  const renderField = (field: FormField) => {
    const fieldError = errors[field.id] || validationErrors[field.id];
    const fieldValue = formData[field.id] || '';

    // Handle select fields with dynamic options
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
          {isMounted && field.options && field.options.length > 0 && field.options.map((option, index) => (
            <option key={option.value || `option-${index}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </Input>
      );
    }

    // Handle textarea fields
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

    // Handle regular input fields
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

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Form Fields */}
        <div className="space-y-6">
          {/* Group fields that should be side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            {config.fields.filter(field => field.gridCols === '6').map((field) => renderField(field))}
          </div>
          
          {/* Full width fields */}
          {config.fields.filter(field => field.gridCols === '12' || !field.gridCols).map((field) => renderField(field))}
        </div>

        {/* Google reCAPTCHA */}
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

        {/* Form Actions */}
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
