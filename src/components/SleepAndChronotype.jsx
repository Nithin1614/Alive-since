import React, { useState } from 'react';
import { CHRONOTYPE_QUESTIONS, CHRONOTYPE_RESULTS } from '../utils/astronomicalCalculations';
import { formatNumber } from '../utils/timeCalculations';
import { Moon, Sparkles, CheckCircle2, RefreshCw, Info } from 'lucide-react';

export const SleepAndChronotype = ({ birthDate }) => {
  // Sleep duration state (default 8 hours)
  const [avgSleepHours, setAvgSleepHours] = useState(8);

  // Chronotype Quiz State
  const [quizStep, setQuizStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [quizResult, setQuizResult] = useState(null);

  if (!birthDate || isNaN(birthDate.getTime())) return null;

  const now = new Date();
  const totalDaysAlive = (now.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24);
  const totalHoursAsleep = totalDaysAlive * avgSleepHours;
  const totalSecondsAsleep = totalHoursAsleep * 3600;

  // Breakdown of sleep into Y, M, D
  const sleepDays = totalHoursAsleep / 24;
  const sleepYears = Math.floor(sleepDays / 365.25);
  const remDays = sleepDays % 365.25;
  const sleepMonths = Math.floor(remDays / 30.4375);
  const sleepDaysFinal = Math.floor(remDays % 30.4375);

  const pctLifeAsleep = ((avgSleepHours / 24) * 100).toFixed(1);

  // Quiz handler
  const handleAnswerSelect = (score) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);

    if (quizStep + 1 < CHRONOTYPE_QUESTIONS.length) {
      setQuizStep(quizStep + 1);
    } else {
      // Calculate winning chronotype
      const counts = { lion: 0, bear: 0, wolf: 0, dolphin: 0 };
      newAnswers.forEach((s) => {
        if (counts[s] !== undefined) counts[s]++;
      });

      let winner = 'bear';
      let maxCount = -1;
      Object.keys(counts).forEach((k) => {
        if (counts[k] > maxCount) {
          maxCount = counts[k];
          winner = k;
        }
      });

      setQuizResult(CHRONOTYPE_RESULTS[winner]);
    }
  };

  const restartQuiz = () => {
    setQuizStep(0);
    setAnswers([]);
    setQuizResult(null);
  };

  const progressPct = Math.round((quizStep / CHRONOTYPE_QUESTIONS.length) * 100);

  return (
    <div className="space-y-16 animate-fadeIn">
      {/* SECTION 1: SLEEP TIME CALCULATOR */}
      <div className="space-y-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Moon className="w-4 h-4 text-[var(--gold)]" />
            <p className="text-[var(--gold)] text-xs tracking-[0.3em] uppercase font-semibold">
              Lifetime Sleep Calculator
            </p>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl text-[var(--text)] font-normal mb-3">
            How much of your life have you spent asleep?
          </h2>
          <p className="text-xs sm:text-sm text-[var(--muted)] max-w-xl leading-relaxed">
            Adjust your average nightly sleep duration below to calculate your estimated total hours and years spent dreaming.
          </p>
        </div>

        {/* Slider input */}
        <div className="p-8 border border-[var(--border)] bg-[var(--bg)] rounded-xl space-y-6">
          <div className="flex items-center justify-between">
            <label className="text-xs uppercase tracking-widest text-[var(--muted)] font-medium">
              Average Nightly Sleep:
            </label>
            <span className="font-display text-2xl text-[var(--gold)]">
              {avgSleepHours} Hours / night
            </span>
          </div>

          <input
            type="range"
            min="4"
            max="12"
            step="0.5"
            value={avgSleepHours}
            onChange={(e) => setAvgSleepHours(parseFloat(e.target.value))}
            className="w-full accent-[var(--gold)] cursor-pointer"
          />

          {/* Result Card */}
          <div className="pt-6 border-t border-[var(--border)] space-y-4">
            <p className="text-xs text-[var(--muted)] uppercase tracking-widest">Estimated Lifetime Asleep</p>
            <h3 className="font-display text-3xl sm:text-5xl text-[var(--text)] font-normal">
              {sleepYears > 0 && `${sleepYears} years `}
              {sleepMonths > 0 && `${sleepMonths} months `}
              {`${sleepDaysFinal} days`}
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 text-xs font-mono text-[var(--muted)]">
              <div>Total Hours: <span className="text-[var(--text)]">{formatNumber(Math.floor(totalHoursAsleep))} hrs</span></div>
              <div>Total Seconds: <span className="text-[var(--text)]">{formatNumber(Math.floor(totalSecondsAsleep))} sec</span></div>
              <div>Life Spent Sleeping: <span className="text-[var(--gold)]">{pctLifeAsleep}%</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: CHRONOTYPE QUIZ */}
      <div className="space-y-8 border-t border-[var(--border)] pt-16">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-[var(--gold)]" />
            <p className="text-[var(--gold)] text-xs tracking-[0.3em] uppercase font-semibold">
              Chronobiology Assessment
            </p>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl text-[var(--text)] font-normal mb-3">
            Discover Your Chronotype
          </h2>
          <p className="text-xs sm:text-sm text-[var(--muted)] max-w-xl leading-relaxed">
            Assess your natural circadian rhythm schedule (Lion, Bear, Wolf, or Dolphin) based on Munich Chronotype Model principles.
          </p>
        </div>

        {quizResult ? (
          /* Quiz Results Card */
          <div className="p-8 sm:p-12 border border-[var(--gold)]/40 bg-[var(--surface)]/40 rounded-xl space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.3em] text-[var(--gold)] font-semibold">Your Chronotype Result</span>
              <span className="text-4xl">{quizResult.icon}</span>
            </div>

            <h3 className="font-display text-4xl text-[var(--text)] font-normal">
              {quizResult.name}
            </h3>

            <p className="text-sm text-[var(--text)] leading-relaxed max-w-xl">
              {quizResult.shortDesc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 bg-[var(--bg)] border border-[var(--border)] rounded-lg text-xs">
              <div>
                <span className="text-[var(--muted)] block mb-1">Peak Energy Window:</span>
                <span className="font-mono text-[var(--gold)] font-medium">{quizResult.peakEnergy}</span>
              </div>
              <div>
                <span className="text-[var(--muted)] block mb-1">Ideal Sleep Schedule:</span>
                <span className="font-mono text-[var(--text)] font-medium">{quizResult.sleepSchedule}</span>
              </div>
              <div>
                <span className="text-[var(--muted)] block mb-1">Population Prevalence:</span>
                <span className="font-mono text-[var(--text)] font-medium">{quizResult.popPct}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between">
              <button
                onClick={restartQuiz}
                className="flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg bg-[var(--surface)] hover:bg-[var(--border)] transition-colors cursor-pointer border border-[var(--border)] text-[var(--text)]"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Retake Quiz
              </button>

              <span className="text-[10px] text-[var(--muted)] font-mono">Informal Assessment (Non-Medical)</span>
            </div>
          </div>
        ) : (
          /* Quiz Active Question */
          <div className="p-8 border border-[var(--border)] bg-[var(--bg)] rounded-xl space-y-6">
            <div className="flex items-center justify-between text-xs text-[var(--muted)] uppercase font-mono">
              <span>Question {quizStep + 1} of {CHRONOTYPE_QUESTIONS.length}</span>
              <span>{progressPct}% Completed</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1 bg-[var(--border)] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[var(--gold)] transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>

            <h3 className="font-display text-2xl text-[var(--text)] font-normal pt-2">
              {CHRONOTYPE_QUESTIONS[quizStep].question}
            </h3>

            <div className="space-y-3 pt-2">
              {CHRONOTYPE_QUESTIONS[quizStep].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswerSelect(opt.score)}
                  className="w-full text-left p-4 rounded-lg border border-[var(--border)] bg-[var(--surface)]/30 hover:bg-[var(--surface)] hover:border-[var(--gold)]/50 transition-all text-xs text-[var(--text)] cursor-pointer flex items-center justify-between group"
                >
                  <span>{opt.label}</span>
                  <span className="text-[var(--gold)] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
