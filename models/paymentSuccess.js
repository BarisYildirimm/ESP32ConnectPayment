import mongoose, { Schema } from "mongoose"

const itemTransactionSchema = new Schema({
    itemId: {
        type: Schema.Types.ObjectId,
        ref: "Products",
        required: true,
    },
    paymentTransactionId: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    paidPrice: {
        type: Number,
        required: true
    }
})

const PaymentSuccessSchema = new Schema({
    status: {
        type: String,
        required: true,
        enum: ["success"]
    },
    cardId: {
        type: Schema.Types.ObjectId,
        ref: "IyzicoCard",
        required: true,
    },
    conversationId: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        required: true,
        enum: [
            "TRY",
            "USD",
            "EUR"
        ]
    },
    paymentId: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true,
    },
    paidPrice: {
        type: Number,
        required: true
    },
    itemTransactions: {
        type: [itemTransactionSchema]
    },
    log: {
        type: Schema.Types.Mixed,
        required: true
    }

}, {
    timeStamps: true,
    toJSON: {
        transform: (doc, ret) => {
            delete ret.__v;
            return {
                ...ret
            }
        }
    }
})
const PaymentSuccess = mongoose.model("PaymentSuccess", PaymentSuccessSchema);
export default PaymentSuccess;