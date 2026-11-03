import { Request, Response } from 'express';
import { carsStore, checkCarAvailability } from '../data/store';
import { Car } from '../../types';

export const getCars = async (req: Request, res: Response) => {
  try {
    const { category, search, minPrice, maxPrice, transmission, fuelType, seats, sortBy, status } = req.query;

    let results = [...carsStore];

    // Filter by status if specified
    if (status) {
      results = results.filter((c) => c.status.toLowerCase() === (status as string).toLowerCase());
    }

    // Filter by category
    if (category && category !== 'All') {
      results = results.filter((c) => c.category.toLowerCase() === (category as string).toLowerCase());
    }

    // Search query (make, model, or category)
    if (search) {
      const q = (search as string).toLowerCase().trim();
      results = results.filter(
        (c) =>
          c.make.toLowerCase().includes(q) ||
          c.model.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q) ||
          `${c.make} ${c.model}`.toLowerCase().includes(q)
      );
    }

    // Filter by Price
    if (minPrice) {
      results = results.filter((c) => c.pricePerDay >= Number(minPrice));
    }
    if (maxPrice) {
      results = results.filter((c) => c.pricePerDay <= Number(maxPrice));
    }

    // Filter by Transmission
    if (transmission && transmission !== 'ALL') {
      results = results.filter((c) => c.transmission === transmission);
    }

    // Filter by Fuel Type
    if (fuelType && fuelType !== 'ALL') {
      results = results.filter((c) => c.fuelType === fuelType);
    }

    // Filter by minimum seats
    if (seats && Number(seats) > 0) {
      results = results.filter((c) => c.seats >= Number(seats));
    }

    // Sorting
    if (sortBy === 'price-asc') {
      results.sort((a, b) => a.pricePerDay - b.pricePerDay);
    } else if (sortBy === 'price-desc') {
      results.sort((a, b) => b.pricePerDay - a.pricePerDay);
    } else if (sortBy === 'rating') {
      results.sort((a, b) => b.rating - a.rating);
    }

    return res.status(200).json({
      success: true,
      count: results.length,
      data: results
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to retrieve cars.' });
  }
};

export const getCarById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const car = carsStore.find((c) => c.id === id);

    if (!car) {
      return res.status(404).json({ success: false, message: 'Car not found.' });
    }

    return res.status(200).json({ success: true, data: car });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error retrieving car details.' });
  }
};

export const checkAvailability = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ success: false, message: 'Please provide both startDate and endDate.' });
    }

    const car = carsStore.find((c) => c.id === id);
    if (!car) {
      return res.status(404).json({ success: false, message: 'Car not found.' });
    }

    const isAvailable = checkCarAvailability(id, startDate as string, endDate as string);

    return res.status(200).json({
      success: true,
      carId: id,
      startDate,
      endDate,
      isAvailable,
      status: car.status
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to check availability.' });
  }
};

// Admin: Add new car
export const createCar = async (req: Request, res: Response) => {
  try {
    const carData: Partial<Car> = req.body;

    if (!carData.make || !carData.model || !carData.pricePerDay) {
      return res.status(400).json({ success: false, message: 'Make, model, and daily price are required.' });
    }

    const newCar: Car = {
      id: `car-${Date.now()}`,
      make: carData.make,
      model: carData.model,
      year: carData.year || 2024,
      category: carData.category || 'Luxury',
      pricePerDay: Number(carData.pricePerDay),
      status: carData.status || 'AVAILABLE',
      transmission: carData.transmission || 'AUTOMATIC',
      fuelType: carData.fuelType || 'PETROL',
      seats: carData.seats ? Number(carData.seats) : 5,
      horsepower: carData.horsepower ? Number(carData.horsepower) : 400,
      acceleration: carData.acceleration || '4.0s (0-60)',
      mileageLimit: carData.mileageLimit || 'Unlimited',
      rating: 5.0,
      reviewCount: 0,
      imageUrl: carData.imageUrl || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
      images: carData.images && carData.images.length > 0 ? carData.images : [carData.imageUrl || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80'],
      features: carData.features || ['Bluetooth', 'Backup Camera', 'Apple CarPlay'],
      description: carData.description || 'Premium luxury vehicle maintained in immaculate condition.',
      location: carData.location || 'Los Angeles, CA'
    };

    carsStore.unshift(newCar);

    return res.status(201).json({
      success: true,
      message: 'Car added to fleet successfully.',
      data: newCar
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to add car.' });
  }
};

// Admin: Update car
export const updateCar = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const index = carsStore.findIndex((c) => c.id === id);

    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Car not found.' });
    }

    carsStore[index] = {
      ...carsStore[index],
      ...req.body
    };

    return res.status(200).json({
      success: true,
      message: 'Vehicle updated successfully.',
      data: carsStore[index]
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to update vehicle.' });
  }
};

// Admin: Delete car
export const deleteCar = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const index = carsStore.findIndex((c) => c.id === id);

    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Car not found.' });
    }

    const removed = carsStore.splice(index, 1);

    return res.status(200).json({
      success: true,
      message: 'Car successfully removed from fleet.',
      data: removed[0]
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to remove vehicle.' });
  }
};

