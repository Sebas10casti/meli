import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FormGenerator from '../components/FormGenerator';
import { purchaseFormConfig } from '../config/formConfig';
import { useRecaptcha } from '../hooks/useRecaptcha';
import { useCountries } from '../hooks/useCountries';
import { useUser } from '../hooks/useUser';
import { useAuthToken } from '../hooks/useAuthToken';

interface UpdateData {
  fullname: string;
  country: string;
  address: string;
}

/**
 * Component that renders the update data form, pre-filling user data and handling submission.
 * Handles country options, user data loading, reCAPTCHA, and navigation.
 *
 * @returns {JSX.Element} The rendered update data form.
 */
function UpdateDataContent(){
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState<UpdateData>({
    fullname: '',
    country: '',
    address: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const recaptcha = useRecaptcha();
  const { countries, isLoading: countriesLoading } = useCountries();
  const { userData, isLoading: userLoading, getFullName, getFullAddress } = useUser();
  const { setTokenFromQuery, token } = useAuthToken();

  // Memoized values from search params
  const referrer = useMemo(() => searchParams.get('referrer'), [searchParams]);
  const queryToken = useMemo(() => searchParams.get('token'), [searchParams]);
  
  // Memoized current language
  const currentLang = useMemo(() => i18n.language, [i18n.language]);

  /**
   * Stores the token from the query parameter if present.
   */
  useEffect(() => {
    if (queryToken) {
      setTokenFromQuery(queryToken);
    }
  }, [queryToken, setTokenFromQuery]);

  /**
   * Loads user data into the form when available.
   */
  useEffect(() => {
    if (userData && !userLoading) {
      setFormData({
        fullname: getFullName(),
        country: userData.country_id,
        address: getFullAddress()
      });
    }
  }, [userData, userLoading, getFullName, getFullAddress]);

  /**
   * Generates the form configuration, updating the country field options with the loaded countries.
   * Memoized to prevent unnecessary recalculations when countries haven't changed.
   */
  const formConfig = useMemo(() => ({
    ...purchaseFormConfig,
    fields: purchaseFormConfig.fields.map(field => {
      if (field.id === 'country') {
        return {
          ...field,
          options: countries.map(country => ({
            value: country.id,
            label: country.name
          }))
        };
      }
      return field;
    })
  }), [countries]);

  /**
   * Handles changes to form input fields.
   * Memoized to prevent unnecessary recreations.
   *
   * @param {string} fieldId - The ID of the field being changed.
   * @param {string} value - The new value for the field.
   */
  const handleInputChange = useCallback((fieldId: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));
  }, []);

  /**
   * Handles form submission, simulating a request and navigating to the confirmation page.
   * Memoized to prevent unnecessary recreations.
   *
   * @param {React.FormEvent} e - The form submission event.
   */
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate(`/${currentLang}/confirmation?referrer=${encodeURIComponent(referrer || '')}&token=${encodeURIComponent(token || '')}`);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [currentLang, navigate, referrer, token]);

  /**
   * Handles cancellation of the form, navigating back to the start test page.
   * Memoized to prevent unnecessary recreations.
   */
  const handleCancel = useCallback(() => {
    navigate(`/${currentLang}/start-test`);
  }, [currentLang, navigate]);

  /**
   * Memoized props for FormGenerator to prevent unnecessary re-renders.
   */
  const formGeneratorProps = useMemo(() => ({
    config: formConfig,
    formData,
    isLoading,
    isDataLoading: countriesLoading,
    showRecaptcha: true,
    recaptchaVerified: recaptcha.isVerified,
    recaptchaError: recaptcha.error || undefined,
    recaptcha,
    onChange: handleInputChange,
    onSubmit: handleSubmit,
    onCancel: handleCancel,
    onRecaptchaVerify: recaptcha.verify,
    onRecaptchaError: recaptcha.setError,
  }), [
    formConfig,
    formData,
    handleInputChange,
    handleSubmit,
    isLoading,
    countriesLoading,
    handleCancel,
    recaptcha.isVerified,
    recaptcha.error,
    recaptcha.verify,
    recaptcha.setError,
    recaptcha
  ]);

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8">
          <div className="mb-6">
            <h1
              className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2 text-center"
              dangerouslySetInnerHTML={{ __html: t('update_information.title') }}
            />
          </div>

          <FormGenerator {...formGeneratorProps} />
        </div>
      </div>
    </div>
  );
}

export default function UpdateData() {
  return <UpdateDataContent />;
}
