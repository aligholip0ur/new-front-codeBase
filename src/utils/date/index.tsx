import { DateObject } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { Text } from '@/components/atoms';

import { toGregorian } from 'jalaali-js';
import type { DateType } from '@/models';

/**
 * تبدیل تاریخ شمسی به میلادی
 * @param date تاریخ شمسی با فرمت YYYY/MM/DD یا YYYY-MM-DD
 * @returns تاریخ میلادی با فرمت YYYY-MM-DD
 */
export const jalaliToGregorian = (date: string): string => {
  const normalizedDate = date.replace(/-/g, '/');
  const parts = normalizedDate.split('/');

  if (parts.length !== 3) {
    throw new Error('فرمت تاریخ نامعتبر است.');
  }

  const [jy, jm, jd] = parts.map(Number);

  if (
    !Number.isInteger(jy) ||
    !Number.isInteger(jm) ||
    !Number.isInteger(jd) ||
    jm < 1 ||
    jm > 12 ||
    jd < 1 ||
    jd > 31
  ) {
    throw new Error('تاریخ شمسی نامعتبر است.');
  }

  const { gy, gm, gd } = toGregorian(jy, jm, jd);

  return `${gy}${String(gm).padStart(2, '0')}${String(gd).padStart(2, '0')}`;
};

export const DateCurrentText = () => {
  const currentDateFormated = () => {
    return new DateObject()
      .setCalendar(persian)
      .setLocale(persian_fa)
      .setFormat('dddd DD MMMM YYYY')
      .format();
  };
  return (
    <Text weight={500} className="text-surface-500">
      {currentDateFormated()}
    </Text>
  );
};

export const DateCurrentWithDay = () => {
  const currentDateFormated = () => {
    return new DateObject()
      .setCalendar(persian)
      .setLocale(persian_fa)
      .setFormat('dddd YYYY/MM/DD')
      .format();
  };
  return currentDateFormated();
};

let date: DateType;
export const today = () => {
  return new DateObject({ calendar: persian, locale: persian_fa, date });
};

export const currentDate = (): string => {
  const month = today().month.number < 9 ? `0${today().month.number}` : today().month.number;
  const day = today().day < 9 ? `0${today().day}` : today().day;
  return `${today().year}/${month}/${day}`;
};

export const currenPersiantDate = () => {
  return new DateObject().setCalendar(persian).setLocale(persian_fa).format('YYYY/MM/DD');
};

export const formatedDate =
  today.toString().substring(0, 4) +
  '/' +
  today.toString().substring(4, 6) +
  '/' +
  today.toString().substring(6, 8);
