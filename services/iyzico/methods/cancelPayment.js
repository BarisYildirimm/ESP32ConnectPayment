import iyzipay from "../connection/iyzipay.js";

export const cancelPayment = (data) => {
  return new Promise((resolve, reject) => {
    iyzipay.cancel.create(data, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};
