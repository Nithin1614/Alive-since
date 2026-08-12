import React from 'react';
import { getHistoryForYear } from '../data/historyData';

export const YearInReview = ({ year }) => {
  if (!year) return null;

  const history = getHistoryForYear(year);

  return (
    <div className="my-14 pl-6 border-l-2 border-[var(--gold)] space-y-3">
      <p className="text-[var(--gold)] text-xs tracking-[0.3em] uppercase font-semibold">
        The year you were born — {year}
      </p>

      <div className="space-y-2 text-sm text-[var(--muted)] leading-relaxed">
        <p>
          <strong className="text-[var(--text)] font-medium">World</strong> — {history.world}
        </p>
        <p>
          <strong className="text-[var(--text)] font-medium">Culture</strong> — {history.culture}
        </p>
      </div>
    </div>
  );
};
