import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { DateInput } from './components/DateInput';
import { LiveCounter } from './components/LiveCounter';
import { QuickStatsGrid } from './components/QuickStatsGrid';
import { YearInReview } from './components/YearInReview';
import { LifeInNumbers } from './components/LifeInNumbers';
import { LifeExpectancyProgress } from './components/LifeExpectancyProgress';
import { ShareStatsCard } from './components/ShareStatsCard';
import { CalculatorsGrid } from './components/CalculatorsGrid';
import { FaqSection } from './components/FaqSection';
import { BlogSection } from './components/BlogSection';
import { Footer } from './components/Footer';
import { CompareTimeline } from './components/CompareTimeline';
import { MilestoneEngine } from './components/MilestoneEngine';
import { AgeAtAnyDate } from './components/AgeAtAnyDate';
import { SpecialFeaturesHub } from './components/SpecialFeaturesHub';
import { AboutSection } from './components/AboutSection';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsOfService } from './components/TermsOfService';
import { calculateAgeStats } from './utils/timeCalculations';

export function App() {
  // Navigation tab state: 'calculator' | 'compare' | 'milestones' | 'anydate' | 'special' | 'about' | 'privacy' | 'terms'
  const [activeTab, setActiveTab] = useState('calculator');

  // Theme state
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });

  // Date input state
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  // Live ticking timestamp
  const [now, setNow] = useState(new Date());

  // Apply dark class to <html> tag
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Live ticker updating every 1000ms
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleDateChange = (field, val) => {
    if (field === 'day') setDay(val);
    if (field === 'month') setMonth(val);
    if (field === 'year') setYear(val);
  };

  // Calculate stats when valid inputs exist
  const stats = calculateAgeStats(day, month, year, now);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] selection:bg-[var(--gold)] selection:text-black transition-colors duration-300">
      <Header 
        isDarkMode={isDarkMode} 
        toggleTheme={toggleTheme} 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="max-w-5xl mx-auto px-6 sm:px-8 py-12 sm:py-16">
        {activeTab === 'calculator' && (
          <div className="space-y-12">
            {/* Hero Section */}
            <section className="mb-12 sm:mb-16 pt-4 sm:pt-6">
              <p className="text-[var(--muted)] text-xs tracking-[0.35em] uppercase mb-6 font-medium">
                Age calculator
              </p>
              <h1 
                className="font-display text-[var(--text)] leading-[1.05] mb-6 font-normal"
                style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}
              >
                Your life,<br className="hidden sm:block" /> measured in time
              </h1>
              <p className="text-[var(--muted)] text-base sm:text-lg max-w-xl leading-relaxed">
                Enter your date of birth. See your life measured from your first moment to this very second.
              </p>
            </section>

            {/* Date Input Section */}
            <DateInput 
              day={day} 
              month={month} 
              year={year} 
              onChange={handleDateChange} 
            />

            {/* Conditional Results View */}
            {stats ? (
              <div className="animate-fadeIn">
                <LiveCounter stats={stats} />
                <QuickStatsGrid stats={stats} />
                <YearInReview year={stats.birthYear} />
                <LifeInNumbers stats={stats} />
                <LifeExpectancyProgress stats={stats} />
                <ShareStatsCard stats={stats} />
              </div>
            ) : (
              <div className="py-16 sm:py-24 text-center border-t border-[var(--border)] mt-12">
                <p className="text-[var(--dim)] text-xs sm:text-sm tracking-[0.25em] uppercase font-medium">
                  — enter your birthdate above —
                </p>
              </div>
            )}

            {/* Static Content Sections */}
            <CalculatorsGrid hasStats={!!stats} />
            <FaqSection />
            <BlogSection />
          </div>
        )}

        {activeTab === 'compare' && (
          <CompareTimeline 
            initialDay={day} 
            initialMonth={month} 
            initialYear={year} 
          />
        )}

        {activeTab === 'milestones' && (
          <MilestoneEngine 
            initialDay={day} 
            initialMonth={month} 
            initialYear={year} 
          />
        )}

        {activeTab === 'anydate' && (
          <AgeAtAnyDate 
            initialDay={day} 
            initialMonth={month} 
            initialYear={year} 
          />
        )}

        {activeTab === 'special' && (
          <SpecialFeaturesHub 
            initialDay={day} 
            initialMonth={month} 
            initialYear={year} 
          />
        )}

        {activeTab === 'about' && (
          <AboutSection />
        )}

        {activeTab === 'privacy' && (
          <PrivacyPolicy />
        )}

        {activeTab === 'terms' && (
          <TermsOfService />
        )}
      </main>

      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;
