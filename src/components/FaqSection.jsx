import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "How do I calculate my exact age?",
      a: "Enter your date of birth in the three fields above. The calculator instantly computes your age in years, months, days, hours, minutes, and seconds — updating every second."
    },
    {
      q: "How many days old am I?",
      a: "Your total days alive are listed in the stats table after you enter your birthdate. A 30-year-old is roughly 10,957 days old; a 25-year-old approximately 9,131 days old."
    },
    {
      q: "How accurate is this calculator?",
      a: "Accurate to the second. It uses the millisecond difference between midnight on your birth date and the current moment, handling leap years and varying month lengths automatically."
    },
    {
      q: "Is my birthdate stored anywhere?",
      a: "No. All calculations run entirely in your browser. Your birthdate never leaves your device and is never sent to any server."
    },
    {
      q: "How is the heartbeat count estimated?",
      a: "Using an average resting heart rate of 70 beats per minute — the commonly cited average for healthy adults. Treat it as a fascinating estimate rather than a medical figure."
    },
    {
      q: "What does the life expectancy progress show?",
      a: "It shows what percentage of the average life expectancy for your selected country you have already lived. Choose your country from the dropdown. Data from WHO life expectancy statistics."
    }
  ];

  return (
    <div id="faq-section" className="mt-24 sm:mt-28 scroll-mt-24">
      <p className="text-[var(--muted)] text-xs tracking-[0.3em] uppercase mb-8 font-medium">
        Questions
      </p>

      <div className="divide-y divide-[var(--border)] border-t border-b border-[var(--border)]">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="py-2">
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full py-4 flex items-center justify-between text-left text-sm font-medium text-[var(--text)] hover:text-[var(--gold)] transition-colors duration-200 cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-[var(--muted)] transition-transform duration-200 flex-shrink-0 ml-4 ${isOpen ? 'rotate-180 text-[var(--gold)]' : ''}`} />
              </button>
              
              {isOpen && (
                <p className="pb-5 text-sm text-[var(--muted)] leading-relaxed max-w-2xl animate-fadeIn">
                  {faq.a}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
