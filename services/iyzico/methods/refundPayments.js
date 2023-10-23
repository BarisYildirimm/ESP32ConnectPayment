import iyzipay from "../connection/iyzipay.js";

export const refundPayment = (data) => {
  return new Promise((resolve, reject) => {
    iyzipay.refund.create(data, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};
