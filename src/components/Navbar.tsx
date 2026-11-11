import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronDown, Menu, Play, Phone, X } from 'lucide-react';
import { CAFE_INFO, HERO_FLAVORS, MEGA_MENUS } from '../data/cafeData';

interface NavbarProps {
  activeFlavorIndex: number;
  onSelectFlavor: (index: number) => void;
  onOpenOnboarding: () => void;
}

type MegaKey = 'menu' | 'specialties' | null;

export default function Navbar({
  activeFlavorIndex,
  onSelectFlavor,
  onOpenOnboarding,
}: NavbarProps) {
  const [openMega, setOpenMega] = useState<MegaKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const intentTimer = useRef<number | null>(null);
  const closeTimer = useRef<number | null>(null);

  const activeFlavor = HERO_FLAVORS[activeFlavorIndex];

  const clearTimers = () => {
    if (intentTimer.current !== null) {
      window.clearTimeout(intentTimer.current);
      intentTimer.current = null;
    }
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  useEffect(() => {
    return () => clearTimers();
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenMega(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleOpenIntent = (key: Exclude<MegaKey, null>) => {
    clearTimers();
    if (openMega) {
      setOpenMega(key);
      return;
    }
    intentTimer.current = window.setTimeout(() => {
      setOpenMega(key);
    }, 110);
  };

  const handleScheduleClose = () => {
    clearTimers();
    closeTimer.current = window.setTimeout(() => {
      setOpenMega(null);
    }, 160);
  };

  const handleKeepOpen = () => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const handleNavJump = (href: string) => {
    setOpenMega(null);
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className="fixed top-0 inset-x-0 z-[70] h-16 bg-white border-b border-zinc-200"
      onMouseLeave={handleScheduleClose}
    >
      <div className="flex h-full w-full items-center justify-between px-6 sm:px-10 lg:px-16 xl:px-20">
        {/* Left: Cafe Mark + Wordmark */}
        <a
          href="#top"
          onClick={() => {
            setOpenMega(null);
            setMobileOpen(false);
          }}
          className="flex items-center gap-3 no-underline group"
        >
          <span
            aria-hidden="true"
            className="flex h-8 w-8 items-center justify-center rounded-md transition-colors duration-500"
            style={{ backgroundColor: activeFlavor.bg }}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
              <circle cx="12" cy="8.5" r="4.5" fill="#111115" />
              <path d="M8 12.5L12 20.5L16 12.5H8Z" fill="#111115" />
            </svg>
          </span>
          <div className="flex flex-col leading-none">
            <span
              className="text-sm sm:text-base tracking-wide text-[#111115] uppercase"
              style={{ fontFamily: 'Anton, sans-serif', letterSpacing: '0.04em' }}
            >
              ICE CREAM &amp; MILKSHAKES
            </span>
            <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-zinc-500">
              D Block · Vehari
            </span>
          </div>
        </a>

        {/* Center: Desktop Nav Links */}
        <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-8">
          <div className="relative" onMouseEnter={() => handleOpenIntent('menu')}>
            <button
              type="button"
              aria-expanded={openMega === 'menu'}
              onClick={() => setOpenMega(openMega === 'menu' ? null : 'menu')}
              className="nav-underline flex items-center gap-1.5 py-2 text-sm font-medium text-zinc-700 hover:text-[#111115] cursor-pointer bg-transparent border-0"
            >
              <span>Menu</span>
              <ChevronDown
                size={15}
                className={`transition-transform duration-200 ${
                  openMega === 'menu' ? 'rotate-180 text-[#111115]' : 'text-zinc-500'
                }`}
              />
            </button>
          </div>

          <div
            className="relative"
            onMouseEnter={() => handleOpenIntent('specialties')}
          >
            <button
              type="button"
              aria-expanded={openMega === 'specialties'}
              onClick={() =>
                setOpenMega(openMega === 'specialties' ? null : 'specialties')
              }
              className="nav-underline flex items-center gap-1.5 py-2 text-sm font-medium text-zinc-700 hover:text-[#111115] cursor-pointer bg-transparent border-0"
            >
              <span>Specialties</span>
              <ChevronDown
                size={15}
                className={`transition-transform duration-200 ${
                  openMega === 'specialties'
                    ? 'rotate-180 text-[#111115]'
                    : 'text-zinc-500'
                }`}
              />
            </button>
          </div>

          <a
            href="#testimonials"
            onMouseEnter={() => setOpenMega(null)}
            className="nav-underline py-2 text-sm font-medium text-zinc-700 hover:text-[#111115] no-underline"
          >
            Reviews
          </a>
          <a
            href="#faq"
            onMouseEnter={() => setOpenMega(null)}
            className="nav-underline py-2 text-sm font-medium text-zinc-700 hover:text-[#111115] no-underline"
          >
            FAQ
          </a>
          <a
            href="#contact"
            onMouseEnter={() => setOpenMega(null)}
            className="nav-underline py-2 text-sm font-medium text-zinc-700 hover:text-[#111115] no-underline"
          >
            Visit &amp; Contact
          </a>
        </nav>

        {/* Right: Actions + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenOnboarding}
            className="hidden sm:inline-flex h-10 items-center gap-2 rounded-lg border border-zinc-300 bg-[#F7F7F5] px-4 text-sm font-medium text-[#111115] hover:bg-zinc-200/70 hover:-translate-y-px active:translate-y-0 transition-all duration-150 cursor-pointer"
          >
            <Play size={14} fill="currentColor" />
            <span>Cafe Tour</span>
          </button>

          <a
            href={CAFE_INFO.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex h-10 items-center gap-2 rounded-lg px-4 text-sm font-semibold text-[#111115] no-underline hover:-translate-y-px active:scale-[0.98] transition-all duration-150"
            style={{ backgroundColor: activeFlavor.bg }}
          >
            <span>Order on WhatsApp</span>
            <ArrowRight size={15} strokeWidth={2.25} />
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="inline-flex lg:hidden h-11 w-11 items-center justify-center rounded-lg border border-zinc-300 bg-[#F7F7F5] text-[#111115] cursor-pointer"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Full-Width Hover Mega Menu Dropdown */}
      <div
        onMouseEnter={handleKeepOpen}
        onMouseLeave={handleScheduleClose}
        className={`hidden lg:block fixed top-16 inset-x-0 z-[65] bg-white border-b border-zinc-200 shadow-xl transition-all duration-200 ease-out ${
          openMega
            ? 'opacity-100 translate-y-0 pointer-events-auto visible'
            : 'opacity-0 -translate-y-1.5 pointer-events-none invisible'
        }`}
        aria-hidden={!openMega}
      >
        {openMega && (
          <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-20 py-10">
            <div className="grid grid-cols-12 gap-10 items-start">
              {/* Categorized Sub-Links */}
              <div
                className={`col-span-7 grid gap-10 ${
                  MEGA_MENUS[openMega].length === 3 ? 'grid-cols-3' : 'grid-cols-2'
                }`}
              >
                {MEGA_MENUS[openMega].map((category) => (
                  <div key={category.title}>
                    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                      {category.title}
                    </p>
                    <ul className="space-y-3.5 list-none p-0 m-0">
                      {category.items.map((item) => (
                        <li key={item.name}>
                          <a
                            href={item.href}
                            onClick={(e) => {
                              e.preventDefault();
                              handleNavJump(item.href);
                            }}
                            className="group block rounded-xl p-2.5 -mx-2.5 hover:bg-[#F7F7F5] no-underline transition-colors duration-150"
                          >
                            <div className="flex items-baseline justify-between gap-2">
                              <span className="text-sm font-semibold text-[#111115] group-hover:underline">
                                {item.name}
                              </span>
                              <span
                                className="text-xs font-semibold tabular-nums shrink-0"
                                style={{ color: activeFlavor.textAccent }}
                              >
                                {item.price}
                              </span>
                            </div>
                            <p className="mt-0.5 text-xs text-zinc-600 leading-relaxed">
                              {item.detail}
                            </p>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Visual Flavor Previews */}
              <div className="col-span-5 border-l border-zinc-200 pl-10">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                    Featured Flavors · Click to Preview
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setOpenMega(null);
                      onOpenOnboarding();
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-700 hover:text-[#111115] cursor-pointer bg-transparent border-0"
                  >
                    <Play size={12} fill="currentColor" />
                    <span>45s Cafe Tour</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {HERO_FLAVORS.map((flavor, idx) => {
                    const isSelected = idx === activeFlavorIndex;
                    return (
                      <button
                        key={flavor.id}
                        type="button"
                        onClick={() => {
                          onSelectFlavor(idx);
                          setOpenMega(null);
                        }}
                        className={`group flex items-center gap-3.5 rounded-xl border p-3 text-left transition-all duration-150 cursor-pointer hover:-translate-y-0.5 ${
                          isSelected
                            ? 'border-zinc-900 bg-[#F7F7F5]'
                            : 'border-zinc-200 bg-white hover:border-zinc-400'
                        }`}
                      >
                        <div
                          className="relative h-16 w-12 shrink-0 overflow-hidden rounded-lg flex items-end justify-center p-1"
                          style={{ backgroundColor: flavor.panel }}
                        >
                          <img
                            src={flavor.src}
                            alt={flavor.title}
                            width={720}
                            height={1200}
                            loading="lazy"
                            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div className="min-w-0">
                          <span
                            className="block text-[11px] font-semibold uppercase tracking-wider"
                            style={{ color: flavor.textAccent }}
                          >
                            {flavor.price}
                          </span>
                          <span className="mt-0.5 block text-xs font-semibold text-[#111115] leading-snug">
                            {flavor.title}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 bottom-0 z-[65] overflow-y-auto bg-white border-t border-zinc-200 px-6 py-8">
          <div className="space-y-8">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                Sections
              </p>
              <div className="flex flex-col divide-y divide-zinc-200 border-y border-zinc-200">
                {[
                  { label: 'Fresh Dairy & Shakes Menu', href: '#menu' },
                  { label: 'Guest Reviews (4.1 ★)', href: '#testimonials' },
                  { label: 'Questions & Answers', href: '#faq' },
                  { label: 'Contact & Hours', href: '#contact' },
                ].map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavJump(link.href);
                    }}
                    className="flex h-14 items-center justify-between text-base font-medium text-[#111115] no-underline"
                  >
                    <span>{link.label}</span>
                    <ArrowRight size={16} className="text-zinc-500" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                Jump to Signature Flavor
              </p>
              <div className="grid grid-cols-2 gap-3">
                {HERO_FLAVORS.map((flavor, idx) => (
                  <button
                    key={flavor.id}
                    type="button"
                    onClick={() => {
                      onSelectFlavor(idx);
                      setMobileOpen(false);
                    }}
                    className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-[#F7F7F5] p-3 text-left cursor-pointer"
                  >
                    <div
                      className="h-12 w-10 shrink-0 rounded-md p-1 flex items-center justify-center"
                      style={{ backgroundColor: flavor.panel }}
                    >
                      <img
                        src={flavor.src}
                        alt={flavor.title}
                        width={720}
                        height={1200}
                        loading="lazy"
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-xs font-semibold text-[#111115] leading-snug">
                        {flavor.title}
                      </span>
                      <span className="block text-[11px] text-zinc-600">{flavor.price}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onOpenOnboarding();
                }}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-zinc-300 bg-[#F7F7F5] text-sm font-medium text-[#111115] cursor-pointer"
              >
                <Play size={15} fill="currentColor" />
                <span>Watch 45s Cafe Walkthrough</span>
              </button>

              <a
                href={CAFE_INFO.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold text-[#111115] no-underline"
                style={{ backgroundColor: activeFlavor.bg }}
              >
                <span>Order on WhatsApp</span>
                <ArrowRight size={16} />
              </a>

              <a
                href={CAFE_INFO.phoneHref}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-zinc-300 bg-white text-sm font-medium text-[#111115] no-underline"
              >
                <Phone size={15} />
                <span>Call {CAFE_INFO.phoneDisplay}</span>
              </a>
            </div>

            <div className="border-t border-zinc-200 pt-4 text-xs text-zinc-600">
              <p>{CAFE_INFO.address}</p>
              <p className="mt-1">Daily · 1:00 PM – 11:30 PM (Fri from 3:00 PM)</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
