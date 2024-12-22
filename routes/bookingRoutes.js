const express = require('express');
const {
  createBooking,
  getUserBookings,
  cancelBooking,
} = require('../controllers/bookingController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// Create a new booking
router.post('/', authMiddleware, createBooking);

// Get all bookings for the authenticated user
router.get('/', authMiddleware, getUserBookings);

// Cancel a booking by ID
router.delete('/:bookingId', authMiddleware, cancelBooking);

// Export the router
module.exports = router;