import React from 'react';
import { calculateFullMoonsAndSolstices } from '../utils/astronomicalCalculations';
import { Moon, Sun, Calendar, Clock, Info } from 'lucide-react';

export const CelestialRhythms = ({ birthDate }) => {
  if (!birthDate || isNaN(birthDate.getTime())) return null;

  const cel = calculateFullMoonsAndSolstices(birthDate);

  if (!cel) return null;

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Moon className="w-4 h-4 text-[var(--gold)]" />
          <p className="text-[var(--gold)] text-xs tracking-[0.3em] uppercase font-semibold">
            Astronomical Cycles Engine
          </p>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl text-[var(--text)] font-normal mb-3">
          Natural & Celestial Rhythms
        </h2>
        <p className="text-xs sm:text-sm text-[var(--muted)] max-w-xl leading-relaxed">
          The natural astronomical events, lunar phases, solar solstices, equinoxes, and leap calendar days that have occurred during your lifetime.
        </p>
      </div>

      {/* Grid of Celestial Items */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Full Moons */}
        <div className="p-8 border border-[var(--border)] bg-[var(--bg)] rounded-xl space-y-4 flex flex-col justify-between hover:border-[var(--gold)]/40 transition-colors">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-widest text-[var(--gold)] font-mono font-semibold">
                Lunar Cycles
              </span>
              <Moon className="w-5 h-5 text-[var(--gold)]" />
            </div>

            <h3 className="font-display text-2xl text-[var(--text)] font-normal mb-1">
              Full Moons
            </h3>
            <p className="font-display text-4xl text-[var(--gold)] font-normal my-2">
              {cel.fullMoonsCount}
            </p>
            <p className="text-xs text-[var(--muted)]">
              Full moon events during your lifetime
            </p>
          </div>

          <div className="pt-4 border-t border-[var(--border)] space-y-1.5 text-xs text-[var(--muted)]">
            <div className="flex items-center justify-between">
              <span>Next Full Moon:</span>
              <span className="text-[var(--text)] font-mono font-medium">{cel.nextFullMoonDate}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-[var(--gold)] font-mono">
              <Clock className="w-3 h-3" />
              <span>in {cel.daysToNextFullMoon} days</span>
            </div>
          </div>
        </div>

        {/* Solstices & Equinoxes */}
        <div className="p-8 border border-[var(--border)] bg-[var(--bg)] rounded-xl space-y-4 flex flex-col justify-between hover:border-[var(--gold)]/40 transition-colors">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-widest text-[var(--gold)] font-mono font-semibold">
                Solar Stations
              </span>
              <Sun className="w-5 h-5 text-[var(--gold)]" />
            </div>

            <h3 className="font-display text-2xl text-[var(--text)] font-normal mb-1">
              Solstices & Equinoxes
            </h3>

            <div className="grid grid-cols-2 gap-4 my-3">
              <div>
                <span className="text-[10px] text-[var(--muted)] uppercase tracking-wider block">Solstices</span>
                <span className="font-display text-3xl text-[var(--text)]">{cel.totalSolstices}</span>
              </div>
              <div>
                <span className="text-[10px] text-[var(--muted)] uppercase tracking-wider block">Equinoxes</span>
                <span className="font-display text-3xl text-[var(--text)]">{cel.totalEquinoxes}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[var(--border)] text-[11px] font-mono text-[var(--muted)] space-y-1">
            <div>March Eq: {cel.marchEquinoxes} · June Sol: {cel.juneSolstices}</div>
            <div>Sept Eq: {cel.septEquinoxes} · Dec Sol: {cel.decSolstices}</div>
          </div>
        </div>

        {/* Leap Days Lived */}
        <div className="p-8 border border-[var(--border)] bg-[var(--bg)] rounded-xl space-y-4 flex flex-col justify-between hover:border-[var(--gold)]/40 transition-colors">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-widest text-[var(--gold)] font-mono font-semibold">
                Calendar Anomaly
              </span>
              <Calendar className="w-5 h-5 text-[var(--gold)]" />
            </div>

            <h3 className="font-display text-2xl text-[var(--text)] font-normal mb-1">
              Leap Days Lived
            </h3>

            <p className="font-display text-4xl text-[var(--gold)] font-normal my-2">
              {cel.leapDaysLived} <span className="text-sm font-sans text-[var(--muted)]">leap days</span>
            </p>
            <p className="text-xs text-[var(--muted)]">
              February 29ths elapsed since birth
            </p>
          </div>

          <div className="pt-4 border-t border-[var(--border)] text-xs text-[var(--muted)]">
            Exact count of Gregorian calendar quadrennial intercalary leap days experienced.
          </div>
        </div>
      </div>

      {/* Astronomical Note */}
      <div className="p-4 border border-[var(--border)] bg-[var(--surface)]/50 rounded-lg flex items-start gap-3 text-xs text-[var(--muted)] leading-relaxed">
        <Info className="w-4 h-4 text-[var(--gold)] flex-shrink-0 mt-0.5" />
        <p>
          <strong className="text-[var(--text)] font-medium mr-1">Astronomical Clarification:</strong>
          Full moons refer to celestial syzygy phase events that occurred within your lifetime timeframe based on the mean 29.53059-day synodic lunar month.
        </p>
      </div>
    </div>
  );
};
