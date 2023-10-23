import Iyzipay from "iyzipay";
import * as Cards from "./methods/cards.js";
import * as Payment from "./methods/payments.js";
import * as PaymentThreeDs from "./methods/threedsPayments.js";
import * as CancelPayments from "./methods/cancelPayment.js";
import * as RefundPayments from "./methods/refundPayments.js";
import nanoid from "../../utils/nanoid.js";
import * as Logs from "../../utils/logs.js";

//Bir kullanıcı ve kart oluştur
const createUserAndCards = () => {
  Cards.createUserCard({
    locale: Iyzipay.LOCALE.TR,
    conversationId: nanoid(),
    email: "email@email.com",
    externalId: nanoid(),
    card: {
      cardAlias: "Kredi Kartım",
      cardHolderName: "John Doe",
      cardNumber: "5528790000000008",
      expireMonth: "12",
      expireYear: "2030",
    },
  })
    .then((result) => {
      console.log(result);
      Logs.logFile("1-cards-kullanıcı-ve-kart-oluştur", result);
    })
    .catch((error) => {
      console.log(error);
      Logs.logFile("1-cards-kullanıcı-ve-kart-oluştur-hata", error);
    });
};

// createUserAndCards();

//Bir kullanıcıya yeni bir kart ekleme
const createACardForAUser = () => {
  Cards.createUserCard({
    locale: Iyzipay.LOCALE.TR,
    conversationId: nanoid(),
    email: "email@email.com",
    externalId: nanoid(),
    cardUserKey: "W3qdNS1s91TvO/UX1NCpxDq2k7U=",
    card: {
      cardAlias: "Kredi Kartim",
      cardHolderName: "John Doe",
      cardNumber: "5528790000000008",
      expireMonth: "12",
      expireYear: "2030",
    },
  })
    .then((result) => {
      console.log(result);
      Logs.logFile("2-cards-bir-kullaniciya-kart-ekle", result);
    })
    .catch((error) => {
      console.log(error);
      Logs.logFile("2-cards-bir-kullaniciya-kart-ekle-hata", error);
    });
};

// createACardForAUser();

//Bir kullanıcın kartlarını oku
const readCardsOfAUser = () => {
  Cards.getUserCards({
    locale: Iyzipay.LOCALE.TR,
    conversationId: nanoid(),
    cardUserKey: "W3qdNS1s91TvO/UX1NCpxDq2k7U=",
  })
    .then((result) => {
      console.log(result);
      Logs.logFile("3-cards-bir-kullanicinin-kartlarini-oku", result);
    })
    .catch((error) => {
      console.log(error);
      Logs.logFile("3-cards-bir-kullanicinin-kartlarini-oku-hata", error);
    });
};

// readCardsOfAUser();

//Bir kullanıcının bir kartını silme
const deleteCardOfAUser = () => {
  Cards.deleteUserCard({
    locale: Iyzipay.LOCALE.TR,
    conversationId: nanoid(),
    cardUserKey: "W3qdNS1s91TvO/UX1NCpxDq2k7U=",
    cardToken: "CKWqwwKevvkOAutNZDbPDDqYYmg=",
  })
    .then((result) => {
      console.log(result);
      Logs.logFile("4-cards-bir-kullanicinin-kartini-sil", result);
    })
    .catch((error) => {
      console.log(error);
      Logs.logFile("4-cards-bir-kullanicinin-kartini-sil-hata", error);
    });
};

// deleteCardOfAUser();

//kayıtlı olmayan kartla odeme yapma ve kaydetme
const createPayment = () => {
  return Payment.createPayment({
    locale: Iyzipay.LOCALE.TR,
    conversationId: nanoid(),
    price: "300",
    paidPrice: "300",
    curreny: Iyzipay.CURRENCY.TRY,
    installment: "1",
    basketId: nanoid(), //sistemde tutulmalı
    paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
    PaymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
    paymentCard: {
      cardHolderName: "John Doe",
      cardNumber: "5528790000000008",
      expireMonth: "12",
      expireYear: "2030",
      cvc: "123",
      registerCard: "0",
    },
    buyer: {
      id: "SDFJKG", //sistemdeki user Id
      name: "John",
      surname: "Doe",
      gsmNumber: "+905450000000",
      email: "email@email.com",
      identityNumber: "743008664791", //onemli zorunlu
      lastLoginDate: "2020-10-05 12:43:35", //bu formatta olmalu
      registrationDate: "2020-10-05 12:43:35",
      registrationAddress: "Isparta Bladeco",
      ip: "85.34.78.112",
      city: "Isparta",
      country: "Turkey",
      zipCode: "34732",
    },
    shippingAddress: {
      contactName: "John Doe",
      city: "Isparta",
      country: "Turkey",
      address: "Isparta Bladeco",
      zipCode: "32500",
    },
    billingAddress: {
      contactName: "John Doe",
      city: "Isparta",
      country: "Turkey",
      address: "Isparta Bladeco",
      zipCode: "32500",
    },
    basketItems: [
      {
        id: "BT101",
        name: "Şarj",
        category: "Şarj istasyon",
        category1: "isyasyonNo şarj",
        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
        price: "300",
      },
    ],
  })
    .then((result) => {
      console.log(result);
      Logs.logFile(
        "5-payments-yeni-bir-kartla-odeme-al-ve-karti-kaydetme",
        result
      );
    })
    .catch((error) => {
      console.log(error);
      Logs.logFile(
        "5-payments-yeni-bir-kartla-odeme-al-ve-karti-kaydetme-hata",
        error
      );
    });
};

// createPayment();

// bir kredi karti ile ödeme yap ve karti kaydet
const createPaymentAndSaveCard = () => {
  return Payment.createPayment({
    locale: Iyzipay.LOCALE.TR,
    conversationId: nanoid(),
    price: "300",
    paidPrice: "300",
    curreny: Iyzipay.CURRENCY.TRY,
    installment: "1",
    basketId: nanoid(), //sistemde tutulmalı
    paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
    PaymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
    paymentCard: {
      cardUserKey: "W3qdNS1s91TvO/UX1NCpxDq2k7U=",
      cardAlias: "Kredi Kartim odemeden sonra",
      cardHolderName: "John Doe",
      cardNumber: "5528790000000008",
      expireMonth: "12",
      expireYear: "2030",
      cvc: "123",
      registerCard: "1", //tek fark 0 bir 1 kaydetmek icin
    },
    buyer: {
      id: "SDFJKG", //sistemdeki user Id
      name: "John",
      surname: "Doe",
      gsmNumber: "+905450000000",
      email: "email@email.com",
      identityNumber: "743008664791", //onemli zorunlu
      lastLoginDate: "2020-10-05 12:43:35", //bu formatta olmalu
      registrationDate: "2020-10-05 12:43:35",
      registrationAddress: "Isparta Bladeco",
      ip: "85.34.78.112",
      city: "Isparta",
      country: "Turkey",
      zipCode: "34732",
    },
    shippingAddress: {
      contactName: "John Doe",
      city: "Isparta",
      country: "Turkey",
      address: "Isparta Bladeco",
      zipCode: "32500",
    },
    billingAddress: {
      contactName: "John Doe",
      city: "Isparta",
      country: "Turkey",
      address: "Isparta Bladeco",
      zipCode: "32500",
    },
    basketItems: [
      {
        id: "BT101",
        name: "Şarj",
        category: "Şarj istasyon",
        category1: "isyasyonNo şarj",
        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
        price: "300",
      },
    ],
  })
    .then((result) => {
      console.log(result);
      Logs.logFile(
        "6-payments-yeni-bir-kartla-odeme-al-ve-karti-kaydet",
        result
      );
    })
    .catch((error) => {
      console.log(error);
      Logs.logFile(
        "6-payments-yeni-bir-kartla-odeme-al-ve-karti-kaydet-hata",
        error
      );
    });
};

// createPaymentAndSaveCard();
// readCardsOfAUser();

// Bir kayitli kart ile odeme yap
const createPaymentWithSavedCard = () => {
  return Payment.createPayment({
    locale: Iyzipay.LOCALE.TR,
    conversationId: nanoid(),
    price: "300",
    paidPrice: "300",
    curreny: Iyzipay.CURRENCY.TRY,
    installment: "1",
    basketId: nanoid(), //sistemde tutulmalı
    paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
    PaymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
    paymentCard: {
      cardUserKey: "W3qdNS1s91TvO/UX1NCpxDq2k7U=",
      cardToken: "NQaeuKcPCt2LUFlbB2fEQyHy108=", //kart token gerekli
    },
    buyer: {
      id: "SDFJKG", //sistemdeki user Id
      name: "John",
      surname: "Doe",
      gsmNumber: "+905450000000",
      email: "email@email.com",
      identityNumber: "743008664791", //onemli zorunlu
      lastLoginDate: "2020-10-05 12:43:35", //bu formatta olmalu
      registrationDate: "2020-10-05 12:43:35",
      registrationAddress: "Isparta Bladeco",
      ip: "85.34.78.112",
      city: "Isparta",
      country: "Turkey",
      zipCode: "34732",
    },
    shippingAddress: {
      contactName: "John Doe",
      city: "Isparta",
      country: "Turkey",
      address: "Isparta Bladeco",
      zipCode: "32500",
    },
    billingAddress: {
      contactName: "John Doe",
      city: "Isparta",
      country: "Turkey",
      address: "Isparta Bladeco",
      zipCode: "32500",
    },
    basketItems: [
      {
        id: "BT101",
        name: "Şarj",
        category: "Şarj istasyon",
        category1: "isyasyonNo şarj",
        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
        price: "300",
      },
    ],
  })
    .then((result) => {
      console.log(result);
      Logs.logFile("7-payments-kayitli-bir-kartla-odeme-al-kaydet", result);
    })
    .catch((error) => {
      console.log(error);
      Logs.logFile("7-payments-kayitli-bir-kartla-odeme-al-hata", error);
    });
};

// createPaymentWithSavedCard();

//3DS ile odeme yap burda response base64 kod doner ve htmle cevrilip donen deger ile dogrulama yapildiktan sonra
const initializeThreeDSPayments = () => {
  PaymentThreeDs.initializePayment({
    locale: Iyzipay.LOCALE.TR,
    conversationId: nanoid(),
    price: "500",
    paidPrice: "500",
    curreny: Iyzipay.CURRENCY.TRY,
    installment: "1",
    basketId: nanoid(), //sistemde tutulmalı
    paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
    PaymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
    callbackUrl: "https://localhost/api/payment/3ds/complete", //kullanıcı bankadan gelen mesaji vs onayladitan sonra bize callback donuyor ve dogrulamaya gore islem yapiliyor
    paymentCard: {
      cardHolderName: "John Doe",
      cardNumber: "5528790000000008",
      expireMonth: "12",
      expireYear: "2030",
      cvc: "123",
      registerCard: "0",
    },
    buyer: {
      id: "SDFJKG",
      name: "John",
      surname: "Doe",
      gsmNumber: "+905450000000",
      email: "email@email.com",
      identityNumber: "743008664791",
      lastLoginDate: "2020-10-05 12:43:35",
      registrationDate: "2020-10-05 12:43:35",
      registrationAddress: "Isparta Bladeco",
      ip: "85.34.78.112",
      city: "Isparta",
      country: "Turkey",
      zipCode: "34732",
    },
    shippingAddress: {
      contactName: "John Doe",
      city: "Isparta",
      country: "Turkey",
      address: "Isparta Bladeco",
      zipCode: "32500",
    },
    billingAddress: {
      contactName: "John Doe",
      city: "Isparta",
      country: "Turkey",
      address: "Isparta Bladeco",
      zipCode: "32500",
    },
    basketItems: [
      {
        id: "BT101",
        name: "Şarj",
        category: "Şarj istasyon",
        category1: "isyasyonNo şarj",
        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
        price: "500",
      },
    ],
  })
    .then((result) => {
      console.log(result);
      Logs.logFile("8-threeds-payments-yeni-bir-kartla-odeme-al", result);
    })
    .catch((error) => {
      console.log(error);
      Logs.logFile("8-threeds-payments-yeni-bir-kartla-odeme-al-hata", error);
    });
};

// initializeThreeDSPayments();

// dogrulama yapildiktan sonra donen payment id uzerinden ve sunucudaki adrese gore islem tamamlanir
const completeThreeDSPayments = () => {
  PaymentThreeDs.completePayment({
    locale: Iyzipay.LOCALE.TR,
    conversationId: nanoid(),
    paymentId: "18842169", //respnse olarak donen id
    conversationData: "conversation Data", //api adresi yazilacak
  })
    .then((result) => {
      console.log(result);
      Logs.logFile("9-threeds-payments-odeme-tamamla", result);
    })
    .catch((error) => {
      console.log(error);
      Logs.logFile("9-threeds-payments-odeme-tamamla-hata", error);
    });
};

// completeThreeDSPayments();

// 3DS odemesini sistemde kayitli bir kart ile yap
const initializeThreeDSPaymentsWithRegisteredCard = () => {
  PaymentThreeDs.initializePayment({
    locale: Iyzipay.LOCALE.TR,
    conversationId: nanoid(),
    price: "500",
    paidPrice: "500",
    curreny: Iyzipay.CURRENCY.TRY,
    installment: "1",
    basketId: nanoid(), //sistemde tutulmalı
    paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
    PaymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
    callbackUrl: "https://localhost/api/payment/3ds/complete", //kullanıcı bankadan gelen mesaji vs onayladitan sonra bize callback donuyor ve dogrulamaya gore islem yapiliyor
    paymentCard: {
      cardUserKey: "W3qdNS1s91TvO/UX1NCpxDq2k7U=",
      cardToken: "NQaeuKcPCt2LUFlbB2fEQyHy108=", //kart token gerekli
    },
    buyer: {
      id: "SDFJKG",
      name: "John",
      surname: "Doe",
      gsmNumber: "+905450000000",
      email: "email@email.com",
      identityNumber: "743008664791",
      lastLoginDate: "2020-10-05 12:43:35",
      registrationDate: "2020-10-05 12:43:35",
      registrationAddress: "Isparta Bladeco",
      ip: "85.34.78.112",
      city: "Isparta",
      country: "Turkey",
      zipCode: "34732",
    },
    shippingAddress: {
      contactName: "John Doe",
      city: "Isparta",
      country: "Turkey",
      address: "Isparta Bladeco",
      zipCode: "32500",
    },
    billingAddress: {
      contactName: "John Doe",
      city: "Isparta",
      country: "Turkey",
      address: "Isparta Bladeco",
      zipCode: "32500",
    },
    basketItems: [
      {
        id: "BT101",
        name: "Şarj",
        category: "Şarj istasyon",
        category1: "isyasyonNo şarj",
        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
        price: "500",
      },
    ],
  })
    .then((result) => {
      console.log(result);
      Logs.logFile("10-threeds-payments-kayitli-bir-kart", result);
    })
    .catch((error) => {
      console.log(error);
      Logs.logFile("10-threeds-payments-kayitli-bir-kart-hata", error);
    });
};

// initializeThreeDSPaymentsWithRegisteredCard();

// 3DS odemesini sistemde kayitli bir kart ile yap
const initializeThreeDSPaymentsWithNewCardAndRegistered = () => {
  PaymentThreeDs.initializePayment({
    locale: Iyzipay.LOCALE.TR,
    conversationId: nanoid(),
    price: "500",
    paidPrice: "500",
    curreny: Iyzipay.CURRENCY.TRY,
    installment: "1",
    basketId: nanoid(), //sistemde tutulmalı
    paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
    PaymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
    callbackUrl: "https://localhost/api/payment/3ds/complete", //kullanıcı bankadan gelen mesaji vs onayladitan sonra bize callback donuyor ve dogrulamaya gore islem yapiliyor
    paymentCard: {
      cardUserKey: "W3qdNS1s91TvO/UX1NCpxDq2k7U=",
      cardAlias: "Kredi Kartim odemeden sonra",
      cardHolderName: "John Doe",
      cardNumber: "5528790000000008",
      expireMonth: "12",
      expireYear: "2030",
      cvc: "123",
      registerCard: "1", //tek fark 0 bir 1 kaydetmek icin
    },
    buyer: {
      id: "SDFJKG",
      name: "John",
      surname: "Doe",
      gsmNumber: "+905450000000",
      email: "email@email.com",
      identityNumber: "743008664791",
      lastLoginDate: "2020-10-05 12:43:35",
      registrationDate: "2020-10-05 12:43:35",
      registrationAddress: "Isparta Bladeco",
      ip: "85.34.78.112",
      city: "Isparta",
      country: "Turkey",
      zipCode: "34732",
    },
    shippingAddress: {
      contactName: "John Doe",
      city: "Isparta",
      country: "Turkey",
      address: "Isparta Bladeco",
      zipCode: "32500",
    },
    billingAddress: {
      contactName: "John Doe",
      city: "Isparta",
      country: "Turkey",
      address: "Isparta Bladeco",
      zipCode: "32500",
    },
    basketItems: [
      {
        id: "BT101",
        name: "Şarj",
        category: "Şarj istasyon",
        category1: "isyasyonNo şarj",
        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
        price: "500",
      },
    ],
  })
    .then((result) => {
      console.log(result);
      Logs.logFile("11-threeds-payments-kayitli-bir-kart", result);
    })
    .catch((error) => {
      console.log(error);
      Logs.logFile("11-threeds-payments-kayitli-bir-kart-hata", error);
    });
};
// initializeThreeDSPaymentsWithNewCardAndRegistered();
// readCardsOfAUser();

//Odemeyi iptal etme
const cancelPayments = () => {
  CancelPayments.cancelPayment({
    locale: Iyzipay.LOCALE.TR,
    conversationId: nanoid(),
    paymentId: "18837781",
    ip: "85.34.78.112",
  })
    .then((result) => {
      console.log(result);
      Logs.logFile("12-cancel-payments", result);
    })
    .catch((error) => {
      console.log(error);
      Logs.logFile("12-cancel-payments-hata", error);
    });
};
// cancelPayments();

//Aciklama ile iptal etme islemi
const cancelPaymentsWithReason = () => {
  CancelPayments.cancelPayment({
    locale: Iyzipay.LOCALE.TR,
    conversationId: nanoid(),
    paymentId: "18838266",
    ip: "85.34.78.112",
    reason: Iyzipay.REFUND_REASON.REFUND,
    description: "kullanici istegi ile iptal edildi",
  })
    .then((result) => {
      console.log(result);
      Logs.logFile("12-cancel-payments", result);
    })
    .catch((error) => {
      console.log(error);
      Logs.logFile("12-cancel-payments-hata", error);
    });
};
// cancelPaymentsWithReason();

//Odemenin belirli bir parcasini iade et
const refundPayment = () => {
  RefundPayments.refundPayment({
    locale: Iyzipay.LOCALE.TR,
    conversationId: nanoid(),
    paymentTransactionId: "20072396",
    price: "60",
    curreny: Iyzipay.CURRENCY.TRY,
    ip: "85.34.78.112",
  })
    .then((result) => {
      console.log(result);
      Logs.logFile("13-refund-payments", result);
    })
    .catch((error) => {
      console.log(error);
      Logs.logFile("13-refund-payments-hata", error);
    });
};
// refundPayment();

//Odemeninin bir kismini neden ve aciklama ile iade et
const refundPaymentWithReason = () => {
  RefundPayments.refundPayment({
    locale: Iyzipay.LOCALE.TR,
    conversationId: nanoid(),
    paymentTransactionId: "20072396",
    price: "60",
    curreny: Iyzipay.CURRENCY.TRY,
    ip: "85.34.78.112",
    reason: Iyzipay.REFUND_REASON.BUYER_REQUEST,
    description: "kullanici iade istedi",
  })
    .then((result) => {
      console.log(result);
      Logs.logFile("14-refund-payments-with-reason", result);
    })
    .catch((error) => {
      console.log(error);
      Logs.logFile("14-refund-payments-with-reason-hata", error);
    });
};

refundPaymentWithReason();
