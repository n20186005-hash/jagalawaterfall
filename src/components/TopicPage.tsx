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

export type TopicKey = 'fromTallinn' | 'parking' | 'winter' | 'photos';

const TOPIC_MAP: { slug: string; ns: TopicKey }[] = [
  { slug: '/from-tallinn', ns: 'fromTallinn' },
  { slug: '/parking', ns: 'parking' },
  { slug: '/winter', ns: 'winter' },
  { slug: '/photos', ns: 'photos' },
];

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

  const related = TOPIC_MAP.filter((t) => t.ns !== topic);

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
