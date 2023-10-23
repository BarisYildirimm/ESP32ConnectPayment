import iyzipay from "../connection/iyzipay.js";

export const createUserCard = async (data) => {
  return new Promise((resolve, reject) => {
    iyzipay.card.create(data, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

export const getUserCards = async (data) => {
  return new Promise((resolve, reject) => {
    iyzipay.cardList.retrieve(data, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

export const deleteUserCard = async (data) => {
  return new Promise((resolve, reject) => {
    iyzipay.card.delete(data, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};
