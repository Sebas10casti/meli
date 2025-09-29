'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormGenerator } from '@/components/FormGenerator';
import { purchaseFormConfig } from '@/config/formConfig';
import { useRecaptcha } from '@/hooks/useRecaptcha';
import { useCountries } from '@/hooks/useCountries';
import { useUser } from '@/hooks/useUser';
import { useAuthToken } from '@/hooks/useAuthToken';
import { useTranslations } from '@/hooks/useTranslations';

interface PurchaseData {
  fullname: string;
  country: string;
  address: string;
}

export default function PurchaseVerification() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useTranslations();
  const [formData, setFormData] = useState<PurchaseData>({
    fullname: '',
    country: '',
    address: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [_isMounted, setIsMounted] = useState(false);
  const recaptcha = useRecaptcha();
  const { countries, isLoading: countriesLoading, error: _countriesError } = useCountries();
  const { userData, isLoading: userLoading, error: _userError, getFullName, getFullAddress } = useUser();
  const { setTokenFromQuery, token, hasValidToken: _hasValidToken } = useAuthToken();

  // Obtener parámetros de la URL
  const referrer = searchParams.get('referrer');
  const queryToken = searchParams.get('token');

  // Set mounted state for client-side rendering
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Capturar token del query param y almacenarlo
  useEffect(() => {
    if (queryToken) {
      setTokenFromQuery(queryToken);
    }
  }, [queryToken, setTokenFromQuery]);

  useEffect(() => {
    // Cargar datos del usuario cuando estén disponibles
    if (userData && !userLoading) {
      setFormData({
        fullname: getFullName(),
        country: userData.country_id,
        address: getFullAddress()
      });
    }
  }, [userData, userLoading, getFullName, getFullAddress]);

  // Update form config with countries data
  const formConfig = {
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
  };

  const handleInputChange = (fieldId: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const redirectUrl = `/confirmation?referrer=${encodeURIComponent(referrer || '')}&token=${encodeURIComponent(token || '')}`;
      router.push(redirectUrl);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push(`/start-test`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8">
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2 text-center" dangerouslySetInnerHTML={{ __html: t('update_information.title') }}>
            </h1>
          </div>

          <FormGenerator
            config={formConfig}
            formData={formData}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            isDataLoading={countriesLoading}
            onCancel={handleCancel}
            showRecaptcha={true}
            recaptchaVerified={recaptcha.isVerified}
            recaptchaError={recaptcha.error || undefined}
            onRecaptchaVerify={recaptcha.verify}
            onRecaptchaError={recaptcha.setError}
            recaptcha={recaptcha}
          />
        </div>
      </div>
    </div>
  );
}
