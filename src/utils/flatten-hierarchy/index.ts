export const flattenHierarchy = (items: any, result: any[] = []) => {
  for (const item of items) {
    result.push(item);
    if (item.subPartners && item.subPartners.length > 0) {
      flattenHierarchy(item.subPartners, result);
    }
  }
  return result;
};

export const buildHierarchy = (items: any[]) => {
  const map = new Map();
  const result = [];

  // ابتدا همه‌ی آیتم‌ها را در یک Map ذخیره می‌کنیم
  for (const item of items) {
    map.set(item.id, { ...item, subPartners: [] });
  }

  // ساختار سلسله‌مراتبی را تشکیل می‌دهیم
  for (const item of items) {
    const parent = map.get(item.parentId);
    if (parent) {
      parent.subPartners.push(map.get(item.id)); // اضافه کردن به لیست فرزندان والد
    } else {
      result.push(map.get(item.id)); // اگر والد نداشت، به ریشه اضافه می‌شود
    }
  }

  return result;
};

// export const removeNodeWithChildren = (
//   items: TreeListModel[],
//   nodeId: string
// ): TreeListModel[] => {
//   // یک مجموعه برای ذخیره شناسه‌هایی که باید حذف شوند
//   const idsToRemove = new Set<string>();

//   // تابع بازگشتی برای پیدا کردن تمام گره‌ها و فرزندان آن‌ها
//   const collectIdsToRemove = (id: string) => {
//     idsToRemove.add(id);
//     for (const item of items) {
//       if (item.parentId === id) {
//         collectIdsToRemove(item.id);
//       }
//     }
//   };

//   // جمع‌آوری شناسه‌ها برای حذف
//   collectIdsToRemove(nodeId);

//   // بازگرداندن آرایه فیلتر شده بدون گره‌ها و فرزندانشان
//   return items.filter((item) => !idsToRemove.has(item.id));
// };
