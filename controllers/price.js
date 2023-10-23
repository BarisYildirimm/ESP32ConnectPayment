import mongoose from "mongoose"
import Price from "../models/price.js"

export const getByIdPrice = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Price.findById(id);

        res.status(200).json({
            type: "priceInfoResultJSON",
            status: "SUCCES",
            message: "Records !",
            priceInfoJson: result
        })
    } catch (error) {
        res.status(409).json({
            type: "UNSUCCES",
            mesasge: error
        })
    }
}


export const getPriceAll = async (req, res) => {
    try {
        const prices = await Price.find();
        res.status(200).json({
            type: "priceInfoResultMultipleJsonObject",
            status: "SUCCES",
            message: "Records !",
            priceInfoList: prices,
        });
    } catch (error) {
        res.status(409).json({
            status: "UNSUCCES",
            message: error
        })
    }
}

export const createPrice = async (req, res) => {
    try {
        const newPrice = new Price({
            name: req.body.name,
            desc: req.body.desc,
            type: req.body.type,
            fee: req.body.fee,
        });
        await newPrice.save();
        res.status(200).json({
            status: "SUCESS",
            message: "Price Added!"
        });
    } catch (error) {
        res.status(409).json({
            status: "UNSUCCES",
            message: error
        })
    }
}

export const updatePrice = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(409).json("ID Not Found!")
        }

        const result = await Price.findByIdAndUpdate(id, {
            name: req.body.name,
            desc: req.body.desc,
            type: req.body.type,
            fee: req.body.fee,
            updatedDate: Date.now(),
        }, { new: true })
        res.status(200).json({
            status: "SUCCES",
            message: "Price Updated! "
        })


    } catch (error) {
        res.status(409).json({
            status: "UNSUCCES",
            message: error
        })
    }
}

export const deletePrice = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(409).json("ID Not Found!")

        await Price.findByIdAndDelete(id);

        res.status(200).json({
            status: "SUCCES",
            message: "Price Deleted!"
        })
    } catch (error) {
        res.status(409).json({
            status: "UNSUCCES",
            message: error
        })
    }
}