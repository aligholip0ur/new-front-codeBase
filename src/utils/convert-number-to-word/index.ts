//@ts-ignore
import NumberToPersianWord from 'number_to_persian_word';

/**
 *
 * @param num تبدیل عدد به حروف
 * @returns
 */
export const convertNumberToWord = (num: bigint | string | number) => {
  return NumberToPersianWord.convert(num.toString());
};
