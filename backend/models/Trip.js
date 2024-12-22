const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  dates: { type: String, required: true },
  price: { type: Number, required: true },
  availableSlots: { type: Number, required: true },
  cancellationPolicy: { type: String, required: true },
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User ' },
});

module.exports = mongoose.model('Trip', tripSchema);