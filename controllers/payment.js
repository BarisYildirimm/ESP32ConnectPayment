import mongoose from "mongoose";
import moment from "moment";
import IyzicoCard from "../models/iyzicoCard.js"
import User from "../models/user.js"
import Product from "../models/product.js"
import * as Payments from "../services/iyzico/methods/payments.js"
import * as Cards from "../services/iyzico/methods/cards.js"
import nanoid from "../utils/nanoid.js";
import { CompletePayment } from "../utils/payments.js"
import Iyzipay from "iyzipay"

export const iyzicoPayment = async (req, res) => {
    const { card } = req.body;
    console.log("CARDID ", req.params?.cardId);
    console.log("USER ID :", req.user?.id);
    const userData = await User.findById(req.user?.id)
    if (!card) {
        res.status(409).json({
            error: "CardRequired",
            message: "Card is Required!"
        })
    }
    if (!req.params?.cardId) {
        res.status(409).json({
            error: "cardIdRequired",
            message: "CardIsd Required!"
        })
    }
    
    const cardData = await IyzicoCard.findById({ _id: req.params?.cardId }).populate("buyer").populate("products")
    if (!cardData) {
        res.status(409).json({
            error: "CardNotFound",
            message: "Card Not Found"
        })
    }
    if (cardData?.completed) {
        res.status(200).json({
            message: "Card is Complated"
        })
    }
    cardData.registerCard = "0"
    const paidPrice = cardData.products.map((product) => product.price).reduce((a, b) => a + b, 0)
    const data = {
        locale: userData.locale,
        conversationId: nanoid(),
        price: paidPrice,
        paidPrice: paidPrice,
        currency: Iyzipay.CURRENCY.TRY,
        installment: "1",
        basketId: String(cardData?.id),
        paymentChanell: Iyzipay.PAYMENT_CHANNEL.WEB,
        PaymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
        paymentCard: card,
        buyer: {
            id: String(userData._id),
            name: userData.name,
            surname: userData.name,
            gsmNumber: userData.phone,
            email: userData.email,
            identityNumber: userData.identityNumber,
            lastLoginDate: moment(userData.createdDate).format("YYYY-MM-DD HH:mm:ss"),
            registrationDate: moment(userData.createdDate).format("YYYY-MM-DD HH:mm:ss"),
            registrationAddress: userData.address,
            ip: userData.ip,
            city: userData.city,
            country: userData.country,
            zipCode: userData.zipCode,
        },
        shippingAddress: {
            contactName: userData.name + userData.surname,
            city: userData.city,
            country: userData.country,
            address: userData.address,
            zipCode: userData.zipCode,
        },
        billingAddress: {
            contactName: userData.name + userData.surname,
            city: userData.city,
            country: userData.country,
            address: userData.address,
            zipCode: userData.zipCode,
        },
        basketItems: cardData.products.map((product, index) => {
            return {
                id: product?.id,
                name: product?.name,
                category1: product.categories[0],
                category2: product.categories[1],
                itemType: Iyzipay.BASKET_ITEM_TYPE[product?.itemType],
                price: product?.price
            }
        })
    }

    let result = await Payments.createPayment(data);
    await CompletePayment(result);
    res.json({
        res: result,
        get: data
    });
}