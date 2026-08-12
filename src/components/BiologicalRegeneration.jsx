import React from 'react';
import { formatNumber } from '../utils/timeCalculations';
import { Activity, Heart, Eye, Info, RefreshCw, Wind, Droplets, Zap, Shield, Sparkles } from 'lucide-react';

export const BiologicalRegeneration = ({ birthDate }) => {
  if (!birthDate || isNaN(birthDate.getTime())) return null;

  const now = new Date();
  const diffMs = Math.max(0, now.getTime() - birthDate.getTime());
  const secondsAlive = diffMs / 1000;
  const daysAlive = diffMs / (1000 * 60 * 60 * 24);

  // 1. Red Blood Cells (120 days)
  const rbcCycles = Math.floor(daysAlive / 120);

  // 2. Skin Epidermis (30 days)
  const skinCycles = Math.floor(daysAlive / 30);

  // 3. Stomach Epithelium (4 days)
  const stomachCycles = Math.floor(daysAlive / 4);

  // 4. Heart Circulation Volume (7,200 L/day)
  const totalBloodLiters = daysAlive * 7200;
  const totalBloodMillionLiters = (totalBloodLiters / 1e6).toFixed(2);

  // 5. Eye Blinks (14,400 blinks/day)
  const totalBlinks = Math.floor(daysAlive * 14400);
  const totalBlinksMillion = (totalBlinks / 1e6).toFixed(1);

  // 6. Cellular Mitosis Divisions (~3.8 Million cell divisions/second)
  const totalMitosisDivisions = secondsAlive * 3.8e6;
  const totalMitosisQuadrillion = (totalMitosisDivisions / 1e15).toFixed(2);

  // 7. Lung Respiratory Volume (8,640 L/day)
  const totalLungLiters = daysAlive * 86400 * (12 * 0.5) / 60;
  const totalLungMillionLiters = (totalLungLiters / 1e6).toFixed(2);

  // 8. Kidney Plasma Filtration (180 L/day)
  const totalKidneyLiters = daysAlive * 180;
  const totalKidneyMillionLiters = (totalKidneyLiters / 1e6).toFixed(2);

  // 9. Taste Bud Papillae Renewal (12 days)
  const tasteBudCycles = Math.floor(daysAlive / 12);

  // 10. Liver Tissue Renewal (400 days)
  const liverCycles = Math.floor(daysAlive / 400);

  // 11. Neural Impulse Signals (1.5 Billion/day)
  const totalNeuralImpulsesBillion = (daysAlive * 1.5).toFixed(1);

  // 12. Bone Skeleton Remodeling (10 years = 3652.5 days)
  const boneCycles = (daysAlive / 3652.5).toFixed(2);

  // 13. Lifetime Heart Beats (100,800 beats/day = ~70 bpm)
  const totalHeartBeatsBillion = ((daysAlive * 100800) / 1e9).toFixed(3);
  const totalHeartBeatsFormatted = formatNumber(Math.floor(daysAlive * 100800));

  // 14. Salivary Gland Secretion (1.5 L/day)
  const totalSalivaLiters = Math.floor(daysAlive * 1.5);

  // 15. Neutrophil White Blood Cell Cycles (1.5 days)
  const neutrophilCycles = Math.floor(daysAlive / 1.5);

  // 16. Scalp Hair Growth Velocity (0.4 mm/day)
  const totalHairMeters = ((daysAlive * 0.0004)).toFixed(2);

  const bioItems = [
    {
      title: "Cellular Mitosis Divisions",
      subtitle: "Microscopic cell division",
      value: `~${totalMitosisQuadrillion} Quadrillion`,
      numericSub: `${formatNumber(Math.floor(totalMitosisDivisions))} divisions`,
      desc: "Based on a human physiological baseline averaging ~3.8 Million cellular divisions (mitosis) occurring per second.",
      note: "Continuous cell division replaces somatic cells in bone marrow, gut, skin, and vascular endothelium."
    },
    {
      title: "Red Blood Cells",
      subtitle: "Estimated renewal cycles",
      value: `~${rbcCycles} cycles`,
      desc: "Based on an average human erythrocyte (red blood cell) lifespan of approximately 120 days.",
      note: "Erythrocytes are recycled continuously by macrophages in the spleen and liver."
    },
    {
      title: "Skin Epidermis",
      subtitle: "Estimated turnover cycles",
      value: `~${skinCycles} cycles`,
      desc: "Based on a standard 30-day epidermal cell turnover rate from stratum basale to desquamation.",
      note: "Different cutaneous layers and anatomical regions possess varying cellular turnover rates."
    },
    {
      title: "Stomach Epithelium",
      subtitle: "Estimated lining renewal",
      value: `~${stomachCycles} cycles`,
      desc: "Based on a 4-day turnover rate for rapidly renewing surface gastric epithelial cells.",
      note: "Refers specifically to surface epithelial lining cells exposed to gastric acid, not muscular walls."
    },
    {
      title: "Heart Circulation Volume",
      subtitle: "Lifetime blood pumped",
      value: `~${totalBloodMillionLiters} Million L`,
      numericSub: `${formatNumber(Math.floor(totalBloodLiters))} Liters`,
      desc: "Estimated from a baseline resting cardiac output of approximately 5.0 Liters per minute (~7,200 L/day).",
      note: "Actual cardiac output varies dynamically with age, heart rate, metabolic demand, and physical exertion."
    },
    {
      title: "Spontaneous Eye Blinks",
      subtitle: "Lifetime ocular blinks",
      value: `~${totalBlinksMillion} Million`,
      numericSub: `${formatNumber(totalBlinks)} blinks`,
      desc: "Estimated from an average spontaneous waking rate of ~15 blinks/min across 16 waking hours per day.",
      note: "Blink frequency increases during conversation/stress and decreases during intense visual focus."
    },
    {
      title: "Lung Air Volume Inhaled",
      subtitle: "Lifetime respiratory intake",
      value: `~${totalLungMillionLiters} Million L`,
      numericSub: `${formatNumber(Math.floor(totalLungLiters))} Liters`,
      desc: "Based on a resting tidal volume of 0.5L at ~12 breaths per minute (~8,640 L of air per day).",
      note: "Respiratory volume increases significantly during exercise, physical exertion, and athletic training."
    },
    {
      title: "Kidney Blood Plasma Cleansed",
      subtitle: "Renal glomerular filtration",
      value: `~${totalKidneyMillionLiters} Million L`,
      numericSub: `${formatNumber(Math.floor(totalKidneyLiters))} Liters`,
      desc: "Estimated from a normal Glomerular Filtration Rate (GFR) filtering ~180 Liters of blood plasma daily.",
      note: "Nephrons continuously filter, reabsorb, and purify blood plasma around the clock."
    },
    {
      title: "Taste Bud Receptor Renewal",
      subtitle: "Gustatory cell turnover",
      value: `~${tasteBudCycles} cycles`,
      desc: "Based on a 12-day rapid turnover rate for gustatory receptor cells on tongue papillae.",
      note: "Receptor cells continuously regenerate to maintain chemical taste perception."
    },
    {
      title: "Liver Hepatocyte Turnover",
      subtitle: "Hepatic tissue renewal",
      value: `~${liverCycles} cycles`,
      desc: "Based on a mean physiological turnover rate of 400 days for human liver cells (hepatocytes).",
      note: "The liver exhibits extraordinary regenerative capabilities among internal organs."
    },
    {
      title: "Neural Action Potentials",
      subtitle: "Lifetime synaptic signals",
      value: `~${totalNeuralImpulsesBillion} Billion`,
      desc: "Estimated from baseline central nervous system action potential firing rates (~1.5 Billion/day).",
      note: "Represents baseline electrophysiological impulse signaling across brain neural networks."
    },
    {
      title: "Bone Skeleton Remodeling",
      subtitle: "Osseous matrix turnover",
      value: `~${boneCycles} replacements`,
      desc: "Based on a 10-year complete skeletal remodeling cycle (~10% total bone matrix replaced annually).",
      note: "Osteoclasts and osteoblasts continuously resorb and rebuild bone tissue throughout life."
    },
    {
      title: "Total Cardiac Beats",
      subtitle: "Lifetime myocardial pulses",
      value: `~${totalHeartBeatsBillion} Billion`,
      numericSub: `${totalHeartBeatsFormatted} beats`,
      desc: "Based on an average resting heart rate of ~70 beats per minute (~100,800 beats per day).",
      note: "Myocardial contraction rates fluctuate dynamically based on physical activity and autonomic state."
    },
    {
      title: "Salivary Gland Production",
      subtitle: "Oral moisture volume",
      value: `~${formatNumber(totalSalivaLiters)} Liters`,
      desc: "Based on a daily production of ~1.5 Liters of saliva secreted by major salivary glands.",
      note: "Saliva aids in enzymatic digestion, oral antimicrobial immunity, and enamel remineralization."
    },
    {
      title: "Neutrophil White Blood Cells",
      subtitle: "Innate immune turnover",
      value: `~${neutrophilCycles} cycles`,
      desc: "Based on a short 1.5-day circulating lifespan for primary innate immune neutrophils.",
      note: "Neutrophils are produced in vast quantities daily in bone marrow to maintain immune defense."
    },
    {
      title: "Scalp Hair Growth Length",
      subtitle: "Cumulative follicular growth",
      value: `~${totalHairMeters} Meters`,
      desc: "Based on a mean scalp hair growth velocity of ~0.4 mm per day (~1.25 cm per month).",
      note: "Calculates total potential linear hair length produced across all active anagen follicles."
    }
  ];

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Activity className="w-4 h-4 text-[var(--gold)]" />
          <p className="text-[var(--gold)] text-xs tracking-[0.3em] uppercase font-semibold">
            Physiological Turnover Engine (16 Metrics)
          </p>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl text-[var(--text)] font-normal mb-3">
          Biological & Physical Regeneration
        </h2>
        <p className="text-xs sm:text-sm text-[var(--muted)] max-w-xl leading-relaxed">
          Estimated cellular turnover, microscopic mitosis, organ fluid volume, and physiological activity throughout your lifetime based on published medical averages.
        </p>
      </div>

      {/* Grid of 16 Biological Renewal Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bioItems.map((item, idx) => (
          <div 
            key={idx}
            className="p-6 border border-[var(--border)] bg-[var(--bg)] rounded-xl space-y-4 flex flex-col justify-between hover:border-[var(--gold)]/40 transition-colors"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-widest text-[var(--gold)] font-mono font-semibold">
                  #{idx + 1} · {item.subtitle}
                </span>
                <RefreshCw className="w-3.5 h-3.5 text-[var(--gold)] opacity-70" />
              </div>

              <h3 className="font-display text-2xl text-[var(--text)] font-normal">
                {item.title}
              </h3>

              <div className="pt-2">
                <p className="font-display text-3xl text-[var(--gold)] font-normal tracking-tight">
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
        ))}
      </div>

      {/* Medical Disclaimer Box */}
      <div className="p-4 border border-[var(--border)] bg-[var(--surface)]/50 rounded-lg flex items-start gap-3 text-xs text-[var(--muted)] leading-relaxed">
        <Info className="w-4 h-4 text-[var(--gold)] flex-shrink-0 mt-0.5" />
        <p>
          <strong className="text-[var(--text)] font-medium mr-1">Physiological Disclaimer:</strong>
          These turnover counts represent estimated renewal cycles based on published clinical physiology literature. Biological renewal varies between individuals and tissue types; calculations do not constitute individual medical history or diagnostic measurements.
        </p>
      </div>
    </div>
  );
};
