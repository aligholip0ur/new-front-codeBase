/**
 *
 * @param args
 */
export const downloadFileLink = (args: { fileTitle: string; base64: string }) => {
  const { base64, fileTitle } = args;
  const downloadLink = document.createElement('a');
  downloadLink.href = base64;
  downloadLink.download = fileTitle ?? 'unknown-file';
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};
