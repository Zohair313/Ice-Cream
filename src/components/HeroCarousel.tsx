import { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { HERO_FLAVORS } from '../data/cafeData';

interface HeroCarouselProps {
  activeIndex: number;
  onChangeIndex: (index: number) => void;
  scrollRequest?: { index: number; nonce: number } | null;
}

type CarouselRole = 'center' | 'left' | 'right' | 'back';

const GRAIN_SVG_URI = `url("data:image/svg+xml;base64,${btoa(
  `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#n)" opacity="0.08"/></svg>`,
)}")`;

const TARGET_PROGRESS = [0, 0.34, 0.67, 0.96];

export default function HeroCarousel({
  activeIndex,
  onChangeIndex,
  scrollRequest,
}: HeroCarouselProps) {
  const trackRef = useRef<HTMLElement | null>(null);
  const programmaticTimer = useRef<number | null>(null);
  const isProgrammatic = useRef(false);
  const activeIdxRef = useRef(activeIndex);
  activeIdxRef.current = activeIndex;

  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 640 : false,
  );

  // Preload all 4 flavor cutout PNGs on mount
  useEffect(() => {
    HERO_FLAVORS.forEach((item) => {
      const img = new Image();
      img.src = item.src;
    });
  }, []);

  // Track responsive viewport breakpoint
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    return () => {
      if (programmaticTimer.current !== null) {
        window.clearTimeout(programmaticTimer.current);
      }
    };
  }, []);

  // Scroll-driven slide progression inside the sticky 320vh hero track
  useEffect(() => {
    let rafId: number | null = null;

    const evaluateScroll = () => {
      rafId = null;
      if (isProgrammatic.current || !trackRef.current) return;

      const rect = trackRef.current.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;

      const scrolled = Math.max(0, Math.min(scrollable, -rect.top));
      const progress = scrolled / scrollable;

      let nextIdx = 0;
      if (progress >= 0.75) nextIdx = 3;
      else if (progress >= 0.5) nextIdx = 2;
      else if (progress >= 0.25) nextIdx = 1;

      if (nextIdx !== activeIdxRef.current) {
        onChangeIndex(nextIdx);
      }
    };

    const onScroll = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(evaluateScroll);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, [onChangeIndex]);

  const scrollToSlide = useCallback(
    (targetIdx: number) => {
      const track = trackRef.current;
      onChangeIndex(targetIdx);
      if (!track) return;

      isProgrammatic.current = true;
      if (programmaticTimer.current !== null) {
        window.clearTimeout(programmaticTimer.current);
      }

      const rect = track.getBoundingClientRect();
      const trackTop = window.scrollY + rect.top;
      const scrollable = Math.max(0, rect.height - window.innerHeight);
      const targetProgress = TARGET_PROGRESS[targetIdx] ?? 0;
      const targetY = Math.round(trackTop + targetProgress * scrollable);

      window.scrollTo({ top: targetY, behavior: 'smooth' });

      programmaticTimer.current = window.setTimeout(() => {
        isProgrammatic.current = false;
      }, 480);
    },
    [onChangeIndex],
  );

  // Respond to external jump requests (Mega Menu / Menu Showcase)
  useEffect(() => {
    if (!scrollRequest) return;
    scrollToSlide(scrollRequest.index);
  }, [scrollRequest, scrollToSlide]);

  const navigate = useCallback(
    (direction: 'next' | 'prev') => {
      const total = HERO_FLAVORS.length;
      const nextIdx =
        direction === 'next'
          ? (activeIdxRef.current + 1) % total
          : (activeIdxRef.current + total - 1) % total;
      scrollToSlide(nextIdx);
    },
    [scrollToSlide],
  );

  // Keyboard Left/Right support when hero is in view
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return;
      if (window.scrollY > window.innerHeight * 2.5) return;
      if (e.key === 'ArrowRight') navigate('next');
      if (e.key === 'ArrowLeft') navigate('prev');
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [navigate]);

  const activeFlavor = HERO_FLAVORS[activeIndex];
  const total = HERO_FLAVORS.length;
  const centerIdx = activeIndex;
  const leftIdx = (activeIndex + total - 1) % total;
  const rightIdx = (activeIndex + 1) % total;

  const getRole = (idx: number): CarouselRole => {
    if (idx === centerIdx) return 'center';
    if (idx === leftIdx) return 'left';
    if (idx === rightIdx) return 'right';
    return 'back';
  };

  const getRoleStyles = (role: CarouselRole): React.CSSProperties => {
    const baseHeight = isMobile ? '48%' : '74%';
    const transition =
      'transform 420ms cubic-bezier(0.22,1,0.36,1), filter 420ms cubic-bezier(0.22,1,0.36,1), opacity 420ms cubic-bezier(0.22,1,0.36,1), left 420ms cubic-bezier(0.22,1,0.36,1), bottom 420ms cubic-bezier(0.22,1,0.36,1)';

    if (role === 'center') {
      return {
        position: 'absolute',
        aspectRatio: '0.6 / 1',
        height: baseHeight,
        left: '50%',
        bottom: isMobile ? '22%' : '5%',
        transformOrigin: 'bottom center',
        transform: `translateX(-50%) scale(${isMobile ? 1.06 : 1.12})`,
        filter: 'blur(0px)',
        opacity: 1,
        zIndex: 20,
        transition,
        willChange: 'transform, filter, opacity',
      };
    }

    if (role === 'left' || role === 'right') {
      return {
        position: 'absolute',
        aspectRatio: '0.6 / 1',
        height: baseHeight,
        left: role === 'left' ? (isMobile ? '17%' : '23%') : isMobile ? '83%' : '77%',
        bottom: isMobile ? '36%' : '29%',
        transformOrigin: 'bottom center',
        transform: `translateX(-50%) scale(${isMobile ? 0.35 : 0.4})`,
        filter: 'blur(2px)',
        opacity: 0.85,
        zIndex: 10,
        cursor: 'pointer',
        transition,
        willChange: 'transform, filter, opacity',
      };
    }

    return {
      position: 'absolute',
      aspectRatio: '0.6 / 1',
      height: baseHeight,
      left: '50%',
      bottom: isMobile ? '38%' : '28%',
      transformOrigin: 'bottom center',
      transform: `translateX(-50%) scale(${isMobile ? 0.27 : 0.3})`,
      filter: 'blur(4px)',
      opacity: 0.85,
      zIndex: 5,
      transition,
      willChange: 'transform, filter, opacity',
    };
  };

  return (
    <section
      ref={trackRef}
      id="top"
      aria-label="Featured Ice Cream and Milkshakes Carousel"
      className="relative w-full"
      style={{ height: '210vh' }}
    >
      {/* Sticky full-viewport stage — no overflow-hidden on ancestor above */}
      <div
        className="sticky top-0 w-full overflow-hidden"
        style={{
          height: '100vh',
          minHeight: '640px',
          backgroundColor: activeFlavor.bg,
          transition: 'background-color 420ms cubic-bezier(0.22,1,0.36,1)',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        {/* Subtle studio concentric rings backdrop */}
        <div
          aria-hidden="true"
          className="bg-pattern-rings absolute inset-0 pointer-events-none"
          style={{ zIndex: 1 }}
        />
        {/* 1. Grain overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 50,
            backgroundImage: GRAIN_SVG_URI,
            backgroundRepeat: 'repeat',
            backgroundSize: '200px 200px',
            opacity: 0.4,
          }}
        />

        {/* 2. Giant ghost text */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none"
          style={{
            zIndex: 2,
            top: isMobile ? '19%' : '16%',
          }}
        >
          <span
            style={{
              fontFamily: 'Anton, sans-serif',
              fontSize: 'clamp(76px, 24vw, 360px)',
              fontWeight: 900,
              color: '#FFFFFF',
              opacity: 1,
              lineHeight: 1,
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              whiteSpace: 'nowrap',
            }}
          >
            {activeFlavor.ghostText}
          </span>
        </div>

        {/* 3. Top-left cafe eyebrow label & scroll indicator */}
        <div
          className="hero-enter absolute top-[76px] sm:top-[88px] left-6 sm:left-10 lg:left-16 right-6 sm:right-10 lg:right-16 flex items-center justify-between gap-4"
          style={{ zIndex: 60 }}
        >
          <div className="flex items-center gap-3 flex-wrap">
            <span
              className="text-xs font-semibold uppercase text-white"
              style={{
                opacity: 0.94,
                letterSpacing: '0.18em',
                textShadow: '0 1px 8px rgba(15,15,18,0.18)',
              }}
            >
              ICE CREAM &amp; MILKSHAKES CAFE · VEHARI
            </span>
            <span className="hidden md:inline-block rounded-full border border-white/40 bg-black/20 px-3 py-0.5 text-[11px] font-medium text-white">
              4.1 ★ (75) · 177 Jinnah Road, D Block
            </span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-2 rounded-full border border-white/35 bg-black/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
            <ArrowDown size={12} />
            <span>Scroll Flavors · 0{activeIndex + 1} / 04</span>
          </div>
        </div>

        {/* 4. 4-item Depth Carousel */}
        <div className="absolute inset-0" style={{ zIndex: 3 }}>
          {HERO_FLAVORS.map((item, idx) => {
            const role = getRole(idx);
            return (
              <div
                key={item.id}
                style={getRoleStyles(role)}
                onClick={() => {
                  if (role === 'left') navigate('prev');
                  if (role === 'right') navigate('next');
                }}
                aria-hidden={role !== 'center'}
              >
                <img
                  src={item.src}
                  alt={role === 'center' ? `${item.title} — ${item.serveType}` : item.title}
                  width={720}
                  height={1200}
                  draggable={false}
                  className={role === 'center' ? 'hero-float' : ''}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    objectPosition: 'bottom center',
                    filter: 'drop-shadow(0 24px 36px rgba(15, 15, 18, 0.24))',
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* 5. Bottom-left active flavor title, description, and circular controls */}
        <div
          className="hero-enter-delay absolute bottom-6 left-6 sm:bottom-12 sm:left-10 lg:left-16"
          style={{ zIndex: 60, maxWidth: '340px' }}
        >
          <div className="mb-1.5 flex items-center gap-2">
            <span className="inline-block rounded bg-black/25 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
              {activeFlavor.price} · {activeFlavor.serveType}
            </span>
          </div>

          <h1
            className="mb-2 sm:mb-3 text-base sm:text-[22px] font-bold uppercase text-white"
            style={{
              opacity: 0.98,
              letterSpacing: '0.02em',
              textShadow: '0 1px 10px rgba(15,15,18,0.22)',
            }}
          >
            {activeFlavor.title}
          </h1>

          <p
            className="hidden sm:block mb-4 sm:mb-5 text-xs sm:text-sm text-white"
            style={{
              opacity: 0.92,
              lineHeight: 1.6,
              textShadow: '0 1px 8px rgba(15,15,18,0.18)',
            }}
          >
            {activeFlavor.description}
          </p>

          <div className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => navigate('prev')}
              aria-label="Previous ice cream flavor"
              className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full border-2 border-white bg-transparent text-white cursor-pointer hover:scale-[1.08] hover:bg-white/[0.12] active:scale-[0.98]"
              style={{
                transition:
                  'transform 150ms cubic-bezier(0.2,0.8,0.2,1), background-color 150ms cubic-bezier(0.2,0.8,0.2,1)',
              }}
            >
              <ArrowLeft size={26} strokeWidth={2.25} />
            </button>

            <button
              type="button"
              onClick={() => navigate('next')}
              aria-label="Next ice cream flavor"
              className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full border-2 border-white bg-transparent text-white cursor-pointer hover:scale-[1.08] hover:bg-white/[0.12] active:scale-[0.98]"
              style={{
                transition:
                  'transform 150ms cubic-bezier(0.2,0.8,0.2,1), background-color 150ms cubic-bezier(0.2,0.8,0.2,1)',
              }}
            >
              <ArrowRight size={26} strokeWidth={2.25} />
            </button>

            <div className="ml-2 flex items-center gap-1.5" aria-label="Flavor index">
              {HERO_FLAVORS.map((flavor, idx) => (
                <button
                  key={flavor.id}
                  type="button"
                  onClick={() => scrollToSlide(idx)}
                  aria-label={`Show ${flavor.title}`}
                  className="h-2 rounded-full cursor-pointer transition-all duration-300"
                  style={{
                    width: idx === activeIndex ? '24px' : '8px',
                    backgroundColor:
                      idx === activeIndex ? '#FFFFFF' : 'rgba(255,255,255,0.45)',
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 6. Bottom-right Anton CTA link */}
        <a
          href="#menu"
          className="group absolute bottom-6 right-6 sm:bottom-12 sm:right-10 lg:right-16 flex items-center gap-2 sm:gap-3 text-white no-underline opacity-95 hover:opacity-100"
          style={{
            zIndex: 60,
            fontFamily: 'Anton, sans-serif',
            fontSize: 'clamp(22px, 4vw, 56px)',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            lineHeight: 1,
            textTransform: 'uppercase',
            transition: 'opacity 200ms ease',
            textShadow: '0 2px 12px rgba(15,15,18,0.2)',
          }}
        >
          <span>SEE THE MENU</span>
          <ArrowRight
            className="h-5 w-5 sm:h-8 sm:w-8 transition-transform duration-150 ease-out group-hover:translate-x-1"
            strokeWidth={2.25}
          />
        </a>
      </div>
    </section>
  );
}
