import mongoose from "mongoose"
import PaymentSuccess from "../models/paymentSuccess.js"
import PaymentFailed from "../models/paymentFailed.js"
import IyzicoCard from "../models/iyzicoCard.js"

export const CompletePayment = async (result) => {
    if (result?.status === "success") {
        await IyzicoCard.updateOne({ _id: mongoose.Types.ObjectId(result?.basketId) }, { $set: { completed: true } })

        await PaymentSuccess.create({
            status: result.status,
            cardId: result?.basketId,
            conversationId: result?.conversationId,
            currency: result?.currency,
            price: result?.price,
            paidPrice: result?.paidPrice,
            paymentId: result?.paymentId,
            itemTransactions: result?.itemTransactions.map(item => {
                return {
                    itemId: item?.itemId,
                    paymentTransactionId: item?.paymentTransactionId,
                    price: item?.price,
                    paidPrice: item?.paidPrice
                }
            }),
            log: result
        })
    }
    else {
        await PaymentFailed.create({
            status: result?.status,
            conversationId: result?.conversationId,
            errorCode: result?.errorCode,
            errorMessage: result?.errorMessage,
            log: result
        })
    }

}