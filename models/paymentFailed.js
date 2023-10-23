import mongoose, { Schema } from "mongoose"

const PaymentFailedSchema = new Schema({
    status: {
        type: String,
        required: true,
        enum: ["failure"]
    },
    conversationId: {
        type: String,
        required: true
    },
    errorCode: {
        type: String,
        required: true
    },
    errorMessage: {
        type: String,
        required: true
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

const PaymentFailed = mongoose.model("PaymentFailed", PaymentFailedSchema);
export default PaymentFailed;