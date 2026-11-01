import { useState } from 'react';

/**
 * ********************************************************************
 :معیارهای سطح رمز عبور                                             *
ضعیف: کمتر از ۶ کاراکتر یا فقط شامل حروف کوچک باشد                *
متوسط: حداقل ۶ کاراکتر شامل حروف بزرگ و کوچک یا اعداد             *
قوی: حداقل ۸ کاراکتر شامل حروف بزرگ، کوچک، عدد و کاراکتر خاص     *
(!@#$%^&*)                                                            *
 **********************************************************************/

/**
 *
 * @param password این هوک برای تشخیص قدرت امنیتی رمز عبور تعریف شده می باشد
 * @returns
 */

const getPasswordStrength = (password: string): string => {
  if (password.length < 6) return 'ضعیف';

  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*]/.test(password);

  if (password.length >= 8 && hasLower && hasUpper && hasNumber && hasSpecial) {
    return 'قوی';
  }

  return 'متوسط';
};

export const usePasswordStrength = () => {
  const [password, setPassword] = useState('');
  const strength = getPasswordStrength(password);

  return { password, setPassword, strength };
};
