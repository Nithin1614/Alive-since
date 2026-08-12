import React from 'react';

export const Footer = ({ setActiveTab }) => {
  return (
    <footer className="border-t border-[var(--border)] mt-24">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[var(--muted)] text-xs tracking-wide">
        <span>
          © {new Date().getFullYear()} Alive Since — all calculations run in your browser, nothing is stored
        </span>

        <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
          {setActiveTab && (
            <>
              <button 
                onClick={() => setActiveTab('calculator')} 
                className="hover:text-[var(--text)] transition-colors cursor-pointer bg-transparent border-none p-0 text-xs text-[var(--muted)]"
              >
                Calculator
              </button>
              <button 
                onClick={() => setActiveTab('compare')} 
                className="hover:text-[var(--text)] transition-colors cursor-pointer bg-transparent border-none p-0 text-xs text-[var(--muted)]"
              >
                Compare
              </button>
              <button 
                onClick={() => setActiveTab('milestones')} 
                className="hover:text-[var(--text)] transition-colors cursor-pointer bg-transparent border-none p-0 text-xs text-[var(--muted)]"
              >
                Milestones
              </button>
              <button 
                onClick={() => setActiveTab('anydate')} 
                className="hover:text-[var(--text)] transition-colors cursor-pointer bg-transparent border-none p-0 text-xs text-[var(--muted)]"
              >
                Any Date
              </button>
              <button 
                onClick={() => setActiveTab('special')} 
                className="hover:text-[var(--gold)] transition-colors cursor-pointer bg-transparent border-none p-0 text-xs text-[var(--gold)]/80 font-medium"
              >
                Special Features
              </button>
              <button 
                onClick={() => setActiveTab('about')} 
                className="hover:text-[var(--text)] transition-colors cursor-pointer bg-transparent border-none p-0 text-xs text-[var(--muted)]"
              >
                About
              </button>
              <button 
                onClick={() => setActiveTab('privacy')} 
                className="hover:text-[var(--text)] transition-colors cursor-pointer bg-transparent border-none p-0 text-xs text-[var(--muted)]"
              >
                Privacy
              </button>
              <button 
                onClick={() => setActiveTab('terms')} 
                className="hover:text-[var(--text)] transition-colors cursor-pointer bg-transparent border-none p-0 text-xs text-[var(--muted)]"
              >
                Terms
              </button>
            </>
          )}
        </div>
      </div>
    </footer>
  );
};
