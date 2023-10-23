import express from "express"

import { createIyzicoCard, readIyzicoCard, deleteIyzicoCard } from "../controllers/iyzicoCard.js"

import { authUser } from "../middleware/auth.js"

const router = express.Router();

router.post("/create", authUser, createIyzicoCard);
router.get("/read", authUser, readIyzicoCard)
router.delete("/delete/cardToken", authUser, deleteIyzicoCard)

export default router;