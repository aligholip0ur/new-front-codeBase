export const hasMatchingFields = (changedFields: string[], targetInfoFields: string[]): boolean => {
  return changedFields.some((field) => targetInfoFields.includes(field));
};

// مثال:
// const changedFields = ["workSite"];
// const generalInfoFields = ["fullName", "nationalNumber", "gender"];

// const result = hasMatchingFields(changedFields, generalInfoFields);
// console.log(result); // خروجی: false
