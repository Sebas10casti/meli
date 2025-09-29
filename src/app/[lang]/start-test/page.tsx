'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/Button';
import { useTranslations } from '@/hooks/useTranslations';

export default function StartTest() {
  const router = useRouter();
  const {t} = useTranslations();
  const handleStartPurchase = () => {
    const referrer = '/previous-step';
    const token = '123';
    router.push(`/update-data?referrer=${encodeURIComponent(referrer)}&token=${encodeURIComponent(token)}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {t('start_test.title')}
          </h1>
          <p className="text-gray-600 mb-6">
            {t('start_test.subtitle')}
          </p>

          <Button
            onClick={handleStartPurchase}
            variant="primary"
            size="md"
          >
            {t('start_test.start_purchase')}
          </Button>
        </div>
      </div>
    </div>
  );
}
