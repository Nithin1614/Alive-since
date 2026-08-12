export const calculateAgeStats = (day, month, year, now = new Date()) => {
  const d = parseInt(day, 10);
  const m = parseInt(month, 10) - 1; // 0-indexed month
  const y = parseInt(year, 10);

  if (isNaN(d) || isNaN(m) || isNaN(y) || m < 0 || m > 11 || d < 1 || d > 31 || y < 1900 || y > now.getFullYear()) {
    return null;
  }

  const birthDate = new Date(y, m, d, 0, 0, 0, 0);
  if (isNaN(birthDate.getTime()) || birthDate > now) {
    return null;
  }

  // Total elapsed time in milliseconds
  const diffMs = now.getTime() - birthDate.getTime();
  const totalSeconds = Math.max(0, diffMs / 1000);
  const totalMinutes = totalSeconds / 60;
  const totalHours = totalMinutes / 60;
  const totalDays = totalHours / 24;
  const totalWeeks = Math.floor(totalDays / 7);

  // Exact Years, Months, Days calculation
  let years = now.getFullYear() - y;
  let months = now.getMonth() - m;
  let days = now.getDate() - d;

  if (days < 0) {
    months -= 1;
    // Get last day of previous month
    const prevMonthLastDay = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    days += prevMonthLastDay;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  // Hours, Minutes, Seconds of current day (since midnight today or relative time)
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();
  const currentSeconds = now.getSeconds();

  // Born on Day of Week
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayOfWeek = weekdays[birthDate.getDay()];

  // Next Birthday Countdown
  let nextBirthdayYear = now.getFullYear();
  let nextBirthday = new Date(nextBirthdayYear, m, d, 0, 0, 0);
  if (nextBirthday < now) {
    nextBirthdayYear += 1;
    nextBirthday = new Date(nextBirthdayYear, m, d, 0, 0, 0);
  }

  // Calculate ordinal age for next birthday (e.g. 23rd)
  const nextAge = nextBirthdayYear - y;
  const getOrdinalSuffix = (num) => {
    const j = num % 10, k = num % 100;
    if (j === 1 && k !== 11) return `${num}st`;
    if (j === 2 && k !== 12) return `${num}nd`;
    if (j === 3 && k !== 13) return `${num}rd`;
    return `${num}th`;
  };
  const nextBirthdayTitle = `YOUR ${getOrdinalSuffix(nextAge).toUpperCase()} BIRTHDAY`;

  const daysToNextBirthday = Math.ceil((nextBirthday.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  // Life Metrics estimations
  const heartbeats = Math.floor(totalSeconds * (70 / 60)); // 70 bpm
  const breaths = Math.floor(totalSeconds * (16 / 60));    // 16 bpm
  const nightsSlept = Math.floor(totalDays);
  const hoursSlept = Math.floor(totalDays * 8);

  return {
    birthDate,
    totalSeconds: Math.floor(totalSeconds),
    years,
    months,
    days,
    hours: currentHours,
    minutes: currentMinutes,
    seconds: currentSeconds,
    dayOfWeek,
    nextBirthdayTitle,
    daysToNextBirthday: Math.max(0, daysToNextBirthday),
    totalWeeks,
    totalDays: Math.floor(totalDays),
    totalHours: Math.floor(totalHours),
    totalMinutes: Math.floor(totalMinutes),
    heartbeats,
    breaths,
    nightsSlept,
    hoursSlept,
    birthYear: y
  };
};

export const formatNumber = (num) => {
  if (num === undefined || num === null) return "0";
  return num.toLocaleString('en-US');
};
