import express from "express";
import mongoose from "mongoose";

import ParkingLocation from "./parkingLocationModel.js";

const router = express.Router();

export const getParkingLocations = async (req, res) => {
  try {
    const parkingLocation = await ParkingLocation.find();

    res.status(200).json(parkingLocation);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const postParkingLocation = async (req, res) => {
  const { location, lantitude, longitude, takenSpots, totalSpots, price } =
    req.body;

  const newParkingLocation = new ParkingLocation({
    location,
    lantitude,
    longitude,
    takenSpots,
    totalSpots,
    price,
  });

  try {
    await newParkingLocation.save();

    res.status(201).json(newParkingLocation);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export default router;
