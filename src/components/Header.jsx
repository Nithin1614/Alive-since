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
    <header className="sticky top-0 z-50 border-b border-[var(--border)]/80 bg-[var(--bg)]/75 backdrop-blur-md sm:backdrop-blur-lg transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 h-14 flex items-center justify-between">
        <button 
          onClick={() => setActiveTab('calculator')} 
          className="text-[var(--text)] text-sm font-medium tracking-[0.15em] uppercase hover:text-[var(--gold)] transition-colors duration-200 cursor-pointer border-none bg-transparent"
        >
          Alive Since
        </button>
        
        <nav className="flex items-center gap-3 sm:gap-6 overflow-x-auto">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const isSpecial = item.id === 'special';
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`text-xs tracking-widest uppercase transition-colors duration-200 py-1 border-none bg-transparent cursor-pointer flex-shrink-0 flex items-center gap-1 ${
                  isActive
                    ? 'text-[var(--gold)] font-semibold border-b border-[var(--gold)]'
                    : isSpecial
                    ? 'text-[var(--gold)]/80 hover:text-[var(--gold)]'
                    : 'text-[var(--muted)] hover:text-[var(--text)]'
                }`}
              >
                {isSpecial && <Sparkles className="w-3 h-3 text-[var(--gold)]" />}
                <span>{item.label}</span>
              </button>
            );
          })}

          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="flex items-center justify-center w-8 h-8 rounded-full text-[var(--muted)] hover:text-[var(--text)] transition-colors duration-200 focus:outline-none cursor-pointer ml-1 flex-shrink-0"
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-[var(--gold)]" />
            ) : (
              <Moon className="w-4 h-4 text-[var(--text)]" />
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};
