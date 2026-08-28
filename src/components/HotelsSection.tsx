'use client';

import { useTranslations, useMessages } from 'next-intl';
import RichInline from './RichInline';

type HotelType = { category: string; keywords: string; desc: string; priceRange: string };

export default function HotelsSection() {
  const t = useTranslations('hotels');
  const messages = useMessages() as any;
  const subtitle = messages?.hotels?.subtitle as string | undefined;
  const types = (messages?.hotels?.types || []) as HotelType[];

  return (
    <section id="hotels" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-6" style={{ background: 'var(--accent)' }} />
        {subtitle && (
          <p
            className="text-sm italic mb-10"
            style={{ color: 'var(--text-tertiary)' }}
          >
            {subtitle}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {types.map((type, index) => (
            <HotelTypeCard key={index} {...type} />
          ))}
        </div>
      </div>
    </section>
  );
}

function HotelTypeCard({ category, keywords, desc, priceRange }: HotelType) {
  return (
    <div
      className="rounded-xl p-6 flex gap-4"
      style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
    >
      <div
        className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
        style={{ background: 'var(--accent)', color: 'white' }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 21h18"/>
          <path d="M5 21V7l8-4v18"/>
          <path d="M19 21V11l-6-4"/>
          <path d="M9 9v.01"/>
          <path d="M9 12v.01"/>
          <path d="M9 15v.01"/>
          <path d="M9 18v.01"/>
        </svg>
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-lg mb-2 leading-tight" style={{ color: 'var(--text-primary)' }}>
          {category}
        </h3>
        <div
          className="text-xs mb-3 px-2.5 py-1 rounded-md inline-block"
          style={{ background: 'var(--chip-bg)', color: 'var(--text-tertiary)', border: '1px dashed var(--border-color)' }}
        >
          {keywords}
        </div>
        <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
          <RichInline text={desc} />
        </p>
        <div className="text-right">
          <span
            className="text-sm font-medium inline-block px-3 py-1 rounded-full"
            style={{ color: 'var(--accent)', background: 'var(--accent-alpha)' }}
          >
            {priceRange}
          </span>
        </div>
      </div>
    </div>
  );
}
