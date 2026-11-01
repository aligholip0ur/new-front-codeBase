import { showToast } from '@/lib';
import jalaali from 'jalaali-js';

// import moment from "jalali-moment";

export const convertToJalali = (datetime: string): string => {
  const gregorianDate = new Date(datetime);
  if (isNaN(gregorianDate.getTime())) {
    showToast.error('Invalid date format. Use a valid ISO string, e.g., "YYYY-MM-DDTHH:mm:ss".');
  }

  // تبدیل تاریخ میلادی به شمسی
  const { jy, jm, jd } = jalaali.toJalaali(gregorianDate);

  // استخراج زمان
  const hours = gregorianDate.getHours().toString().padStart(2, '0');
  const minutes = gregorianDate.getMinutes().toString().padStart(2, '0');
  const seconds = gregorianDate.getSeconds().toString().padStart(2, '0');

  return `${jy}/${jm}/${jd} ${hours}:${minutes}:${seconds}`;
};

export const convertToJalaliDate = (datetime: string): string => {
  const gregorianDate = new Date(datetime);
  if (isNaN(gregorianDate.getTime())) {
    showToast.error('Invalid date format. Use a valid ISO string, e.g., "YYYY-MM-DDTHH:mm:ss".');
  }

  // تبدیل تاریخ میلادی به شمسی
  const { jy, jm, jd } = jalaali.toJalaali(gregorianDate);

  return `${jy}/${jm}/${jd}`;
};

// export const convertToJalali = (gregorianDate: string) => { TO DO
//   const jalaliDate = moment(gregorianDate)
//     .utc()
//     .locale("fa")
//     .format("YYYY/MM/DD HH:mm:ss");
//   return jalaliDate;
// };

// مثال استفاده از تابع
// const datetime = "2024-12-22T21:56:30";
// console.log(convertToJalali(datetime));
// // خروجی: 1403/10/2 21:56:30
import moment from 'jalali-moment';

export const getNextMonthValue = (currentDate: string, nextMonthCount: number): string => {
  const date = moment(currentDate, 'jYYYY/jMM/jDD');
  // چند ماه بعد
  const nextMonth = date.add(nextMonthCount, 'jMonth');
  return nextMonth.format('jYYYY/jMM/jDD');
};
