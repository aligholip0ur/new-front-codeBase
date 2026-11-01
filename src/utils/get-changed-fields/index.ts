// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getChangedFields = (obj1: any, obj2: any, parentKey: string = ''): string[] => {
  const changedFields: string[] = [];

  const allKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);

  for (const key of allKeys) {
    const fullKey = parentKey ? `${parentKey}.${key}` : key;

    const val1 = obj1[key];
    const val2 = obj2[key];

    if (typeof val1 === 'object' && typeof val2 === 'object' && val1 !== null && val2 !== null) {
      const nestedChanges = getChangedFields(val1, val2, fullKey);
      changedFields.push(...nestedChanges);
    } else if (Array.isArray(val1) && Array.isArray(val2)) {
      if (JSON.stringify(val1) !== JSON.stringify(val2)) {
        changedFields.push(fullKey);
      }
    } else if (val1 !== val2) {
      changedFields.push(fullKey);
    }
  }

  return changedFields;
};

// // نمونه استفاده:
// const obj1 = {
//   name: "پارامتر نهایی",
//   desc: "توضیحات ویرایش شد12123123123",
//   type: "U",
//   spItemId: "575befb036e3bf3e86cb77c41029690890625be2b35dbc5f",
//   symbol: "End_Param",
//   group: {
//     name: "پوشه جدید پارامترها",
//     fItemId: "e2b3c36146027d46bf2dcf668318c8b46ad437608c6433aa",
//   },
//   CREATEDBY: "راهبر",
//   creationDate: "18:11:52 2025/01/11",
// };

// const obj2 = {
//   name: "پارامتر نهایی",
//   desc: "توضیحات ویرایش شد",
//   type: "U",
//   spItemId: "575befb036e3bf3e86cb77c41029690890625be2b35dbc5f",
//   symbol: "End_Param",
//   group: {
//     name: "پوشه جدید پارامترها",
//     fItemId: "e2b3c36146027d46bf2dcf668318c8b46ad437608c6433aa",
//   },
//   CREATEDBY: "راهبر",
//   creationDate: "18:11:52 2025/01/11",
// };

// console.log(getChangedFields(obj1, obj2));

// خروجی
// ["desc"];
