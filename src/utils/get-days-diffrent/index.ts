import { DateObject } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';

export const convertSystemDateTimeToPersianDate = (systemDateTimeValue: string): string => {
  const dateValue =
    systemDateTimeValue.slice(0, 4) +
    '/' +
    systemDateTimeValue.slice(5, 7) +
    '/' +
    systemDateTimeValue.slice(8, 10);
  return dateValue;
};

/**
 *
 * @param deadlineDate
 * @returns
 */
export const getDaysDiffrent = (deadlineDate: string): number => {
  const diff =
    new Date(convertSystemDateTimeToPersianDate(deadlineDate)).getTime() - new Date().getTime();
  return Math.ceil(diff / (1000 * 3600 * 24));
};

export const getDaysDiffrentDescription = (deadlineDate: string) => {
  const currentDateValue = Number(
    new DateObject({
      calendar: persian,
      locale: persian_fa,
      format: 'YYYYMMDD',
    }).toString()
  );
  const deadlineDateValue = Number(deadlineDate.replaceAll('/', ''));

  const daysDiffValue = getDaysDiffrent(deadlineDate);
  if (daysDiffValue === 0) return 'آخرین فرصت امروز می باشد';
  if (daysDiffValue > 0) return `${daysDiffValue} روز مانده`;
  if (daysDiffValue < 0) return `${daysDiffValue * -1} روز گذشته`;
};

const jalaliToGregorian = (jy: number, jm: number, jd: number) => {
  let gy;
  if (jy > 979) {
    gy = 1600;
    jy -= 979;
  } else {
    gy = 621;
  }

  let days = 365 * jy + Math.floor(jy / 33) * 8 + Math.floor(((jy % 33) + 3) / 4);

  const jDaysInMonth = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
  for (let i = 0; i < jm - 1; ++i) {
    days += jDaysInMonth[i];
  }

  days += jd - 1;

  gy += 400 * Math.floor(days / 146097);
  days %= 146097;

  if (days > 36524) {
    gy += 100 * Math.floor(--days / 36524);
    days %= 36524;

    if (days >= 365) days++;
  }

  gy += 4 * Math.floor(days / 1461);
  days %= 1461;

  if (days > 365) {
    gy += Math.floor((days - 1) / 365);
    days = (days - 1) % 365;
  }

  let gd = days + 1;

  const gDaysInMonth = [
    31,
    (gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0 ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  let gm = 0;
  for (; gm < 12 && gd > gDaysInMonth[gm]; gm++) {
    gd -= gDaysInMonth[gm];
  }

  return { gy, gm: gm + 1, gd };
};

const parseJalali = (d: string) => ({
  y: +d.slice(0, 4),
  m: +d.slice(4, 6),
  d: +d.slice(6, 8),
});

/**
 * اختلاف روز با علامت
 */
export const getJalaliDiffDays = (sourceDate: string, targetDate: string) => {
  const j1 = parseJalali(sourceDate);
  const j2 = parseJalali(targetDate);

  const g1 = jalaliToGregorian(j1.y, j1.m, j1.d);
  const g2 = jalaliToGregorian(j2.y, j2.m, j2.d);

  // برای جلوگیری از خطای timezone
  const date1 = new Date(Date.UTC(g1.gy, g1.gm - 1, g1.gd));
  const date2 = new Date(Date.UTC(g2.gy, g2.gm - 1, g2.gd));

  const diffTime = date2.getTime() - date1.getTime();

  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * خروجی human readable
 */
export const getJalaliDiffText = (sourceDate: string, targetDate: string) => {
  const diff = getJalaliDiffDays(targetDate, sourceDate);

  if (diff > 0) return `${diff} روز مانده`;
  if (diff < 0) return `${Math.abs(diff)} روز گذشته`;
  return 'امروز';
};
