import React, { useState } from 'react';
import { DateInput } from './DateInput';
import { calculateLifeMilestones } from '../utils/milestoneCalculations';
import { Sparkles, CheckCircle2, Clock } from 'lucide-react';

export const MilestoneEngine = ({ initialDay, initialMonth, initialYear }) => {
  const [day, setDay] = useState(initialDay || '');
  const [month, setMonth] = useState(initialMonth || '');
  const [year, setYear] = useState(initialYear || '');
  const [filter, setFilter] = useState('all'); // 'all' | 'upcoming' | 'passed'

  const now = new Date();
  const milestones = calculateLifeMilestones(day, month, year, now);

  const filteredMilestones = milestones ? milestones.filter((m) => {
    if (filter === 'upcoming') return !m.isPassed;
    if (filter === 'passed') return m.isPassed;
    return true;
  }) : [];

  return (
    <div className="space-y-16 animate-fadeIn">
      {/* Hero Header */}
      <section className="pt-4 sm:pt-6">
        <p className="text-[var(--muted)] text-xs tracking-[0.35em] uppercase mb-6 font-medium">
          Milestone Engine
        </p>
        <h1 
          className="font-display text-[var(--text)] leading-[1.05] mb-6 font-normal"
          style={{ fontSize: 'clamp(2.5rem, 6.5vw, 5.2rem)' }}
        >
          Significant moments,<br className="hidden sm:block" /> mapped in time
        </h1>
        <p className="text-[var(--muted)] text-base sm:text-lg max-w-xl leading-relaxed">
          Calculates major temporal achievements dynamically from your birth date — 10,000th day, 1 billionth second, 500,000th hour, and landmark birthdays.
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

      {/* Filter Tabs & Milestones List */}
      {milestones ? (
        <div className="space-y-8">
          {/* Tab Filter buttons */}
          <div className="flex items-center gap-3 border-b border-[var(--border)] pb-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 text-xs uppercase tracking-widest rounded-lg transition-colors cursor-pointer border-none ${
                filter === 'all'
                  ? 'bg-[var(--gold)] text-black font-semibold'
                  : 'text-[var(--muted)] hover:text-[var(--text)] bg-transparent'
              }`}
            >
              All Milestones ({milestones.length})
            </button>

            <button
              onClick={() => setFilter('upcoming')}
              className={`px-4 py-2 text-xs uppercase tracking-widest rounded-lg transition-colors cursor-pointer border-none ${
                filter === 'upcoming'
                  ? 'bg-[var(--gold)] text-black font-semibold'
                  : 'text-[var(--muted)] hover:text-[var(--text)] bg-transparent'
              }`}
            >
              Upcoming ({milestones.filter(m => !m.isPassed).length})
            </button>

            <button
              onClick={() => setFilter('passed')}
              className={`px-4 py-2 text-xs uppercase tracking-widest rounded-lg transition-colors cursor-pointer border-none ${
                filter === 'passed'
                  ? 'bg-[var(--gold)] text-black font-semibold'
                  : 'text-[var(--muted)] hover:text-[var(--text)] bg-transparent'
              }`}
            >
              Completed ({milestones.filter(m => m.isPassed).length})
            </button>
          </div>

          {/* Grid of Milestone Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredMilestones.map((m, idx) => (
              <div 
                key={idx} 
                className={`p-6 border rounded-xl transition-all duration-200 flex flex-col justify-between space-y-4 ${
                  m.isPassed
                    ? 'border-[var(--border)] bg-[var(--bg)] opacity-75 hover:opacity-100'
                    : 'border-[var(--gold)]/40 bg-[var(--surface)]/60 shadow-lg'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--muted)] block mb-1">
                      {m.category}
                    </span>
                    <h3 className="font-display text-2xl text-[var(--text)] font-normal">
                      {m.name}
                    </h3>
                  </div>

                  {m.isPassed ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] uppercase tracking-wider font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <CheckCircle2 className="w-3 h-3" /> Completed
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] uppercase tracking-wider font-semibold rounded-full bg-[var(--gold)]/15 text-[var(--gold)] border border-[var(--gold)]/30">
                      <Sparkles className="w-3 h-3" /> Upcoming
                    </span>
                  )}
                </div>

                <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between text-xs text-[var(--muted)]">
                  <span>{m.dateString}</span>
                  <span className="font-mono text-[var(--text)] font-medium">{m.relativeText}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="py-16 text-center border-t border-[var(--border)]">
          <p className="text-[var(--dim)] text-sm tracking-[0.25em] uppercase font-medium">
            — enter your date of birth above to calculate milestones —
          </p>
        </div>
      )}
    </div>
  );
};
