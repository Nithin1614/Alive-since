import React from 'react';
import { Sun, Moon, Sparkles } from 'lucide-react';

export const Header = ({ isDarkMode, toggleTheme, activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'calculator', label: 'Calculator' },
    { id: 'compare', label: 'Compare' },
    { id: 'milestones', label: 'Milestones' },
    { id: 'anydate', label: 'Any Date' },
    { id: 'special', label: 'Special Features' },
    { id: 'about', label: 'About' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)]/80 bg-[var(--bg)]/90 backdrop-blur-md sm:backdrop-blur-lg transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-2.5 sm:h-14 flex items-center justify-between gap-2 sm:gap-4 overflow-hidden">
        {/* Brand Logo */}
        <button 
          onClick={() => setActiveTab('calculator')} 
          className="text-[var(--text)] text-xs sm:text-sm font-semibold tracking-[0.15em] uppercase hover:text-[var(--gold)] transition-colors duration-200 cursor-pointer border-none bg-transparent flex-shrink-0"
        >
          Alive Since
        </button>
        
        {/* Nav Links + Theme Toggle */}
        <div className="flex items-center gap-2 sm:gap-6 min-w-0 flex-1 justify-end">
          <nav className="flex items-center gap-3 sm:gap-6 overflow-x-auto no-scrollbar py-1 scroll-smooth max-w-full">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              const isSpecial = item.id === 'special';
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`text-[11px] sm:text-xs tracking-wider uppercase transition-colors duration-200 py-1 border-none bg-transparent cursor-pointer flex-shrink-0 flex items-center gap-1 whitespace-nowrap ${
                    isActive
                      ? 'text-[var(--gold)] font-semibold border-b-2 border-[var(--gold)]'
                      : isSpecial
                      ? 'text-[var(--gold)] hover:text-[var(--gold)]/80'
                      : 'text-[var(--muted)] hover:text-[var(--text)]'
                  }`}
                >
                  {isSpecial && <Sparkles className="w-3 h-3 text-[var(--gold)]" />}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full text-[var(--muted)] hover:text-[var(--text)] transition-colors duration-200 focus:outline-none cursor-pointer flex-shrink-0 bg-[var(--surface)]/50 border border-[var(--border)] sm:border-none"
          >
            {isDarkMode ? (
              <Sun className="w-3.5 h-3.5 text-[var(--gold)]" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-[var(--text)]" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
