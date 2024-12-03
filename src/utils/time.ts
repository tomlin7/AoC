export function getEstNow() {
  return new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/New_York" })
  );
}

export function getEstMidnight(date: Date) {
  const midnight = new Date(date);
  midnight.setHours(0, 0, 0, 0);
  return midnight;
}

export function getNextPuzzleInfo() {
  const estNow = getEstNow();

  // dec, bfore 25
  if (estNow.getMonth() === 11 && estNow.getDate() <= 25) {
    const todayMidnight = getEstMidnight(estNow);

    // after midnight, next puzzle tomorrow
    if (estNow > todayMidnight) {
      const tomorrow = new Date(estNow);
      tomorrow.setDate(estNow.getDate() + 1);
      return {
        date: getEstMidnight(tomorrow),
        year: tomorrow.getFullYear(),
        day: tomorrow.getDate(),
      };
    }

    // before midnight, next puzzle at midnight
    return {
      date: todayMidnight,
      year: estNow.getFullYear(),
      day: estNow.getDate(),
    };
  }

  // If not in dec yet, next puzzle on dec 1
  // If after 25th, next puzzle on dec 1 next year
  const nextYear =
    estNow.getMonth() === 11 && estNow.getDate() > 25
      ? estNow.getFullYear() + 1
      : estNow.getFullYear();

  return {
    date: new Date(nextYear, 11, 1),
    year: nextYear,
    day: 1,
  };
}

export function getCurrentPuzzleInfo() {
  const estNow = getEstNow();

  // dec, bw 1-25
  if (
    estNow.getMonth() === 11 &&
    estNow.getDate() >= 1 &&
    estNow.getDate() <= 25
  ) {
    return {
      year: estNow.getFullYear(),
      day: estNow.getDate(),
    };
  }

  // before dec / after dec 25 -- return latest
  const year =
    estNow.getMonth() === 11 && estNow.getDate() > 25
      ? estNow.getFullYear()
      : estNow.getFullYear() - 1;

  return {
    year,
    day: 25,
  };
}

export function formatTimeRemaining(targetDate: Date): string {
  const estNow = getEstNow();
  const diff = targetDate.getTime() - estNow.getTime();

  if (diff <= 0) return "Available now!";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  if (days > 0) {
    return `Next puzzle in ${days}d ${hours}h ${minutes}m`;
  } else if (hours > 0) {
    return `Next puzzle in ${hours}h ${minutes}m ${seconds}s`;
  } else if (minutes > 0) {
    return `Next puzzle in ${minutes}m ${seconds}s`;
  } else {
    return `Next puzzle in ${seconds}s`;
  }
}
