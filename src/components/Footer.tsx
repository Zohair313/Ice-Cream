import { useState, type FormEvent } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { CAFE_INFO, HERO_FLAVORS } from '../data/cafeData';
import { useReveal } from '../hooks/useReveal';

interface FooterProps {
  activeFlavorIndex: number;
  onOpenOnboarding: () => void;
}

export default function Footer({
  activeFlavorIndex,
  onOpenOnboarding,
}: FooterProps) {
  const activeFlavor = HERO_FLAVORS[activeFlavorIndex];
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [subscribedEmail, setSubscribedEmail] = useState<string | null>(null);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes('@') || !trimmed.includes('.')) {
      setError('Write a valid email address with an @ symbol.');
      setSubscribedEmail(null);
      return;
    }
    setError('');
    setSubscribedEmail(trimmed);
    setEmail('');
  };

  return (
    <footer className="relative w-full bg-white text-[#111115] overflow-hidden">
      <div
        ref={ref}
        className="w-full px-6 sm:px-10 lg:px-16 xl:px-20 pt-24 sm:pt-32 pb-12"
      >
        {/* Dominant Element: Newsletter Signup */}
        <div
          className={`rounded-3xl border border-zinc-200 bg-[#F7F7F5] bg-pattern-diagonal p-8 sm:p-12 lg:p-16 ${
            visible ? 'reveal-visible' : 'reveal-base'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-end">
            <div className="lg:col-span-7">
              <p
                className="text-xs font-semibold uppercase tracking-[0.16em]"
                style={{ color: activeFlavor.textAccent }}
              >
                Seasonal Batch Alerts · Vehari
              </p>
              <h2
                className="mt-3 text-4xl sm:text-6xl lg:text-[72px] text-[#111115] uppercase leading-[0.95] tracking-tight"
                style={{ fontFamily: 'Anton, sans-serif' }}
              >
                Get Fresh Flavor Drops &amp; Chai Specials
              </h2>
              <p className="mt-5 max-w-2xl text-base sm:text-lg text-zinc-600 leading-relaxed">
                Seasonal Multan Chaunsa mango batches, winter Kashmiri chai pots, and evening
                counter updates from 177 Jinnah Road, D Block.
              </p>
            </div>

            <div className="lg:col-span-5">
              <form onSubmit={handleSubscribe} noValidate className="space-y-3">
                <label
                  htmlFor="newsletter-email"
                  className="block text-sm font-medium text-zinc-800"
                >
                  Email address
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    id="newsletter-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? 'newsletter-error' : undefined}
                    placeholder="you@example.com"
                    className="h-14 flex-1 rounded-xl border border-zinc-300 bg-white px-4 text-base text-[#111115] placeholder:text-zinc-500 focus:border-zinc-900 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="inline-flex h-14 shrink-0 items-center justify-center gap-2 rounded-xl px-7 text-base font-semibold text-[#111115] border-0 cursor-pointer hover:-translate-y-px active:scale-[0.98] transition-all duration-150"
                    style={{ backgroundColor: activeFlavor.bg }}
                  >
                    <span>Subscribe</span>
                    <ArrowRight size={17} strokeWidth={2.25} />
                  </button>
                </div>

                {error && (
                  <p id="newsletter-error" className="text-xs text-rose-600">
                    {error}
                  </p>
                )}

                {subscribedEmail && (
                  <p
                    role="status"
                    className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700"
                  >
                    <Check size={16} />
                    <span>
                      Added {subscribedEmail} for seasonal flavor notes from D Block.
                    </span>
                  </p>
                )}

                <p className="text-xs text-zinc-500">
                  Occasional batch updates only. Prefer WhatsApp? Message {CAFE_INFO.phoneDisplay}.
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Secondary Navigation Directory Below */}
        <div className="mt-20 pt-14 border-t border-zinc-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-sm">
          <div>
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="flex h-7 w-7 items-center justify-center rounded-md"
                style={{ backgroundColor: activeFlavor.bg }}
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                  <circle cx="12" cy="8.5" r="4.5" fill="#111115" />
                  <path d="M8 12.5L12 20.5L16 12.5H8Z" fill="#111115" />
                </svg>
              </span>
              <span
                className="text-base uppercase tracking-wide text-[#111115]"
                style={{ fontFamily: 'Anton, sans-serif' }}
              >
                {CAFE_INFO.name}
              </span>
            </div>
            <p className="mt-4 text-zinc-600 leading-relaxed">
              {CAFE_INFO.address}
              <br />
              {CAFE_INFO.location}
            </p>
            <p className="mt-2 text-xs text-zinc-500">
              {CAFE_INFO.ratingScore} ★ ({CAFE_INFO.ratingCount}) · {CAFE_INFO.ratingSource}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
              Counter Menu
            </h3>
            <ul className="mt-4 space-y-3 list-none p-0 m-0">
              <li>
                <a
                  href="#menu"
                  className="nav-underline text-zinc-700 hover:text-[#111115] no-underline"
                >
                  Fresh Dairy Ice Cream
                </a>
              </li>
              <li>
                <a
                  href="#menu"
                  className="nav-underline text-zinc-700 hover:text-[#111115] no-underline"
                >
                  Thick Milkshakes
                </a>
              </li>
              <li>
                <a
                  href="#menu"
                  className="nav-underline text-zinc-700 hover:text-[#111115] no-underline"
                >
                  Kashmiri Pink Chai
                </a>
              </li>
              <li>
                <a
                  href="#menu"
                  className="nav-underline text-zinc-700 hover:text-[#111115] no-underline"
                >
                  1-Litre Family Tubs
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
              Explore
            </h3>
            <ul className="mt-4 space-y-3 list-none p-0 m-0">
              <li>
                <a
                  href="#testimonials"
                  className="nav-underline text-zinc-700 hover:text-[#111115] no-underline"
                >
                  Guest Reviews
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="nav-underline text-zinc-700 hover:text-[#111115] no-underline"
                >
                  Menu &amp; Order FAQ
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="nav-underline text-zinc-700 hover:text-[#111115] no-underline"
                >
                  Hours &amp; Location
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenOnboarding}
                  className="nav-underline text-zinc-700 hover:text-[#111115] bg-transparent border-0 p-0 cursor-pointer text-sm"
                >
                  Watch Cafe Tour
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
              Direct Orders
            </h3>
            <ul className="mt-4 space-y-3 list-none p-0 m-0">
              <li>
                <a
                  href={CAFE_INFO.phoneHref}
                  className="nav-underline text-zinc-700 hover:text-[#111115] no-underline"
                >
                  Call {CAFE_INFO.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={CAFE_INFO.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-underline text-zinc-700 hover:text-[#111115] no-underline"
                >
                  WhatsApp Pickup
                </a>
              </li>
              <li>
                <a
                  href={CAFE_INFO.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-underline text-zinc-700 hover:text-[#111115] no-underline"
                >
                  OpenStreetMap Directions
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Full-Width Display Wordmark Before Bottom Legal Row */}
        <div className="mt-16 pt-10 border-t border-zinc-200 overflow-hidden">
          <p
            className="w-full text-center uppercase select-none text-[#111115] leading-[0.88] tracking-[-0.02em] whitespace-nowrap"
            style={{
              fontFamily: 'Anton, sans-serif',
              fontSize: 'clamp(22px, 7.25vw, 152px)',
            }}
          >
            ICE CREAM &amp; MILKSHAKES CAFE
          </p>
        </div>

        {/* Bottom Legal & Directory Attribution Row */}
        <div className="mt-8 pt-6 border-t border-zinc-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-zinc-500">
          <p>
            © {new Date().getFullYear()} {CAFE_INFO.name} · {CAFE_INFO.address}
          </p>
          <p>
            Mobile + WhatsApp: {CAFE_INFO.phoneDisplay} · Listed on {CAFE_INFO.ratingSource}
          </p>
        </div>
      </div>
    </footer>
  );
}
