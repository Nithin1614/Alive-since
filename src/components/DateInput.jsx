import React, { useRef } from 'react';

export const DateInput = ({ day, month, year, onChange }) => {
  const dayRef = useRef(null);
  const monthRef = useRef(null);
  const yearRef = useRef(null);

  const handleDayChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 2);
    onChange('day', val);
    if (val.length === 2) {
      monthRef.current?.focus();
    }
  };

  const handleMonthChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 2);
    onChange('month', val);
    if (val.length === 2) {
      yearRef.current?.focus();
    }
  };

  const handleYearChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 4);
    onChange('year', val);
  };

  const handleKeyDown = (e, field) => {
    if (e.key === 'Backspace') {
      if (field === 'month' && !month) {
        dayRef.current?.focus();
      } else if (field === 'year' && !year) {
        monthRef.current?.focus();
      }
    }
  };

  return (
    <div id="date-entry" className="w-full scroll-mt-24">
      <label className="block text-[var(--muted)] text-xs tracking-[0.3em] uppercase mb-6 font-medium">
        Date of birth
      </label>
      
      <div className="flex items-end gap-3 sm:gap-6 max-w-lg">
        {/* Day */}
        <div className="flex-1 max-w-[90px] sm:max-w-[110px]">
          <input
            id="day-input"
            ref={dayRef}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="DD"
            maxLength={2}
            value={day}
            onChange={handleDayChange}
            onKeyDown={(e) => handleKeyDown(e, 'day')}
            className="date-field"
          />
          <span className="block text-[var(--dim)] text-[10px] sm:text-xs tracking-[0.2em] uppercase mt-2 text-center font-medium">
            Day
          </span>
        </div>

        <span className="text-[var(--dim)] text-2xl sm:text-3xl mb-5 flex-shrink-0 font-display select-none">
          /
        </span>

        {/* Month */}
        <div className="flex-1 max-w-[90px] sm:max-w-[110px]">
          <input
            ref={monthRef}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="MM"
            maxLength={2}
            value={month}
            onChange={handleMonthChange}
            onKeyDown={(e) => handleKeyDown(e, 'month')}
            className="date-field"
          />
          <span className="block text-[var(--dim)] text-[10px] sm:text-xs tracking-[0.2em] uppercase mt-2 text-center font-medium">
            Month
          </span>
        </div>

        <span className="text-[var(--dim)] text-2xl sm:text-3xl mb-5 flex-shrink-0 font-display select-none">
          /
        </span>

        {/* Year */}
        <div className="flex-1 min-w-[130px] sm:min-w-[170px] max-w-[200px]">
          <input
            ref={yearRef}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="YYYY"
            maxLength={4}
            value={year}
            onChange={handleYearChange}
            onKeyDown={(e) => handleKeyDown(e, 'year')}
            className="date-field"
          />
          <span className="block text-[var(--dim)] text-[10px] sm:text-xs tracking-[0.2em] uppercase mt-2 text-center font-medium">
            Year
          </span>
        </div>
      </div>
    </div>
  );
};
