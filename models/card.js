import mongoose from "mongoose";

const cardSchema = mongoose.Schema({
  cardId: {
    type: String,
    required: true,
    unique: true
  },
  money: {
    type: String,
    required: true,
    default: "0"
  },
  user: {
    type: String,
    required: true,
    ref: "User"
  },
  status: {
    type: Boolean,
    default: false,
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
});

const Card = mongoose.model("Card", cardSchema);
export default Card;
