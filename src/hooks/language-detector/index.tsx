import { useState } from 'react';
/**
 *
 * @param text این هوک برای تشخیص زبان ورودی و در حال تایپ کاربر هستش
 * @returns
 */
const detectLanguage = (text: string): string => {
  if (/[\u0600-\u06FF]/.test(text)) return 'فارسی'; // محدوده کدهای یونیکد برای فارسی و عربی
  if (/[a-zA-Z]/.test(text)) return 'انگلیسی';
  return 'نامشخص';
};

export const useInputLanguage = () => {
  const [text, setText] = useState('');
  const [language, setLanguage] = useState('نامشخص');

  const handleChange = (inputText: string) => {
    const value = inputText;
    setText(value);
    setLanguage(detectLanguage(value));
  };

  return { text, setText, language, handleChange };
};
