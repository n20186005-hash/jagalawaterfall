import { useLocale, useMessages } from 'next-intl';
import { Link } from '@/i18n/navigation';
import TopicFaq from './TopicFaq';
import RichInline from './RichInline';
import {
  ATTRACTION_FULL_NAME,
  ATTRACTION_SHORT_NAME,
  SITE_URL,
  absoluteUrl,
} from '@/lib/seo';

export type TopicKey =
  | 'fromTallinn'
  | 'byBus'
  | 'parking'
  | 'ticketsOpeningHours'
  | 'facilities'
  | 'safety'
  | 'bestTimeToVisit'
  | 'winter'
  | 'waterLevels'
  | 'photography'
  | 'photos'
  | 'jagalaRiver'
  | 'halfDayTrip'
  | 'jagalaVsKeila'
  | 'waterfallsNearTallinn'
  | 'fromAirport'
  | 'spring'
  | 'summer'
  | 'autumn'
  | 'withLahemaa'
  | 'withTallinn'
  | 'waterfallRoute'
  | 'withViruBog'
  | 'withKids'
  | 'withDogs'
  | 'accessibility'
  | 'schoolTrip'
  | 'swimming'
  | 'kayaking'
  | 'picnicking'
  | 'hikingTrails'
  | 'cycling'
  | 'campingNearby'
  | 'heightFacts'
  | 'history'
  | 'geology'
  | 'freeEntry'
  | 'restaurantsNearby'
  | 'whereToStay'
  | 'bestViewpoints';

const TOPIC_MAP: { slug: string; ns: TopicKey }[] = [
  { slug: '/from-tallinn', ns: 'fromTallinn' },
  { slug: '/by-bus', ns: 'byBus' },
  { slug: '/parking', ns: 'parking' },
  { slug: '/tickets-opening-hours', ns: 'ticketsOpeningHours' },
  { slug: '/facilities', ns: 'facilities' },
  { slug: '/safety', ns: 'safety' },
  { slug: '/best-time-to-visit', ns: 'bestTimeToVisit' },
  { slug: '/winter', ns: 'winter' },
  { slug: '/water-levels', ns: 'waterLevels' },
  { slug: '/photography', ns: 'photography' },
  { slug: '/photos', ns: 'photos' },
  { slug: '/jagala-river', ns: 'jagalaRiver' },
  { slug: '/half-day-trip', ns: 'halfDayTrip' },
  { slug: '/jagala-vs-keila', ns: 'jagalaVsKeila' },
  { slug: '/waterfalls-near-tallinn', ns: 'waterfallsNearTallinn' },
  { slug: '/from-airport', ns: 'fromAirport' },
  { slug: '/spring', ns: 'spring' },
  { slug: '/summer', ns: 'summer' },
  { slug: '/autumn', ns: 'autumn' },
  { slug: '/with-lahemaa', ns: 'withLahemaa' },
  { slug: '/with-tallinn', ns: 'withTallinn' },
  { slug: '/waterfall-route', ns: 'waterfallRoute' },
  { slug: '/with-viru-bog', ns: 'withViruBog' },
  { slug: '/with-kids', ns: 'withKids' },
  { slug: '/with-dogs', ns: 'withDogs' },
  { slug: '/accessibility', ns: 'accessibility' },
  { slug: '/school-trip', ns: 'schoolTrip' },
  { slug: '/swimming', ns: 'swimming' },
  { slug: '/kayaking', ns: 'kayaking' },
  { slug: '/picnicking', ns: 'picnicking' },
  { slug: '/hiking-trails', ns: 'hikingTrails' },
  { slug: '/cycling', ns: 'cycling' },
  { slug: '/camping-nearby', ns: 'campingNearby' },
  { slug: '/height-facts', ns: 'heightFacts' },
  { slug: '/history', ns: 'history' },
  { slug: '/geology', ns: 'geology' },
  { slug: '/free-entry', ns: 'freeEntry' },
  { slug: '/restaurants-nearby', ns: 'restaurantsNearby' },
  { slug: '/where-to-stay', ns: 'whereToStay' },
  { slug: '/best-viewpoints', ns: 'bestViewpoints' },
];

type SourceLink = { name: string; url: string };
type TopicPhoto = { file: string; caption: string; alt: string };

export default function TopicPage({ topic, slug }: { topic: TopicKey; slug: string }) {
  const locale = useLocale();
  const messages = useMessages() as any;
  const ns = messages?.[topic] || {};
  const header = messages?.header || {};
  const homeHref = `/${locale}`;

  const title: string = ns.title || ATTRACTION_FULL_NAME;
  const intro: string = ns.intro || '';
  const sections: { heading: string; content: string }[] = ns.sections || [];
  const faq = ns.faq || { title: 'FAQ', items: [] };
  const sources: SourceLink[] = ns.sources || [];
  const photos: TopicPhoto[] = ns.photos || [];

  // Curated cross-links when provided, otherwise every other guide.
  const relatedSlugs: string[] =
    Array.isArray(ns.related) && ns.related.length > 0
      ? ns.related
      : TOPIC_MAP.filter((t) => t.ns !== topic).map((t) => t.slug);
  const related = TOPIC_MAP.filter((t) => t.slug !== slug && relatedSlugs.includes(t.slug));

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: ATTRACTION_SHORT_NAME,
        item: absoluteUrl(locale),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: title,
        item: absoluteUrl(locale, slug),
      },
    ],
  };

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: intro.replace(/\*\*/g, '').split('\n\n')[0] || title,
    inLanguage: locale,
    about: { '@id': `${SITE_URL}/#attraction` },
    publisher: {
      '@type': 'Organization',
      name: ATTRACTION_FULL_NAME,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': absoluteUrl(locale, slug),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />

      <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <a
            href={homeHref}
            className="inline-flex items-center gap-2 text-sm font-medium mb-10 transition-colors"
            style={{ color: 'var(--accent)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            {header.backToHome || 'Back to Home'}
          </a>

          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            {title}
          </h1>
          <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />

          {intro && (
            <p className="text-base leading-relaxed whitespace-pre-line mb-12" style={{ color: 'var(--text-secondary)' }}>
              <RichInline text={intro} />
            </p>
          )}

          <div className="space-y-10">
            {sections.map((section, i) => (
              <div key={i}>
                <h2 className="font-display text-xl sm:text-2xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                  {section.heading}
                </h2>
                <p className="text-base leading-relaxed whitespace-pre-line" style={{ color: 'var(--text-secondary)' }}>
                  <RichInline text={section.content} />
                </p>
              </div>
            ))}
          </div>

          <TopicFaq title={faq.title} items={faq.items} />

          {photos.length > 0 && (
            <section className="mt-16">
              <h2 className="font-display text-xl sm:text-2xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
                {ns.photosTitle || 'Photo gallery'}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {photos.map((photo, i) => (
                  <figure key={i} className="rounded-lg overflow-hidden" style={{ border: '1px solid var(--border-color)' }}>
                    <img
                      src={`/gallery/jagalawaterfall-${photo.file}.jpg`}
                      alt={photo.alt}
                      className="w-full h-auto object-cover"
                      loading={i < 2 ? 'eager' : 'lazy'}
                    />
                    <figcaption className="px-3 py-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                      {photo.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
              {ns.photosNote && (
                <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  <RichInline text={ns.photosNote} />
                </p>
              )}
            </section>
          )}

          {sources.length > 0 && (
            <section className="mt-16 pt-10" style={{ borderTop: '1px solid var(--border-color)' }}>
              <h2 className="font-display text-xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                {ns.sourcesTitle || 'Sources & verification'}
              </h2>
              <ul className="space-y-2">
                {sources.map((s, i) => (
                  <li key={i}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm hover:underline"
                      style={{ color: 'var(--accent)' }}
                    >
                      {s.name}
                    </a>
                  </li>
                ))}
              </ul>
              {ns.verifiedNote && (
                <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {ns.verifiedNote}
                </p>
              )}
            </section>
          )}

          {related.length > 0 && (
            <section className="mt-16 pt-10" style={{ borderTop: '1px solid var(--border-color)' }}>
              <h2 className="font-display text-xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
                {ns.relatedTitle || 'More visitor guides'}
              </h2>
              <ul className="space-y-3">
                {related.map((r) => {
                  const rTitle = messages?.[r.ns]?.title || r.slug;
                  return (
                    <li key={r.ns}>
                      <Link
                        href={r.slug}
                        className="group flex items-start gap-3 hover:text-blue-600 transition-colors"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
                        <span className="group-hover:underline underline-offset-4 decoration-blue-300 leading-snug">
                          {rTitle}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
