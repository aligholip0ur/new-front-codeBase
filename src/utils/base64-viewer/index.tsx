import React from 'react';

type Props = {
  base64: string;
  fileName?: string;
};

const getMimeTypeFromBase64 = (base64: string): string => {
  const signatures = [
    { mime: 'image/png', signature: 'iVBORw0KGgo' },
    { mime: 'image/jpeg', signature: '/9j/' },
    { mime: 'application/pdf', signature: 'JVBERi0' },
    { mime: 'image/gif', signature: 'R0lGOD' },
    { mime: 'image/webp', signature: 'UklGR' },
  ];

  for (const s of signatures) {
    if (base64.startsWith(s.signature)) {
      return s.mime;
    }
  }

  return 'application/octet-stream';
};

const base64ToBlob = (base64: string, mimeType: string): Blob => {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length)
    .fill(0)
    .map((_, i) => byteCharacters.charCodeAt(i));
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
};

const Base64Viewer: React.FC<Props> = ({ base64, fileName = 'file' }) => {
  const mimeType = getMimeTypeFromBase64(base64);
  const blob = base64ToBlob(base64, mimeType);
  const url = URL.createObjectURL(blob);

  if (mimeType === 'application/pdf') {
    return (
      <iframe
        src={url}
        title="PDF Viewer"
        style={{ width: '100%', height: '600px', border: 'none' }}
      />
    );
  }

  if (mimeType.startsWith('image/')) {
    return <img src={url} alt="Base64 Image" style={{ maxWidth: '100%' }} />;
  }

  return (
    <a href={url} download={fileName}>
      دانلود فایل
    </a>
  );
};

export default Base64Viewer;

// مثال استفاده

// import Base64Viewer from "./Base64Viewer";

// const Example = () => {
//   const base64 = "JVBERi0xLjQKJeLjz9MKMSAwIG9iago8PC9U..."; // یک رشته base64 واقعی
//   return <Base64Viewer base64={base64} fileName="myfile.pdf" />;
// };
