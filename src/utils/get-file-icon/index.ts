import { type ReactNode } from 'react';
import { fileTypeIcons } from './file-type';

export const getFileIcon = (fileType: string): ReactNode => {
  const fileTypeIndex = fileTypeIcons.findIndex((file) =>
    file.type.toLowerCase().includes(fileType)
  );
  const indexOfType = fileTypeIndex !== -1 ? fileTypeIndex : 6;
  return fileTypeIcons[indexOfType].icon;
};
