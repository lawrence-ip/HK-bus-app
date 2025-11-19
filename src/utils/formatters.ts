/**
 * Format distance in meters to a human-readable string
 */
export const formatDistance = (meters: number): string => {
  if (meters < 1000) {
    return `${Math.round(meters)}m`;
  }
  return `${(meters / 1000).toFixed(1)}km`;
};

/**
 * Format remaining minutes to a readable string
 */
export const formatRemainingTime = (minutes: number): string => {
  if (minutes === 0) {
    return 'Arriving';
  }
  if (minutes === 1) {
    return '1 min';
  }
  return `${minutes} mins`;
};

/**
 * Format time to HH:MM format
 */
export const formatTime = (date: Date): string => {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};
