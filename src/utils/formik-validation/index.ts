export default function validateChainForm(validation: any) {
  return new Promise((resolve, reject) => {
    validation.validateForm().then((errObj: any) => {
      if (Object.keys(errObj).length !== 0) {
        validation.handleSubmit();
        reject('Failed');
      } else {
        resolve('Success');
      }
    });
  });
}
