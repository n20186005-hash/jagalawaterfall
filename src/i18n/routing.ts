import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['et', 'zh', 'en'],
  defaultLocale: 'et',
  localePrefix: 'always',
  pathnames: {
    '/': '/',
    '/privacy-policy': '/privacy-policy',
    '/terms-of-service': '/terms-of-service',
    '/cookie-settings': '/cookie-settings',
    '/from-tallinn': '/from-tallinn',
    '/by-bus': '/by-bus',
    '/parking': '/parking',
    '/tickets-opening-hours': '/tickets-opening-hours',
    '/facilities': '/facilities',
    '/safety': '/safety',
    '/best-time-to-visit': '/best-time-to-visit',
    '/winter': '/winter',
    '/water-levels': '/water-levels',
    '/photography': '/photography',
    '/photos': '/photos',
    '/jagala-river': '/jagala-river',
    '/half-day-trip': '/half-day-trip',
    '/jagala-vs-keila': '/jagala-vs-keila',
    '/waterfalls-near-tallinn': '/waterfalls-near-tallinn',
  },
});

export type Locale = (typeof routing.locales)[number];
