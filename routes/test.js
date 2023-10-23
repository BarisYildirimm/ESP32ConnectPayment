import express from "express"

import { checkUserTest } from "../controllers/test.js"

import { authUser } from "../middleware/auth.js";
const router = express.Router();

router.get("/", checkUserTest);

export default router;