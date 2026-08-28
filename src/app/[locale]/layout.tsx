import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const BASE_URL = 'https://jagalawaterfall.com';
const ATTRACTION_FULL_NAME = 'Jägala Waterfall (Jägala juga)';
const ATTRACTION_SHORT_NAME = 'Jagala Waterfall';
const CITY_NAME = 'Jägala-Joa';
const STATE_PROVINCE = 'Harju maakond';
const COUNTRY_NAME = 'Estonia';
const COUNTRY_CODE_2LETTER = 'EE';
const POSTAL_CODE = '74212';
const LATITUDE = 59.4498004;
const LONGITUDE = 25.1761703;
const MAPS_SHARE_URL = 'https://maps.app.goo.gl/xJkCSWytaQ98iHhY6';
const MAPS_EMBED_SRC =
  'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3607.088511197984!2d25.1761703!3d59.4498004!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4692f00112a033b1%3A0x9731a39cb8ae23f0!2sJ%C3%A4gala%20Waterfall!5e1!3m2!1szh-CN!2s!4v1787896147915!5m2!1szh-CN!2s';
const GOVT_TOURISM_URL = 'https://visitestonia.com/en';
const HERO_IMAGE_URL = `${BASE_URL}/images/hero.jpg`;

function buildMeta(locale: string, messages: any) {
  const selfUrl = `${BASE_URL}/${locale}`;
  const localeMap: Record<string, { og: string; html: string }> = {
    et: { og: 'et_EE', html: 'et-EE' },
    zh: { og: 'zh_CN', html: 'zh-CN' },
    en: { og: 'en_US', html: 'en' },
  };
  const title =
    locale === 'et'
      ? `Jägala juga (${CITY_NAME}) - Külastusjuhend ja asukoht`
      : locale === 'zh'
      ? `Jägala Waterfall (${CITY_NAME}) - 游览指南与地理位置`
      : `Jägala Waterfall (${CITY_NAME}) - Visitor Guide & Location`;

  const desc =
    locale === 'et'
      ? `Avasta ${ATTRACTION_FULL_NAME} – Eesti suurim looduslik juga ${CITY_NAME}s, ${STATE_PROVINCE}s. Vaata asukohakaarti, avamisajasti, lähedal asuvat Lahema rahvusparki ja reisi soovitusi.`
      : locale === 'zh'
      ? `探索${ATTRACTION_FULL_NAME}——位于${COUNTRY_NAME}${STATE_PROVINCE}${CITY_NAME}的标志性地标。查看位置地图、开放信息、周边拉赫马国家公园以及旅行小贴士。`
      : `Discover ${ATTRACTION_FULL_NAME}, the iconic landmark in ${CITY_NAME}, ${STATE_PROVINCE}, ${COUNTRY_NAME}. View location map, opening details, nearby Lahemaa National Park, and travel tips.`;

  return {
    title,
    description: desc,
    alternates: {
      canonical: selfUrl,
      languages: {
        et: `${BASE_URL}/et`,
        zh: `${BASE_URL}/zh`,
        en: `${BASE_URL}/en`,
        'x-default': `${BASE_URL}/et`,
      },
    },
    openGraph: {
      title,
      description: desc,
      url: selfUrl,
      siteName: ATTRACTION_FULL_NAME,
      locale: localeMap[locale]?.og || 'en_US',
      type: 'website',
      images: [
        {
          url: HERO_IMAGE_URL,
          width: 1200,
          height: 675,
          alt:
            locale === 'et'
              ? `Jägala juga – ${CITY_NAME}, ${COUNTRY_NAME}`
              : locale === 'zh'
              ? `Jägala Waterfall 主景图 - ${CITY_NAME}，${COUNTRY_NAME}`
              : `Jägala Waterfall - Main view in ${CITY_NAME}, ${COUNTRY_NAME}`,
        },
      ],
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

function buildTouristAttractionJsonLd(locale: string) {
  const name =
    locale === 'et' ? 'Jägala juga' : ATTRACTION_FULL_NAME;
  const desc =
    locale === 'et'
      ? `Üldistatud külastusjuhend ${ATTRACTION_FULL_NAME} kohta ${CITY_NAME}s, ${STATE_PROVINCE}s, ${COUNTRY_NAME}s.`
      : locale === 'zh'
      ? `${ATTRACTION_FULL_NAME}综合游览指南，位于${COUNTRY_NAME}${STATE_PROVINCE}${CITY_NAME}。`
      : `Comprehensive visitor guide to ${ATTRACTION_FULL_NAME} in ${CITY_NAME}, ${STATE_PROVINCE}, ${COUNTRY_NAME}.`;

  return {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    '@id': `${BASE_URL}/#attraction`,
    name,
    alternateName: [ATTRACTION_SHORT_NAME, `${CITY_NAME} ${ATTRACTION_FULL_NAME}`, 'Jägala juga'],
    description: desc,
    url: BASE_URL,
    image: [HERO_IMAGE_URL],
    isAccessibleForFree: true,
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
    hasMap: MAPS_SHARE_URL,
    sameAs: [MAPS_SHARE_URL, GOVT_TOURISM_URL],
  };
}

type FaqItem = { question: string; answer: string };

function buildFaqJsonLd(messages: any) {
  const items: FaqItem[] = messages?.faq?.items || [];
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
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

  const touristAttractionLd = buildTouristAttractionJsonLd(locale);
  const faqLd = buildFaqJsonLd(messages);

  return (
    <html lang={htmlLang} suppressHydrationWarning>
      <head>
        <link rel="canonical" href={`${BASE_URL}/${locale}`} />
        <meta property="og:image" content={HERO_IMAGE_URL} />
        <meta
          property="og:image:alt"
          content={
            locale === 'et'
              ? `Jägala juga – ${CITY_NAME}, ${COUNTRY_NAME}`
              : locale === 'zh'
              ? `Jägala Waterfall 主景图 - ${CITY_NAME}，${COUNTRY_NAME}`
              : `Jägala Waterfall - Main view in ${CITY_NAME}, ${COUNTRY_NAME}`
          }
        />
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
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX"
          crossOrigin="anonymous"
        />
        <meta name="google-adsense-account" content="ca-pub-XXXXXXXXXX" />
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
