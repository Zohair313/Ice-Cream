import { HERO_FLAVORS, STATS_ITEMS } from '../data/cafeData';
import { useReveal } from '../hooks/useReveal';

interface StatsBarProps {
  activeFlavorIndex: number;
}

export default function StatsBar({ activeFlavorIndex }: StatsBarProps) {
  const activeFlavor = HERO_FLAVORS[activeFlavorIndex];
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section
      aria-label="Cafe Highlights"
      className="relative w-full bg-[#F7F7F5] bg-pattern-grid py-20 sm:py-24 lg:py-28 border-b border-zinc-200 overflow-hidden"
    >
      <div
        ref={ref}
        className="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:px-20"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {STATS_ITEMS.map((stat, idx) => (
            <div
              key={stat.id}
              style={{ transitionDelay: `${idx * 70}ms` }}
              className={`group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-8 sm:p-10 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-zinc-400 hover:shadow-md ${
                visible ? 'reveal-visible' : 'reveal-base'
              }`}
            >
              {/* Animated top accent rule on hover */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"
                style={{ backgroundColor: activeFlavor.bg }}
              />

              <div className="flex items-center justify-between gap-4">
                <span
                  className="text-4xl sm:text-5xl tracking-tight text-[#111115] tabular-nums"
                  style={{ fontFamily: 'Anton, sans-serif' }}
                >
                  {stat.value}
                </span>
                <span className="relative flex h-3 w-3 items-center justify-center">
                  {idx === 0 && (
                    <span
                      aria-hidden="true"
                      className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-55"
                      style={{ backgroundColor: activeFlavor.bg }}
                    />
                  )}
                  <span
                    aria-hidden="true"
                    className="relative inline-flex h-3 w-3 rounded-full transition-colors duration-500"
                    style={{
                      backgroundColor: idx === 0 ? activeFlavor.bg : '#E4E4E7',
                    }}
                  />
                </span>
              </div>

              <p className="mt-5 text-lg font-semibold text-[#111115]">
                {stat.label}
              </p>
              <p className="mt-2 text-base text-zinc-600 leading-relaxed">
                {stat.sublabel}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
