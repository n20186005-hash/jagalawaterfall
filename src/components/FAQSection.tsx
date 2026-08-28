'use client';

import { useTranslations, useMessages } from 'next-intl';
import { useState } from 'react';

type FaqItem = { question: string; answer: string };

export default function FAQSection() {
  const t = useTranslations('faq');
  const messages = useMessages() as any;
  const items: FaqItem[] = messages?.faq?.items || [];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-padding">
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6 text-center"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-12 mx-auto" style={{ background: 'var(--accent)' }} />

        <div className="space-y-3">
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl overflow-hidden border transition-all"
                style={{
                  background: 'var(--bg-tertiary)',
                  borderColor: isOpen ? 'var(--accent)' : 'var(--border-color)',
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left p-5 sm:p-6 gap-4"
                  aria-expanded={isOpen}
                >
                  <h3
                    className="font-display text-lg sm:text-xl font-semibold flex-1"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {item.question}
                  </h3>
                  <span
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform"
                    style={{
                      background: isOpen ? 'var(--accent)' : 'transparent',
                      border: '1px solid var(--border-color)',
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={isOpen ? 'white' : 'currentColor'}
                      strokeWidth="2.5"
                      className={`transition-transform ${isOpen ? 'rotate-45' : ''}`}
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </span>
                </button>
                <div
                  className="grid transition-all duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <div
                      className="px-5 sm:px-6 pb-6 text-base leading-relaxed"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {item.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
