// src/utils/format.js
export const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString() + " " + date.toLocaleTimeString();
};

export const formatPercentage = (num) => {
  // If the number is already a percentage (0-100), don't multiply
  // If it's a decimal (0-1), multiply by 100
  const percentage = num > 1 ? num : num * 100;
  return `${percentage.toFixed(2)}%`;
};

export const formatDuration = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins > 0 ? mins + 'm ' : ''}${secs}s`;
};
