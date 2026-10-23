import { useMessages } from 'next-intl';
import { Link } from '@/i18n/navigation';
import RichInline from './RichInline';

export default function TopicLinks() {
  const messages = useMessages() as any;
  const ns = messages?.topicLinks;
  if (!ns || !Array.isArray(ns.items) || ns.items.length === 0) return null;

  return (
    <section className="py-14" style={{ background: 'var(--bg-secondary)' }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2
          className="font-display text-2xl sm:text-3xl font-semibold text-center mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {ns.title}
        </h2>
        {ns.subtitle && (
          <p
            className="text-center text-sm sm:text-base mb-10 max-w-2xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            {ns.subtitle}
          </p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ns.items.map((item: { title: string; desc: string; href: string }, i: number) => (
            <Link
              key={i}
              href={item.href}
              className="block rounded-xl p-5 transition-transform hover:-translate-y-0.5"
              style={{
                background: 'var(--bg-base)',
                border: '1px solid var(--border-color)',
              }}
            >
              <h3
                className="font-display text-lg font-semibold mb-1"
                style={{ color: 'var(--text-primary)' }}
              >
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                <RichInline text={item.desc} />
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
