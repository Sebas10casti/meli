export interface FormField {
  id: string;
  type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'select' | 'textarea';
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  options?: Array<{ value: string; label: string }>;
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    message?: string;
  };
  gridCols?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';
}

export interface FormConfig {
  id: string;
  fields: FormField[];
  submitButton: {
    text: string;
    loadingText?: string;
    variant?: 'primary' | 'secondary' | 'danger';
  };
  cancelButton?: {
    text: string;
    variant?: 'primary' | 'secondary' | 'danger';
  };
}

// Purchase verification form configuration
export const purchaseFormConfig: FormConfig = {
  id: 'purchase-verification',
  fields: [
    {
      id: 'fullname',
      type: 'text',
      label: 'update_information.form.fullname',
      placeholder: 'update_information.form.placeholder_fullname',
      required: true,
      gridCols: '12',
      validation: {
        minLength: 2,
        message: 'update_information.form.requiered_fullname'
      }
    },
    {
      id: 'country',
      type: 'select',
      label: 'update_information.form.country',
      required: true,
      gridCols: '12',
      options: [] // Will be populated dynamically
    },
    {
      id: 'address',
      type: 'textarea',
      label: 'update_information.form.address',
      placeholder: 'update_information.form.placeholder_address',
      required: true,
      rows: 3,
      gridCols: '12',
      validation: {
        minLength: 10,
        message: 'update_information.form.requiered_address'
      }
    }
  ],
  submitButton: {
    text: 'update_information.form.submit_button',
    loadingText: 'update_information.form.submit_button',
    variant: 'primary'
  },
  cancelButton: {
    text: 'update_information.form.cancel_button',
    variant: 'secondary'
  }
};
