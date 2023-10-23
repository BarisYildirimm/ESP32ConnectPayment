import express from "express";

import { signIn, signUp, getUser, deleteUser } from "../controllers/user.js";

import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getUser);
router.post("/signIn", signIn);
router.post("/signUp", signUp);
router.delete("/delete/:id", auth, deleteUser);

export default router;
