import React from 'react';
import { ShieldCheck, Lock, EyeOff, ServerOff } from 'lucide-react';

export const PrivacyPolicy = () => {
  return (
    <div className="space-y-16 animate-fadeIn max-w-4xl mx-auto">
      {/* Hero Header */}
      <section className="pt-4 sm:pt-6">
        <p className="text-[var(--muted)] text-xs tracking-[0.35em] uppercase mb-6 font-medium">
          Privacy Policy
        </p>
        <h1 
          className="font-display text-[var(--text)] leading-[1.05] mb-6 font-normal"
          style={{ fontSize: 'clamp(2.5rem, 6.5vw, 5.2rem)' }}
        >
          Your data never<br className="hidden sm:block" /> leaves your device
        </h1>
        <p className="text-[var(--muted)] text-base sm:text-lg max-w-xl leading-relaxed">
          Alive Since is built with a zero-data-collection architecture. Your birthdate and calculations remain 100% private to you.
        </p>
      </section>

      {/* Grid Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)] overflow-hidden">
        <div className="bg-[var(--bg)] p-8 space-y-3">
          <ServerOff className="w-6 h-6 text-[var(--gold)]" />
          <h3 className="font-display text-xl text-[var(--text)]">No Remote Servers</h3>
          <p className="text-xs text-[var(--muted)] leading-relaxed">
            All time calculations run client-side inside your browser’s JavaScript engine. No input data is transmitted across the internet.
          </p>
        </div>

        <div className="bg-[var(--bg)] p-8 space-y-3">
          <EyeOff className="w-6 h-6 text-[var(--gold)]" />
          <h3 className="font-display text-xl text-[var(--text)]">No Analytics or Tracking</h3>
          <p className="text-xs text-[var(--muted)] leading-relaxed">
            We do not track your activity, use advertising identifiers, or sell data to third parties. Your experience is completely anonymous.
          </p>
        </div>

        <div className="bg-[var(--bg)] p-8 space-y-3">
          <Lock className="w-6 h-6 text-[var(--gold)]" />
          <h3 className="font-display text-xl text-[var(--text)]">Local Preferences Only</h3>
          <p className="text-xs text-[var(--muted)] leading-relaxed">
            Only your theme choice (Dark or Light mode) is saved locally in your browser's <code className="text-[var(--gold)] font-mono">localStorage</code>.
          </p>
        </div>
      </div>

      {/* Policy Details */}
      <div className="space-y-8 text-sm text-[var(--muted)] leading-relaxed border-t border-[var(--border)] pt-12">
        <div className="space-y-3">
          <h3 className="text-base text-[var(--text)] font-semibold uppercase tracking-wider">1. Information We Collect</h3>
          <p>
            Alive Since does not collect, store, or transmit any personally identifiable information (PII). When you enter a date of birth, it exists solely within your active browser tab's memory and is discarded when you close or reload the page.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-base text-[var(--text)] font-semibold uppercase tracking-wider">2. Cookies and Local Storage</h3>
          <p>
            We do not use tracking cookies. We utilize browser <code className="text-[var(--gold)] font-mono">localStorage</code> solely to remember your UI color theme preference across sessions.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-base text-[var(--text)] font-semibold uppercase tracking-wider">3. Third-Party Services</h3>
          <p>
            Alive Since does not integrate third-party tracking scripts, advertising networks, or analytics frameworks.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-base text-[var(--text)] font-semibold uppercase tracking-wider">4. Contact</h3>
          <p>
            If you have questions regarding this privacy policy, you can review the open-source client codebase or contact the maintainers.
          </p>
        </div>
      </div>
    </div>
  );
};
