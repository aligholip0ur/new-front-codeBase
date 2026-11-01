import jalaali from 'jalaali-js';

export const convertToTimestamp = (jalaliDate: string): number => {
  // تاریخ شمسی به فرمت 1403/10/15
  const [jy, jm, jd] = jalaliDate.split('/').map(Number);

  // تبدیل به تاریخ میلادی
  const { gy, gm, gd } = jalaali.toGregorian(jy, jm, jd);

  // ساختن تاریخ بر اساس UTC
  return Date.UTC(gy, gm - 1, gd);
};

// استفاده
// const timestamp = convertToTimestamp("1403/10/15");
// console.log(timestamp); // مقدار درست بدون اختلاف روز

export const convertTimestampToGeneralDateTime = (dateStr: string): string => {
  const year = dateStr.slice(0, 4);
  const month = dateStr.slice(4, 6);
  const day = dateStr.slice(6, 8);

  const hour = dateStr.slice(8, 10);
  const minute = dateStr.slice(10, 12);
  const second = dateStr.slice(12, 14);

  return `${hour}:${minute}:${second} - ${year}/${month}/${day}`;
};

// console.log(convertTimestampToGeneralDateTime("14050218112812"));
// 1405/02/18 11:28:12
