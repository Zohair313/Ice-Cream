import { useState, type FormEvent } from 'react';
import {
  ArrowRight,
  Clock,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Play,
} from 'lucide-react';
import { CAFE_INFO, HERO_FLAVORS } from '../data/cafeData';
import { useReveal } from '../hooks/useReveal';

interface ContactSectionProps {
  activeFlavorIndex: number;
  onOpenOnboarding: () => void;
}

interface FormErrors {
  name?: string;
  phone?: string;
  message?: string;
}

export default function ContactSection({
  activeFlavorIndex,
  onOpenOnboarding,
}: ContactSectionProps) {
  const activeFlavor = HERO_FLAVORS[activeFlavorIndex];
  const todayDay = new Date().getDay();
  const { ref, visible } = useReveal<HTMLDivElement>();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [topic, setTopic] = useState('Pickup Order');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [preparedWhatsappUrl, setPreparedWhatsappUrl] = useState<string | null>(
    null,
  );

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (name.trim().length < 2) {
      nextErrors.name = 'Enter your name (at least 2 characters).';
    }
    if (phone.trim().length < 7) {
      nextErrors.phone = 'Enter a mobile or WhatsApp number we can reach.';
    }
    if (message.trim().length < 6) {
      nextErrors.message = 'Add your flavor list, quantity, or question.';
    }
    return nextErrors;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validation = validate();
    setErrors(validation);
    if (Object.keys(validation).length > 0) {
      setPreparedWhatsappUrl(null);
      return;
    }

    const composed = `Assalam-o-Alaikum, my name is ${name.trim()} (${phone.trim()}). Topic: ${topic}. Details: ${message.trim()}`;
    const url = `https://wa.me/923259006218?text=${encodeURIComponent(composed)}`;
    setPreparedWhatsappUrl(url);
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative w-full bg-[#F7F7F5] bg-pattern-dots py-24 sm:py-32 lg:py-36 border-b border-zinc-200 overflow-hidden"
    >
      <div
        ref={ref}
        className="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:px-20"
      >
        <div className={`max-w-3xl ${visible ? 'reveal-visible' : 'reveal-base'}`}>
          <p
            className="text-xs font-semibold uppercase tracking-[0.16em]"
            style={{ color: activeFlavor.textAccent }}
          >
            Visit or Order Ahead
          </p>
          <h2
            id="contact-heading"
            className="mt-3 text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#111115] uppercase leading-[1.02]"
            style={{ fontFamily: 'Anton, sans-serif', letterSpacing: '-0.01em' }}
          >
            177 Jinnah Road, D Block, Vehari
          </h2>
          <p className="mt-5 text-base sm:text-lg text-zinc-600 leading-relaxed max-w-2xl">
            Send a pickup request or group tub inquiry directly to our counter team, or reach us on
            phone and WhatsApp.
          </p>
        </div>

        {/* Split Layout: Form Left, Contact Details Right */}
        <div className="mt-14 sm:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left: Contact / Order Form */}
          <div
            className={`lg:col-span-6 rounded-2xl border border-zinc-200 bg-white p-7 sm:p-10 lg:p-12 flex flex-col justify-between shadow-xs ${
              visible ? 'reveal-visible' : 'reveal-base'
            }`}
          >
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-[#111115]">
                  Send an Order or Inquiry
                </h3>
                <p className="mt-1.5 text-sm sm:text-base text-zinc-600">
                  Fill in your flavors or pickup time to generate an instant WhatsApp message to{' '}
                  {CAFE_INFO.phoneDisplay}.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-sm font-medium text-zinc-800 mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'error-name' : undefined}
                    placeholder="Hamza Tariq"
                    className="h-12 w-full rounded-xl border border-zinc-300 bg-[#F7F7F5] px-4 text-base text-[#111115] placeholder:text-zinc-500 focus:border-zinc-900 focus:bg-white focus:outline-none"
                  />
                  {errors.name && (
                    <p id="error-name" className="mt-1.5 text-xs text-rose-600">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-phone"
                    className="block text-sm font-medium text-zinc-800 mb-2"
                  >
                    Phone or WhatsApp
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? 'error-phone' : undefined}
                    placeholder="+92 300 0000000"
                    className="h-12 w-full rounded-xl border border-zinc-300 bg-[#F7F7F5] px-4 text-base text-[#111115] placeholder:text-zinc-500 focus:border-zinc-900 focus:bg-white focus:outline-none"
                  />
                  {errors.phone && (
                    <p id="error-phone" className="mt-1.5 text-xs text-rose-600">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-topic"
                  className="block text-sm font-medium text-zinc-800 mb-2"
                >
                  Request Type
                </label>
                <select
                  id="contact-topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="h-12 w-full rounded-xl border border-zinc-300 bg-[#F7F7F5] px-4 text-base text-[#111115] focus:border-zinc-900 focus:bg-white focus:outline-none"
                >
                  <option value="Pickup Order">Counter Pickup Order</option>
                  <option value="1L Family Tubs">1-Litre Family Ice Cream Tubs</option>
                  <option value="Kashmiri Chai Flask">Kashmiri Chai Flask Order</option>
                  <option value="General Question">General Question / Seating</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-medium text-zinc-800 mb-2"
                >
                  Flavors &amp; Pickup Notes
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'error-message' : undefined}
                  placeholder="Example: 2 Pistachio waffle bowls, 1 Kashmiri rose shake, pickup around 9:30 PM."
                  className="w-full rounded-xl border border-zinc-300 bg-[#F7F7F5] p-4 text-base text-[#111115] placeholder:text-zinc-500 focus:border-zinc-900 focus:bg-white focus:outline-none resize-y"
                />
                {errors.message && (
                  <p id="error-message" className="mt-1.5 text-xs text-rose-600">
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl px-6 text-base font-semibold text-[#111115] cursor-pointer border-0 hover:-translate-y-px active:scale-[0.98] transition-all duration-150"
                  style={{ backgroundColor: activeFlavor.bg }}
                >
                  <span>Prepare WhatsApp Order</span>
                  <ArrowRight size={17} strokeWidth={2.25} />
                </button>
              </div>

              {preparedWhatsappUrl && (
                <div
                  role="status"
                  className="panel-switch rounded-xl border border-zinc-300 bg-[#F7F7F5] p-5 space-y-3"
                >
                  <p className="text-sm text-zinc-700">
                    Your message is formatted and ready. Tap below to open WhatsApp directly with{' '}
                    <span className="font-semibold text-[#111115]">
                      {CAFE_INFO.phoneDisplay}
                    </span>
                    .
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={preparedWhatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 items-center gap-2 rounded-lg px-4 text-sm font-semibold text-[#111115] no-underline"
                      style={{ backgroundColor: activeFlavor.bg }}
                    >
                      <MessageSquare size={15} />
                      <span>Open in WhatsApp</span>
                    </a>
                    <a
                      href={`mailto:${CAFE_INFO.email}?subject=${encodeURIComponent(
                        `${topic} — ${name}`,
                      )}&body=${encodeURIComponent(message)}`}
                      className="inline-flex h-10 items-center gap-2 rounded-lg border border-zinc-300 bg-white px-4 text-sm font-medium text-[#111115] no-underline hover:bg-zinc-100"
                    >
                      <Mail size={15} />
                      <span>Send via Email App</span>
                    </a>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Right: Cafe Details (Email, Phone, Address, Hours) */}
          <div
            style={{ transitionDelay: '100ms' }}
            className={`lg:col-span-6 rounded-2xl border border-zinc-200 bg-white p-7 sm:p-10 lg:p-12 flex flex-col justify-between gap-8 shadow-xs ${
              visible ? 'reveal-visible' : 'reveal-base'
            }`}
          >
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-[#111115]">
                  Counter &amp; Directory Details
                </h3>
                <p className="mt-1.5 text-sm sm:text-base text-zinc-600">
                  Cybo Directory listing · {CAFE_INFO.ratingScore} ★ ({CAFE_INFO.ratingCount}{' '}
                  reviews)
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="rounded-xl border border-zinc-200 bg-[#F7F7F5] p-5 transition-colors hover:border-zinc-400">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-600">
                    <Phone size={14} style={{ color: activeFlavor.textAccent }} />
                    <span>Mobile + WhatsApp</span>
                  </div>
                  <a
                    href={CAFE_INFO.phoneHref}
                    className="mt-2.5 block text-base font-semibold text-[#111115] no-underline hover:underline"
                  >
                    {CAFE_INFO.phoneDisplay}
                  </a>
                  <p className="mt-1 text-xs text-zinc-600">
                    Works on both voice calls and WhatsApp orders
                  </p>
                </div>

                <div className="rounded-xl border border-zinc-200 bg-[#F7F7F5] p-5 transition-colors hover:border-zinc-400">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-600">
                    <Mail size={14} style={{ color: activeFlavor.textAccent }} />
                    <span>Order Desk Email</span>
                  </div>
                  <a
                    href={`mailto:${CAFE_INFO.email}`}
                    className="mt-2.5 block text-sm sm:text-base font-semibold text-[#111115] no-underline hover:underline whitespace-nowrap overflow-hidden text-ellipsis"
                  >
                    {CAFE_INFO.email}
                  </a>
                  <p className="mt-1 text-xs text-zinc-600">
                    For bulk event cups &amp; family inquiries
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-zinc-200 bg-[#F7F7F5] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors hover:border-zinc-400">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-600">
                    <MapPin size={14} style={{ color: activeFlavor.textAccent }} />
                    <span>Cafe Address</span>
                  </div>
                  <p className="mt-2.5 text-base font-semibold text-[#111115]">
                    {CAFE_INFO.address}
                  </p>
                  <p className="mt-0.5 text-sm text-zinc-600">
                    {CAFE_INFO.location}
                  </p>
                </div>

                <a
                  href={CAFE_INFO.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-lg border border-zinc-300 bg-white px-4 text-sm font-medium text-[#111115] no-underline hover:border-zinc-500"
                >
                  <span>Get Directions</span>
                  <ArrowRight size={14} />
                </a>
              </div>

              <div className="rounded-xl border border-zinc-200 bg-[#F7F7F5] p-5">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-600">
                    <Clock size={14} style={{ color: activeFlavor.textAccent }} />
                    <span>Opening Hours</span>
                  </div>
                  <span className="text-[11px] text-zinc-500">
                    Typical evening hours
                  </span>
                </div>

                <dl className="divide-y divide-zinc-200 m-0">
                  {CAFE_INFO.hours.map((row) => {
                    const isToday = row.days.includes(todayDay);
                    return (
                      <div
                        key={row.day}
                        className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 py-3 text-sm"
                      >
                        <dt
                          className={`flex items-center gap-2 whitespace-nowrap ${
                            isToday ? 'font-semibold text-[#111115]' : 'text-zinc-700'
                          }`}
                        >
                          <span>{row.day}</span>
                          {isToday && (
                            <span
                              className="inline-block rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase text-[#111115]"
                              style={{ backgroundColor: activeFlavor.bg }}
                            >
                              Today
                            </span>
                          )}
                        </dt>
                        <dd
                          className={`m-0 tabular-nums whitespace-nowrap ${
                            isToday ? 'font-semibold text-[#111115]' : 'text-zinc-600'
                          }`}
                        >
                          {row.time}
                        </dd>
                      </div>
                    );
                  })}
                </dl>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 rounded-xl border border-zinc-200 bg-[#F7F7F5] p-5">
              <div>
                <p className="text-sm font-semibold text-[#111115]">
                  First time ordering?
                </p>
                <p className="text-xs text-zinc-600">
                  Watch our 45-second counter walkthrough &amp; flavor guide.
                </p>
              </div>
              <button
                type="button"
                onClick={onOpenOnboarding}
                className="inline-flex h-10 shrink-0 items-center gap-2 rounded-lg border border-zinc-300 bg-white px-4 text-sm font-medium text-[#111115] hover:border-zinc-500 cursor-pointer"
              >
                <Play size={14} fill="currentColor" />
                <span>Play Tour</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
