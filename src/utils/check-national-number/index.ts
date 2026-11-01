export const nationalCodeValidation = (nationalNumber?: string) => {
  if (!nationalNumber) {
    return {
      status: false,
      message: 'لطفا شماره ملی کاربر را وارد کنید',
    };
  }
  let c, r, n;
  if ((nationalNumber.length < 12 && nationalNumber.length > 10) || nationalNumber.length < 10) {
    return {
      status: false,
      message: 'طول شماره ملی وارد شده معتبر نیست.',
    };
  }

  if (nationalNumber.length === 10 && nationalNumber.startsWith('9')) {
    return {
      status: true,
      message: '',
    };
  }
  if (nationalNumber.length === 10) {
    if (nationalNumber === '0000000000') {
      return {
        status: false,
        message: 'ساختار شماره ملی وارد شده معتبر نیست.',
      };
    } else {
      c = parseInt(nationalNumber.charAt(9));
      n =
        parseInt(nationalNumber.charAt(0)) * 10 +
        parseInt(nationalNumber.charAt(1)) * 9 +
        parseInt(nationalNumber.charAt(2)) * 8 +
        parseInt(nationalNumber.charAt(3)) * 7 +
        parseInt(nationalNumber.charAt(4)) * 6 +
        parseInt(nationalNumber.charAt(5)) * 5 +
        parseInt(nationalNumber.charAt(6)) * 4 +
        parseInt(nationalNumber.charAt(7)) * 3 +
        parseInt(nationalNumber.charAt(8)) * 2;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      r = n - parseInt(n / 11) * 11;

      if ((r === 0 && r === c) || (r === 1 && c === 1) || (r > 1 && c === 11 - r)) {
        return {
          status: true,
          message: 'شماره ملی وارد شده معتبر می باشد.',
          nationalCode: nationalNumber,
        };
      } else {
        return {
          status: false,
          message: 'شماره ملی وارد شده معتبر نیست.',
        };
      }
    }
  } else if (nationalNumber.length === 0) {
    return {
      status: false,
      message: 'لطفا شماره ملی کاربر را وارد نمایید.',
    };
  } else {
    return {
      status: false,
      message: 'طول شماره ملی وارد شده معتبر نیست',
    };
  }
};
