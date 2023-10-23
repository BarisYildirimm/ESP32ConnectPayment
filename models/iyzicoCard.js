import mongoose from "mongoose"
import User from "./user.js"
import Products from "./product.js"

const iyzicoCardSchema = mongoose.Schema({
    completed: {
        type: Boolean,
        default: false,
        required: true
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Products",
    },
    currency: {
        type: String,
        required: true,
        default: "TRY",
        enum: ["TRY", "USD", "EUR"]
    }
})
const IyzicoCard = mongoose.model("IyzicoCard", iyzicoCardSchema)

IyzicoCard.starterData = {
    _id: mongoose.Types.ObjectId('61d05524bf858c7449e9d456'),
    buyer: new mongoose.Types.ObjectId('63ca281dab091d95d59715c3'),
    completed: false,
    products: [
        mongoose.Types.ObjectId('61d054e5a2f56187efb0a3b2'),
        mongoose.Types.ObjectId('61d055016272c60f701be7ac'),
        mongoose.Types.ObjectId('61d055095087612ecee33a20'),
    ],
    currency: 'TRY'
}


IyzicoCard.initializer = async () => {
    const count = await IyzicoCard.estimatedDocumentCount();
    if (count == 0) {
        const created = await IyzicoCard.create(IyzicoCard.starterData);
    }
}

IyzicoCard.populationTest = async () => {

    const cart = await IyzicoCard.findOne({
        _id: "61d05524bf858c7449e9d456"
    }).populate("buyer").populate([{ path: "Products", strictPopulate: false }])
    console.log(cart);
}

//IyzicoCard.populationTest();
//IyzicoCard.initializer();

export default IyzicoCard; 