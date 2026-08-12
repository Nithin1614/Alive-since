import React from 'react';
import { calculateSolarMassConverted } from '../utils/astronomicalCalculations';
import { Sun, Zap, Info } from 'lucide-react';

export const SolarMassEnergy = ({ birthDate }) => {
  if (!birthDate || isNaN(birthDate.getTime())) return null;

  const solar = calculateSolarMassConverted(birthDate);

  if (!solar) return null;

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Sun className="w-4 h-4 text-[var(--gold)]" />
          <p className="text-[var(--gold)] text-xs tracking-[0.35em] uppercase font-semibold">
            Mass-Energy Equivalence (E = mc²)
          </p>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl text-[var(--text)] font-normal mb-3">
          Solar Energy & Cosmic Mass Engine
        </h2>
        <p className="text-xs sm:text-sm text-[var(--muted)] max-w-xl leading-relaxed">
          Deep inside the Sun's core, hydrogen fusion converts matter directly into radiant energy. Here is how much solar mass has been converted to light since your birth.
        </p>
      </div>

      {/* Main Feature Highlight Card */}
      <div className="p-8 sm:p-12 border border-[var(--gold)]/40 bg-[var(--bg)] rounded-xl space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-[0.3em] text-[var(--gold)] font-mono font-semibold">
            Solar Mass Converted to Energy
          </span>
          <Zap className="w-5 h-5 text-[var(--gold)]" />
        </div>

        <div className="space-y-2">
          <p className="text-xs text-[var(--muted)] uppercase tracking-wider">
            Since your birth second ({solar.secondsAlive} seconds ago):
          </p>
          <h3 className="font-display text-4xl sm:text-6xl text-[var(--text)] font-normal leading-tight">
            ~{solar.totalTrillionMetricTons} <span className="text-2xl sm:text-4xl text-[var(--gold)] font-sans">Trillion Metric Tons</span>
          </h3>
          <p className="text-sm font-mono text-[var(--muted)] pt-1">
            Equal to ~{solar.totalBillionMetricTons} Billion Metric Tons ({solar.totalMetricTons} tons)
          </p>
        </div>

        <div className="pt-6 border-t border-[var(--border)] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[var(--muted)] leading-relaxed">
          <div>
            <strong className="text-[var(--text)] font-medium block mb-1">Thermonuclear Rate:</strong>
            The Sun converts ~4.26 million metric tons (4.26 × 10⁹ kg) of matter into radiant energy every single second.
          </div>

          <div>
            <strong className="text-[var(--text)] font-medium block mb-1">Einstein's Formula (E = mc²):</strong>
            Proton-proton chain fusion converts 0.7% of fused hydrogen mass into pure light and heat radiating across the solar system.
          </div>
        </div>
      </div>

      {/* Scientific Caveat */}
      <div className="p-4 border border-[var(--border)] bg-[var(--surface)]/50 rounded-lg flex items-start gap-3 text-xs text-[var(--muted)] leading-relaxed">
        <Info className="w-4 h-4 text-[var(--gold)] flex-shrink-0 mt-0.5" />
        <p>
          <strong className="text-[var(--text)] font-medium mr-1">Astrophysical Scientific Reference:</strong>
          This calculation measures the mass-equivalent loss due specifically to core nuclear fusion radiation based on solar luminosity (L_sun = 3.828 × 10²⁶ Watts). Solar wind particle mass loss is additional.
        </p>
      </div>
    </div>
  );
};
