const express = require('express');
const { createTrip, getAllTrips, getTripById } = require('../controllers/tripController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createTrip);
router.get('/', getAllTrips);
router.get('/:id', getTripById);

module.exports = router;