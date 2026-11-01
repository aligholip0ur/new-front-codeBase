/**
 * اعتبارسنجی شماره تلفن همراه که باید با 0 شروع شود و دقیقاً 11 رقم باشد.
 * @param phoneNumber - شماره تلفنی که باید اعتبارسنجی شود.
 * @returns اگر شماره معتبر باشد true و در غیر این صورت false.
 */
export const validateMobilePhone = (phoneNumber: string): boolean => {
  // الگوی regex برای شماره‌ای که با 0 شروع شود و دقیقاً 11 رقم باشد.
  const mobilePhoneRegex = /^0[9]\d{9}$/;

  // بررسی اینکه شماره ورودی با الگو مطابقت دارد یا خیر
  return mobilePhoneRegex.test(phoneNumber);
};

// // مثال‌هایی از استفاده:
// console.log(validateMobilePhone("09123456789")); // true
// console.log(validateMobilePhone("009123456789")); // false
// console.log(validateMobilePhone("9123456789")); // false
// console.log(validateMobilePhone("12345678901")); // false
// console.log(validateMobilePhone("0912345678")); // false
