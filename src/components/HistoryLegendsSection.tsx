'use client';

import { useTranslations, useMessages } from 'next-intl';
import { useState } from 'react';
import RichInline from './RichInline';

type FolkloreItem = { id: string; title: string; source: string; text: string };

export default function HistoryLegendsSection() {
  const t = useTranslations('historyLegends');
  const messages = useMessages() as any;
  const subtitle = messages?.historyLegends?.subtitle as string | undefined;
  const historyTitle = messages?.historyLegends?.history?.title as string | undefined;
  const paragraphs = (messages?.historyLegends?.history?.paragraphs || []) as string[];
  const folkloreTitle = messages?.historyLegends?.folklore?.title as string | undefined;
  const items = (messages?.historyLegends?.folklore?.items || []) as FolkloreItem[];
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="history" className="section-padding">
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-6" style={{ background: 'var(--accent)' }} />
        {subtitle && (
          <p
            className="text-sm italic mb-12"
            style={{ color: 'var(--text-tertiary)' }}
          >
            {subtitle}
          </p>
        )}

        {historyTitle && (
          <h3
            className="font-display text-xl sm:text-2xl font-semibold mb-6 pl-4"
            style={{ color: 'var(--text-primary)', borderLeft: '3px solid var(--accent)' }}
          >
            {historyTitle}
          </h3>
        )}

        <div className="space-y-5 mb-16">
          {paragraphs.map((p, i) => (
            <p
              key={i}
              className="text-base leading-8 pl-6"
              style={{
                color: 'var(--text-secondary)',
                borderLeft: '1px dashed var(--border-color)',
                textIndent: '1.5em',
              }}
            >
              <RichInline text={p} />
            </p>
          ))}
        </div>

        {folkloreTitle && (
          <h3
            className="font-display text-xl sm:text-2xl font-semibold mb-8 pl-4"
            style={{ color: 'var(--text-primary)', borderLeft: '3px solid var(--accent)' }}
          >
            {folkloreTitle}
          </h3>
        )}

        <div className="space-y-3">
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={item.id}
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
                  <h4
                    className="font-display text-lg sm:text-xl font-semibold flex-1"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {item.title}
                  </h4>
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
                    <div className="px-5 sm:px-6 pb-6">
                      <div
                        className="text-xs italic mb-4 pb-3 border-b"
                        style={{ color: 'var(--text-tertiary)', borderColor: 'var(--border-color)' }}
                      >
                        {item.source}
                      </div>
                      <p
                        className="text-base leading-8"
                        style={{ color: 'var(--text-secondary)', textIndent: '1.5em' }}
                      >
                        <RichInline text={item.text} />
                      </p>
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
