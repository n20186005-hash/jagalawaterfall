import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import TopicPage from '@/components/TopicPage';
import {
  ATTRACTION_FULL_NAME,
  PATH_BEST_TIME,
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
  const pageTitle = messages?.bestTimeToVisit?.title || 'Best Time to Visit Jägala Waterfall';
  return {
    metadataBase: new URL(SITE_URL),
    title: `${pageTitle} | ${ATTRACTION_FULL_NAME}`,
    alternates: buildAlternates(locale, PATH_BEST_TIME),
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <TopicPage topic="bestTimeToVisit" slug={PATH_BEST_TIME} />;
}
