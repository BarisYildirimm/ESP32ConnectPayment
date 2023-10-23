import iyzipay from "../connection/iyzipay.js";

// 3d security yapiyor ve iyzico bize onlaylanma durumuna gore response donuyor base64 donuyor telefon a giden mesaja gore dogrulama yapiyor base to html yaptiktan sonra
export const initializePayment = (data) => {
  return new Promise((resolve, reject) => {
    iyzipay.threedsInitialize.create(data, (error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
};

export const completePayment = (data) => {
  return new Promise((resolve, reject) => {
    iyzipay.threedsPayment.create(data, (error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
};
