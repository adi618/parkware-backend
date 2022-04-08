import { Router } from "express";
import {
  getParkingLocations,
  postParkingLocation,
} from "./parkingLocationController.js";

const router = Router();

router.get("/", getParkingLocations);
router.post("/", postParkingLocation);

export default router;
