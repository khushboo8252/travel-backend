const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, required: true }, // e.g., 'credit_card', 'paypal', etc.
  transactionId: { type: String, required: true, unique: true }, // Unique identifier for the transaction
  status: { 
    type: String, 
    enum: ['pending', 'completed', 'failed'], 
    default: 'pending' 
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Middleware to update the updatedAt field before saving
paymentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Payment', paymentSchema);