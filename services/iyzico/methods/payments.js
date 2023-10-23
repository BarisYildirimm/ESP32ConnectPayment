import iyzipay from "../connection/iyzipay.js";

export const createPayment = (data) => {
  return new Promise((resolve, reject) => {
    iyzipay.payment.create(data, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};
