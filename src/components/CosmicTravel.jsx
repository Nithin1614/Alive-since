import React from 'react';
import { calculateCosmicTravelDistances, calculatePhotonicJourney } from '../utils/astronomicalCalculations';
import { Navigation, Sparkles, Star, Info, Clock } from 'lucide-react';

export const CosmicTravel = ({ birthDate }) => {
  const travel = calculateCosmicTravelDistances(birthDate);
  const photon = calculatePhotonicJourney(birthDate);

  if (!travel || !photon) return null;

  const birthYear = birthDate ? birthDate.getFullYear() : '';

  const frames = [
    {
      title: "Earth's Axial Rotation",
      speedText: "1,670 km/h (0.464 km/s)",
      distanceKm: `${travel.rotationKm} km`,
      subText: `Distance Earth has spun you around its central rotational axis at the equator since ${birthYear}.`,
      refFrame: "Geocentric Earth-Fixed Frame"
    },
    {
      title: "Earth-Moon Barycenter Motion",
      speedText: "0.012 km/s (43.2 km/h)",
      distanceKm: `${travel.barycenterKm} km`,
      subText: `Distance carried by Earth's orbital wobble around the common Earth-Moon center of mass since ${birthYear}.`,
      refFrame: "Earth-Moon Barycentric Frame"
    },
    {
      title: "Solar Orbit (Revolution around the Sun)",
      speedText: "29.78 km/s (107,208 km/h)",
      distanceKm: `${travel.solarOrbitKm} km`,
      distanceHighlight: `${travel.solarOrbitBillionKm} Billion km`,
      subText: `Distance Earth has carried you along its elliptical orbit around the Sun since your birth second.`,
      refFrame: "Heliocentric Inertial Frame"
    },
    {
      title: "Solar Peculiar Motion (Solar Apex)",
      speedText: "20.0 km/s (72,000 km/h)",
      distanceKm: `${travel.solarApexKm} km`,
      distanceHighlight: `${travel.solarApexBillionKm} Billion km`,
      subText: `Motion of our Sun carrying you relative to neighbor stars toward Hercules since your birth.`,
      refFrame: "Local Standard of Rest (LSR)"
    },
    {
      title: "Galactic Orbit (Milky Way Motion)",
      speedText: "230 km/s (828,000 km/h)",
      distanceKm: `${travel.galacticKm} km`,
      distanceHighlight: `${travel.galacticBillionKm} Billion km`,
      subText: `Distance traveled as our solar system carried you around the Milky Way's galactic center since ${birthYear}.`,
      refFrame: "Galactocentric Rest Frame"
    },
    {
      title: "Andromeda Collision Approach",
      speedText: "110 km/s (396,000 km/h)",
      distanceKm: `${travel.andromedaKm} km`,
      distanceHighlight: `${travel.andromedaBillionKm} Billion km`,
      subText: `Distance carried by our galaxy on its gravitational collision course toward Andromeda since your birth.`,
      refFrame: "Local Group Barycentric Frame"
    },
    {
      title: "Virgo Infall (Great Attractor Motion)",
      speedText: "600 km/s (2,160,000 km/h)",
      distanceKm: `${travel.greatAttractorKm} km`,
      distanceHighlight: `${travel.greatAttractorBillionKm} Billion km`,
      subText: `Gravitational distance carried toward the Laniakea Supercluster / Great Attractor since your birth.`,
      refFrame: "Laniakea Supercluster Rest Frame"
    },
    {
      title: "Cosmic Microwave Background (CMB) Motion",
      speedText: "368 km/s (1,324,800 km/h)",
      distanceKm: `${travel.cmbKm} km`,
      distanceHighlight: `${travel.cmbBillionKm} Billion km`,
      subText: `Absolute distance Earth carried you relative to the cosmic microwave background rest frame since birth.`,
      refFrame: "Cosmic Microwave Background (CMB) Rest Frame"
    }
  ];

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Navigation className="w-4 h-4 text-[var(--gold)]" />
          <p className="text-[var(--gold)] text-xs tracking-[0.3em] uppercase font-semibold">
            Cosmic Velocity & Photonic Radius
          </p>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl text-[var(--text)] font-normal mb-3">
          Cosmic Space Travel Engine
        </h2>
        <p className="text-xs sm:text-sm text-[var(--muted)] max-w-xl leading-relaxed">
          As you sit still on Earth, your birth light is expanding across interstellar space at the speed of light, while Earth carries you through 8 distinct astronomical reference frames.
        </p>
      </div>

      {/* FEATURE #1: PHOTONIC JOURNEY (FEATURED HERO CARD AT THE VERY TOP) */}
      <div className="p-8 sm:p-12 border border-[var(--gold)]/50 bg-[var(--bg)] rounded-xl space-y-6 shadow-xl relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[var(--gold)]" />
            <span className="text-xs uppercase tracking-[0.3em] text-[var(--gold)] font-mono font-semibold">
              Special Feature · Photonic Journey
            </span>
          </div>
          <span className="text-[10px] font-mono text-[var(--gold)] px-3 py-1 rounded bg-[var(--gold)]/10 border border-[var(--gold)]/40 font-semibold uppercase tracking-wider">
            ⏱️ Expands Since Your Birth Second
          </span>
        </div>

        <div className="space-y-2">
          <p className="text-xs text-[var(--muted)] uppercase tracking-wider">
            Distance your birth light has traveled into deep interstellar space since {birthYear}:
          </p>
          <h3 className="font-display text-4xl sm:text-6xl text-[var(--text)] font-normal leading-tight">
            ~{photon.lightYears} <span className="text-2xl sm:text-4xl text-[var(--gold)] font-sans">Light-Years</span>
          </h3>
          <p className="text-sm font-mono text-[var(--muted)] pt-1">
            Equal to ~{photon.totalLightTrillionKm} Trillion Kilometers ({photon.totalLightKm} km)
          </p>
        </div>

        {/* Interstellar Star System Milestones Passed */}
        <div className="pt-6 border-t border-[var(--border)] space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-[0.25em] text-[var(--gold)] font-mono font-semibold">
              Star Systems Reached by Your Birth Light ({photon.passedCount} Passed)
            </span>
            <Star className="w-4 h-4 text-[var(--gold)]" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {photon.starMilestones.map((star, idx) => (
              <div 
                key={idx}
                className={`p-3.5 rounded-lg border text-xs space-y-1 ${
                  star.passed 
                    ? 'border-[var(--gold)]/50 bg-[var(--surface)] text-[var(--text)]' 
                    : 'border-[var(--border)] bg-[var(--bg)] text-[var(--muted)] opacity-60'
                }`}
              >
                <div className="flex items-center justify-between font-mono text-[11px]">
                  <span className="font-medium text-[var(--text)]">{star.name}</span>
                  <span className={star.passed ? 'text-[var(--gold)] font-semibold' : 'text-[var(--muted)]'}>
                    {star.distanceLy} ly
                  </span>
                </div>
                <p className="text-[10px] leading-normal">{star.desc}</p>
                <span className={`text-[9px] uppercase font-mono block pt-0.5 ${star.passed ? 'text-emerald-400 font-semibold' : 'text-[var(--dim)]'}`}>
                  {star.passed ? '✓ Birth Light Passed' : 'En Route'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 8 ASTROPHYSICAL REFERENCE FRAMES (DISPLAYED BELOW THE PHOTONIC HERO CARD) */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xs uppercase tracking-[0.3em] text-[var(--gold)] font-semibold">
            8 Astrophysical Reference Frames
          </h3>
          <span className="text-xs font-mono text-[var(--muted)]">Relative Planetary & Cosmic Motions</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {frames.map((frame, idx) => (
            <div 
              key={idx}
              className="p-8 border border-[var(--border)] bg-[var(--bg)] rounded-xl space-y-4 flex flex-col justify-between hover:border-[var(--gold)]/40 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest text-[var(--gold)] font-mono font-semibold">
                    Frame #{idx + 1}
                  </span>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-[var(--gold)]/10 text-[var(--gold)] border border-[var(--gold)]/30 font-semibold">
                    ⏱️ SINCE YOUR BIRTH SECOND
                  </span>
                </div>

                <h3 className="font-display text-2xl text-[var(--text)] font-normal">
                  {frame.title}
                </h3>

                <div className="pt-2">
                  <span className="text-[10px] uppercase tracking-wider text-[var(--gold)] font-mono font-semibold block">
                    Distance Traveled Since Your Birth
                  </span>
                  <p className="font-display text-3xl text-[var(--text)] font-normal tracking-tight mt-0.5">
                    {frame.distanceHighlight || frame.distanceKm}
                  </p>
                  {frame.distanceHighlight && (
                    <p className="text-xs font-mono text-[var(--muted)] mt-1">{frame.distanceKm}</p>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--border)] space-y-1.5">
                <p className="text-xs text-[var(--text)] font-medium leading-relaxed">{frame.subText}</p>
                <div className="flex items-center justify-between text-[10px] font-mono text-[var(--muted)] pt-1">
                  <span>Speed: {frame.speedText}</span>
                  <span>Ref: {frame.refFrame}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scientific Caveat Box */}
      <div className="p-4 border border-[var(--border)] bg-[var(--surface)]/50 rounded-lg flex items-start gap-3 text-xs text-[var(--muted)] leading-relaxed">
        <Info className="w-4 h-4 text-[var(--gold)] flex-shrink-0 mt-0.5" />
        <p>
          <strong className="text-[var(--text)] font-medium mr-1">Astrophysical Reference Frame Note:</strong>
          In physics, velocity and distance traveled depend entirely on the chosen frame of reference. Because space has no absolute stationary point, speeds are measured relative to light speed in vacuum, Earth's rotational axis, the Sun, solar apex, galactic center, Andromeda barycenter, Laniakea supercluster, or the CMB dipole anisotropy.
        </p>
      </div>
    </div>
  );
};
