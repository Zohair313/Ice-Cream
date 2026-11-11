import { useState } from 'react';
import { ArrowLeft, ArrowRight, Play } from 'lucide-react';
import {
  CAFE_INFO,
  HERO_FLAVORS,
  MENU_ITEMS,
  type MenuItem,
} from '../data/cafeData';
import { useReveal } from '../hooks/useReveal';

interface MenuShowcaseProps {
  activeFlavorIndex: number;
  onSelectFlavor: (index: number) => void;
  onOpenOnboarding: () => void;
}

type CategoryFilter = 'all' | MenuItem['category'];

const FILTER_OPTIONS: { id: CategoryFilter; label: string }[] = [
  { id: 'all', label: 'All Menu Items' },
  { id: 'ice-cream', label: 'Fresh Dairy Ice Cream' },
  { id: 'milkshakes', label: 'Thick Milkshakes' },
  { id: 'kashmiri-chai', label: 'Kashmiri Chai' },
];

const ITEMS_PER_PAGE = 6;

export default function MenuShowcase({
  activeFlavorIndex,
  onSelectFlavor,
  onOpenOnboarding,
}: MenuShowcaseProps) {
  const [filter, setFilter] = useState<CategoryFilter>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const { ref, visible } = useReveal<HTMLDivElement>();

  const activeFlavor = HERO_FLAVORS[activeFlavorIndex];

  const filteredItems =
    filter === 'all'
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) => item.category === filter);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleSelectFilter = (nextFilter: CategoryFilter) => {
    setFilter(nextFilter);
    setCurrentPage(1);
  };

  const buildItemWhatsAppUrl = (itemName: string) =>
    `https://wa.me/923259006218?text=${encodeURIComponent(
      `Assalam-o-Alaikum, I would like to order ${itemName} from Ice Cream & Milkshakes Cafe (177 Jinnah Road, D Block, Vehari).`,
    )}`;

  return (
    <section
      id="menu"
      aria-labelledby="menu-heading"
      className="relative w-full bg-white bg-pattern-diagonal py-24 sm:py-32 lg:py-36 border-b border-zinc-200 overflow-hidden"
    >
      <div
        ref={ref}
        className="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:px-20"
      >
        {/* Section Head Row */}
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
              Daily Counter · 177 Jinnah Road, D Block
            </p>
            <h2
              id="menu-heading"
              className="mt-3 text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#111115] uppercase leading-[1.02]"
              style={{ fontFamily: 'Anton, sans-serif', letterSpacing: '-0.01em' }}
            >
              Fresh Dairy Scoops, Shakes &amp; Kashmiri Chai
            </h2>
            <p className="mt-5 text-base sm:text-lg text-zinc-600 leading-relaxed max-w-2xl">
              Churned fresh with local dairy milk and served at our D Block counter. Call or message{' '}
              <a
                href={CAFE_INFO.phoneHref}
                className="font-medium text-[#111115] underline underline-offset-4 decoration-zinc-400 hover:decoration-[#111115]"
              >
                {CAFE_INFO.phoneDisplay}
              </a>{' '}
              for quick pickup.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={onOpenOnboarding}
              className="inline-flex h-12 items-center gap-2 rounded-xl border border-zinc-300 bg-white px-5 text-sm font-medium text-[#111115] hover:bg-zinc-100 hover:-translate-y-px active:translate-y-0 transition-all duration-150 cursor-pointer"
            >
              <Play size={14} fill="currentColor" />
              <span>Watch 45s Cafe Tour</span>
            </button>

            <a
              href={CAFE_INFO.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-xl px-6 text-sm font-semibold text-[#111115] no-underline hover:-translate-y-px active:scale-[0.98] transition-all duration-150"
              style={{ backgroundColor: activeFlavor.bg }}
            >
              <span>Order via WhatsApp</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>

        {/* 4 Studio Flavor Cards */}
        <div className="mt-16 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {HERO_FLAVORS.map((flavor, idx) => {
            const isSelected = idx === activeFlavorIndex;
            return (
              <div
                key={flavor.id}
                style={{ transitionDelay: `${idx * 75}ms` }}
                className={`group flex flex-col rounded-2xl border bg-white overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg ${
                  isSelected
                    ? 'border-zinc-900 shadow-sm'
                    : 'border-zinc-200 hover:border-zinc-400'
                } ${visible ? 'reveal-visible' : 'reveal-base'}`}
              >
                <button
                  type="button"
                  onClick={() => onSelectFlavor(idx)}
                  aria-label={`Spotlight ${flavor.title} in hero carousel`}
                  className="bg-pattern-rings relative h-72 sm:h-80 w-full overflow-hidden flex items-end justify-center pt-6 px-6 cursor-pointer border-0"
                  style={{ backgroundColor: flavor.panel }}
                >
                  <img
                    src={flavor.src}
                    alt={flavor.title}
                    width={720}
                    height={1200}
                    loading="lazy"
                    className="h-full w-auto max-w-full object-contain object-bottom transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                    style={{
                      filter: 'drop-shadow(0 16px 24px rgba(15, 15, 18, 0.22))',
                    }}
                  />
                </button>

                <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs font-medium uppercase tracking-wider text-zinc-500 truncate">
                        {flavor.serveType}
                      </span>
                      <span
                        className="text-sm font-bold tabular-nums whitespace-nowrap shrink-0"
                        style={{ color: flavor.textAccent }}
                      >
                        {flavor.price}
                      </span>
                    </div>
                    <h3 className="mt-2 text-lg font-semibold text-[#111115]">
                      {flavor.title}
                    </h3>
                  </div>

                  <div className="mt-6 pt-4 border-t border-zinc-200 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectFlavor(idx)}
                      className="text-xs font-medium text-zinc-600 hover:text-[#111115] bg-transparent border-0 p-0 cursor-pointer underline underline-offset-4 decoration-zinc-300 hover:decoration-[#111115]"
                    >
                      View in Hero
                    </button>

                    <a
                      href={buildItemWhatsAppUrl(flavor.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#111115] no-underline group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>Order Cup</span>
                      <ArrowRight size={13} />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Filterable & Paginated Counter Menu */}
        <div className="mt-24 sm:mt-28 rounded-3xl border border-zinc-200 bg-white p-6 sm:p-10 lg:p-14 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-zinc-200">
            <div>
              <h3 className="text-2xl sm:text-3xl font-semibold text-[#111115]">
                Full Counter Menu &amp; Takeaway Packs
              </h3>
              <p className="mt-1.5 text-sm text-zinc-500">
                Counter prices in PKR. Message {CAFE_INFO.phoneDisplay} for today&apos;s fresh tub batch.
              </p>
            </div>

            <div
              role="tablist"
              aria-label="Filter menu categories"
              className="flex flex-wrap gap-2.5"
            >
              {FILTER_OPTIONS.map((opt) => {
                const active = filter === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => handleSelectFilter(opt.id)}
                    className={`h-11 rounded-xl px-5 text-sm font-medium transition-all duration-150 cursor-pointer border ${
                      active
                        ? 'text-[#111115] border-transparent font-semibold'
                        : 'bg-[#F7F7F5] text-zinc-700 border-zinc-200 hover:border-zinc-400 hover:text-[#111115]'
                    }`}
                    style={active ? { backgroundColor: activeFlavor.bg } : undefined}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div
            key={`${filter}-${safePage}`}
            className="panel-switch grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20"
          >
            {paginatedItems.map((item) => (
              <div
                key={item.id}
                className="group flex items-start justify-between gap-6 py-7 sm:py-8 border-b border-zinc-200 transition-colors duration-150 hover:bg-[#F7F7F5]/60 px-2 -mx-2 rounded-lg"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h4 className="text-lg font-semibold text-[#111115]">
                      {item.name}
                    </h4>
                    {item.popular && (
                      <span
                        className="rounded-md px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-[#111115]"
                        style={{ backgroundColor: activeFlavor.panel }}
                      >
                        House Favorite
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-base text-zinc-600 leading-relaxed">
                    {item.description}
                  </p>
                  <span className="mt-2.5 inline-block text-xs font-medium text-zinc-500">
                    {item.categoryLabel} · {item.portion}
                  </span>
                </div>

                <div className="flex flex-col items-end shrink-0 gap-2.5">
                  <span className="text-lg font-semibold text-[#111115] tabular-nums">
                    {item.price}
                  </span>
                  <a
                    href={buildItemWhatsAppUrl(item.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-zinc-600 hover:text-[#111115] no-underline inline-flex items-center gap-1 transition-transform duration-150 group-hover:translate-x-0.5"
                  >
                    <span>Order</span>
                    <ArrowRight size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Menu Pagination Controls */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <p className="text-sm text-zinc-600 tabular-nums">
              Showing{' '}
              <span className="font-semibold text-[#111115]">
                {startIndex + 1}–{Math.min(startIndex + ITEMS_PER_PAGE, filteredItems.length)}
              </span>{' '}
              of{' '}
              <span className="font-semibold text-[#111115]">{filteredItems.length}</span>{' '}
              counter items
            </p>

            <nav aria-label="Menu pagination" className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={safePage <= 1}
                aria-label="Previous menu page"
                className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-zinc-300 bg-white px-3.5 text-sm font-medium text-[#111115] hover:bg-zinc-100 disabled:opacity-40 disabled:pointer-events-none cursor-pointer transition-colors"
              >
                <ArrowLeft size={14} />
                <span>Prev</span>
              </button>

              <div className="flex items-center gap-1.5">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                  const isCurrent = pageNum === safePage;
                  return (
                    <button
                      key={pageNum}
                      type="button"
                      onClick={() => setCurrentPage(pageNum)}
                      aria-label={`Page ${pageNum}`}
                      aria-current={isCurrent ? 'page' : undefined}
                      className={`h-10 w-10 rounded-lg text-sm font-semibold tabular-nums transition-all cursor-pointer border ${
                        isCurrent
                          ? 'text-[#111115] border-transparent shadow-xs'
                          : 'bg-[#F7F7F5] text-zinc-700 border-zinc-200 hover:border-zinc-400 hover:text-[#111115]'
                      }`}
                      style={
                        isCurrent ? { backgroundColor: activeFlavor.bg } : undefined
                      }
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={safePage >= totalPages}
                aria-label="Next menu page"
                className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-zinc-300 bg-white px-3.5 text-sm font-medium text-[#111115] hover:bg-zinc-100 disabled:opacity-40 disabled:pointer-events-none cursor-pointer transition-colors"
              >
                <span>Next</span>
                <ArrowRight size={14} />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}
