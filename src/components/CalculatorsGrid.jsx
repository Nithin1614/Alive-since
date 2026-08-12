import React from 'react';

export const CalculatorsGrid = ({ hasStats }) => {
  const calculators = [
    { title: "Days Old", targetId: "days-old-row" },
    { title: "Hours Old", targetId: "hours-old-row" },
    { title: "Seconds Old", targetId: "seconds-counter" },
    { title: "Weeks Old", targetId: "weeks-old-card" },
    { title: "Heartbeats", targetId: "heartbeats-row" },
    { title: "Life Expectancy", targetId: "life-expectancy-section" },
    { title: "Birthday Countdown", targetId: "birthday-countdown-card" },
    { title: "What Day Was I Born?", targetId: "born-on-day" },
    { title: "Age in Days", targetId: "days-old-row" }
  ];

  const handleItemClick = (e, targetId) => {
    e.preventDefault();
    if (hasStats) {
      const el = document.getElementById(targetId) || document.getElementById('seconds-counter');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Flash background highlight effect for 1.5s
        el.classList.add('bg-[var(--gold)]/10');
        setTimeout(() => el.classList.remove('bg-[var(--gold)]/10'), 1500);
      }
    } else {
      // If no birthdate entered yet, scroll to date entry and focus DD
      const el = document.getElementById('date-entry');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        document.getElementById('day-input')?.focus();
      }
    }
  };

  return (
    <div className="mt-24 sm:mt-28">
      <p className="text-[var(--muted)] text-xs tracking-[0.3em] uppercase mb-8 font-medium">
        More calculators
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-px border border-[var(--border)] bg-[var(--border)]">
        {calculators.map((item, idx) => (
          <a
            key={idx}
            href={`#${item.targetId}`}
            onClick={(e) => handleItemClick(e, item.targetId)}
            className="bg-[var(--bg)] px-5 py-4 text-xs sm:text-sm text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface)] transition-all duration-150 font-medium block cursor-pointer"
          >
            {item.title}
          </a>
        ))}
      </div>
    </div>
  );
};
