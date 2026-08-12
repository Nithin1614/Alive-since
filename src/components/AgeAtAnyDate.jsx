import React, { useState } from 'react';
import { DateInput } from './DateInput';
import { calculateAgeAtTargetDate } from '../utils/milestoneCalculations';
import { Calendar, Clock, History, FastForward } from 'lucide-react';

export const AgeAtAnyDate = ({ initialDay, initialMonth, initialYear }) => {
  const [bDay, setBDay] = useState(initialDay || '');
  const [bMonth, setBMonth] = useState(initialMonth || '');
  const [bYear, setBYear] = useState(initialYear || '');

  const [tDay, setTDay] = useState('01');
  const [tMonth, setTMonth] = useState('01');
  const [tYear, setTYear] = useState('2030');

  const now = new Date();
  const res = calculateAgeAtTargetDate(bDay, bMonth, bYear, tDay, tMonth, tYear, now);

  const applyQuickPreset = (d, m, y) => {
    setTDay(d);
    setTMonth(m);
    setTYear(y);
  };

  return (
    <div className="space-y-16 animate-fadeIn">
      {/* Hero Header */}
      <section className="pt-4 sm:pt-6">
        <p className="text-[var(--muted)] text-xs tracking-[0.35em] uppercase mb-6 font-medium">
          Age at Any Date
        </p>
        <h1 
          className="font-display text-[var(--text)] leading-[1.05] mb-6 font-normal"
          style={{ fontSize: 'clamp(2.5rem, 6.5vw, 5.2rem)' }}
        >
          Travel through<br className="hidden sm:block" /> your timeline
        </h1>
        <p className="text-[var(--muted)] text-base sm:text-lg max-w-xl leading-relaxed">
          Select any past or future target date to calculate your exact age in years, months, days, weeks, and total seconds.
        </p>
      </section>

      {/* Date Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-8 border border-[var(--border)] bg-[var(--surface)]/40 rounded-xl">
        {/* Your Birth Date */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-4 h-4 text-[var(--gold)]" />
            <h3 className="text-xs tracking-[0.3em] uppercase text-[var(--gold)] font-semibold">
              1. Your Date of Birth
            </h3>
          </div>
          <DateInput
            day={bDay}
            month={bMonth}
            year={bYear}
            onChange={(field, val) => {
              if (field === 'day') setBDay(val);
              if (field === 'month') setBMonth(val);
              if (field === 'year') setBYear(val);
            }}
          />
        </div>

        {/* Target Date */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-4 h-4 text-[var(--text)]" />
            <h3 className="text-xs tracking-[0.3em] uppercase text-[var(--text)] font-semibold">
              2. Target Date
            </h3>
          </div>
          <DateInput
            day={tDay}
            month={tMonth}
            year={tYear}
            onChange={(field, val) => {
              if (field === 'day') setTDay(val);
              if (field === 'month') setTMonth(val);
              if (field === 'year') setTYear(val);
            }}
          />

          {/* Quick Presets */}
          <div className="flex items-center flex-wrap gap-2 mt-6">
            <span className="text-[10px] uppercase text-[var(--muted)] tracking-widest mr-1">Presets:</span>
            <button
              onClick={() => applyQuickPreset('01', '01', '2020')}
              className="px-2.5 py-1 text-[11px] font-medium border border-[var(--border)] rounded text-[var(--muted)] hover:text-[var(--text)] hover:border-[var(--gold)] transition-colors cursor-pointer bg-transparent"
            >
              Jan 1, 2020
            </button>
            <button
              onClick={() => applyQuickPreset('01', '01', '2030')}
              className="px-2.5 py-1 text-[11px] font-medium border border-[var(--border)] rounded text-[var(--muted)] hover:text-[var(--text)] hover:border-[var(--gold)] transition-colors cursor-pointer bg-transparent"
            >
              Jan 1, 2030
            </button>
            <button
              onClick={() => applyQuickPreset('01', '01', '2050')}
              className="px-2.5 py-1 text-[11px] font-medium border border-[var(--border)] rounded text-[var(--muted)] hover:text-[var(--text)] hover:border-[var(--gold)] transition-colors cursor-pointer bg-transparent"
            >
              Jan 1, 2050
            </button>
          </div>
        </div>
      </div>

      {/* Target Calculation Results */}
      {res ? (
        res.invalid ? (
          <div className="p-8 border border-red-500/30 bg-red-500/10 rounded-xl text-center text-red-400">
            {res.errorMsg}
          </div>
        ) : (
          <div className="space-y-12 animate-fadeIn">
            {/* Phrasing Card */}
            <div className="p-8 sm:p-12 border border-[var(--border)] bg-[var(--bg)] rounded-xl text-center space-y-4">
              <p className="text-[var(--muted)] text-xs tracking-[0.3em] uppercase font-medium">
                Target Date Calculation
              </p>
              <h2 className="font-display text-4xl sm:text-6xl text-[var(--text)] font-normal leading-tight">
                On <span className="text-[var(--gold)]">{res.targetDateString}</span>
              </h2>
              <p className="font-display text-2xl sm:text-3xl text-[var(--text)] font-normal pt-2">
                {res.phrasing}
              </p>
            </div>

            {/* Equivalent Metrics Breakdown Grid */}
            <div className="space-y-6">
              <p className="text-[var(--muted)] text-xs tracking-[0.3em] uppercase font-medium">
                Equivalent Time Breakdown on {res.targetDateString}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[var(--border)] border border-[var(--border)] overflow-hidden">
                <div className="bg-[var(--bg)] p-6">
                  <span className="text-xs text-[var(--muted)] uppercase tracking-wider block mb-1">Total Days</span>
                  <span className="font-display text-2xl text-[var(--text)] tabular-nums">{res.totalDays}</span>
                </div>

                <div className="bg-[var(--bg)] p-6">
                  <span className="text-xs text-[var(--muted)] uppercase tracking-wider block mb-1">Total Weeks</span>
                  <span className="font-display text-2xl text-[var(--text)] tabular-nums">{res.totalWeeks}</span>
                </div>

                <div className="bg-[var(--bg)] p-6">
                  <span className="text-xs text-[var(--muted)] uppercase tracking-wider block mb-1">Total Hours</span>
                  <span className="font-display text-2xl text-[var(--text)] tabular-nums">{res.totalHours}</span>
                </div>

                <div className="bg-[var(--bg)] p-6">
                  <span className="text-xs text-[var(--muted)] uppercase tracking-wider block mb-1">Total Seconds</span>
                  <span className="font-display text-2xl text-[var(--text)] tabular-nums">{res.totalSeconds}</span>
                </div>
              </div>
            </div>
          </div>
        )
      ) : (
        <div className="py-16 text-center border-t border-[var(--border)]">
          <p className="text-[var(--dim)] text-sm tracking-[0.25em] uppercase font-medium">
            — enter birthdate and target date above —
          </p>
        </div>
      )}
    </div>
  );
};
