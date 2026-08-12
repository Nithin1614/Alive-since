import React, { useState } from 'react';
import { lifeExpectancyCountries } from '../data/lifeExpectancyData';
import { ChevronDown } from 'lucide-react';

export const LifeExpectancyProgress = ({ stats }) => {
  const [selectedCountry, setSelectedCountry] = useState(lifeExpectancyCountries[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  if (!stats) return null;

  // Calculate percentage lived
  const yearsLived = stats.years + (stats.months / 12) + (stats.days / 365.25);
  const percentageLived = Math.min(100, (yearsLived / selectedCountry.age) * 100);

  return (
    <div id="life-expectancy-section" className="mt-20 sm:mt-24 scroll-mt-24">
      <div className="flex items-center justify-between gap-4 mb-6 relative">
        <p className="text-[var(--muted)] text-xs tracking-[0.3em] uppercase font-medium">
          Life expectancy progress
        </p>

        {/* Custom Select Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 text-xs font-medium text-[var(--text)] hover:text-[var(--gold)] transition-colors py-1.5 px-3 rounded-lg border border-[var(--border)] bg-[var(--bg)] cursor-pointer"
          >
            <span>{selectedCountry.country} — {selectedCountry.age} yrs</span>
            <ChevronDown className={`w-3.5 h-3.5 text-[var(--muted)] transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isDropdownOpen && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setIsDropdownOpen(false)} 
              />
              <div className="absolute right-0 mt-2 w-64 max-h-72 overflow-y-auto bg-[var(--bg)] border border-[var(--border)] rounded-xl shadow-2xl z-50 divide-y divide-[var(--border)]">
                {lifeExpectancyCountries.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedCountry(item);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-xs transition-colors flex items-center justify-between cursor-pointer ${
                      selectedCountry.country === item.country
                        ? 'bg-[var(--gold)]/10 text-[var(--gold)] font-semibold'
                        : 'text-[var(--text)] hover:bg-[var(--surface)]'
                    }`}
                  >
                    <span>{item.country}</span>
                    <span className="text-[var(--muted)]">{item.age} yrs</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="w-full h-1.5 bg-[var(--border)] rounded-full overflow-hidden mb-4">
        <div 
          className="h-full bg-[var(--gold)] transition-all duration-1000 ease-out"
          style={{ width: `${percentageLived.toFixed(2)}%` }}
        />
      </div>

      {/* Percentage Text */}
      <p className="text-sm text-[var(--muted)]">
        <strong className="text-[var(--text)] font-semibold font-display text-lg mr-1">
          {percentageLived.toFixed(2)}%
        </strong>
        of the average life expectancy in {selectedCountry.country} ({selectedCountry.age} years)
      </p>
    </div>
  );
};
