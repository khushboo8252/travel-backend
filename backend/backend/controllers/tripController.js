const Trip = require('../models/Trip');

// Create a new trip
exports.createTrip = async (req, res) => {
  const { name, description, dates, price, availableSlots, cancellationPolicy } = req.body;
  try {
    const newTrip = new Trip({ name, description, dates, price, availableSlots, cancellationPolicy, organizer: req.user.id });
    await newTrip.save();
    res.status(201).json(newTrip);
  } catch (error) {
    res.status(500).json({ message: 'Error creating trip', error });
  }
};

// Get all trips
exports.getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find().populate('organizer', 'name');
    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trips', error });
  }
};

// Get a trip by ID
exports.getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id).populate('organizer', 'name');
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    res.json(trip);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trip', error });
  }
};