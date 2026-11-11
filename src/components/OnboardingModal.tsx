import { useEffect, useState } from 'react';
import {
  ArrowRight,
  Pause,
  Play,
  RotateCcw,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import { CAFE_INFO, WALKTHROUGH_CHAPTERS } from '../data/cafeData';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGetStarted: (flavorIndex: number) => void;
}

const TOTAL_SECONDS = 45;
const CHAPTER_DURATION = TOTAL_SECONDS / WALKTHROUGH_CHAPTERS.length;

export default function OnboardingModal({
  isOpen,
  onClose,
  onGetStarted,
}: OnboardingModalProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setElapsed(0);
      setIsPlaying(true);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || !isPlaying) return;

    const interval = window.setInterval(() => {
      setElapsed((prev) => {
        if (prev + 0.25 >= TOTAL_SECONDS) {
          return 0;
        }
        return prev + 0.25;
      });
    }, 250);

    return () => window.clearInterval(interval);
  }, [isOpen, isPlaying]);

  if (!isOpen) return null;

  const currentChapterIdx = Math.min(
    WALKTHROUGH_CHAPTERS.length - 1,
    Math.floor(elapsed / CHAPTER_DURATION),
  );
  const activeChapter = WALKTHROUGH_CHAPTERS[currentChapterIdx];
  const progressPercent = (elapsed / TOTAL_SECONDS) * 100;

  const formatTime = (sec: number) => {
    const whole = Math.floor(sec);
    const s = whole % 60;
    return `0:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/55 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-4xl rounded-2xl border border-zinc-200 bg-white text-[#111115] shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between gap-4 border-b border-zinc-200 px-6 sm:px-8 py-5">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
              Cafe Walkthrough · {CAFE_INFO.address}
            </span>
            <h2
              id="onboarding-title"
              className="text-lg sm:text-xl font-semibold text-[#111115]"
            >
              Inside Ice Cream &amp; Milkshakes Cafe
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close walkthrough modal"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-300 bg-[#F7F7F5] text-zinc-700 hover:text-[#111115] hover:border-zinc-500 cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Centerpiece: Embedded Interactive Walkthrough Video Player */}
        <div className="p-6 sm:p-8">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-zinc-200 bg-[#111115]">
            <div
              key={activeChapter.id}
              className="absolute inset-0 flex flex-col justify-between p-5 sm:p-8 transition-colors duration-500"
              style={{ backgroundColor: activeChapter.accent }}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none select-none absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center overflow-hidden"
              >
                <span
                  className="text-white/25 uppercase whitespace-nowrap leading-none"
                  style={{
                    fontFamily: 'Anton, sans-serif',
                    fontSize: 'clamp(72px, 14vw, 170px)',
                  }}
                >
                  VEHARI CAFE
                </span>
              </div>

              <div className="relative z-10 flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-black/35 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      isPlaying ? 'bg-emerald-400' : 'bg-zinc-300'
                    }`}
                  />
                  <span>{activeChapter.title}</span>
                </span>

                <span className="rounded-full bg-black/35 px-3 py-1 text-xs font-medium text-white tabular-nums">
                  {formatTime(elapsed)} / 0:{TOTAL_SECONDS}
                </span>
              </div>

              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-12 gap-4 items-end my-auto py-2">
                <div className="sm:col-span-7 text-left">
                  <h3
                    className="video-chapter-enter text-2xl sm:text-4xl text-white uppercase leading-none"
                    style={{
                      fontFamily: 'Anton, sans-serif',
                      textShadow: '0 2px 12px rgba(15,15,18,0.22)',
                    }}
                  >
                    {activeChapter.caption}
                  </h3>
                  <p
                    className="mt-2.5 max-w-md text-xs sm:text-sm text-white/95 leading-relaxed"
                    style={{ textShadow: '0 1px 8px rgba(15,15,18,0.22)' }}
                  >
                    {activeChapter.detail}
                  </p>
                </div>

                <div className="sm:col-span-5 flex justify-center sm:justify-end">
                  <img
                    src={activeChapter.image}
                    alt={activeChapter.caption}
                    width={720}
                    height={1200}
                    className="video-chapter-enter h-32 sm:h-52 w-auto object-contain"
                    style={{
                      filter: 'drop-shadow(0 20px 28px rgba(15, 15, 18, 0.3))',
                    }}
                  />
                </div>
              </div>

              <div className="h-8" aria-hidden="true" />
            </div>

            {/* Bottom Video Controls Bar */}
            <div className="absolute inset-x-0 bottom-0 z-20 bg-[#111115]/90 border-t border-white/10 px-4 py-2.5">
              <div className="mb-2 flex items-center gap-2">
                <input
                  type="range"
                  aria-label="Seek walkthrough video timeline"
                  min={0}
                  max={TOTAL_SECONDS}
                  step={0.25}
                  value={elapsed}
                  onChange={(e) => setElapsed(Number(e.target.value))}
                  className="h-1.5 w-full cursor-pointer accent-white"
                  style={{
                    background: `linear-gradient(to right, ${activeChapter.accent} ${progressPercent}%, rgba(255,255,255,0.2) ${progressPercent}%)`,
                  }}
                />
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsPlaying((prev) => !prev)}
                    aria-label={isPlaying ? 'Pause walkthrough' : 'Play walkthrough'}
                    className="flex h-8 w-8 items-center justify-center rounded-md bg-white/15 text-white hover:bg-white/25 cursor-pointer border-0"
                  >
                    {isPlaying ? <Pause size={15} /> : <Play size={15} fill="currentColor" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setElapsed(0);
                      setIsPlaying(true);
                    }}
                    aria-label="Restart walkthrough"
                    className="flex h-8 w-8 items-center justify-center rounded-md bg-transparent text-zinc-300 hover:bg-white/10 hover:text-white cursor-pointer border-0"
                  >
                    <RotateCcw size={14} />
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsMuted((prev) => !prev)}
                    aria-label={isMuted ? 'Unmute ambient captions' : 'Mute'}
                    className="flex h-8 w-8 items-center justify-center rounded-md bg-transparent text-zinc-300 hover:bg-white/10 hover:text-white cursor-pointer border-0"
                  >
                    {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                  </button>

                  <span className="ml-1 text-xs text-zinc-300 hidden sm:inline">
                    Chapter {currentChapterIdx + 1} of {WALKTHROUGH_CHAPTERS.length}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  {WALKTHROUGH_CHAPTERS.map((ch, idx) => (
                    <button
                      key={ch.id}
                      type="button"
                      onClick={() => setElapsed(idx * CHAPTER_DURATION)}
                      className={`h-7 rounded px-2 text-[11px] font-medium transition-colors cursor-pointer border ${
                        idx === currentChapterIdx
                          ? 'border-white/40 bg-white/20 text-white'
                          : 'border-transparent bg-transparent text-zinc-400 hover:text-white'
                      }`}
                    >
                      0{idx + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Chapter Strip */}
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {WALKTHROUGH_CHAPTERS.map((ch, idx) => {
              const active = idx === currentChapterIdx;
              return (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => setElapsed(idx * CHAPTER_DURATION)}
                  className={`rounded-xl border p-3.5 text-left transition-all cursor-pointer ${
                    active
                      ? 'border-zinc-900 bg-[#F7F7F5]'
                      : 'border-zinc-200 bg-white hover:border-zinc-400'
                  }`}
                >
                  <span className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                    {ch.durationLabel}
                  </span>
                  <span className="mt-0.5 block text-xs font-semibold text-[#111115] truncate">
                    {ch.caption}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Modal Footer CTAs */}
          <div className="mt-6 flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-4 border-t border-zinc-200 pt-5">
            <p className="text-xs text-zinc-600">
              Direct phone &amp; WhatsApp pickup: {CAFE_INFO.phoneDisplay}
            </p>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="h-11 rounded-lg border border-zinc-300 bg-white px-5 text-sm font-medium text-[#111115] hover:bg-zinc-100 cursor-pointer"
              >
                Dismiss
              </button>
              <button
                type="button"
                onClick={() => onGetStarted(currentChapterIdx)}
                className="inline-flex h-11 items-center gap-2 rounded-lg px-5 text-sm font-semibold text-[#111115] border-0 cursor-pointer hover:-translate-y-px transition-transform"
                style={{ backgroundColor: activeChapter.accent }}
              >
                <span>Get Started — Explore Menu</span>
                <ArrowRight size={16} strokeWidth={2.25} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
