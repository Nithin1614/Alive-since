import React from 'react';
import { calculateMoonPhase, calculatePlanetarySkySnapshot, estimateWorldPopulation } from '../utils/astronomicalCalculations';
import { Moon, Users, Calendar, Sparkles, Sun, Eye, Info, Compass } from 'lucide-react';

export const CulturalTimeCapsule = ({ birthDate, dayOfWeek, birthYear }) => {
  if (!birthDate || isNaN(birthDate.getTime())) return null;

  const moon = calculateMoonPhase(birthDate);
  const sky = calculatePlanetarySkySnapshot(birthDate);
  const popThen = estimateWorldPopulation(birthYear);
  const popNow = "8.25 Billion";

  const dateFormatted = birthDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-[var(--gold)]" />
          <p className="text-[var(--gold)] text-xs tracking-[0.3em] uppercase font-semibold">
            Historical & Astronomical Context
          </p>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl text-[var(--text)] font-normal mb-3">
          The Day You Were Born
        </h2>
        <p className="text-xs sm:text-sm text-[var(--muted)] max-w-xl leading-relaxed">
          What was the world and the night sky like when you arrived on <strong className="text-[var(--text)] font-medium">{dateFormatted}</strong>?
        </p>
      </div>

      {/* Primary Context Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Card 1: Astronomical Moon Phase */}
        <div className="p-8 border border-[var(--border)] bg-[var(--bg)] rounded-xl space-y-4 flex flex-col justify-between hover:border-[var(--gold)]/40 transition-colors">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase tracking-widest text-[var(--gold)] font-mono font-semibold">
                Lunar Phase
              </span>
              <Moon className="w-5 h-5 text-[var(--gold)]" />
            </div>

            <h3 className="font-display text-3xl text-[var(--text)] font-normal mb-1">
              {moon?.phaseName}
            </h3>
            <p className="text-xs text-[var(--muted)] font-mono">
              {moon?.illuminatedPct}% Illuminated on your birth night
            </p>
          </div>

          <div className="pt-4 border-t border-[var(--border)] text-xs text-[var(--muted)]">
            Calculated via astronomical synodic lunar orbit algorithm (29.53 days cycle).
          </div>
        </div>

        {/* Card 2: World Population Expansion */}
        <div className="p-8 border border-[var(--border)] bg-[var(--bg)] rounded-xl space-y-4 flex flex-col justify-between hover:border-[var(--gold)]/40 transition-colors">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase tracking-widest text-[var(--gold)] font-mono font-semibold">
                Global Population
              </span>
              <Users className="w-5 h-5 text-[var(--gold)]" />
            </div>

            <p className="text-[10px] text-[var(--muted)] uppercase tracking-wider">When you arrived in {birthYear}</p>
            <h3 className="font-display text-3xl text-[var(--text)] font-normal mb-2">
              {popThen}
            </h3>

            <p className="text-[10px] text-[var(--muted)] uppercase tracking-wider">World Population Today</p>
            <p className="font-display text-xl text-[var(--text)] font-normal">
              {popNow}
            </p>
          </div>

          <div className="pt-4 border-t border-[var(--border)] text-xs text-[var(--muted)]">
            UN Department of Economic and Social Affairs (DESA) historical data.
          </div>
        </div>

        {/* Card 3: Birth Day of Week */}
        <div className="p-8 border border-[var(--border)] bg-[var(--bg)] rounded-xl space-y-4 flex flex-col justify-between hover:border-[var(--gold)]/40 transition-colors">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase tracking-widest text-[var(--gold)] font-mono font-semibold">
                Calendar Day
              </span>
              <Calendar className="w-5 h-5 text-[var(--gold)]" />
            </div>

            <h3 className="font-display text-3xl text-[var(--text)] font-normal mb-1">
              {dayOfWeek}
            </h3>
            <p className="text-xs text-[var(--muted)] font-mono">
              Born on a {dayOfWeek} in {birthYear}
            </p>
          </div>

          <div className="pt-4 border-t border-[var(--border)] text-xs text-[var(--muted)]">
            Gregorian calendar cycle verification.
          </div>
        </div>
      </div>

      {/* EXTENDED MOON PHYSICS DETAILS */}
      <div className="p-8 border border-[var(--gold)]/40 bg-[var(--bg)] rounded-xl space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Moon className="w-4 h-4 text-[var(--gold)]" />
            <h3 className="text-xs uppercase tracking-[0.3em] text-[var(--gold)] font-semibold">
              Detailed Lunar Orbital Physics
            </h3>
          </div>
          <span className="text-[10px] font-mono text-[var(--muted)] uppercase tracking-wider">Birth Night Analysis</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          <div className="p-4 border border-[var(--border)] bg-[var(--surface)]/50 rounded-lg">
            <span className="text-[10px] uppercase font-mono text-[var(--muted)] block">Moon Age</span>
            <p className="font-display text-2xl text-[var(--gold)] mt-1">{moon?.lunarAgeDays} Days</p>
            <span className="text-[10px] text-[var(--muted)] mt-1 block">into 29.53-day cycle</span>
          </div>

          <div className="p-4 border border-[var(--border)] bg-[var(--surface)]/50 rounded-lg">
            <span className="text-[10px] uppercase font-mono text-[var(--muted)] block">Distance from Earth</span>
            <p className="font-display text-2xl text-[var(--text)] mt-1">{moon?.distanceKm} km</p>
            <span className="text-[10px] text-[var(--muted)] mt-1 block">Elliptical orbit distance</span>
          </div>

          <div className="p-4 border border-[var(--border)] bg-[var(--surface)]/50 rounded-lg">
            <span className="text-[10px] uppercase font-mono text-[var(--muted)] block">Angular Size</span>
            <p className="font-display text-2xl text-[var(--text)] mt-1">{moon?.angularSizeArcmin}'</p>
            <span className="text-[10px] text-[var(--muted)] mt-1 block">Apparent sky diameter</span>
          </div>

          <div className="p-4 border border-[var(--border)] bg-[var(--surface)]/50 rounded-lg">
            <span className="text-[10px] uppercase font-mono text-[var(--muted)] block">Night Horizon State</span>
            <p className="font-display text-lg text-[var(--gold)] mt-1">
              {moon?.isNightVisible ? "Illuminated & Visible" : "Low Horizon / New"}
            </p>
            <span className="text-[10px] text-[var(--muted)] mt-1 block">Nighttime sky status</span>
          </div>
        </div>
      </div>

      {/* PLANETARY SKY SNAPSHOT — THE SKY WHEN YOU ARRIVED */}
      <div className="p-8 border border-[var(--border)] bg-[var(--bg)] rounded-xl space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-[var(--gold)]" />
            <h3 className="text-xs uppercase tracking-[0.3em] text-[var(--gold)] font-semibold">
              Planetary Sky Snapshot — The Sky When You Arrived
            </h3>
          </div>
          <span className="text-[10px] font-mono text-[var(--muted)] uppercase tracking-wider">Naked-Eye Planets</span>
        </div>

        <p className="text-xs text-[var(--muted)] leading-relaxed">
          Positions and visibility of major planets in the solar system on your birth date.
        </p>

        {/* Highlight Card */}
        <div className="p-6 border border-[var(--border)] bg-[var(--surface)]/40 rounded-xl grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          <div>
            <span className="text-[10px] uppercase font-mono text-[var(--gold)] tracking-widest block mb-1">
              Brightest Visible Planet
            </span>
            <h4 className="font-display text-3xl text-[var(--text)] font-normal flex items-center gap-2">
              <span>{sky?.brightestPlanetSymbol}</span>
              <span>{sky?.brightestPlanetName}</span>
            </h4>
            <p className="text-xs text-[var(--muted)] mt-1 font-mono">{sky?.brightestPlanetMag}</p>
          </div>

          <div className="sm:border-l sm:border-[var(--border)] sm:pl-6 space-y-1">
            <span className="text-[10px] uppercase font-mono text-[var(--muted)] tracking-wider block">
              Naked-Eye Visibility
            </span>
            <p className="font-display text-2xl text-[var(--gold)]">
              {sky?.visiblePlanetsCount} Planets Visible
            </p>
            <p className="text-xs text-[var(--muted)]">Above horizon during night/twilight hours</p>
          </div>
        </div>

        {/* Planetary Position Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 pt-2">
          {sky?.skySnapshot.map((planet, idx) => (
            <div 
              key={idx} 
              className="p-4 border border-[var(--border)] bg-[var(--bg)] rounded-lg space-y-2 hover:border-[var(--gold)]/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-lg" style={{ color: planet.color }}>{planet.symbol}</span>
                <span className={`text-[9px] uppercase font-mono px-2 py-0.5 rounded ${planet.isVisible ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-[var(--surface2)] text-[var(--muted)]'}`}>
                  {planet.isVisible ? 'Visible' : 'Near Sun'}
                </span>
              </div>

              <div>
                <h5 className="font-display text-lg text-[var(--text)]">{planet.name}</h5>
                <span className="text-[10px] font-mono text-[var(--muted)] block">Ecliptic {planet.longitudeDeg}°</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
