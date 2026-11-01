export const toBase64 = (files: Blob) =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(files);
    reader.onload = () => resolve(reader.result);
  });
