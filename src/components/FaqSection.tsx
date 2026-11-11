import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import {
  CAFE_INFO,
  FAQ_CATEGORIES,
  FAQ_ITEMS,
  HERO_FLAVORS,
  type FaqCategory,
} from '../data/cafeData';
import { useReveal } from '../hooks/useReveal';

interface FaqSectionProps {
  activeFlavorIndex: number;
}

export default function FaqSection({ activeFlavorIndex }: FaqSectionProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<FaqCategory>('Menu & Dairy');
  const { ref, visible } = useReveal<HTMLDivElement>();
  const activeFlavor = HERO_FLAVORS[activeFlavorIndex];

  const slugify = (text: string) =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  const filteredFaqs = FAQ_ITEMS.filter(
    (item) => item.category === selectedCategory,
  );

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative w-full bg-white bg-pattern-grid py-24 sm:py-32 lg:py-36 border-b border-zinc-200 overflow-hidden"
    >
      <div
        ref={ref}
        className="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:px-20"
      >
        <div
          className={`flex flex-col lg:flex-row lg:items-end justify-between gap-8 ${
            visible ? 'reveal-visible' : 'reveal-base'
          }`}
        >
          <div className="max-w-3xl">
            <p
              className="text-xs font-semibold uppercase tracking-[0.16em]"
              style={{ color: activeFlavor.textAccent }}
            >
              Frequently Asked Questions
            </p>
            <h2
              id="faq-heading"
              className="mt-3 text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#111115] uppercase leading-[1.02]"
              style={{ fontFamily: 'Anton, sans-serif', letterSpacing: '-0.01em' }}
            >
              Dairy, Orders &amp; Cafe Hours
            </h2>
            <p className="mt-5 text-base sm:text-lg text-zinc-600 leading-relaxed max-w-2xl">
              Quick answers about fresh dairy ingredients, WhatsApp pickup orders, and visiting our
              counter in D Block, Vehari.
            </p>
          </div>

          <a
            href={CAFE_INFO.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-2 self-start lg:self-auto rounded-xl border border-zinc-300 bg-white px-5 text-sm font-medium text-[#111115] no-underline hover:border-zinc-500 hover:-translate-y-px transition-all duration-150"
          >
            <span>Ask on WhatsApp</span>
            <ArrowRight size={15} />
          </a>
        </div>

        {/* Category Filter Tabs */}
        <div className="mt-12 border-b border-zinc-200 pb-6">
          <div
            role="tablist"
            aria-label="FAQ Categories"
            className="inline-flex flex-wrap gap-2 rounded-xl border border-zinc-200 bg-[#F7F7F5] p-1.5"
          >
            {FAQ_CATEGORIES.map((category) => {
              const isSelected = category === selectedCategory;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  id={`tab-${slugify(category)}`}
                  aria-controls="faq-tabpanel"
                  onClick={() => setSelectedCategory(category)}
                  className={`h-11 rounded-lg px-5 text-sm font-medium transition-all duration-200 cursor-pointer border-0 ${
                    isSelected
                      ? 'text-[#111115] font-semibold shadow-xs'
                      : 'bg-transparent text-zinc-600 hover:text-[#111115] hover:bg-white/70'
                  }`}
                  style={
                    isSelected ? { backgroundColor: activeFlavor.bg } : undefined
                  }
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Filtered Questions Panel */}
        <div
          key={selectedCategory}
          id="faq-tabpanel"
          role="tabpanel"
          aria-labelledby={`tab-${slugify(selectedCategory)}`}
          className="panel-switch mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {filteredFaqs.map((faq) => (
            <div
              key={faq.id}
              className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-7 sm:p-9 lg:p-10 transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-400 hover:shadow-sm"
            >
              <span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 transition-transform duration-200 ease-out group-hover:scale-y-100"
                style={{ backgroundColor: activeFlavor.bg }}
              />
              <span
                className="inline-block text-xs font-semibold uppercase tracking-[0.12em]"
                style={{ color: activeFlavor.textAccent }}
              >
                {faq.category}
              </span>
              <h3 className="mt-3 text-xl font-semibold text-[#111115] leading-snug">
                {faq.question}
              </h3>
              <p className="mt-4 text-base text-zinc-700 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
