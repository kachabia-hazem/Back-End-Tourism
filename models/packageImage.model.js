const mongoose = require('mongoose');

const packageImageSchema = new mongoose.Schema({
  package_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Package', required: true },
  filename: { type: String, required: false },
  filepath: { type: String, required: false },
}, { timestamps: true });

module.exports = mongoose.model('PackageImage', packageImageSchema);
