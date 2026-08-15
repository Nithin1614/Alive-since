import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon, Sparkles, Menu, X } from 'lucide-react';

export const Header = ({ isDarkMode, toggleTheme, activeTab, setActiveTab }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const navItems = [
    { id: 'calculator', label: 'Calculator' },
    { id: 'compare', label: 'Compare' },
    { id: 'milestones', label: 'Milestones' },
    { id: 'anydate', label: 'Any Date' },
    { id: 'special', label: 'Special Features' },
    { id: 'about', label: 'About' },
  ];

  // Mobile menu items (omits 'special' as it is displayed directly in the header)
  const mobileMenuItems = [
    { id: 'calculator', label: 'Calculator' },
    { id: 'compare', label: 'Compare' },
    { id: 'milestones', label: 'Milestones' },
    { id: 'anydate', label: 'Any Date' },
    { id: 'about', label: 'About' },
  ];

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleMobileNavClick = (id) => {
    setActiveTab(id);
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)]/80 bg-[var(--bg)]/90 backdrop-blur-md sm:backdrop-blur-lg transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 h-14 flex items-center justify-between gap-3 relative">
        {/* Brand Logo */}
        <button 
          onClick={() => {
            setActiveTab('calculator');
            setIsMenuOpen(false);
          }} 
          className="text-[var(--text)] text-xs sm:text-sm font-semibold tracking-[0.15em] uppercase hover:text-[var(--gold)] transition-colors duration-200 cursor-pointer border-none bg-transparent flex-shrink-0"
        >
          Alive Since
        </button>
        
        {/* Desktop Navigation (Visible on sm screens and above) */}
        <div className="hidden sm:flex items-center gap-6">
          <nav className="flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              const isSpecial = item.id === 'special';
              return (
                <button
                  key={item.id}
                  id={isSpecial ? "special-features-btn-desktop" : undefined}
                  onClick={() => setActiveTab(item.id)}
                  className={`text-xs tracking-wider uppercase transition-colors duration-200 py-1 border-none bg-transparent cursor-pointer flex items-center gap-1 whitespace-nowrap ${
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
            className="flex items-center justify-center w-8 h-8 rounded-full text-[var(--muted)] hover:text-[var(--text)] transition-colors duration-200 focus:outline-none cursor-pointer flex-shrink-0"
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-[var(--gold)]" />
            ) : (
              <Moon className="w-4 h-4 text-[var(--text)]" />
            )}
          </button>
        </div>

        {/* Mobile Navigation (Visible only on mobile screens < sm) */}
        <div className="flex sm:hidden items-center gap-2" ref={menuRef}>
          {/* 1. Special Features button */}
          <button
            id="special-features-btn-mobile"
            onClick={() => {
              setActiveTab('special');
              setIsMenuOpen(false);
            }}
            className={`text-[11px] tracking-wider uppercase transition-colors duration-200 px-2 py-1 rounded border-none bg-transparent cursor-pointer flex items-center gap-1 whitespace-nowrap ${
              activeTab === 'special'
                ? 'text-[var(--gold)] font-semibold border-b border-[var(--gold)]'
                : 'text-[var(--gold)]/90 hover:text-[var(--gold)]'
            }`}
          >
            <Sparkles className="w-3 h-3 text-[var(--gold)]" />
            <span>Special Features</span>
          </button>

          {/* 2. Theme Toggle (to the left of Menu) */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="flex items-center justify-center w-7 h-7 rounded-full text-[var(--muted)] hover:text-[var(--text)] transition-colors duration-200 focus:outline-none cursor-pointer flex-shrink-0 bg-[var(--surface)]/50 border border-[var(--border)]"
          >
            {isDarkMode ? (
              <Sun className="w-3.5 h-3.5 text-[var(--gold)]" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-[var(--text)]" />
            )}
          </button>

          {/* 3. ☰ Menu Button (Last / Far Right Side) */}
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Toggle Menu"
            className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] uppercase tracking-wider font-medium border transition-colors cursor-pointer ${
              isMenuOpen
                ? 'bg-[var(--surface)] text-[var(--gold)] border-[var(--gold)]/50'
                : 'bg-[var(--surface)]/60 text-[var(--text)] border-[var(--border)]'
            }`}
          >
            {isMenuOpen ? (
              <>
                <X className="w-3.5 h-3.5 text-[var(--gold)]" />
                <span>Close</span>
              </>
            ) : (
              <>
                <Menu className="w-3.5 h-3.5 text-[var(--gold)]" />
                <span>Menu</span>
              </>
            )}
          </button>

          {/* Mobile Dropdown Menu Popover */}
          {isMenuOpen && (
            <div className="absolute right-4 top-14 w-48 py-2 bg-[var(--bg)] border border-[var(--border)] rounded-xl shadow-2xl z-50 animate-fadeIn backdrop-blur-xl">
              <div className="px-3 py-1.5 border-b border-[var(--border)]/60 text-[9px] uppercase tracking-[0.2em] font-mono text-[var(--gold)]">
                Navigation
              </div>
              <div className="py-1">
                {mobileMenuItems.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleMobileNavClick(item.id)}
                      className={`w-full text-left px-4 py-2.5 text-xs uppercase tracking-wider font-medium transition-colors cursor-pointer border-none bg-transparent flex items-center justify-between ${
                        isActive
                          ? 'text-[var(--gold)] font-semibold bg-[var(--surface)]'
                          : 'text-[var(--text)] hover:bg-[var(--surface)]/60 hover:text-[var(--gold)]'
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
