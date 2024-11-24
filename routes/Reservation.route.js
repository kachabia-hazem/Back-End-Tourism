const express = require("express");
const cors = require("cors");
const reservationController = require("../controllers/Reservation.controller");

const router = express.Router();

// Enable CORS
router.use(cors());

// Reservation Routes
router.post("/create", reservationController.createReservation);
router.post("/update", reservationController.updateReservation);
router.post("/delete", reservationController.deleteReservation);
router.get("/getReservations", reservationController.getReservations);

module.exports = router;
