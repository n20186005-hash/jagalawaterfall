import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import TopicPage from '@/components/TopicPage';
import {
  ATTRACTION_FULL_NAME,
  PATH_SUMMER,
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
  const pageTitle = messages?.summer?.title || 'Visiting Jägala Waterfall in Summer';
  return {
    metadataBase: new URL(SITE_URL),
    title: `${pageTitle} | ${ATTRACTION_FULL_NAME}`,
    alternates: buildAlternates(locale, PATH_SUMMER),
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <TopicPage topic="summer" slug={PATH_SUMMER} />;
}
