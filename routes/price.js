import express from "express"

import {
    getPriceAll,
    createPrice,
    updatePrice,
    deletePrice,
    getByIdPrice
} from "../controllers/price.js";

import { auth } from "../middleware/auth.js"

const router = express.Router();

router.get("/all", auth, getPriceAll);
router.get("/:id", getByIdPrice);
router.post("/add", auth, createPrice);
router.patch("/update/:id", auth, updatePrice);
router.delete("/delete/:id", auth, deletePrice);

export default router;