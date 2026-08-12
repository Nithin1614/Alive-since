import React from 'react';
import { calculateBiosphereFootprint } from '../utils/astronomicalCalculations';
import { Leaf, Wind, Droplets, Info, Sparkles, Trees, RefreshCw } from 'lucide-react';

export const BiosphereFootprint = ({ birthDate }) => {
  if (!birthDate || isNaN(birthDate.getTime())) return null;

  const bio = calculateBiosphereFootprint(birthDate);

  if (!bio) return null;

  const items = [
    {
      title: "Pure Oxygen (O₂) Consumed",
      subtitle: "Lifetime respiratory intake",
      value: `~${bio.oxygenMetricTons} Metric Tons`,
      numericSub: `${bio.oxygenLiters} Liters`,
      desc: "Based on a human physiological baseline of ~550 Liters of pure oxygen consumed per day (~0.84 kg O₂/day).",
      note: "Oxygen is continuously utilized by cellular mitochondria for ATP metabolic energy production.",
      icon: Wind
    },
    {
      title: "Mature Tree Oxygen Supply",
      subtitle: "Biosphere oxygen production",
      value: `~${bio.treesEquivalency} Mature Trees`,
      numericSub: "Lifetime net photosynthetic production",
      desc: "An average mature broadleaf tree produces enough oxygen to support approximately 0.5 humans annually (~2 trees per person).",
      note: "Measures the net arboreal photosynthetic output required to sustain your lifetime oxygen consumption.",
      icon: Trees
    },
    {
      title: "Water Cycle Participation",
      subtitle: "Hydrological body throughput",
      value: `~${bio.waterMetricTons} Metric Tons`,
      numericSub: `${bio.waterLiters} Liters`,
      desc: "Based on an average physiological fluid turnover of ~2.5 Liters of water processed through the human body per day.",
      note: "Water is continuously absorbed, transpired, and returned to Earth's planetary hydrological cycle.",
      icon: Droplets
    },
    {
      title: "Carbon Dioxide (CO₂) Expelled",
      subtitle: "Metabolic carbon respiration",
      value: `~${bio.co2MetricTons} Metric Tons`,
      numericSub: `${bio.co2ExhaledKg} Kilograms`,
      desc: "Based on a mean respiratory rate exhaling ~1.0 kg of carbon dioxide (CO₂) per day (~500 L CO₂/day).",
      note: "Exhaled carbon originates from the biological metabolism of organic dietary carbohydrates and fats.",
      icon: RefreshCw
    }
  ];

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Leaf className="w-4 h-4 text-[var(--gold)]" />
          <p className="text-[var(--gold)] text-xs tracking-[0.3em] uppercase font-semibold">
            Ecological & Planetary Connection
          </p>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl text-[var(--text)] font-normal mb-3">
          Biosphere & Environmental Footprint
        </h2>
        <p className="text-xs sm:text-sm text-[var(--muted)] max-w-xl leading-relaxed">
          Your lifelong biological exchange of oxygen, water, and carbon with Earth's living biosphere and global ecosystem cycles.
        </p>
      </div>

      {/* Grid of 4 Biosphere Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div 
              key={idx}
              className="p-8 border border-[var(--border)] bg-[var(--bg)] rounded-xl space-y-4 flex flex-col justify-between hover:border-[var(--gold)]/40 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest text-[var(--gold)] font-mono font-semibold">
                    {item.subtitle}
                  </span>
                  <Icon className="w-5 h-5 text-[var(--gold)]" />
                </div>

                <h3 className="font-display text-2xl text-[var(--text)] font-normal">
                  {item.title}
                </h3>

                <div className="pt-2">
                  <p className="font-display text-4xl text-[var(--gold)] font-normal tracking-tight">
                    {item.value}
                  </p>
                  {item.numericSub && (
                    <p className="text-xs font-mono text-[var(--muted)] mt-1">{item.numericSub}</p>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--border)] space-y-1.5 text-xs">
                <p className="text-[var(--text)] font-medium leading-relaxed">{item.desc}</p>
                <p className="text-[10px] text-[var(--muted)] leading-normal">{item.note}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Biosphere Caveat */}
      <div className="p-4 border border-[var(--border)] bg-[var(--surface)]/50 rounded-lg flex items-start gap-3 text-xs text-[var(--muted)] leading-relaxed">
        <Info className="w-4 h-4 text-[var(--gold)] flex-shrink-0 mt-0.5" />
        <p>
          <strong className="text-[var(--text)] font-medium mr-1">Biosphere Baseline Reference:</strong>
          Calculations use published metabolic respiration baselines (US EPA & FAO human physiology benchmarks). Tree oxygen production metrics are based on net annual photosynthesis by mature temperate broadleaf trees (~100 kg O₂/year per tree).
        </p>
      </div>
    </div>
  );
};
