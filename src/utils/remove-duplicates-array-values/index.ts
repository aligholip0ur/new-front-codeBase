/**
 *
 * @param array حذف مقادیر تکراری در یک آرایه
 * @returns
 */
export const removeDuplicates = <T>(array: T[]) => {
  return [...new Set(array)];
};
// مثال استفاده
// const inputArray = ["whiteListIps", "whiteListIps", "whiteListIps"];
// const uniqueArray = removeDuplicates(inputArray);

// console.log(uniqueArray); // ["whiteListIps"]
