import mongoose from "mongoose"
import * as CardsMethod from "../services//iyzico/methods/cards.js"
import IyzicoCard from "../models/iyzicoCard.js"
import Users from "../models/user.js"
import nanoid from "../utils/nanoid.js"

//Create Iyzico Card
export const createIyzicoCard = async (req, res) => {
    const { card } = req.body;
    const userData = await Users.findById(req.user?.id)

    console.log("userData.cardUserKey", userData.cardUserKey)
    let result = await CardsMethod.createUserCard({
        locale: userData.locale,
        conversationId: nanoid(),
        email: userData.email,
        externalId: nanoid,
        ...userData.cardUserKey && {
            cardUserKey: userData.cardUserKey
        },
        card: card
    })
    console.log("result?.cardUserKey", result?.cardUserKey)
    if (!userData.cardUserKey || userData.cardUserKey === undefined) {
        if (result?.status === "success" && result?.cardUserKey) {
            console.log("girdiii")
            userData.cardUserKey = result?.cardUserKey
            await userData.save()
        }
    }
    res.status(200).json(result)
}

//Read Card
export const readIyzicoCard = async (req, res) => {
    const userData = await Users.findById(req.user?.id)
    if (!userData?.cardUserKey) {
        res.status(409).json({
            error: "UserHasNoCard",
            message: "User hash no credit card"
        })
    }

    let cards = await CardsMethod.getUserCards({
        locale: userData.locale,
        conversationId: nanoid(),
        cardUserKey: userData.cardUserKey
    })
    res.status(200).json(cards)
}

//Delete IyzicoCard
export const deleteIyzicoCard = async (req, res) => {
    const { cardToken } = req.body;
    const userData = await Users.findById(req.user?.id);
    if (!userData.cardUserKey) {
        res.status(401).json({
            error: "UserHasNoCard",
            message: "User Hash no credit card"
        })
    }
    const deleteCard = await CardsMethod.deleteUserCard({
        locale: userData.locale,
        conversationId: nanoid(),
        cardUserKey: userData.cardUserKey,
        cardToken: cardToken
    })
    res.status(200).json(deleteCard);
}


