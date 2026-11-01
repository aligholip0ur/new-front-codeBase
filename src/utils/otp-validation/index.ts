export const otpValidation = (mode: 'phoneNumber' | 'otpCheck', otpCode: string) => {
  if (mode === 'phoneNumber') {
    if (otpCode.length === 0) {
      return { isValid: false, message: 'شماره تلفن همراه خود را وارد کنید!' };
    }
    if (otpCode.length < 9) {
      return {
        isValid: false,
        message: 'شماره تلفن همراه خود را بصورت کامل وارد کنید!',
      };
    }
    return { isValid: true, message: '' };
  }
  if (mode === 'otpCheck') {
    if (otpCode.length === 0) {
      return { isValid: false, message: 'کد ارسال شده را وارد کنید!' };
    }
    if (otpCode.length < 6) {
      return {
        isValid: false,
        message: 'کد ارسالی را بصورت کامل وارد کنید!',
      };
    }
  }
  return { isValid: true, message: '' };
};
