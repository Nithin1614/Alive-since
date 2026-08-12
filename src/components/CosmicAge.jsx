import React from 'react';
import { calculatePlanetaryAges, calculateHeliocentricMap } from '../utils/astronomicalCalculations';
import { Globe, Info, Clock, Compass } from 'lucide-react';

export const CosmicAge = ({ birthDate }) => {
  const planetaryAges = calculatePlanetaryAges(birthDate);
  const helioMap = calculateHeliocentricMap(birthDate);

  if (!planetaryAges) return null;

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Globe className="w-4 h-4 text-[var(--gold)]" />
          <p className="text-[var(--gold)] text-xs tracking-[0.3em] uppercase font-semibold">
            Astronomical Orbit Engine
          </p>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl text-[var(--text)] font-normal mb-3">
          Space Age & Planetary Birthdays
        </h2>
        <p className="text-xs sm:text-sm text-[var(--muted)] max-w-xl leading-relaxed">
          Your age on other solar system bodies based on their exact orbital periods around the Sun (sourced from NASA Jet Propulsion Laboratory).
        </p>
      </div>

      {/* Grid of Planets (Kept Intact at Top) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {planetaryAges.map((planet, idx) => (
          <div 
            key={idx}
            className="p-6 border border-[var(--border)] bg-[var(--bg)] rounded-xl space-y-4 flex flex-col justify-between hover:border-[var(--gold)]/40 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-widest text-[var(--muted)] font-mono">
                  {planet.symbol} {planet.name}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--surface)] text-[var(--muted)] border border-[var(--border)]">
                  {planet.orbitalDays} days
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-[var(--muted)] block">Age on {planet.name}</span>
                <p className="font-display text-3xl text-[var(--text)] font-normal">
                  {planet.planetaryAge} <span className="text-xs font-sans text-[var(--muted)]">years</span>
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--border)] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[var(--muted)]">Next Birthday #{planet.nextOrbitNum}:</span>
                <span className="text-[var(--text)] font-medium font-mono">{planet.nextBdayDate}</span>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-[var(--gold)] font-mono">
                <Clock className="w-3 h-3" />
                <span>in {planet.daysUntilBday} days, {planet.hoursUntilBday} hrs</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FEATURE #2: HELIOCENTRIC PLANETARY ALIGNMENT MAP (PLACED BELOW EXISTING PLANETARY CARDS) */}
      {helioMap && (
        <div className="p-8 border border-[var(--gold)]/40 bg-[var(--bg)] rounded-xl space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-[var(--gold)]" />
              <h3 className="text-xs uppercase tracking-[0.3em] text-[var(--gold)] font-semibold">
                Solar System Heliocentric Alignment Map
              </h3>
            </div>
            <span className="text-[10px] font-mono text-[var(--muted)] uppercase tracking-wider">360° Solar Radial Geometry</span>
          </div>

          <p className="text-xs text-[var(--muted)] leading-relaxed">
            Exact heliocentric ecliptic angles (0°–360°) of all 8 major planets around the Sun on your birth date vs. today.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {helioMap.map((item, idx) => (
              <div 
                key={idx}
                className="p-4 border border-[var(--border)] bg-[var(--surface)]/40 rounded-lg space-y-2 hover:border-[var(--gold)]/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg text-[var(--text)] flex items-center gap-1.5">
                    <span style={{ color: item.color }}>{item.symbol}</span>
                    <span>{item.name}</span>
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-[var(--border)]">
                  <div>
                    <span className="text-[9px] uppercase font-mono text-[var(--gold)] block">Birth Angle</span>
                    <span className="font-mono text-sm text-[var(--text)]">{item.birthAngle}°</span>
                  </div>

                  <div>
                    <span className="text-[9px] uppercase font-mono text-[var(--muted)] block">Today's Angle</span>
                    <span className="font-mono text-sm text-[var(--muted)]">{item.nowAngle}°</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* NASA Scientific Caveat Box */}
      <div className="p-4 border border-[var(--border)] bg-[var(--surface)]/50 rounded-lg flex items-start gap-3 text-xs text-[var(--muted)] leading-relaxed">
        <Info className="w-4 h-4 text-[var(--gold)] flex-shrink-0 mt-0.5" />
        <p>
          <strong className="text-[var(--text)] font-medium mr-1">Scientific Reference:</strong>
          Planetary age measures the exact number of orbital revolutions around the Sun completed since your birth date based on NASA JPL sidereal orbital periods. Heliocentric map displays planetary ecliptic longitudes relative to the Sun.
        </p>
      </div>
    </div>
  );
};
