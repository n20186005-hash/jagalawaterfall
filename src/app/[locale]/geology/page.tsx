import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import TopicPage from '@/components/TopicPage';
import {
  ATTRACTION_FULL_NAME,
  PATH_GEOLOGY,
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
  const pageTitle = messages?.geology?.title || 'The Geology of Jägala Waterfall';
  return {
    metadataBase: new URL(SITE_URL),
    title: `${pageTitle} | ${ATTRACTION_FULL_NAME}`,
    alternates: buildAlternates(locale, PATH_GEOLOGY),
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <TopicPage topic="geology" slug={PATH_GEOLOGY} />;
}
