import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import TopicPage from '@/components/TopicPage';
import {
  ATTRACTION_FULL_NAME,
  PATH_WHERE_TO_STAY,
  SITE_URL,
  buildAlternates,
} from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default;
  const pageTitle = messages?.whereToStay?.title || 'Where to Stay Near Jägala Waterfall';
  return {
    metadataBase: new URL(SITE_URL),
    title: `${pageTitle} | ${ATTRACTION_FULL_NAME}`,
    alternates: buildAlternates(locale, PATH_WHERE_TO_STAY),
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <TopicPage topic="whereToStay" slug={PATH_WHERE_TO_STAY} />;
}
