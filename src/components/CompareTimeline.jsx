import React, { useState } from 'react';
import { DateInput } from './DateInput';
import { compareTwoPeople } from '../utils/milestoneCalculations';
import { Users, Calendar, Trophy, ArrowRight } from 'lucide-react';

export const CompareTimeline = ({ initialDay, initialMonth, initialYear }) => {
  // Person A
  const [dayA, setDayA] = useState(initialDay || '');
  const [monthA, setMonthA] = useState(initialMonth || '');
  const [yearA, setYearA] = useState(initialYear || '');

  // Person B
  const [dayB, setDayB] = useState('');
  const [monthB, setMonthB] = useState('');
  const [yearB, setYearB] = useState('');

  const now = new Date();
  const comp = compareTwoPeople(
    { day: dayA, month: monthA, year: yearA },
    { day: dayB, month: monthB, year: yearB },
    now
  );

  return (
    <div className="space-y-16 animate-fadeIn">
      {/* Hero Header */}
      <section className="pt-4 sm:pt-6">
        <p className="text-[var(--muted)] text-xs tracking-[0.35em] uppercase mb-6 font-medium">
          Timeline Comparison
        </p>
        <h1 
          className="font-display text-[var(--text)] leading-[1.05] mb-6 font-normal"
          style={{ fontSize: 'clamp(2.5rem, 6.5vw, 5.2rem)' }}
        >
          Two lives,<br className="hidden sm:block" /> side by side
        </h1>
        <p className="text-[var(--muted)] text-base sm:text-lg max-w-xl leading-relaxed">
          Enter two dates of birth to explore exact age differences, birthday countdown races, and milestone timelines.
        </p>
      </section>

      {/* Date Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-8 border border-[var(--border)] bg-[var(--surface)]/40 rounded-xl">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-[var(--gold)]" />
            <h3 className="text-xs tracking-[0.3em] uppercase text-[var(--gold)] font-semibold">
              Person A (You)
            </h3>
          </div>
          <DateInput
            day={dayA}
            month={monthA}
            year={yearA}
            onChange={(field, val) => {
              if (field === 'day') setDayA(val);
              if (field === 'month') setMonthA(val);
              if (field === 'year') setYearA(val);
            }}
          />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-[var(--text)]" />
            <h3 className="text-xs tracking-[0.3em] uppercase text-[var(--text)] font-semibold">
              Person B
            </h3>
          </div>
          <DateInput
            day={dayB}
            month={monthB}
            year={yearB}
            onChange={(field, val) => {
              if (field === 'day') setDayB(val);
              if (field === 'month') setMonthB(val);
              if (field === 'year') setYearB(val);
            }}
          />
        </div>
      </div>

      {/* Comparison Results View */}
      {comp ? (
        <div className="space-y-16 animate-fadeIn">
          {/* Main Verdict Header */}
          <div className="p-8 sm:p-12 border border-[var(--border)] bg-[var(--bg)] rounded-xl text-center space-y-4">
            <p className="text-[var(--muted)] text-xs tracking-[0.3em] uppercase font-medium">
              Comparison Verdict
            </p>
            <h2 className="font-display text-4xl sm:text-6xl text-[var(--text)] font-normal">
              {comp.older === 'Equal' ? (
                "Both people are the exact same age!"
              ) : (
                <>
                  <span className="text-[var(--gold)]">{comp.olderName}</span> is older by{' '}
                  <span className="underline decoration-[var(--gold)]/40 underline-offset-8">
                    {comp.diffYears > 0 && `${comp.diffYears} ${comp.diffYears === 1 ? 'year' : 'years'} `}
                    {comp.diffMonths > 0 && `${comp.diffMonths} ${comp.diffMonths === 1 ? 'month' : 'months'} `}
                    {`${comp.diffDaysInAge} ${comp.diffDaysInAge === 1 ? 'day' : 'days'}`}
                  </span>
                </>
              )}
            </h2>
            <p className="text-xs sm:text-sm text-[var(--muted)] font-mono tracking-wide">
              Total difference: {comp.totalDiffDays} days · {comp.totalDiffHours} hours · {comp.totalDiffSeconds} seconds
            </p>
          </div>

          {/* Current Ages Side by Side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[var(--border)] border border-[var(--border)] overflow-hidden">
            <div className="bg-[var(--bg)] p-8 space-y-3">
              <p className="text-xs tracking-[0.3em] uppercase text-[var(--gold)] font-medium">
                Person A Current Age
              </p>
              <p className="font-display text-3xl sm:text-4xl text-[var(--text)] font-normal">
                {comp.statsA.years} <span className="text-xs font-sans uppercase text-[var(--muted)]">years</span>{' '}
                {comp.statsA.months} <span className="text-xs font-sans uppercase text-[var(--muted)]">months</span>{' '}
                {comp.statsA.days} <span className="text-xs font-sans uppercase text-[var(--muted)]">days</span>
              </p>
              <p className="text-xs text-[var(--muted)]">
                Born on a {comp.statsA.dayOfWeek} · {comp.statsA.totalDays.toLocaleString()} days alive
              </p>
            </div>

            <div className="bg-[var(--bg)] p-8 space-y-3">
              <p className="text-xs tracking-[0.3em] uppercase text-[var(--text)] font-medium">
                Person B Current Age
              </p>
              <p className="font-display text-3xl sm:text-4xl text-[var(--text)] font-normal">
                {comp.statsB.years} <span className="text-xs font-sans uppercase text-[var(--muted)]">years</span>{' '}
                {comp.statsB.months} <span className="text-xs font-sans uppercase text-[var(--muted)]">months</span>{' '}
                {comp.statsB.days} <span className="text-xs font-sans uppercase text-[var(--muted)]">days</span>
              </p>
              <p className="text-xs text-[var(--muted)]">
                Born on a {comp.statsB.dayOfWeek} · {comp.statsB.totalDays.toLocaleString()} days alive
              </p>
            </div>
          </div>

          {/* Birthday Race */}
          <div className="p-8 border border-[var(--border)] bg-[var(--surface)]/50 rounded-xl space-y-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[var(--gold)]" />
              <p className="text-xs tracking-[0.3em] uppercase text-[var(--gold)] font-semibold">
                Upcoming Birthday Race
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-xs text-[var(--muted)] uppercase tracking-widest mb-1">Person A Next Birthday</p>
                <p className="font-display text-2xl text-[var(--text)]">in {comp.statsA.daysToNextBirthday} days</p>
              </div>

              <div>
                <p className="text-xs text-[var(--muted)] uppercase tracking-widest mb-1">Person B Next Birthday</p>
                <p className="font-display text-2xl text-[var(--text)]">in {comp.statsB.daysToNextBirthday} days</p>
              </div>
            </div>

            <p className="text-sm text-[var(--text)] font-medium pt-4 border-t border-[var(--border)]">
              {comp.bdayOrderText}
            </p>
          </div>

          {/* Milestone Race */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-[var(--gold)]" />
              <p className="text-xs tracking-[0.3em] uppercase text-[var(--muted)] font-semibold">
                Milestone Timeline Race
              </p>
            </div>

            <div className="divide-y divide-[var(--border)] border-t border-b border-[var(--border)]">
              {comp.milestoneRace.map((item, idx) => (
                <div key={idx} className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-[var(--text)] mb-1">{item.name}</h4>
                    <p className="text-xs text-[var(--muted)]">
                      Person A: {item.dateAStr} · Person B: {item.dateBStr}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-[var(--gold)]/10 text-[var(--gold)] border border-[var(--gold)]/30">
                      Person {item.winner} reaches it {item.gapDays} days first
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="py-16 text-center border-t border-[var(--border)]">
          <p className="text-[var(--dim)] text-sm tracking-[0.25em] uppercase font-medium">
            — enter both birthdates above to compare timelines —
          </p>
        </div>
      )}
    </div>
  );
};
