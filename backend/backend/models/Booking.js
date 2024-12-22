const mongoose = require('mongoose');

// Define the booking schema
const bookingSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User ', // Removed extra space after 'User '
    required: true // Ensure that user is required
  },
  trip: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Trip', 
    required: true // Ensure that trip is required
  },
  bookingDate: { 
    type: Date, 
    default: Date.now 
  },
  status: { 
    type: String, 
    enum: ['confirmed', 'cancelled'], // Restrict status to specific values
    default: 'confirmed' 
  }
});

// Export the Booking model
module.exports = mongoose.model('Booking', bookingSchema);