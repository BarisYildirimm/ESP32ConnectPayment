import mongoose from "mongoose"

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    categories: {
        type: [String],
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    brand: {
        type: String,
        required: true,
        default: "BLADECO"
    },
    price: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        required: true,
        default: "TRY",
        enum: ["TRY", "USD", "EUR"]
    },
    stock: {
        type: Number,
        default: 10,
        required: true
    },
    itemType: {
        type: String,
        default: "PHYSICAL",
        enum: ["PHYSICAL", "VIRTUAL"]
    }
}, {
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            delete ret.__v;
            return {
                ...ret
            }
        }
    }
})

const Products = mongoose.model("Products", productSchema)

Products.starterData = [
    {
        _id: mongoose.Types.ObjectId('61d054e5a2f56187efb0a3b2'),
        name: "Bladeco Charge Station",
        images: ["https://www.fayettevilleflyer.com/wp-content/uploads/2022/09/walmart.jpeg", "https://www.fayettevilleflyer.com/wp-content/uploads/2022/09/walmart.jpeg"],
        categories: ["Isitma", "Sogutma & Isitma"],
        brand: "Bladeco",
        price: 10,
        currency: "TRY",
        stock: 10,
        itemType: "PHYSICAL"
    }
]

Products.initializer = async () => {

    const count = await Products.estimatedDocumentCount();
    if (count == 0) {
        const created = await Products.create(Products.starterData);
    }
}

//Products.initializer();

export default Products;