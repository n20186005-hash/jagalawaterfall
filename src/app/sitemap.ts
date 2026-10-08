import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { HREFLANG_CODES, PUBLIC_PATHS, absoluteUrl } from '@/lib/seo';

// Update when content changes materially.
const LAST_MODIFIED = new Date('2026-10-08');

export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_PATHS.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: absoluteUrl(locale, path),
      lastModified: LAST_MODIFIED,
      changeFrequency: path === '' ? ('weekly' as const) : ('yearly' as const),
      priority: path === '' ? 1 : 0.4,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [HREFLANG_CODES[l] ?? l, absoluteUrl(l, path)])
        ),
      },
    }))
  );
}
