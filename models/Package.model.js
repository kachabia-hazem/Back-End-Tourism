const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  name: { type: String, required: false },
  description: { type: String, required: false },
  price_per_day: { type: Number, required: false },
  location: { type: String, required: false },
  max_people: { type: Number, required: false },
  start_date: { type: Date, required: false },
}, { timestamps: true });

module.exports = mongoose.model('Package', packageSchema);
