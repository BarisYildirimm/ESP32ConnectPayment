import express from "express"

import {
    getAllSocket,
    createSocket,
    updateSocket,
    deleteSocket,
    getByIdSocket
} from "../controllers/socket.js"

import { auth } from "../middleware/auth.js"

const router = express.Router();

router.get("/all", getAllSocket);
router.get("/:id", getByIdSocket);
router.post("/create", createSocket);
router.patch("/update/:id", updateSocket);
router.delete("/delete/:id", deleteSocket);


export default router;