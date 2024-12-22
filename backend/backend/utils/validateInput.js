exports.validateTripInput = (data) => {
    const { name, description, dates, price, availableSlots, cancellationPolicy } = data;
    if (!name || !description || !dates || !price || !availableSlots || !cancellationPolicy) {
      return { valid: false, message: 'All fields are required' };
    }
    return { valid: true };
  };