import { Router } from "express";

import { verifyAccessToken } from "../../middlewares/auth.js";
import {
  getParkingLocations,
  postParkingLocation,
} from "./parkingLocationController.js";

const router = Router();
router.get("/", verifyAccessToken, getParkingLocations);
router.post("/", verifyAccessToken, postParkingLocation);

export default router;
