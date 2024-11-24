const User = require("../models/User.model");
const Package = require("../models/Package.model");
const Reservation = require("../models/Reservation.model");
const bcrypt = require("bcryptjs");
async function createReservation({ id_user, id_package, date_depart, date_arrive }) {
    try {
        // Function to parse DD/MM/YYYY format to ISO YYYY-MM-DD
        const parseDate = (dateString) => {
            const [day, month, year] = dateString.split("/");
            return new Date(`${year}-${month}-${day}`);
        };

        // Parse the dates
        const parsedDateDepart = parseDate(date_depart);
        const parsedDateArrive = parseDate(date_arrive);

        const newReservation = await Reservation.create({
            id_user,
            id_package,
            date_depart: parsedDateDepart,
            date_arrive: parsedDateArrive,
        });

        return newReservation;
    } catch (err) {
        console.error("Error creating reservation:", err);
        throw new Error("An error occurred while creating reservation");
    }
}

async function updateReservation({ id, id_user, id_package, date_depart, date_arrive }) {
    try {
        const updatedReservationCount = await Reservation.update(
            { id_user, id_package, date_depart, date_arrive },
            { where: { id_reservation: id } }
        );

        if (updatedReservationCount[0] === 0) {
            throw new Error("Reservation not found!");
        }
    } catch (err) {
        console.error("Error updating reservation:", err);
        throw new Error("An error occurred while updating reservation");
    }
}

async function deleteReservation({ id }) {
    try {
        const deletedReservationCount = await Reservation.destroy({ where: { id_reservation: id } });

        if (deletedReservationCount === 0) {
            throw new Error("Reservation not found!");
        }
    } catch (err) {
        console.error("Error deleting reservation:", err);
        throw new Error("An error occurred while deleting reservation");
    }
}

async function getReservations() {
    try {
        const reservations = await Reservation.findAll({
            include: [
                { model: User, as: "user" },
                { model: Package, as: "package" },
            ],
        });

        return reservations;
    } catch (err) {
        console.error("Error getting reservations:", err);
        throw new Error("An error occurred while getting reservations");
    }
}

module.exports = {
    createReservation,
    updateReservation,
    deleteReservation,
    getReservations,
};