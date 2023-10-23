import express from "express";

import {
  getStationAll,
  getStations,
  createStations,
  updateStations,
  deleteStations,
  getByIdStation
} from "../controllers/station.js";

import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/all", getStationAll);
router.get("/:stationCode", getByIdStation)
router.post("/myStations", getStations);
router.post("/add", auth, createStations);
router.patch("/update/:id", auth, updateStations);
router.delete("/delete/:id", auth, deleteStations);

export default router;
