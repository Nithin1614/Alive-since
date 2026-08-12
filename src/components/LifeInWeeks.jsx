import React, { useState } from 'react';
import { Grid, Info } from 'lucide-react';
import { formatNumber } from '../utils/timeCalculations';

export const LifeInWeeks = ({ birthDate }) => {
  const [lifespanYears, setLifespanYears] = useState(80);

  if (!birthDate || isNaN(birthDate.getTime())) return null;

  const now = new Date();
  const diffMs = Math.max(0, now.getTime() - birthDate.getTime());
  const daysLived = diffMs / (1000 * 60 * 60 * 24);
  const weeksLived = Math.floor(daysLived / 7);

  const totalTargetWeeks = Math.floor(lifespanYears * 52.1775);
  const currentWeekIndex = weeksLived; // 0-indexed current week
  const remainingWeeks = Math.max(0, totalTargetWeeks - weeksLived);
  const percentElapsed = Math.min(100, (weeksLived / totalTargetWeeks) * 100).toFixed(1);

  // Generate grid matrix rows (each row = 52 weeks = 1 year)
  const years = Array.from({ length: lifespanYears }, (_, i) => i);

  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Header & Lifespan Selector */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Grid className="w-4 h-4 text-[var(--gold)]" />
            <p className="text-[var(--gold)] text-xs tracking-[0.3em] uppercase font-semibold">
              Temporal Life Matrix
            </p>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl text-[var(--text)] font-normal mb-2">
            Your Life in Weeks
          </h2>
          <p className="text-xs sm:text-sm text-[var(--muted)] max-w-xl leading-relaxed">
            Every square represents one single week of existence. Visualizing time in weeks makes the passage of life tangible and immediate.
          </p>
        </div>

        {/* Lifespan Horizon Selector */}
        <div className="flex items-center gap-2 border border-[var(--border)] bg-[var(--surface)]/50 p-1.5 rounded-lg">
          <span className="text-xs text-[var(--muted)] px-2 font-medium">Horizon:</span>
          {[70, 80, 90, 100].map((y) => (
            <button
              key={y}
              onClick={() => setLifespanYears(y)}
              className={`px-3 py-1 text-xs rounded transition-colors cursor-pointer border-none ${
                lifespanYears === y
                  ? 'bg-[var(--gold)] text-black font-semibold'
                  : 'text-[var(--muted)] hover:text-[var(--text)] bg-transparent'
              }`}
            >
              {y} yrs
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[var(--border)] border border-[var(--border)] overflow-hidden rounded-xl">
        <div className="bg-[var(--bg)] p-5">
          <span className="text-[10px] text-[var(--muted)] uppercase tracking-wider block mb-1">Weeks Lived</span>
          <span className="font-display text-2xl text-[var(--gold)] tabular-nums font-normal">{formatNumber(weeksLived)}</span>
        </div>

        <div className="bg-[var(--bg)] p-5">
          <span className="text-[10px] text-[var(--muted)] uppercase tracking-wider block mb-1">Current Week</span>
          <span className="font-display text-2xl text-[var(--text)] tabular-nums font-normal">Week #{currentWeekIndex + 1}</span>
        </div>

        <div className="bg-[var(--bg)] p-5">
          <span className="text-[10px] text-[var(--muted)] uppercase tracking-wider block mb-1">Remaining Weeks ({lifespanYears}y)</span>
          <span className="font-display text-2xl text-[var(--text)] tabular-nums font-normal">{formatNumber(remainingWeeks)}</span>
        </div>

        <div className="bg-[var(--bg)] p-5">
          <span className="text-[10px] text-[var(--muted)] uppercase tracking-wider block mb-1">% Elapsed</span>
          <span className="font-display text-2xl text-[var(--text)] tabular-nums font-normal">{percentElapsed}%</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 text-xs text-[var(--muted)] border-b border-[var(--border)] pb-4">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-[var(--gold)]" />
          <span>Lived Week</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-[var(--gold)] animate-pulse border border-white" />
          <span>Current Week</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-[var(--surface2)] border border-[var(--border)]" />
          <span>Future Week</span>
        </div>
      </div>

      {/* The Grid Visualization */}
      <div className="p-6 border border-[var(--border)] bg-[var(--bg)] rounded-xl overflow-x-auto">
        <div className="min-w-[650px] space-y-1.5">
          {years.map((yearIdx) => {
            const startWeekOfYear = yearIdx * 52;
            const isDecade = (yearIdx + 1) % 10 === 0;

            return (
              <div key={yearIdx} className={`flex items-center gap-1.5 ${isDecade ? 'mb-3' : ''}`}>
                <span className="w-8 text-[10px] text-[var(--muted)] font-mono text-right mr-2 select-none">
                  {(yearIdx % 5 === 0 || yearIdx === 0) ? `Age ${yearIdx}` : ''}
                </span>

                <div className="flex items-center gap-1 flex-1">
                  {Array.from({ length: 52 }, (_, weekOffset) => {
                    const absoluteWeek = startWeekOfYear + weekOffset;
                    const isPassed = absoluteWeek < weeksLived;
                    const isCurrent = absoluteWeek === weeksLived;

                    return (
                      <div
                        key={weekOffset}
                        title={`Age ${yearIdx}, Week ${weekOffset + 1} (Total Week #${absoluteWeek + 1})`}
                        className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-[2px] transition-all ${
                          isCurrent
                            ? 'bg-[var(--gold)] ring-2 ring-[var(--gold)] ring-offset-1 ring-offset-[var(--bg)] animate-pulse z-10'
                            : isPassed
                            ? 'bg-[var(--gold)]/80 hover:bg-[var(--gold)]'
                            : 'bg-[var(--surface2)] border border-[var(--border)]/60 hover:border-[var(--dim)]'
                        }`}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="p-4 border border-[var(--border)] bg-[var(--surface)]/50 rounded-lg flex items-start gap-3 text-xs text-[var(--muted)] leading-relaxed">
        <Info className="w-4 h-4 text-[var(--gold)] flex-shrink-0 mt-0.5" />
        <p>
          <strong className="text-[var(--text)] font-medium mr-1">Demographic Note:</strong>
          The {lifespanYears}-year horizon is a standard visual benchmarking reference. It does not constitute an individual mortality prediction or biological limit.
        </p>
      </div>
    </div>
  );
};
