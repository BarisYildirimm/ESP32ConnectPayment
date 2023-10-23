import mongoose from "mongoose";
import Card from "../models/card.js";
import User from "../models/user.js";

//get All Card
export const getCardAll = async (req, res) => {
  try {
    const cards = await Card.find().populate("user");

    res.status(200).json({
      type: "CardInfoResultJsonObject",
      status: "SUCCES",
      message: "Records!",
      cardInfoList: cards,
    });
  } catch (error) {
    res.status(500).json({
      status: "UNSUCCES",
      message: error,
    });
  }
};

// get card by Id
export const getCardById = async (req, res) => {
  try {
    const { id } = req.params;

    const card = await Card.findById(id).populate("user")


    res.status(200).json({
      type: "CardInfoResultJsonObject",
      status: "SUCCES",
      message: "Records!",
      cardInfoList: card,
    });


  } catch (error) {
    res.status(500).json({
      status: "UNSUCCES",
      message: error,
    });
  }
};

//create Card
export const createCard = async (req, res) => {
  try {
    const newCard = new Card({
      cardId: req.body.cardId,
      money: req.body.money,
      user: req.body.user,
      status: req.body.status,
    });
    await newCard.save();
    res.status(200).json({
      status: "SUCCES",
      message: "Card created!",
      infoCardList: newCard,
    });
  } catch (error) {
    res.status(500).json({
      status: "UNSUCCES",
      message: error,
    });
  }
};

// Update Card
export const updateCard = async (req, res) => {
  try {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(409).send("ID not found!");

    const result = await Card.findByIdAndUpdate(
      _id,
      {
        cardId: req.body.cardId,
        money: req.body.money,
        status: req.body.status,
      },
      { new: true }
    );
    res.status(200).json({
      status: "SUCCES",
      message: "Card updated!",
      infoCardList: result,
    });
  } catch (error) {
    res.status(409).json({
      status: "UNSUCCES",
      message: error,
    });
  }
};

//Delete Card
export const deleteCard = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("ID not found!");

  await Card.findByIdAndRemove(id);
  res.json({ status: "SUCCES", message: "Card deleted!" });
};
