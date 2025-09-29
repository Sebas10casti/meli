import { getTranslations } from '@/app/translations/translate';

// Generate static params for all supported languages
export async function generateStaticParams() {
  return [
    { lang: 'en' },
    { lang: 'es' },
    { lang: 'pt' }
  ];
}

export default async function PurchaseConfirmation({ params }: { params: { lang: string } }) {
  const { t } = await getTranslations(params.lang);
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {t('purchase_confirmation.title')}
            </h1>
            <p className="text-gray-600 mb-6">
              {t('purchase_confirmation.subtitle')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
