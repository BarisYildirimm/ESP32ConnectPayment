import express from "express";

import { signIn, getUser } from "../controllers/systemUser.js";

const router = express.Router();

router.get("/", getUser);
router.post("/signIn", signIn);
// router.post("/signUp", signUp);

export default router;
