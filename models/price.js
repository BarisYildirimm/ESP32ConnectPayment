import mongoose from "mongoose"

const priceSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    fee: {
        type: Number,
        required: true,
    },
    createdDate: {
        type: Date,
        default: Date.now(),
    },
    updatedDate: {
        type: Date,
        default: Date.now(),
    }
});

const Price = mongoose.model("Price", priceSchema);

export default Price;