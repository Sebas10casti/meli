import React from 'react';

interface InputProps {
  id?: string;
  name?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'select' | 'textarea';
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  inputClassName?: string;
  rows?: number;
  children?: React.ReactNode; // For select options
}

export const Input: React.FC<InputProps> = ({
  id,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  label,
  error,
  disabled = false,
  required = false,
  className = '',
  inputClassName = '',
  rows = 3,
  children,
}) => {
  const inputId = id || name;
  const baseInputClasses = `w-full px-3 py-3 border rounded-md text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
    error ? 'border-red-300 focus:ring-red-400 focus:border-red-400' : 'border-gray-300'
  } ${inputClassName}`;

  const renderInput = () => {
    switch (type) {
      case 'select':
        return (
          <select
            id={inputId}
            name={name}
            value={value}
            onChange={onChange as React.ChangeEventHandler<HTMLSelectElement>}
            onBlur={onBlur as React.FocusEventHandler<HTMLSelectElement>}
            disabled={disabled}
            required={required}
            className={baseInputClasses}
          >
            {children}
          </select>
        );
      
      case 'textarea':
        return (
          <textarea
            id={inputId}
            name={name}
            value={value}
            onChange={onChange as React.ChangeEventHandler<HTMLTextAreaElement>}
            onBlur={onBlur as React.FocusEventHandler<HTMLTextAreaElement>}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            rows={rows}
            className={`${baseInputClasses} resize-none`}
          />
        );
      
      default:
        return (
          <input
            id={inputId}
            name={name}
            type={type}
            value={value}
            onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
            onBlur={onBlur as React.FocusEventHandler<HTMLInputElement>}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            className={baseInputClasses}
          />
        );
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {renderInput()}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};
