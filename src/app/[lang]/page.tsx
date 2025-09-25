import { getTranslations } from "../translations/translate";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const { t } = await getTranslations(lang as string);

  return (
    <div>
      <h1>{t('hello')}</h1>
    </div>
  );
}