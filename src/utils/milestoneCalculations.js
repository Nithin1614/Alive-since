import { calculateAgeStats, formatNumber } from './timeCalculations';

// Format Date nicely e.g. "November 1, 2031"
export const formatDateNice = (date) => {
  if (!date || isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};

// -------------------------------------------------------------
// 1. MILESTONE ENGINE CALCULATIONS
// -------------------------------------------------------------
export const calculateLifeMilestones = (day, month, year, now = new Date()) => {
  const d = parseInt(day, 10);
  const m = parseInt(month, 10) - 1;
  const y = parseInt(year, 10);

  if (isNaN(d) || isNaN(m) || isNaN(y) || m < 0 || m > 11 || d < 1 || d > 31 || y < 1900) {
    return null;
  }

  const birthDate = new Date(y, m, d, 0, 0, 0, 0);
  if (isNaN(birthDate.getTime()) || birthDate > now) {
    return null;
  }

  const birthMs = birthDate.getTime();
  const nowMs = now.getTime();

  const rawMilestones = [
    // Day Milestones
    { name: "1,000th day alive", category: "Days", ms: birthMs + (1000 * 86400 * 1000) },
    { name: "5,000th day alive", category: "Days", ms: birthMs + (5000 * 86400 * 1000) },
    { name: "10,000th day alive", category: "Days", ms: birthMs + (10000 * 86400 * 1000) },
    { name: "15,000th day alive", category: "Days", ms: birthMs + (15000 * 86400 * 1000) },
    { name: "20,000th day alive", category: "Days", ms: birthMs + (20000 * 86400 * 1000) },
    { name: "25,000th day alive", category: "Days", ms: birthMs + (25000 * 86400 * 1000) },
    { name: "30,000th day alive", category: "Days", ms: birthMs + (30000 * 86400 * 1000) },

    // Hour Milestones
    { name: "100,000th hour alive", category: "Hours", ms: birthMs + (100000 * 3600 * 1000) },
    { name: "250,000th hour alive", category: "Hours", ms: birthMs + (250000 * 3600 * 1000) },
    { name: "500,000th hour alive", category: "Hours", ms: birthMs + (500000 * 3600 * 1000) },
    { name: "750,000th hour alive", category: "Hours", ms: birthMs + (750000 * 3600 * 1000) },
    { name: "1,000,000th hour alive", category: "Hours", ms: birthMs + (1000000 * 3600 * 1000) },

    // Second Milestones
    { name: "100 Millionth second", category: "Seconds", ms: birthMs + (100000000 * 1000) },
    { name: "500 Millionth second", category: "Seconds", ms: birthMs + (500000000 * 1000) },
    { name: "1 Billionth second", category: "Seconds", ms: birthMs + (1000000000 * 1000) },
    { name: "1.5 Billionth second", category: "Seconds", ms: birthMs + (1500000000 * 1000) },
    { name: "2 Billionth second", category: "Seconds", ms: birthMs + (2000000000 * 1000) },

    // Birthday Milestones
    { name: "18th Birthday", category: "Birthdays", ms: new Date(y + 18, m, d).getTime() },
    { name: "21st Birthday", category: "Birthdays", ms: new Date(y + 21, m, d).getTime() },
    { name: "25th Birthday", category: "Birthdays", ms: new Date(y + 25, m, d).getTime() },
    { name: "30th Birthday", category: "Birthdays", ms: new Date(y + 30, m, d).getTime() },
    { name: "40th Birthday", category: "Birthdays", ms: new Date(y + 40, m, d).getTime() },
    { name: "50th Birthday", category: "Birthdays", ms: new Date(y + 50, m, d).getTime() },
    { name: "60th Birthday", category: "Birthdays", ms: new Date(y + 60, m, d).getTime() },
    { name: "70th Birthday", category: "Birthdays", ms: new Date(y + 70, m, d).getTime() },
    { name: "80th Birthday", category: "Birthdays", ms: new Date(y + 80, m, d).getTime() },
    { name: "100th Birthday", category: "Birthdays", ms: new Date(y + 100, m, d).getTime() }
  ];

  const processed = rawMilestones.map((m) => {
    const targetDate = new Date(m.ms);
    const isPassed = m.ms < nowMs;
    const diffMs = Math.abs(nowMs - m.ms);
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffYears = (diffDays / 365.25).toFixed(1);

    let relativeText = "";
    if (isPassed) {
      relativeText = diffDays === 0 ? "Today!" : diffDays < 365 ? `${diffDays} days ago` : `${diffYears} years ago (${formatNumber(diffDays)} days ago)`;
    } else {
      relativeText = diffDays === 0 ? "Today!" : `${formatNumber(diffDays)} days from now`;
    }

    return {
      ...m,
      targetDate,
      dateString: formatDateNice(targetDate),
      isPassed,
      diffDays,
      relativeText
    };
  });

  // Sort chronological
  processed.sort((a, b) => a.ms - b.ms);

  return processed;
};

// -------------------------------------------------------------
// 2. COMPARE TIMELINES CALCULATIONS
// -------------------------------------------------------------
export const compareTwoPeople = (pA, pB, now = new Date()) => {
  const statsA = calculateAgeStats(pA.day, pA.month, pA.year, now);
  const statsB = calculateAgeStats(pB.day, pB.month, pB.year, now);

  if (!statsA || !statsB) return null;

  const msA = statsA.birthDate.getTime();
  const msB = statsB.birthDate.getTime();

  let older = 'A'; // 'A' or 'B' or 'Equal'
  if (msA < msB) older = 'A';
  else if (msB < msA) older = 'B';
  else older = 'Equal';

  // Exact difference between birthdates
  const olderDate = msA < msB ? statsA.birthDate : statsB.birthDate;
  const youngerDate = msA < msB ? statsB.birthDate : statsA.birthDate;

  const diffMs = youngerDate.getTime() - olderDate.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffSeconds = Math.floor(diffMs / 1000);

  // Exact Y, M, D difference
  let yDiff = youngerDate.getFullYear() - olderDate.getFullYear();
  let mDiff = youngerDate.getMonth() - olderDate.getMonth();
  let dDiff = youngerDate.getDate() - olderDate.getDate();

  if (dDiff < 0) {
    mDiff -= 1;
    const prevMonthDays = new Date(youngerDate.getFullYear(), youngerDate.getMonth(), 0).getDate();
    dDiff += prevMonthDays;
  }
  if (mDiff < 0) {
    yDiff -= 1;
    mDiff += 12;
  }

  // Next Birthday comparison
  const birthdayDiffDays = Math.abs(statsA.daysToNextBirthday - statsB.daysToNextBirthday);
  let bdayOrderText = "";
  if (statsA.daysToNextBirthday < statsB.daysToNextBirthday) {
    bdayOrderText = `Person A celebrates their next birthday ${birthdayDiffDays} days before Person B.`;
  } else if (statsB.daysToNextBirthday < statsA.daysToNextBirthday) {
    bdayOrderText = `Person B celebrates their next birthday ${birthdayDiffDays} days before Person A.`;
  } else {
    bdayOrderText = `Both Person A and Person B celebrate their next birthday on the exact same day!`;
  }

  // Milestone Race
  const milestoneRace = [
    {
      name: "10,000th Day Alive",
      dateA: new Date(msA + (10000 * 86400 * 1000)),
      dateB: new Date(msB + (10000 * 86400 * 1000))
    },
    {
      name: "1 Billionth Second",
      dateA: new Date(msA + (1000000000 * 1000)),
      dateB: new Date(msB + (1000000000 * 1000))
    },
    {
      name: "30th Birthday",
      dateA: new Date(statsA.birthDate.getFullYear() + 30, statsA.birthDate.getMonth(), statsA.birthDate.getDate()),
      dateB: new Date(statsB.birthDate.getFullYear() + 30, statsB.birthDate.getMonth(), statsB.birthDate.getDate())
    }
  ].map((m) => {
    const winner = m.dateA < m.dateB ? 'A' : 'B';
    const gapDays = Math.round(Math.abs(m.dateA.getTime() - m.dateB.getTime()) / (1000 * 86400));
    return {
      ...m,
      dateAStr: formatDateNice(m.dateA),
      dateBStr: formatDateNice(m.dateB),
      winner,
      gapDays
    };
  });

  return {
    statsA,
    statsB,
    older,
    olderName: older === 'A' ? 'Person A' : older === 'B' ? 'Person B' : 'Both are the exact same age',
    diffYears: yDiff,
    diffMonths: mDiff,
    diffDaysInAge: dDiff,
    totalDiffDays: formatNumber(diffDays),
    totalDiffHours: formatNumber(diffHours),
    totalDiffMinutes: formatNumber(diffMinutes),
    totalDiffSeconds: formatNumber(diffSeconds),
    bdayOrderText,
    birthdayDiffDays,
    milestoneRace
  };
};

// -------------------------------------------------------------
// 3. AGE AT ANY DATE CALCULATIONS
// -------------------------------------------------------------
export const calculateAgeAtTargetDate = (birthDay, birthMonth, birthYear, targetDay, targetMonth, targetYear, now = new Date()) => {
  const bd = parseInt(birthDay, 10);
  const bm = parseInt(birthMonth, 10) - 1;
  const by = parseInt(birthYear, 10);

  const td = parseInt(targetDay, 10);
  const tm = parseInt(targetMonth, 10) - 1;
  const ty = parseInt(targetYear, 10);

  if (
    isNaN(bd) || isNaN(bm) || isNaN(by) ||
    isNaN(td) || isNaN(tm) || isNaN(ty) ||
    bm < 0 || bm > 11 || tm < 0 || tm > 11 ||
    bd < 1 || bd > 31 || td < 1 || td > 31 ||
    by < 1900 || ty < 1800 || ty > 2150
  ) {
    return null;
  }

  const birthDate = new Date(by, bm, bd, 0, 0, 0, 0);
  const targetDate = new Date(ty, tm, td, 0, 0, 0, 0);

  if (isNaN(birthDate.getTime()) || isNaN(targetDate.getTime())) {
    return null;
  }

  if (targetDate < birthDate) {
    return {
      invalid: true,
      errorMsg: "Target date is before date of birth!"
    };
  }

  const diffMs = targetDate.getTime() - birthDate.getTime();
  const totalSeconds = Math.max(0, diffMs / 1000);
  const totalMinutes = totalSeconds / 60;
  const totalHours = totalMinutes / 60;
  const totalDays = totalHours / 24;
  const totalWeeks = Math.floor(totalDays / 7);

  // Exact Years, Months, Days difference
  let years = ty - by;
  let months = tm - bm;
  let days = td - bd;

  if (days < 0) {
    months -= 1;
    const prevMonthDays = new Date(ty, tm, 0).getDate();
    days += prevMonthDays;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  // Determine phrasing: "were", "will be", or "turned"
  const isPast = targetDate < now;
  const isExactBirthday = tm === bm && td === bd;

  let phrasing = "";
  if (isExactBirthday && years > 0) {
    phrasing = isPast ? `You turned ${years} years old.` : `You will turn ${years} years old.`;
  } else if (isPast) {
    phrasing = `You were ${years} years, ${months} months, ${days} days old.`;
  } else {
    phrasing = `You will be ${years} years, ${months} months, ${days} days old.`;
  }

  return {
    birthDate,
    targetDate,
    targetDateString: formatDateNice(targetDate),
    isPast,
    isExactBirthday,
    years,
    months,
    days,
    totalSeconds: formatNumber(Math.floor(totalSeconds)),
    totalMinutes: formatNumber(Math.floor(totalMinutes)),
    totalHours: formatNumber(Math.floor(totalHours)),
    totalDays: formatNumber(Math.floor(totalDays)),
    totalWeeks: formatNumber(totalWeeks),
    phrasing
  };
};
