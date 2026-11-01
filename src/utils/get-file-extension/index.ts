const mimeTypeToExtension = (mimeType: string): string => {
  const map: Record<string, string> = {
    // Images
    'image/jpeg': 'jpg',
    'image/png': 'png',

    // PDF
    'application/pdf': 'pdf',

    // Word
    'application/msword': 'doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',

    // Excel
    'application/vnd.ms-excel': 'xls',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',

    // Audio
    'audio/mpeg': 'mp3',
  };
  return map[mimeType] ?? 'unknown';
};

export const getFileExtension = (file: File) => {
  return mimeTypeToExtension(file.type) || file.name.split('.').pop()?.toLowerCase() || 'unknown';
};
