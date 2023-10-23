import express from "express";

import {
  getCardAll,
  createCard,
  updateCard,
  deleteCard,
  getCardById,
} from "../controllers/card.js";

import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/all", auth, getCardAll);
router.post("/create", auth, createCard);
router.get("/:id", auth, getCardById);
router.patch("/update/:id", auth, updateCard);
router.delete("/delete/:id", auth, deleteCard);

export default router;
