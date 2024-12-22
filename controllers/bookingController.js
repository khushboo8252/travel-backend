const Booking = require('../models/Booking');
const Trip = require('../models/Trip');

// Create a new booking
exports.createBooking = async (req, res) => {
  const { tripId } = req.body;

  try {
    // Find the trip by ID
    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    // Check if there are available slots
    if (trip.availableSlots <= 0) {
      return res.status(400).json({ message: 'No available slots for this trip' });
    }

    // Create a new booking
    const newBooking = new Booking({
      user: req.user.id, // Assuming req.user is populated with the authenticated user's info
      trip: tripId,
    });

    // Save the booking
    await newBooking.save();

    // Decrease available slots
    trip.availableSlots -= 1;
    await trip.save();

    // Respond with the created booking
    res.status(201).json(newBooking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Error creating booking', error: error.message });
  }
};

// Get all bookings for a user
exports.getUserBookings = async (req, res) => {
  try {
    // Find all bookings for the authenticated user and populate trip details
    const bookings = await Booking.find({ user: req.user.id }).populate('trip');
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
};

// Cancel a booking
exports.cancelBooking = async (req, res) => {
  const { bookingId } = req.params;

  try {
    // Find the booking by ID
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Remove the booking
    await booking.remove();

    // Increase available slots for the trip
    const trip = await Trip.findById(booking.trip);
    if (trip) {
      trip.availableSlots += 1;
      await trip.save();
    }

    // Respond with a success message
    res.json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({ message: 'Error cancelling booking', error: error.message });
  }
};