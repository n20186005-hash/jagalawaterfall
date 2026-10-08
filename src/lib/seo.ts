import { routing } from '@/i18n/routing';

/**
 * Single source of truth for canonical / hreflang / sitemap URLs.
 * The canonical hostname is the www variant (see middleware redirect apex -> www).
 */
export const SITE_URL = 'https://www.jagalawaterfall.com';
export const APEX_HOST = 'jagalawaterfall.com';
export const CANONICAL_HOST = 'www.jagalawaterfall.com';

export const ATTRACTION_FULL_NAME = 'Jägala Waterfall (Jägala juga)';
export const ATTRACTION_SHORT_NAME = 'Jagala Waterfall';
export const CITY_NAME = 'Jägala-Joa';
export const STATE_PROVINCE = 'Harju maakond';
export const COUNTRY_NAME = 'Estonia';
export const COUNTRY_CODE_2LETTER = 'EE';
export const POSTAL_CODE = '74212';
export const LATITUDE = 59.4498004;
export const LONGITUDE = 25.1761703;

export const MAPS_SHARE_URL = 'https://maps.app.goo.gl/xJkCSWytaQ98iHhY6';
export const MAPS_EMBED_SRC =
  'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3607.088511197984!2d25.1761703!3d59.4498004!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4692f00112a033b1%3A0x9731a39cb8ae23f0!2sJ%C3%A4gala%20Waterfall!5e1!3m2!1szh-CN!2s!4v1787896147915!5m2!1szh-CN!2s';

export const OFFICIAL_TOURISM_URL = 'https://visitestonia.com/en';
export const REGIONAL_TOURISM_URL = 'https://visitharju.ee';

export const HERO_IMAGE_URL = `${SITE_URL}/images/hero.jpg`;

/** BCP 47 codes used for hreflang alternates. */
export const HREFLANG_CODES: Record<string, string> = {
  et: 'et-EE',
  zh: 'zh-Hans',
  en: 'en',
};

/** Open Graph locale codes for og:locale. */
export const OG_LOCALES: Record<string, string> = {
  et: 'et_EE',
  zh: 'zh_CN',
  en: 'en_US',
};

/**
 * Google Maps public rating snapshot. Update reviewCount together with
 * messages->hero.reviewCount / common.googleRatingValue (both use ICU args,
 * so only the number here has to change). Do NOT invent individual reviews.
 */
export const GOOGLE_RATING = {
  value: 4.8,
  reviewCount: 7998,
  bestRating: 5,
  worstRating: 1,
  sourceUrl: MAPS_SHARE_URL,
  checkedAt: '2026-10-08',
} as const;

/** Every publicly indexable route (before the locale prefix). */
export const PATH_HOME = '';
export const PATH_PRIVACY = '/privacy-policy';
export const PATH_TERMS = '/terms-of-service';
export const PATH_COOKIES = '/cookie-settings';

export const PUBLIC_PATHS = [
  PATH_HOME,
  PATH_PRIVACY,
  PATH_TERMS,
  PATH_COOKIES,
] as const;

export function localizedPath(locale: string, path: string = ''): string {
  const clean = path === '/' ? '' : path;
  return `/${locale}${clean}`;
}

export function absoluteUrl(locale: string, path: string = ''): string {
  return `${SITE_URL}${localizedPath(locale, path)}`;
}

/** `alternates.languages` map for one route across all locales. */
export function hreflangLanguages(path: string = ''): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[HREFLANG_CODES[locale] ?? locale] = absoluteUrl(locale, path);
  }
  // International catch-all: most queries here are English.
  languages['x-default'] = absoluteUrl('en', path);
  return languages;
}

/** Canonical + hreflang alternates for a (locale, route) pair. */
export function buildAlternates(locale: string, path: string = '') {
  return {
    canonical: absoluteUrl(locale, path),
    languages: hreflangLanguages(path),
  };
}
