export const ConvertYearToMonth = (value: number | undefined, unit: 'MONTH' | 'YEAR'): number => {
  if (!value) return 0;
  if (unit === 'YEAR') {
    return Number(value) * 12;
  }

  return value;
};

export const ConvertMonthToYear = (value: number | undefined, unit: 'MONTH' | 'YEAR'): number => {
  if (!value) return 0;

  if (unit === 'YEAR') {
    return value / 12;
  }
  return value;
};

export const ShowYearAndMonth = (value: number | undefined): string => {
  if (!value) return '0 ماه';

  const years = Math.floor(value / 12);
  const months = value % 12;

  if (years > 0 && months > 0) {
    return `${years} سال و ${months} ماه`;
  }

  if (years > 0) {
    return `${years} سال`;
  }

  return `${months} ماه`;
};
