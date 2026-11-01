import { convertToEnDigit } from '@/utils';

export const checkAdvancedSearchDateValidation = (args: {
  dateFrom: string;
  dateTo: string;
}): boolean =>
  convertToEnDigit(args.dateFrom.replaceAll('/', '')) <=
  convertToEnDigit(args.dateTo.replaceAll('/', ''));
