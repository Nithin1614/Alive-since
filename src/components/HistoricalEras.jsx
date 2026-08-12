import React from 'react';
import { calculateHistoricalEpochs } from '../utils/astronomicalCalculations';
import { History, Sparkles, Info } from 'lucide-react';

export const HistoricalEras = ({ birthDate, birthYear }) => {
  const epochs = calculateHistoricalEpochs(birthDate);

  if (!epochs) return null;

  // Filter top cards to only show events that occurred DURING the user's lifetime (isBornBefore === true)
  const crossedEpochs = epochs.filter((e) => e.isBornBefore);

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <History className="w-4 h-4 text-[var(--gold)]" />
          <p className="text-[var(--gold)] text-xs tracking-[0.35em] uppercase font-semibold">
            Digital & Technological Epochs
          </p>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl text-[var(--text)] font-normal mb-3">
          Historical Epoch Percentage
        </h2>
        <p className="text-xs sm:text-sm text-[var(--muted)] max-w-xl leading-relaxed">
          How much of your life has taken place during key historical milestones of the modern digital era?
        </p>
      </div>

      {/* Epoch Percentage Cards (Only events crossed / lived through during user's lifetime) */}
      <div className="space-y-4">
        <p className="text-xs font-mono uppercase tracking-[0.25em] text-[var(--gold)]">
          Milestones Crossed During Your Lifetime ({crossedEpochs.length} Milestones)
        </p>

        {crossedEpochs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {crossedEpochs.map((item, idx) => (
              <div 
                key={idx}
                className="p-8 border border-[var(--gold)]/40 bg-[var(--bg)] rounded-xl space-y-4 flex flex-col justify-between hover:border-[var(--gold)] transition-colors shadow-lg"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-widest text-[var(--gold)] font-mono font-semibold">
                      {item.dateStr}
                    </span>
                    <Sparkles className="w-4 h-4 text-[var(--gold)]" />
                  </div>

                  <h3 className="font-display text-2xl text-[var(--text)] font-normal">
                    {item.name}
                  </h3>

                  <div className="pt-2">
                    <span className="text-[10px] uppercase tracking-wider text-[var(--muted)] block">Life Spent in Era</span>
                    <p className="font-display text-4xl text-[var(--gold)] font-normal tracking-tight">
                      {item.pctInEra}%
                    </p>
                    <p className="text-xs text-[var(--muted)] mt-1">of your total life elapsed</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--border)] text-xs text-[var(--muted)] leading-relaxed">
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 border border-[var(--border)] bg-[var(--surface)]/40 rounded-xl text-center text-xs text-[var(--muted)]">
            All listed historical milestones occurred before your birth year.
          </div>
        )}
      </div>

      {/* Interactive Visual Lifetime Timeline (All 18 Milestones from 1950 to Present) */}
      <div className="p-8 border border-[var(--border)] bg-[var(--bg)] rounded-xl space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xs uppercase tracking-[0.3em] text-[var(--gold)] font-semibold">
            Your Lifetime Historical Timeline
          </h3>
          <span className="text-xs font-mono text-[var(--muted)]">1950 – Present</span>
        </div>

        <div className="relative pl-6 sm:pl-8 border-l-2 border-[var(--gold)]/40 space-y-8 my-4">
          {/* Birth Node */}
          <div className="relative">
            <span className="absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full bg-[var(--gold)] ring-4 ring-[var(--bg)]" />
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[var(--gold)] block">Birth Date</span>
              <h4 className="font-display text-xl text-[var(--text)] font-normal">You were born ({birthYear})</h4>
              <p className="text-xs text-[var(--muted)] font-mono">Start of your personal timeline (0% of life elapsed)</p>
            </div>
          </div>

          {/* All 18 Epoch Nodes */}
          {epochs.map((item, idx) => (
            <div key={idx} className="relative">
              <span className={`absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full ring-4 ring-[var(--bg)] ${item.isBornBefore ? 'bg-[var(--gold)]' : 'bg-[var(--surface2)] border border-[var(--gold)]/50'}`} />
              <div>
                <span className={`text-[10px] uppercase font-mono tracking-widest block font-medium ${item.isBornBefore ? 'text-[var(--gold)]' : 'text-[#a39e93]'}`}>
                  {item.dateStr}
                </span>
                <h4 className={`font-display text-lg font-normal ${item.isBornBefore ? 'text-[var(--text)]' : 'text-[#d8d3c9]'}`}>
                  {item.name}
                </h4>
                <p className="text-xs">
                  {item.isBornBefore ? (
                    <span className="text-[var(--gold)] font-medium">
                      Occurred when you were already alive ({item.pctInEra}% of life lived in this era)
                    </span>
                  ) : (
                    <span className="text-[#99948a] font-normal">
                      Occurred before your birth
                    </span>
                  )}
                </p>
              </div>
            </div>
          ))}

          {/* Today Node */}
          <div className="relative">
            <span className="absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full bg-emerald-400 ring-4 ring-[var(--bg)] animate-pulse" />
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 block">Present Moment</span>
              <h4 className="font-display text-xl text-[var(--text)] font-normal">Today (100% of life to date)</h4>
              <p className="text-xs text-[var(--muted)] font-mono">Calculated live at this very second</p>
            </div>
          </div>
        </div>
      </div>

      {/* Historical Disclaimer */}
      <div className="p-4 border border-[var(--border)] bg-[var(--surface)]/50 rounded-lg flex items-start gap-3 text-xs text-[var(--muted)] leading-relaxed">
        <Info className="w-4 h-4 text-[var(--gold)] flex-shrink-0 mt-0.5" />
        <p>
          <strong className="text-[var(--text)] font-medium mr-1">Historical Reference Note:</strong>
          Milestones use historically documented public release and event dates (1950 to present day) to contextualize your personal life timeline against major scientific, astronomical, geopolitical, and technological eras.
        </p>
      </div>
    </div>
  );
};
