import express from "express"

import { iyzicoPayment } from "../controllers/payment.js"

import { authUser } from "../middleware/auth.js"

const router = express.Router();

router.post("/:cardId/withnewcard", authUser, iyzicoPayment)

export default router;