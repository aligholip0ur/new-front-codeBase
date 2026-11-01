export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|ir|gov|edu|io)$/;
  return emailRegex.test(email);
};

// // استفاده:
// console.log(isValidEmail("hadi@gmail.com")); // true
// console.log(isValidEmail("hadi@gmail.co")); // false
// console.log(isValidEmail("hadi@gmail.ir")); // true
