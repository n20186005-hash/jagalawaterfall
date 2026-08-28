'use client';

import { ReactNode } from 'react';
import { useTranslations, useMessages } from 'next-intl';
import RichInline from './RichInline';

type AmenityItem = { id: string; title: string; level: string; desc: string };

const IconMap: Record<AmenityItem['id'], ReactNode> = {
  wc: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 21V10a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v11" />
      <circle cx="12" cy="5" r="2" />
      <path d="M9 21h6" />
    </svg>
  ),
  parking: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
    </svg>
  ),
  dining: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2v7a3 3 0 0 0 6 0V2" />
      <path d="M9 2v20" />
      <path d="M17 2c-2 0-3 2-3 5s1 5 3 5v10" />
    </svg>
  ),
  lodging: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18" />
      <path d="M5 21V7l8-4v18" />
      <path d="M19 21V11l-6-4" />
    </svg>
  ),
  grocery: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  ),
  fuel: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 22V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v18" />
      <path d="M3 22h8" />
      <path d="M11 11h5a3 3 0 0 1 3 3v5" />
      <path d="M15 7h4v3a2 2 0 0 0 2 2v0a2 2 0 0 0 2-2V8l-2-4" />
      <path d="M6 7h3" />
    </svg>
  ),
};

export default function AmenitiesSection() {
  const t = useTranslations('amenities');
  const messages = useMessages() as any;
  const subtitle = messages?.amenities?.subtitle as string | undefined;
  const items = (messages?.amenities?.items || []) as AmenityItem[];

  return (
    <section id="amenities" className="section-padding">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-xl p-6 flex gap-4 transition-shadow hover:shadow-md"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <div
                className="flex-shrink-0 w-11 h-11 rounded-lg flex items-center justify-center"
                style={{ background: 'var(--accent-alpha)', color: 'var(--accent)' }}
              >
                {IconMap[item.id] ?? (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4" />
                    <path d="M12 8h.01" />
                  </svg>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3
                  className="font-semibold text-lg mb-1 leading-tight"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {item.title}
                </h3>
                <div
                  className="text-xs mb-3 uppercase tracking-wider"
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  {item.level}
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <RichInline text={item.desc} />
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
