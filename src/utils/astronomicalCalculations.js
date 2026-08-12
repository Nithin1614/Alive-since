import { formatNumber } from './timeCalculations';

// -------------------------------------------------------------
// 1. NASA JPL ASTRONOMICAL ORBITAL DATA FOR PLANETS & DWARF PLANETS
// Source: NASA Jet Propulsion Laboratory (JPL) Planetary Fact Sheets
// -------------------------------------------------------------
export const PLANETARY_DATA = [
  {
    name: "Mercury",
    orbitalDays: 87.969, // Earth days per orbit
    orbitalYears: 0.240846,
    symbol: "☿",
    type: "Planet",
    magnitude: -0.4,
    color: "#b5b5b5",
    description: "Closest planet to the Sun. One Mercury year is less than 3 Earth months."
  },
  {
    name: "Venus",
    orbitalDays: 224.701,
    orbitalYears: 0.615198,
    symbol: "♀",
    type: "Planet",
    magnitude: -4.4,
    color: "#e3bb76",
    description: "Hottest planet in the solar system. Rotates backwards relative to its orbit."
  },
  {
    name: "Earth",
    orbitalDays: 365.256363, // Sidereal year
    orbitalYears: 1.000000,
    symbol: "♁",
    type: "Planet",
    magnitude: -3.0,
    color: "#4682b4",
    description: "Our home planet. 365.256 days per solar revolution."
  },
  {
    name: "Ceres",
    orbitalDays: 1682.0,
    orbitalYears: 4.605,
    symbol: "⚳",
    type: "Dwarf Planet",
    magnitude: 7.2,
    color: "#a9a9a9",
    description: "Largest object in the main asteroid belt between Mars and Jupiter."
  },
  {
    name: "Mars",
    orbitalDays: 686.980,
    orbitalYears: 1.880847,
    symbol: "♂",
    type: "Planet",
    magnitude: -1.5,
    color: "#e05a47",
    description: "The Red Planet. One Martian year is nearly double an Earth year."
  },
  {
    name: "Jupiter",
    orbitalDays: 4332.59,
    orbitalYears: 11.862615,
    symbol: "♃",
    type: "Planet",
    magnitude: -2.7,
    color: "#d9a05b",
    description: "Largest planet in the solar system. One Jupiter year equals almost 12 Earth years."
  },
  {
    name: "Saturn",
    orbitalDays: 10759.22,
    orbitalYears: 29.4571,
    symbol: "♄",
    type: "Planet",
    magnitude: 0.2,
    color: "#ded487",
    description: "Famous ringed giant. Takes nearly 30 Earth years to orbit the Sun once."
  },
  {
    name: "Uranus",
    orbitalDays: 30688.5,
    orbitalYears: 84.0205,
    symbol: "♅",
    type: "Planet",
    magnitude: 5.7,
    color: "#7fffd4",
    description: "Ice giant tilted on its side. One orbit takes 84 Earth years."
  },
  {
    name: "Neptune",
    orbitalDays: 60182.0,
    orbitalYears: 164.8000,
    symbol: "♆",
    type: "Planet",
    magnitude: 7.8,
    color: "#4169e1",
    description: "Farthest major planet. Takes almost 165 Earth years for a single revolution."
  },
  {
    name: "Pluto",
    orbitalDays: 90560.0,
    orbitalYears: 248.0000,
    symbol: "♇",
    type: "Dwarf Planet",
    magnitude: 14.4,
    color: "#c0c0c0",
    description: "Dwarf planet in the Kuiper Belt. Takes 248 Earth years to complete one solar orbit."
  }
];

export const calculatePlanetaryAges = (birthDate, now = new Date()) => {
  if (!birthDate || isNaN(birthDate.getTime())) return null;

  const diffMs = now.getTime() - birthDate.getTime();
  const earthDaysAlive = diffMs / (1000 * 60 * 60 * 24);

  return PLANETARY_DATA.map((planet) => {
    const planetaryAge = earthDaysAlive / planet.orbitalDays;
    const completedOrbits = Math.floor(planetaryAge);
    const nextOrbitNum = completedOrbits + 1;

    const nextBdayMs = birthDate.getTime() + (nextOrbitNum * planet.orbitalDays * 86400 * 1000);
    const nextBdayDate = new Date(nextBdayMs);

    const msUntilBday = nextBdayMs - now.getTime();
    const daysUntilBday = Math.max(0, Math.floor(msUntilBday / (1000 * 60 * 60 * 24)));
    const hoursUntilBday = Math.max(0, Math.floor((msUntilBday % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));

    return {
      ...planet,
      planetaryAge: planetaryAge.toFixed(2),
      completedOrbits,
      nextOrbitNum,
      nextBdayDate: nextBdayDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      daysUntilBday,
      hoursUntilBday
    };
  });
};

// -------------------------------------------------------------
// HELIOCENTRIC PLANETARY ORBIT MAP CALCULATOR
// -------------------------------------------------------------
export const calculateHeliocentricMap = (birthDate, now = new Date()) => {
  if (!birthDate || isNaN(birthDate.getTime())) return null;

  const knownEpochMs = new Date(Date.UTC(2000, 0, 1, 12, 0, 0)).getTime();
  const birthDaysFromJ2000 = (birthDate.getTime() - knownEpochMs) / (1000 * 86400);
  const nowDaysFromJ2000 = (now.getTime() - knownEpochMs) / (1000 * 86400);

  const majorPlanets = PLANETARY_DATA.filter(p => p.type === "Planet");

  return majorPlanets.map((planet) => {
    const birthDeg = Math.round(((birthDaysFromJ2000 / planet.orbitalDays) * 360) % 360);
    const nowDeg = Math.round(((nowDaysFromJ2000 / planet.orbitalDays) * 360) % 360);

    const birthAngleNorm = birthDeg < 0 ? birthDeg + 360 : birthDeg;
    const nowAngleNorm = nowDeg < 0 ? nowDeg + 360 : nowDeg;

    return {
      name: planet.name,
      symbol: planet.symbol,
      color: planet.color,
      birthAngle: birthAngleNorm,
      nowAngle: nowAngleNorm
    };
  });
};

// -------------------------------------------------------------
// PHOTONIC JOURNEY (LIGHT TRAVEL DISTANCE ENGINE)
// Speed of light in vacuum c = 299,792.458 km/s
// Light-Year = 9.4607 x 10^12 km (9.461 Trillion km)
// -------------------------------------------------------------
export const calculatePhotonicJourney = (birthDate, now = new Date()) => {
  if (!birthDate || isNaN(birthDate.getTime())) return null;

  const secondsAlive = (now.getTime() - birthDate.getTime()) / 1000;
  const speedOfLightKmS = 299792.458;
  const kmPerLightYear = 9.4607304725808e12;

  const totalLightKm = secondsAlive * speedOfLightKmS;
  const lightYears = totalLightKm / kmPerLightYear;

  const starMilestones = [
    { name: "Alpha Centauri System", distanceLy: 4.37, passed: lightYears >= 4.37, desc: "Nearest star system to Earth." },
    { name: "Sirius (The Dog Star)", distanceLy: 8.60, passed: lightYears >= 8.60, desc: "Brightest star in Earth's night sky." },
    { name: "Epsilon Eridani", distanceLy: 10.50, passed: lightYears >= 10.50, desc: "Sun-like star with confirmed exoplanet." },
    { name: "Procyon", distanceLy: 11.46, passed: lightYears >= 11.46, desc: "Bright star in Canis Minor." },
    { name: "Vega", distanceLy: 25.04, passed: lightYears >= 25.04, desc: "Fifth brightest star in the night sky." }
  ];

  return {
    secondsAlive: formatNumber(Math.floor(secondsAlive)),
    totalLightKm: formatNumber(Math.floor(totalLightKm)),
    totalLightTrillionKm: (totalLightKm / 1e12).toFixed(3),
    lightYears: lightYears.toFixed(3),
    passedCount: starMilestones.filter(s => s.passed).length,
    starMilestones
  };
};

// -------------------------------------------------------------
// EXTENDED MOON PHYSICS & LUNAR ORBITAL CALCULATOR
// -------------------------------------------------------------
export const calculateMoonPhase = (date) => {
  if (!date || isNaN(date.getTime())) return null;

  const synodicMonth = 29.53058867;
  const knownNewMoonMs = new Date(Date.UTC(2000, 0, 6, 18, 14, 0)).getTime();
  const diffDays = (date.getTime() - knownNewMoonMs) / (1000 * 86400);

  let phaseRatio = (diffDays % synodicMonth) / synodicMonth;
  if (phaseRatio < 0) phaseRatio += 1;

  const lunarAgeDays = (phaseRatio * synodicMonth).toFixed(1);
  const illuminatedPct = Math.round((1 - Math.cos(phaseRatio * 2 * Math.PI)) / 2 * 100);

  const anomalisticMonth = 27.55455;
  const anomalyRatio = ((diffDays % anomalisticMonth) / anomalisticMonth) * 2 * Math.PI;

  const distanceKm = Math.round(384400 - 21100 * Math.cos(anomalyRatio));
  const angularSizeArcmin = ((384400 / distanceKm) * 31.1).toFixed(1);

  let phaseName = "";
  if (phaseRatio < 0.03 || phaseRatio > 0.97) phaseName = "New Moon";
  else if (phaseRatio < 0.22) phaseName = "Waxing Crescent";
  else if (phaseRatio < 0.28) phaseName = "First Quarter";
  else if (phaseRatio < 0.47) phaseName = "Waxing Gibbous";
  else if (phaseRatio < 0.53) phaseName = "Full Moon";
  else if (phaseRatio < 0.72) phaseName = "Waning Gibbous";
  else if (phaseRatio < 0.78) phaseName = "Last Quarter";
  else phaseName = "Waning Crescent";

  const isNightVisible = phaseName !== "New Moon";

  return {
    phaseName,
    illuminatedPct,
    phaseRatio,
    lunarAgeDays,
    distanceKm: formatNumber(distanceKm),
    angularSizeArcmin,
    isNightVisible
  };
};

// -------------------------------------------------------------
// PLANETARY SKY SNAPSHOT (NIGHT SKY WHEN YOU ARRIVED)
// -------------------------------------------------------------
export const calculatePlanetarySkySnapshot = (date) => {
  if (!date || isNaN(date.getTime())) return null;

  const knownEpochMs = new Date(Date.UTC(2000, 0, 1, 12, 0, 0)).getTime();
  const daysFromJ2000 = (date.getTime() - knownEpochMs) / (1000 * 86400);

  const majorPlanets = [
    { name: "Venus", symbol: "♀", orbitalDays: 224.701, mag: "-4.4 (Brilliant Morning/Evening Star)", color: "#e3bb76" },
    { name: "Jupiter", symbol: "♃", orbitalDays: 4332.59, mag: "-2.7 (Very Bright)", color: "#d9a05b" },
    { name: "Mars", symbol: "♂", orbitalDays: 686.980, mag: "-1.5 (Distinct Red)", color: "#e05a47" },
    { name: "Saturn", symbol: "♄", orbitalDays: 10759.22, mag: "+0.2 (Golden Star)", color: "#ded487" },
    { name: "Mercury", symbol: "☿", orbitalDays: 87.969, mag: "-0.4 (Low Horizon Twilight)", color: "#b5b5b5" }
  ];

  const skySnapshot = majorPlanets.map((p) => {
    const meanLongitudeDeg = ((daysFromJ2000 / p.orbitalDays) * 360) % 360;
    const normalizedDeg = meanLongitudeDeg < 0 ? meanLongitudeDeg + 360 : meanLongitudeDeg;

    const earthLongitudeDeg = ((daysFromJ2000 / 365.256) * 360) % 360;
    const elongationDeg = Math.abs(normalizedDeg - earthLongitudeDeg);
    const isVisible = elongationDeg > 15 && elongationDeg < 345;

    return {
      ...p,
      longitudeDeg: Math.round(normalizedDeg),
      isVisible
    };
  });

  const visiblePlanets = skySnapshot.filter(p => p.isVisible);
  const brightestPlanet = visiblePlanets.length > 0 ? visiblePlanets[0] : skySnapshot[0];

  return {
    skySnapshot,
    visiblePlanetsCount: visiblePlanets.length,
    brightestPlanetName: brightestPlanet.name,
    brightestPlanetMag: brightestPlanet.mag,
    brightestPlanetSymbol: brightestPlanet.symbol
  };
};

// -------------------------------------------------------------
// BIOSPHERE FOOTPRINT ENGINE (HUMAN ECOLOGICAL METRICS)
// -------------------------------------------------------------
export const calculateBiosphereFootprint = (birthDate, now = new Date()) => {
  if (!birthDate || isNaN(birthDate.getTime())) return null;

  const diffMs = Math.max(0, now.getTime() - birthDate.getTime());
  const daysAlive = diffMs / (1000 * 60 * 60 * 24);
  const yearsAlive = daysAlive / 365.25;

  // Oxygen: ~550 Liters of pure O2 consumed per day (~0.84 kg O2/day)
  const oxygenLiters = daysAlive * 550;
  const oxygenKg = daysAlive * 0.84;
  const oxygenMetricTons = (oxygenKg / 1000).toFixed(2);

  // Mature tree equivalency: ~2 mature trees produce oxygen for 1 person annually (~0.00548 trees/day)
  const treesEquivalency = (yearsAlive * 2.0).toFixed(1);

  // Water processed: ~2.5 Liters of water consumed/processed daily
  const waterLiters = Math.floor(daysAlive * 2.5);
  const waterMetricTons = (waterLiters / 1000).toFixed(1);

  // Carbon Dioxide exhaled: ~1.0 kg CO2 exhaled per day (~500 Liters CO2/day)
  const co2ExhaledKg = Math.floor(daysAlive * 1.0);
  const co2MetricTons = (co2ExhaledKg / 1000).toFixed(2);

  return {
    daysAlive: formatNumber(Math.floor(daysAlive)),
    oxygenLiters: formatNumber(Math.floor(oxygenLiters)),
    oxygenMetricTons,
    treesEquivalency,
    waterLiters: formatNumber(waterLiters),
    waterMetricTons,
    co2ExhaledKg: formatNumber(co2ExhaledKg),
    co2MetricTons
  };
};

// -------------------------------------------------------------
// COSMIC TRAVEL SPEEDS
// -------------------------------------------------------------
export const COSMIC_VELOCITIES = {
  earthRotationEquatorKmH: 1670,
  earthMoonBarycenterKmS: 0.012,
  earthOrbitalSpeedKmS: 29.78,
  solarApexPeculiarKmS: 20.0,
  solarSystemGalacticKmS: 230,
  andromedaApproachKmS: 110,
  greatAttractorInfallKmS: 600,
  cmbRestFrameKmS: 368
};

export const calculateCosmicTravelDistances = (birthDate, now = new Date()) => {
  if (!birthDate || isNaN(birthDate.getTime())) return null;

  const secondsAlive = (now.getTime() - birthDate.getTime()) / 1000;
  const hoursAlive = secondsAlive / 3600;

  const rotationKm = hoursAlive * COSMIC_VELOCITIES.earthRotationEquatorKmH;
  const barycenterKm = secondsAlive * COSMIC_VELOCITIES.earthMoonBarycenterKmS;
  const solarOrbitKm = secondsAlive * COSMIC_VELOCITIES.earthOrbitalSpeedKmS;
  const solarApexKm = secondsAlive * COSMIC_VELOCITIES.solarApexPeculiarKmS;
  const galacticKm = secondsAlive * COSMIC_VELOCITIES.solarSystemGalacticKmS;
  const andromedaKm = secondsAlive * COSMIC_VELOCITIES.andromedaApproachKmS;
  const greatAttractorKm = secondsAlive * COSMIC_VELOCITIES.greatAttractorInfallKmS;
  const cmbKm = secondsAlive * COSMIC_VELOCITIES.cmbRestFrameKmS;

  return {
    rotationKm: formatNumber(Math.floor(rotationKm)),
    barycenterKm: formatNumber(Math.floor(barycenterKm)),
    solarOrbitKm: formatNumber(Math.floor(solarOrbitKm)),
    solarOrbitBillionKm: (solarOrbitKm / 1e9).toFixed(3),
    solarApexKm: formatNumber(Math.floor(solarApexKm)),
    solarApexBillionKm: (solarApexKm / 1e9).toFixed(3),
    galacticKm: formatNumber(Math.floor(galacticKm)),
    galacticBillionKm: (galacticKm / 1e9).toFixed(3),
    andromedaKm: formatNumber(Math.floor(andromedaKm)),
    andromedaBillionKm: (andromedaKm / 1e9).toFixed(3),
    greatAttractorKm: formatNumber(Math.floor(greatAttractorKm)),
    greatAttractorBillionKm: (greatAttractorKm / 1e9).toFixed(3),
    cmbKm: formatNumber(Math.floor(cmbKm)),
    cmbBillionKm: (cmbKm / 1e9).toFixed(3),
    secondsAlive: formatNumber(Math.floor(secondsAlive))
  };
};

export const calculateFullMoonsAndSolstices = (birthDate, now = new Date()) => {
  if (!birthDate || isNaN(birthDate.getTime())) return null;

  const synodicMonth = 29.53058867;
  const daysAlive = (now.getTime() - birthDate.getTime()) / (1000 * 86400);
  const fullMoonsCount = Math.floor(daysAlive / synodicMonth);

  const knownFullMoonMs = new Date(Date.UTC(2000, 0, 21, 4, 40, 0)).getTime();
  const daysSinceEpoch = (now.getTime() - knownFullMoonMs) / (1000 * 86400);
  const nextFullMoonIndex = Math.ceil(daysSinceEpoch / synodicMonth);
  const nextFullMoonMs = knownFullMoonMs + (nextFullMoonIndex * synodicMonth * 86400 * 1000);
  const nextFullMoonDate = new Date(nextFullMoonMs);

  const daysToNextFullMoon = Math.max(0, Math.floor((nextFullMoonMs - now.getTime()) / (1000 * 86400)));

  const startYear = birthDate.getFullYear();
  const currentYear = now.getFullYear();

  let marchEquinoxes = 0;
  let juneSolstices = 0;
  let septEquinoxes = 0;
  let decSolstices = 0;
  let leapDaysLived = 0;

  for (let y = startYear; y <= currentYear; y++) {
    const marchEq = new Date(y, 2, 20);
    const juneSol = new Date(y, 5, 21);
    const septEq = new Date(y, 8, 22);
    const decSol = new Date(y, 11, 21);

    if (marchEq >= birthDate && marchEq <= now) marchEquinoxes++;
    if (juneSol >= birthDate && juneSol <= now) juneSolstices++;
    if (septEq >= birthDate && septEq <= now) septEquinoxes++;
    if (decSol >= birthDate && decSol <= now) decSolstices++;

    const isLeap = (y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0);
    if (isLeap) {
      const feb29 = new Date(y, 1, 29);
      if (feb29 >= birthDate && feb29 <= now) {
        leapDaysLived++;
      }
    }
  }

  return {
    fullMoonsCount: formatNumber(fullMoonsCount),
    nextFullMoonDate: nextFullMoonDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    daysToNextFullMoon,
    marchEquinoxes,
    juneSolstices,
    septEquinoxes,
    decSolstices,
    totalSolstices: juneSolstices + decSolstices,
    totalEquinoxes: marchEquinoxes + septEquinoxes,
    leapDaysLived
  };
};

export const calculateSolarMassConverted = (birthDate, now = new Date()) => {
  if (!birthDate || isNaN(birthDate.getTime())) return null;

  const secondsAlive = (now.getTime() - birthDate.getTime()) / 1000;
  const massPerSecondMetricTons = 4.26e6;

  const totalMetricTons = secondsAlive * massPerSecondMetricTons;
  const totalBillionMetricTons = totalMetricTons / 1e9;
  const totalTrillionMetricTons = totalMetricTons / 1e12;

  return {
    totalMetricTons: formatNumber(Math.floor(totalMetricTons)),
    totalBillionMetricTons: totalBillionMetricTons.toFixed(2),
    totalTrillionMetricTons: totalTrillionMetricTons.toFixed(3),
    secondsAlive: formatNumber(Math.floor(secondsAlive))
  };
};

export const HISTORICAL_MILESTONES = [
  {
    id: "dna",
    name: "DNA Double Helix Discovery",
    date: new Date(1953, 3, 25),
    dateStr: "April 25, 1953",
    description: "Watson, Crick, and Rosalind Franklin publish the double helix structure of DNA in Nature, opening modern genetics."
  },
  {
    id: "sputnik",
    name: "Sputnik 1 / Space Age Dawn",
    date: new Date(1957, 9, 4),
    dateStr: "October 4, 1957",
    description: "The USSR launches Sputnik 1, the world's first artificial satellite orbiting Earth."
  },
  {
    id: "jetage",
    name: "Commercial Transatlantic Jet Age",
    date: new Date(1958, 9, 26),
    dateStr: "October 26, 1958",
    description: "First commercial transatlantic passenger jet flight (Pan Am Boeing 707), opening modern global air travel."
  },
  {
    id: "gagarin",
    name: "First Human in Space (Yuri Gagarin)",
    date: new Date(1961, 3, 12),
    dateStr: "April 12, 1961",
    description: "Soviet cosmonaut Yuri Gagarin becomes the first human to orbit Earth aboard Vostok 1."
  },
  {
    id: "moon",
    name: "Apollo 11 Moon Landing",
    date: new Date(1969, 6, 20),
    dateStr: "July 20, 1969",
    description: "Neil Armstrong and Buzz Aldrin become the first humans to set foot on the Moon."
  },
  {
    id: "microprocessor",
    name: "First Commercial Microprocessor",
    date: new Date(1971, 10, 15),
    dateStr: "November 15, 1971",
    description: "Intel releases the 4004, launching the silicon microchip and microcomputer revolution."
  },
  {
    id: "pc",
    name: "Personal Computer Era (Apple II)",
    date: new Date(1977, 3, 16),
    dateStr: "April 16, 1977",
    description: "Consumer personal computers enter homes, schools, and offices worldwide."
  },
  {
    id: "berlinwall",
    name: "Fall of the Berlin Wall",
    date: new Date(1989, 10, 9),
    dateStr: "November 9, 1989",
    description: "Symbolizes the end of the Cold War and the geopolitical collapse of the Iron Curtain."
  },
  {
    id: "mandela",
    name: "Release of Nelson Mandela",
    date: new Date(1990, 1, 11),
    dateStr: "February 11, 1990",
    description: "Nelson Mandela is released after 27 years in prison, heralding the end of South African apartheid."
  },
  {
    id: "hubble",
    name: "Hubble Space Telescope Launch",
    date: new Date(1990, 3, 24),
    dateStr: "April 24, 1990",
    description: "NASA launches the Hubble Space Telescope, revolutionizing human observational astronomy."
  },
  {
    id: "web",
    name: "World Wide Web Public Launch",
    date: new Date(1991, 7, 23),
    dateStr: "August 23, 1991",
    description: "The launch of Tim Berners-Lee's World Wide Web project at CERN, opening the web to the global public."
  },
  {
    id: "wikipedia",
    name: "Wikipedia Public Launch",
    date: new Date(2001, 0, 15),
    dateStr: "January 15, 2001",
    description: "The birth of open, crowdsourced global human knowledge."
  },
  {
    id: "sep11",
    name: "September 11 Geopolitical Milestone",
    date: new Date(2001, 8, 11),
    dateStr: "September 11, 2001",
    description: "Landmark event that reshaped global aviation security, intelligence, and international relations."
  },
  {
    id: "genome",
    name: "Human Genome Project Completion",
    date: new Date(2003, 3, 14),
    dateStr: "April 14, 2003",
    description: "Full sequencing of the human genome, launching modern personalized medicine and biotechnology."
  },
  {
    id: "iphone",
    name: "First iPhone Market Release",
    date: new Date(2007, 5, 29),
    dateStr: "June 29, 2007",
    description: "The commercial launch of the original Apple iPhone, marking the start of the modern smartphone era."
  },
  {
    id: "bitcoin",
    name: "Bitcoin & Crypto Genesis Block",
    date: new Date(2009, 0, 3),
    dateStr: "January 3, 2009",
    description: "Satoshi Nakamoto mines Block #0 of Bitcoin, introducing blockchain technology and decentralized money."
  },
  {
    id: "covid",
    name: "COVID-19 Global Pandemic Declaration",
    date: new Date(2020, 2, 11),
    dateStr: "March 11, 2020",
    description: "The World Health Organization (WHO) officially declares COVID-19 a global pandemic, reshaping global health and remote work."
  },
  {
    id: "ai",
    name: "Consumer Generative AI Era",
    date: new Date(2022, 10, 30),
    dateStr: "November 30, 2022",
    description: "The public launch of ChatGPT and transformer-based consumer generative AI tools."
  }
];

export const calculateHistoricalEpochs = (birthDate, now = new Date()) => {
  if (!birthDate || isNaN(birthDate.getTime())) return null;

  const totalLifetimeMs = now.getTime() - birthDate.getTime();

  return HISTORICAL_MILESTONES.map((item) => {
    const isBornBefore = birthDate < item.date;
    let msInEra = 0;

    if (now >= item.date) {
      const eraStartMs = Math.max(birthDate.getTime(), item.date.getTime());
      msInEra = now.getTime() - eraStartMs;
    }

    const pctInEra = Math.min(100, Math.max(0, (msInEra / totalLifetimeMs) * 100)).toFixed(1);

    return {
      ...item,
      isBornBefore,
      pctInEra
    };
  });
};

export const UN_POPULATION_DATA = [
  { year: 1950, pop: 2.50 },
  { year: 1960, pop: 3.03 },
  { year: 1970, pop: 3.70 },
  { year: 1980, pop: 4.45 },
  { year: 1990, pop: 5.32 },
  { year: 2000, pop: 6.14 },
  { year: 2004, pop: 6.44 },
  { year: 2010, pop: 6.96 },
  { year: 2015, pop: 7.38 },
  { year: 2020, pop: 7.79 },
  { year: 2024, pop: 8.12 },
  { year: 2026, pop: 8.25 }
];

export const estimateWorldPopulation = (birthYear) => {
  const y = parseInt(birthYear, 10);
  if (isNaN(y) || y < 1920) return "2.50 Billion";

  for (let i = 0; i < UN_POPULATION_DATA.length - 1; i++) {
    const p1 = UN_POPULATION_DATA[i];
    const p2 = UN_POPULATION_DATA[i + 1];
    if (y >= p1.year && y <= p2.year) {
      const fraction = (y - p1.year) / (p2.year - p1.year);
      const est = p1.pop + fraction * (p2.pop - p1.pop);
      return `${est.toFixed(2)} Billion`;
    }
  }
  return "8.25 Billion";
};

export const CHRONOTYPE_QUESTIONS = [
  {
    id: 1,
    question: "When do you naturally wake up on free days without an alarm?",
    options: [
      { label: "Before 6:30 AM — feeling naturally refreshed", score: "lion" },
      { label: "Between 7:00 AM and 8:30 AM", score: "bear" },
      { label: "After 9:30 AM or late morning", score: "wolf" },
      { label: "Unpredictable / I wake up multiple times during the night", score: "dolphin" }
    ]
  },
  {
    id: 2,
    question: "When do you feel your peak mental alertness and focus?",
    options: [
      { label: "Early morning (6:00 AM – 11:00 AM)", score: "lion" },
      { label: "Late morning to early afternoon (10:00 AM – 2:00 PM)", score: "bear" },
      { label: "Late evening or night (6:00 PM – 12:00 AM)", score: "wolf" },
      { label: "Bursts of focus scattered throughout the day", score: "dolphin" }
    ]
  },
  {
    id: 3,
    question: "When do you naturally become sleepy at night?",
    options: [
      { label: "Early evening (9:00 PM – 10:00 PM)", score: "lion" },
      { label: "Conventional hours (10:30 PM – 11:30 PM)", score: "bear" },
      { label: "Late night (12:30 AM – 2:00 AM)", score: "wolf" },
      { label: "I struggle to fall asleep at a consistent time", score: "dolphin" }
    ]
  },
  {
    id: 4,
    question: "If you had no obligations, what is your preferred work time?",
    options: [
      { label: "First thing in the morning before anyone else wakes up", score: "lion" },
      { label: "Standard daytime working hours", score: "bear" },
      { label: "Quiet evening hours after dark", score: "wolf" },
      { label: "Flexible short sprints whenever energy strikes", score: "dolphin" }
    ]
  },
  {
    id: 5,
    question: "How do you feel during the first 30 minutes after waking up?",
    options: [
      { label: "Wide awake and ready to move immediately", score: "lion" },
      { label: "Slight grogginess that clears after a shower/coffee", score: "bear" },
      { label: "Extremely groggy — takes hours to fully wake up", score: "wolf" },
      { label: "Alert but fatigued, often thinking about sleep quality", score: "dolphin" }
    ]
  }
];

export const CHRONOTYPE_RESULTS = {
  lion: {
    name: "Lion (Early Lark)",
    icon: "🦁",
    shortDesc: "Naturally morning-oriented with high early energy and disciplined focus.",
    peakEnergy: "6:00 AM – 12:00 PM",
    sleepSchedule: "10:00 PM – 6:00 AM",
    trait: "High morning drive, early bedtime, highly organized.",
    popPct: "~15% of the population"
  },
  bear: {
    name: "Bear (Solar Sync)",
    icon: "🐻",
    shortDesc: "Generally aligned with natural solar cycles and conventional daytime schedules.",
    peakEnergy: "10:00 AM – 2:00 PM",
    sleepSchedule: "11:00 PM – 7:00 AM",
    trait: "Steady energy, social sleeper, aligns best with standard 9-to-5 life.",
    popPct: "~55% of the population"
  },
  wolf: {
    name: "Wolf (Night Owl)",
    icon: "🐺",
    shortDesc: "Naturally evening-oriented with peak creative and mental energy after dark.",
    peakEnergy: "5:00 PM – 12:00 AM",
    sleepSchedule: "1:00 AM – 9:00 AM",
    trait: "Creative, late-night focus, morning grogginess.",
    popPct: "~15% of the population"
  },
  dolphin: {
    name: "Dolphin (Light Sleeper)",
    icon: "🐬",
    shortDesc: "Characterized by light, variable sleep patterns and intense bursts of intellect.",
    peakEnergy: "3:00 PM – 9:00 PM",
    sleepSchedule: "11:30 PM – 6:30 AM (variable)",
    trait: "Detail-oriented, perfectionist, high nocturnal alertness.",
    popPct: "~10% of the population"
  }
};
