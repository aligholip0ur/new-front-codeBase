export const convertToDateFormat = (dateValue: string) =>
  dateValue.substring(0, 4) + '/' + dateValue.substring(4, 6) + '/' + dateValue.substring(6, 8);
