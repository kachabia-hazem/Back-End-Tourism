const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    id_reservation: { type: mongoose.Schema.Types.ObjectId, auto: true }, // Auto-generated unique ID
    date_depart: { type: Date, required: false },   // Departure date
    date_arrive: { type: Date, required: false },   // Arrival date
    id_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }, // Reference to User
    id_package: { type: mongoose.Schema.Types.ObjectId, ref: 'Package', required: false }, // Reference to Package
}, { timestamps: true });

module.exports = mongoose.model('Reservation', reservationSchema);
