const reservationServices = require("../services/Reservation.service");

exports.createReservation = async (req, res, next) => {
  try {
    const { id_user, id_package, date_depart, date_arrive } = req.body;
    const newReservation = await reservationServices.createReservation({ id_user, id_package, date_depart, date_arrive });

    return res.status(201).json({
      message: "Reservation created successfully",
      data: newReservation,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error creating reservation: " + error.message,
    });
  }
};

exports.updateReservation = async (req, res, next) => {
  try {
    const { id, id_user, id_package, date_depart, date_arrive } = req.body;
    await reservationServices.updateReservation({ id, id_user, id_package, date_depart, date_arrive });

    return res.status(200).json({
      message: "Reservation updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error updating reservation: " + error.message,
    });
  }
};

exports.deleteReservation = async (req, res, next) => {
  try {
    const { id } = req.body;
    await reservationServices.deleteReservation({ id });

    return res.status(200).json({
      message: "Reservation deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error deleting reservation: " + error.message,
    });
  }
};

exports.getReservations = async (req, res, next) => {
  try {
    const reservations = await reservationServices.getReservations();

    return res.status(200).json({
      message: "Reservations retrieved successfully",
      data: reservations,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error fetching reservations: " + error.message,
    });
  }
};
