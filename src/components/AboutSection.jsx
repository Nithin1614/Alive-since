import React from 'react';
import { Hourglass, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export const AboutSection = () => {
  return (
    <div className="space-y-16 animate-fadeIn">
      {/* Hero Header */}
      <section className="pt-4 sm:pt-6">
        <p className="text-[var(--muted)] text-xs tracking-[0.35em] uppercase mb-6 font-medium">
          About Alive Since
        </p>
        <h1 
          className="font-display text-[var(--text)] leading-[1.05] mb-6 font-normal"
          style={{ fontSize: 'clamp(2.5rem, 6.5vw, 5.2rem)' }}
        >
          Every second,<br className="hidden sm:block" /> made visible
        </h1>
        <p className="text-[var(--muted)] text-base sm:text-lg max-w-xl leading-relaxed">
          Alive Since is an exact time measurement engine designed to explore human existence through precise temporal metrics, milestone tracking, and shared timelines.
        </p>
      </section>

      {/* Philosophy Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)] overflow-hidden">
        <div className="bg-[var(--bg)] p-8 space-y-4">
          <Hourglass className="w-6 h-6 text-[var(--gold)]" />
          <h3 className="font-display text-xl text-[var(--text)]">Precision Engine</h3>
          <p className="text-xs text-[var(--muted)] leading-relaxed">
            Calculates exact millisecond differences while accounting for leap years, varying month lengths, and time zones down to the exact second.
          </p>
        </div>

        <div className="bg-[var(--bg)] p-8 space-y-4">
          <ShieldCheck className="w-6 h-6 text-[var(--gold)]" />
          <h3 className="font-display text-xl text-[var(--text)]">100% Private</h3>
          <p className="text-xs text-[var(--muted)] leading-relaxed">
            All calculations run entirely inside your browser. No birthdates or personal data are ever sent to any remote server or stored anywhere.
          </p>
        </div>

        <div className="bg-[var(--bg)] p-8 space-y-4">
          <Sparkles className="w-6 h-6 text-[var(--gold)]" />
          <h3 className="font-display text-xl text-[var(--text)]">Temporal Insights</h3>
          <p className="text-xs text-[var(--muted)] leading-relaxed">
            Discover milestone days, compare timelines with friends, and measure life expectancy against global statistics.
          </p>
        </div>
      </div>
    </div>
  );
};
