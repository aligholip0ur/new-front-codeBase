import { toGregorian } from 'jalaali-js';

export const getPersianTimeAgo = (input: string): string => {
  if (!input) return '';

  const [datePart, timePart] = input.split('-');

  // 14050131 → 1405 / 01 / 31
  const jy = Number(datePart.slice(0, 4));
  const jm = Number(datePart.slice(4, 6));
  const jd = Number(datePart.slice(6, 8));

  // تبدیل به میلادی
  const { gy, gm, gd } = toGregorian(jy, jm, jd);

  // گرفتن زمان
  const [hour = '0', minute = '0', second = '0'] = (timePart || '').split(':');

  const date = new Date(gy, gm - 1, gd, Number(hour), Number(minute), Number(second));

  const now = new Date();

  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);

  if (diffSec < 60) return 'چند لحظه قبل';

  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin} دقیقه قبل`;

  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `${diffHour} ساعت قبل`;

  const diffDay = Math.floor(diffHour / 24);
  if (diffDay < 30) return `${diffDay} روز قبل`;

  const diffMonth = Math.floor(diffDay / 30);
  if (diffMonth < 12) return `${diffMonth} ماه قبل`;

  const diffYear = Math.floor(diffMonth / 12);
  return `${diffYear} سال قبل`;
};
