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
    '/parking': '/parking',
    '/winter': '/winter',
    '/photos': '/photos',
  },
});

export type Locale = (typeof routing.locales)[number];
