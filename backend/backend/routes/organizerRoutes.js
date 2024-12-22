const express = require('express');
const {
  createTrip,
  getOrganizerTrips,
  getTripById,
  updateTrip,
  deleteTrip,
} = require('../controllers/organizerController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// Create a new trip
router.post('/', authMiddleware, createTrip);

// Get all trips organized by the authenticated user
router.get('/', authMiddleware, getOrganizerTrips);

// Get a specific trip by ID
router.get('/:tripId', authMiddleware, getTripById);

// Update a trip by ID
router.put('/:tripId', authMiddleware, updateTrip);

// Delete a trip by ID
router.delete('/:tripId', authMiddleware, deleteTrip);

module.exports = router;