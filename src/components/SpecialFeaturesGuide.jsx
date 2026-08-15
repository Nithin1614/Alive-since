import React, { useState, useEffect } from 'react';
import { Sparkles, X } from 'lucide-react';

export const SpecialFeaturesGuide = ({ hasEnteredDate, onNavigateToSpecial, activeTab }) => {
  const [animationPhase, setAnimationPhase] = useState('idle'); // 'idle' | 'swimming' | 'docked' | 'dismissed'
  const [isDismissed, setIsDismissed] = useState(false);

  // Trigger swimming animation when date is entered
  useEffect(() => {
    if (hasEnteredDate && !isDismissed && activeTab === 'calculator') {
      if (animationPhase === 'idle') {
        setAnimationPhase('swimming');
        const timer = setTimeout(() => {
          setAnimationPhase('docked');
        }, 1800); // 1.8s swimming journey
        return () => clearTimeout(timer);
      }
    }
  }, [hasEnteredDate, isDismissed, activeTab, animationPhase]);

  // If user navigated to special features, dismiss guide
  useEffect(() => {
    if (activeTab === 'special') {
      setIsDismissed(true);
      setAnimationPhase('dismissed');
    }
  }, [activeTab]);

  if (isDismissed || animationPhase === 'idle' || animationPhase === 'dismissed') {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      {/* PHASE 1: SWIMMING FISH / ARROW GLIDING FROM BOTTOM TO HEADER */}
      {animationPhase === 'swimming' && (
        <div className="absolute animate-fishSwim pointer-events-none">
          <div className="relative flex items-center gap-2">
            {/* Luminous Fish-like Arrow */}
            <svg
              className="w-10 h-10 text-[var(--gold)] drop-shadow-[0_0_12px_rgba(201,169,110,0.8)] animate-fishWiggle"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Fish / Comet Body */}
              <path
                d="M34 20C26 13 14 14 6 20C14 26 26 27 34 20Z"
                fill="url(#fishGrad)"
                stroke="var(--gold)"
                strokeWidth="1.5"
              />
              {/* Fin / Tail */}
              <path
                d="M6 20L2 14C4 18 4 22 2 26L6 20Z"
                fill="var(--gold)"
                opacity="0.9"
              />
              {/* Inner Light Core */}
              <circle cx="28" cy="20" r="2.5" fill="#ffffff" />
              <defs>
                <linearGradient id="fishGrad" x1="6" y1="20" x2="34" y2="20" gradientUnits="userSpaceOnUse">
                  <stop stopColor="var(--gold)" stopOpacity="0.4" />
                  <stop offset="0.7" stopColor="var(--gold)" />
                  <stop offset="1" stopColor="#ffffff" />
                </linearGradient>
              </defs>
            </svg>

            {/* Glowing Particle Trail */}
            <div className="flex gap-1">
              <span className="w-2 h-2 rounded-full bg-[var(--gold)]/60 animate-ping" />
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]/40 animate-pulse" />
            </div>
          </div>
        </div>
      )}

      {/* PHASE 2: DOCKED POINTER AT THE HEADER BUTTON */}
      {animationPhase === 'docked' && (
        <div className="pointer-events-auto absolute top-14 right-16 sm:right-32 md:right-44 animate-dockedHover flex flex-col items-center">
          {/* Handcrafted Curved Arrow with Tail pointing up to Special Features */}
          <div className="relative -mb-1 flex justify-center w-full">
            <svg
              className="w-7 h-7 text-[var(--gold)] drop-shadow-[0_0_8px_rgba(201,169,110,0.6)] animate-bounce"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Curved Tail */}
              <path
                d="M14 24C14 18 17 12 14 6"
                stroke="var(--gold)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="1 1"
              />
              {/* Arrow Head */}
              <path
                d="M9 10L14 4L19 10"
                stroke="var(--gold)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Interactive Floating Badge */}
          <div className="relative group">
            <button
              onClick={() => {
                onNavigateToSpecial();
                setIsDismissed(true);
              }}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg)]/95 border-2 border-[var(--gold)] text-[var(--text)] shadow-[0_4px_24px_rgba(201,169,110,0.35)] hover:bg-[var(--gold)] hover:text-black transition-all duration-300 cursor-pointer backdrop-blur-md"
            >
              <Sparkles className="w-3.5 h-3.5 text-[var(--gold)] group-hover:text-black animate-spin" style={{ animationDuration: '4s' }} />
              <span className="text-xs font-semibold tracking-wider uppercase whitespace-nowrap">
                Try Special Features ✨
              </span>
            </button>

            {/* Quick Dismiss Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsDismissed(true);
              }}
              aria-label="Dismiss guide"
              className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[var(--surface2)] border border-[var(--border)] text-[var(--muted)] hover:text-[var(--text)] flex items-center justify-center cursor-pointer shadow-md transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
