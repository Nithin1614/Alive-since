import React, { useState } from 'react';
import { DateInput } from './DateInput';
import { CosmicAge } from './CosmicAge';
import { LifeInWeeks } from './LifeInWeeks';
import { CosmicTravel } from './CosmicTravel';
import { CulturalTimeCapsule } from './CulturalTimeCapsule';
import { SleepAndChronotype } from './SleepAndChronotype';
import { BiologicalRegeneration } from './BiologicalRegeneration';
import { CelestialRhythms } from './CelestialRhythms';
import { SolarMassEnergy } from './SolarMassEnergy';
import { HistoricalEras } from './HistoricalEras';
import { BiosphereFootprint } from './BiosphereFootprint';
import { calculateAgeStats } from '../utils/timeCalculations';
import { Sparkles, Globe, Grid, Navigation, Moon, Calendar, Activity, Sun, Zap, History, Leaf } from 'lucide-react';

export const SpecialFeaturesHub = ({ initialDay, initialMonth, initialYear }) => {
  const [day, setDay] = useState(initialDay || '');
  const [month, setMonth] = useState(initialMonth || '');
  const [year, setYear] = useState(initialYear || '');
  const [subTab, setSubTab] = useState('cosmic');

  const now = new Date();
  const stats = calculateAgeStats(day, month, year, now);
  const birthDate = stats ? stats.birthDate : null;

  const subNavItems = [
    { id: 'cosmic', label: 'Cosmic Age', icon: Globe },
    { id: 'weeks', label: 'Life in Weeks', icon: Grid },
    { id: 'travel', label: 'Space Travel', icon: Navigation },
    { id: 'capsule', label: 'Time Capsule', icon: Calendar },
    { id: 'sleep', label: 'Sleep & Chronotype', icon: Moon },
    { id: 'biological', label: 'Biological Engine', icon: Activity },
    { id: 'biosphere', label: 'Biosphere Footprint', icon: Leaf },
    { id: 'celestial', label: 'Celestial Rhythms', icon: Sun },
    { id: 'solar', label: 'Solar Energy', icon: Zap },
    { id: 'historical', label: 'Historical Eras', icon: History }
  ];

  return (
    <div className="space-y-16 animate-fadeIn">
      {/* Hero Header */}
      <section className="pt-4 sm:pt-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-[var(--gold)]" />
          <p className="text-[var(--gold)] text-xs tracking-[0.35em] uppercase font-semibold">
            Experimental Temporal Suite (10 Engines)
          </p>
        </div>

        <h1 
          className="font-display text-[var(--text)] leading-[1.05] mb-6 font-normal"
          style={{ fontSize: 'clamp(2.5rem, 6.5vw, 5.2rem)' }}
        >
          Special Features &<br className="hidden sm:block" /> Cosmic Perspectives
        </h1>
        <p className="text-[var(--muted)] text-base sm:text-lg max-w-xl leading-relaxed">
          Explore planetary birthdays, visualize your lifespan in weeks, track space velocity, examine birth date moon phases, cellular renewal, biosphere footprints, celestial rhythms, and historical eras.
        </p>
      </section>

      {/* Date Input Section */}
      <div className="p-8 border border-[var(--border)] bg-[var(--surface)]/40 rounded-xl">
        <DateInput
          day={day}
          month={month}
          year={year}
          onChange={(field, val) => {
            if (field === 'day') setDay(val);
            if (field === 'month') setMonth(val);
            if (field === 'year') setYear(val);
          }}
        />
      </div>

      {/* Sub Navigation Tabs & Features View */}
      {birthDate ? (
        <div className="space-y-12">
          {/* Sub Navigation Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 border-b border-[var(--border)]">
            {subNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = subTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSubTab(item.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs uppercase tracking-wider font-medium transition-all cursor-pointer border-none flex-shrink-0 ${
                    isActive
                      ? 'bg-[var(--gold)] text-black font-semibold shadow-md'
                      : 'text-[var(--muted)] hover:text-[var(--text)] bg-[var(--surface)]/40'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Sub-Tab Feature View */}
          <div className="animate-fadeIn">
            {subTab === 'cosmic' && <CosmicAge birthDate={birthDate} />}
            {subTab === 'weeks' && <LifeInWeeks birthDate={birthDate} />}
            {subTab === 'travel' && <CosmicTravel birthDate={birthDate} />}
            {subTab === 'capsule' && (
              <CulturalTimeCapsule 
                birthDate={birthDate} 
                dayOfWeek={stats.dayOfWeek} 
                birthYear={stats.birthYear} 
              />
            )}
            {subTab === 'sleep' && <SleepAndChronotype birthDate={birthDate} />}
            {subTab === 'biological' && <BiologicalRegeneration birthDate={birthDate} />}
            {subTab === 'biosphere' && <BiosphereFootprint birthDate={birthDate} />}
            {subTab === 'celestial' && <CelestialRhythms birthDate={birthDate} />}
            {subTab === 'solar' && <SolarMassEnergy birthDate={birthDate} />}
            {subTab === 'historical' && <HistoricalEras birthDate={birthDate} birthYear={stats.birthYear} />}
          </div>
        </div>
      ) : (
        <div className="py-16 text-center border-t border-[var(--border)]">
          <p className="text-[var(--dim)] text-sm tracking-[0.25em] uppercase font-medium">
            — enter your date of birth above to unlock special features —
          </p>
        </div>
      )}
    </div>
  );
};
