import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';
import {
  ATTRACTION_FULL_NAME,
  ATTRACTION_SHORT_NAME,
  CITY_NAME,
  COUNTRY_CODE_2LETTER,
  GOOGLE_RATING,
  HERO_IMAGE_URL,
  LATITUDE,
  LONGITUDE,
  MAPS_SHARE_URL,
  OFFICIAL_TOURISM_URL,
  OG_LOCALES,
  POSTAL_CODE,
  REGIONAL_TOURISM_URL,
  SITE_URL,
  STATE_PROVINCE,
  absoluteUrl,
  buildAlternates,
} from '@/lib/seo';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

function buildMeta(locale: string, messages: any) {
  const selfUrl = absoluteUrl(locale);
  const title = messages?.meta?.title || '';
  const desc = messages?.meta?.description || '';
  const ogImageAlt = messages?.meta?.ogImageAlt || '';

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description: desc,
    alternates: buildAlternates(locale),
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large' as const },
    },
    openGraph: {
      title,
      description: desc,
      url: selfUrl,
      siteName: ATTRACTION_FULL_NAME,
      locale: OG_LOCALES[locale] ?? OG_LOCALES.en,
      type: 'website',
      images: [
        {
          url: HERO_IMAGE_URL,
          width: 1200,
          height: 675,
          alt: ogImageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: desc,
      images: [{ url: HERO_IMAGE_URL, alt: ogImageAlt }],
    },
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default;
  return buildMeta(locale, messages);
}

function buildTouristAttractionJsonLd(messages: any) {
  const name = messages?.ta?.name || ATTRACTION_FULL_NAME;
  const desc = messages?.ta?.description || '';

  return {
    '@context': 'https://schema.org',
    '@type': ['TouristAttraction', 'Place'],
    '@id': `${SITE_URL}/#attraction`,
    name,
    alternateName: [ATTRACTION_SHORT_NAME, `${CITY_NAME} ${ATTRACTION_FULL_NAME}`, 'Jägala juga'],
    description: desc,
    url: SITE_URL,
    image: [HERO_IMAGE_URL],
    isAccessibleForFree: true,
    publicAccess: true,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        opens: '00:00',
        closes: '23:59',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
      },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Kubja tee',
      addressLocality: CITY_NAME,
      addressRegion: STATE_PROVINCE,
      postalCode: POSTAL_CODE,
      addressCountry: COUNTRY_CODE_2LETTER,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: LATITUDE,
      longitude: LONGITUDE,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: GOOGLE_RATING.value,
      reviewCount: GOOGLE_RATING.reviewCount,
      bestRating: GOOGLE_RATING.bestRating,
      worstRating: GOOGLE_RATING.worstRating,
    },
    hasMap: MAPS_SHARE_URL,
    sameAs: [MAPS_SHARE_URL, REGIONAL_TOURISM_URL, OFFICIAL_TOURISM_URL],
  };
}

type FaqItem = { question: string; answer: string };

/** Markdown emphasis is rendered in the UI; structured data must be plain text. */
function toPlainText(value: string = ''): string {
  return value.replace(/\*\*/g, '').trim();
}

function buildFaqJsonLd(messages: any) {
  const items: FaqItem[] = messages?.faq?.items || [];
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: toPlainText(item.question),
      acceptedAnswer: {
        '@type': 'Answer',
        text: toPlainText(item.answer),
      },
    })),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  const htmlLang =
    locale === 'et' ? 'et-EE' : locale === 'zh' ? 'zh-CN' : 'en';

  const touristAttractionLd = buildTouristAttractionJsonLd(messages);
  const faqLd = buildFaqJsonLd(messages);

  return (
    <html lang={htmlLang} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(touristAttractionLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqLd),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
