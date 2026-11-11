import { Heart, MessageCircle, Star } from 'lucide-react';
import { CAFE_INFO, HERO_FLAVORS, TESTIMONIALS } from '../data/cafeData';
import { useReveal } from '../hooks/useReveal';

interface TestimonialsWallProps {
  activeFlavorIndex: number;
}

export default function TestimonialsWall({ activeFlavorIndex }: TestimonialsWallProps) {
  const activeFlavor = HERO_FLAVORS[activeFlavorIndex];
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative w-full bg-[#F7F7F5] bg-pattern-dots py-24 sm:py-32 lg:py-36 border-b border-zinc-200 overflow-hidden"
    >
      <div
        ref={ref}
        className="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:px-20"
      >
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between gap-8 ${
            visible ? 'reveal-visible' : 'reveal-base'
          }`}
        >
          <div className="max-w-3xl">
            <p
              className="text-xs font-semibold uppercase tracking-[0.16em]"
              style={{ color: activeFlavor.textAccent }}
            >
              Local Guest Feed · Vehari
            </p>
            <h2
              id="testimonials-heading"
              className="mt-3 text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#111115] uppercase leading-[1.02]"
              style={{ fontFamily: 'Anton, sans-serif', letterSpacing: '-0.01em' }}
            >
              What D Block Guests Say
            </h2>
            <p className="mt-5 text-base sm:text-lg text-zinc-600 leading-relaxed max-w-2xl">
              Rated {CAFE_INFO.ratingScore} ★ across {CAFE_INFO.ratingCount} local reviews on{' '}
              {CAFE_INFO.ratingSource} for fresh dairy ice cream, thick milkshakes, and evening
              Kashmiri chai.
            </p>
          </div>

          <div className="inline-flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white px-5 py-4 self-start md:self-auto shadow-xs">
            <div
              className="flex items-center gap-1.5"
              style={{ color: activeFlavor.textAccent }}
            >
              <Star size={20} fill="currentColor" />
              <span className="text-xl font-bold text-[#111115] tabular-nums">
                {CAFE_INFO.ratingScore}
              </span>
            </div>
            <div className="h-6 w-px bg-zinc-200" aria-hidden="true" />
            <div className="text-xs text-zinc-600 leading-tight">
              <span className="block font-semibold text-[#111115]">
                {CAFE_INFO.ratingCount} Directory Reviews
              </span>
              <span className="text-zinc-500">Vehari, Pakistan</span>
            </div>
          </div>
        </div>

        {/* Wall of X/Twitter-style Testimonial Cards */}
        <div className="mt-16 sm:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {TESTIMONIALS.map((post, idx) => (
            <article
              key={post.id}
              style={{ transitionDelay: `${idx * 65}ms` }}
              className={`group relative overflow-hidden flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-7 sm:p-8 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-zinc-400 hover:shadow-md ${
                visible ? 'reveal-visible' : 'reveal-base'
              }`}
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"
                style={{ backgroundColor: post.avatarBg }}
              />

              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      aria-hidden="true"
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-[#111115] transition-transform duration-300 group-hover:scale-105"
                      style={{ backgroundColor: post.avatarBg }}
                    >
                      {post.initials}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-base font-semibold text-[#111115] truncate">
                          {post.name}
                        </span>
                        <svg
                          aria-label="Verified local reviewer"
                          viewBox="0 0 24 24"
                          className="h-4 w-4 shrink-0"
                          fill={activeFlavor.textAccent}
                        >
                          <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s-2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z" />
                        </svg>
                      </div>
                      <span className="block text-xs text-zinc-500 truncate">
                        {post.handle}
                      </span>
                    </div>
                  </div>

                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-4 w-4 shrink-0 text-zinc-400"
                    fill="currentColor"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </div>

                <p className="mt-5 text-base text-zinc-800 leading-relaxed">
                  “{post.quote}”
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-zinc-200">
                <div className="flex items-center justify-between gap-2 text-xs text-zinc-500">
                  <span>{post.timestamp}</span>
                  <span className="font-semibold text-zinc-700">{post.ordered}</span>
                </div>

                <div className="mt-3.5 flex items-center justify-between text-xs text-zinc-500">
                  <div className="flex items-center gap-4">
                    <span className="inline-flex items-center gap-1.5">
                      <MessageCircle size={14} />
                      <span className="tabular-nums">{post.replies}</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Heart size={14} />
                      <span className="tabular-nums">{post.likes}</span>
                    </span>
                  </div>
                  <span className="font-semibold text-[#111115] tabular-nums">
                    {post.rating}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
