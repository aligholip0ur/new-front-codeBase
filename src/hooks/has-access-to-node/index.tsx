import { ACCESS, AccessKeyValueType } from '@/models/auth/access-nodes';
import { useShareContext } from '@/providers/share-context';

// /**
//  * بررسی دسترسی به یک نود
//  * @param accessKey کلید دسترسی نود
//  * @returns آیا کاربر به نود دسترسی دارد؟
//  */
// export const HasAccessToNode = (accessKey: AccessKeyValueType): boolean => {
//   const {
//     values: { userData },
//   } = useShareContext();
//   const accessValue = ACCESS[accessKey] ?? "none";

//   if (userData?.type === "S" || accessValue === "none") return true;
//   return userData?.accessNodes?.includes(accessValue) ?? false;
// };

export const useHasAccessToNode = () => {
  const {
    values: { userData },
  } = useShareContext();

  return (accessKey: AccessKeyValueType): boolean => {
    const accessValue = ACCESS[accessKey] ?? 'none';
    // if (userData?.type === "S" || accessValue === "none") return true;
    // if (userData?.type === "E" || userData?.type === "T") return false;
    return userData?.accessNodes?.includes(accessValue) ?? false;
  };
};
