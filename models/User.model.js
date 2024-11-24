const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id_user: { type: mongoose.Schema.Types.ObjectId, auto: true }, // Auto-generated unique ID
    first_name: { type: String, required: false },
    last_name: { type: String, required: false },
    email: { type: String, required: false, unique: false },
    password: { type: String, required: false },
    phone: { type: String, required: false },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
