/**
 *
 * @param amount
 * @returns
 */
export const convertStringToBillDigit = (amount: bigint) =>
  amount
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    .replaceAll('-', '');
