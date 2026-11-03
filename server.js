const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const crypto = require('crypto');

const PORT = process.env.PORT || 5000;

// ================= IN-MEMORY DATABASE =================
let FLEET = [
  {
    id: 'car-1',
    make: 'Porsche',
    model: '911 Carrera S',
    year: 2024,
    category: 'Sports',
    pricePerDay: 320,
    status: 'AVAILABLE',
    transmission: 'AUTOMATIC',
    fuelType: 'PETROL',
    seats: 4,
    horsepower: 443,
    acceleration: '3.5s (0-60)',
    mileageLimit: 'Unlimited',
    rating: 4.98,
    reviewCount: 42,
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80'
    ],
    features: ['Sport Chrono Package', 'Bose Surround Sound', 'Apple CarPlay', 'Active Suspension'],
    description: 'The definitive rear-engine sports car. Visceral response, precision steering, and timeless design.',
    location: 'Beverly Hills, CA'
  },
  {
    id: 'car-2',
    make: 'Tesla',
    model: 'Model S Plaid',
    year: 2024,
    category: 'Electric',
    pricePerDay: 240,
    status: 'AVAILABLE',
    transmission: 'AUTOMATIC',
    fuelType: 'ELECTRIC',
    seats: 5,
    horsepower: 1020,
    acceleration: '1.99s (0-60)',
    mileageLimit: 'Unlimited',
    rating: 4.95,
    reviewCount: 68,
    imageUrl: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=80'
    ],
    features: ['Tri-Motor AWD', '396 Mile Range', 'Full Self-Driving Capable', 'Gaming Computer In-Dash'],
    description: 'Silent hypercar acceleration combined with executive five-passenger luxury.',
    location: 'San Francisco, CA'
  },
  {
    id: 'car-3',
    make: 'Mercedes-Benz',
    model: 'G 63 AMG',
    year: 2024,
    category: 'SUV',
    pricePerDay: 390,
    status: 'AVAILABLE',
    transmission: 'AUTOMATIC',
    fuelType: 'PETROL',
    seats: 5,
    horsepower: 577,
    acceleration: '4.5s (0-60)',
    mileageLimit: 'Unlimited',
    rating: 4.96,
    reviewCount: 37,
    imageUrl: 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&w=1200&q=80',
    images: ['https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&w=1200&q=80'],
    features: ['Handcrafted Biturbo V8', 'Burmester 3D Sound', 'Triple Differential Locks', 'Nappa Leather'],
    description: 'Commanding road presence with handcrafted AMG biturbo thunder and peerless capability.',
    location: 'Miami, FL'
  },
  {
    id: 'car-4',
    make: 'BMW',
    model: 'M8 Competition',
    year: 2024,
    category: 'Luxury',
    pricePerDay: 285,
    status: 'AVAILABLE',
    transmission: 'AUTOMATIC',
    fuelType: 'PETROL',
    seats: 5,
    horsepower: 617,
    acceleration: '3.0s (0-60)',
    mileageLimit: 'Unlimited',
    rating: 4.92,
    reviewCount: 29,
    imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80',
    images: ['https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80'],
    features: ['M xDrive AWD', 'Carbon Ceramic Brakes', 'Bowers & Wilkins Audio', 'Laserlight Headlamps'],
    description: 'Motorsport performance in an executive grand tourer.',
    location: 'New York, NY'
  },
  {
    id: 'car-5',
    make: 'Audi',
    model: 'RS e-tron GT',
    year: 2024,
    category: 'Electric',
    pricePerDay: 260,
    status: 'AVAILABLE',
    transmission: 'AUTOMATIC',
    fuelType: 'ELECTRIC',
    seats: 4,
    horsepower: 637,
    acceleration: '3.1s (0-60)',
    mileageLimit: 'Unlimited',
    rating: 4.89,
    reviewCount: 23,
    imageUrl: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&w=1200&q=80',
    images: ['https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&w=1200&q=80'],
    features: ['800V Ultra-Fast Charging', 'All-Wheel Steering', 'Matrix LED Headlights'],
    description: 'Sculpted electric grand tourer with electric Quattro precision.',
    location: 'Las Vegas, NV'
  },
  {
    id: 'car-6',
    make: 'Range Rover',
    model: 'Autobiography LWB',
    year: 2024,
    category: 'Luxury',
    pricePerDay: 350,
    status: 'AVAILABLE',
    transmission: 'AUTOMATIC',
    fuelType: 'HYBRID',
    seats: 5,
    horsepower: 523,
    acceleration: '4.4s (0-60)',
    mileageLimit: 'Unlimited',
    rating: 4.94,
    reviewCount: 31,
    imageUrl: 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&w=1200&q=80',
    images: ['https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&w=1200&q=80'],
    features: ['Executive Class Rear Seating', 'Active Noise Cancellation', 'Air Suspension'],
    description: 'The pinnacle of luxury SUV refinement and serene comfort.',
    location: 'Beverly Hills, CA'
  },
  {
    id: 'car-7',
    make: 'Chevrolet',
    model: 'Corvette Z06',
    year: 2024,
    category: 'Sports',
    pricePerDay: 275,
    status: 'AVAILABLE',
    transmission: 'AUTOMATIC',
    fuelType: 'PETROL',
    seats: 2,
    horsepower: 670,
    acceleration: '2.6s (0-60)',
    mileageLimit: 'Unlimited',
    rating: 4.97,
    reviewCount: 45,
    imageUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80',
    images: ['https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80'],
    features: ['Flat-Plane Crank 5.5L V8', '8,600 RPM Redline', 'Magnetic Ride Control'],
    description: 'Naturally aspirated supercar soundtrack and track-honed agility.',
    location: 'Miami, FL'
  },
  {
    id: 'car-8',
    make: 'Mercedes-Benz',
    model: 'S 580 4MATIC',
    year: 2024,
    category: 'Sedan',
    pricePerDay: 230,
    status: 'AVAILABLE',
    transmission: 'AUTOMATIC',
    fuelType: 'HYBRID',
    seats: 5,
    horsepower: 496,
    acceleration: '4.4s (0-60)',
    mileageLimit: 'Unlimited',
    rating: 4.91,
    reviewCount: 27,
    imageUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80',
    images: ['https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80'],
    features: ['Augmented Reality HUD', 'Massage Seats', 'Burmester 4D Audio'],
    description: 'First-class luxury sedan with whispered quiet and peerless tech.',
    location: 'San Francisco, CA'
  }
];

let BOOKINGS = [
  {
    id: 'b-101',
    bookingNumber: 'VD-9102-K',
    userId: 'user-customer',
    userName: 'Alex Rivera',
    userEmail: 'customer@velocitydrive.com',
    carId: 'car-1',
    carName: 'Porsche 911 Carrera S',
    carImg: FLEET[0].imageUrl,
    startDate: '2026-11-05',
    endDate: '2026-11-08',
    totalDays: 3,
    totalAmount: 1164.9,
    status: 'CONFIRMED',
    pickupLocation: 'Beverly Hills Showroom',
    transactionId: 'TXN-984210398',
    paymentMethod: 'Visa ending in 4242',
    createdAt: new Date().toISOString()
  },
  {
    id: 'b-102',
    bookingNumber: 'VD-4821-M',
    userId: 'user-customer',
    userName: 'Alex Rivera',
    userEmail: 'customer@velocitydrive.com',
    carId: 'car-2',
    carName: 'Tesla Model S Plaid',
    carImg: FLEET[1].imageUrl,
    startDate: '2026-10-20',
    endDate: '2026-10-23',
    totalDays: 3,
    totalAmount: 851.4,
    status: 'COMPLETED',
    pickupLocation: 'San Francisco Airport Hub',
    transactionId: 'TXN-741982301',
    paymentMethod: 'Mastercard ending in 8819',
    createdAt: new Date(Date.now() - 86400000 * 14).toISOString()
  }
];

// Helper to read JSON request body
function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

// Helper to send JSON responses
function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.end(JSON.stringify(data));
}

// Server Request Handler
const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // Handle CORS Preflight
  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    res.end();
    return;
  }

  console.log(`[${new Date().toLocaleTimeString()}] ${method} ${pathname}`);

  // ================= API ROUTES =================
  if (pathname.startsWith('/api/')) {
    
    // 1. Health check
    if (pathname === '/api/health') {
      return sendJson(res, 200, {
        status: 'online',
        uptime: process.uptime(),
        platform: 'VelocityDrive Full-Stack Server',
        version: '1.0.0',
        timestamp: new Date().toISOString()
      });
    }

    // 2. GET /api/cars
    if (pathname === '/api/cars' && method === 'GET') {
      const { category, search, maxPrice } = parsedUrl.query;
      let results = [...FLEET];
      if (category && category !== 'All') {
        results = results.filter(c => c.category.toLowerCase() === category.toLowerCase());
      }
      if (search) {
        const q = search.toLowerCase();
        results = results.filter(c => c.make.toLowerCase().includes(q) || c.model.toLowerCase().includes(q));
      }
      if (maxPrice) {
        results = results.filter(c => c.pricePerDay <= Number(maxPrice));
      }
      return sendJson(res, 200, { success: true, count: results.length, data: results });
    }

    // 3. POST /api/cars (Admin Add Car)
    if (pathname === '/api/cars' && method === 'POST') {
      try {
        const body = await parseJsonBody(req);
        const newCar = {
          id: 'car-' + Date.now(),
          make: body.make || 'Custom',
          model: body.model || 'GT',
          year: body.year || 2024,
          category: body.category || 'Sports',
          pricePerDay: Number(body.pricePerDay) || 300,
          status: 'AVAILABLE',
          transmission: body.transmission || 'AUTOMATIC',
          fuelType: body.fuelType || 'PETROL',
          seats: Number(body.seats) || 4,
          horsepower: Number(body.horsepower) || 450,
          acceleration: body.acceleration || '3.5s (0-60)',
          mileageLimit: 'Unlimited',
          rating: 5.0,
          reviewCount: 0,
          imageUrl: body.imageUrl || FLEET[0].imageUrl,
          images: [body.imageUrl || FLEET[0].imageUrl],
          features: body.features || ['Apple CarPlay', 'Leather Interior'],
          description: body.description || 'Pristine vehicle added to fleet.',
          location: body.location || 'Beverly Hills, CA'
        };
        FLEET.unshift(newCar);
        return sendJson(res, 201, { success: true, message: 'Vehicle added to fleet', data: newCar });
      } catch (err) {
        return sendJson(res, 400, { success: false, message: 'Invalid payload' });
      }
    }

    // 4. PATCH /api/cars/:id/status (Admin Update Status)
    if (pathname.startsWith('/api/cars/') && pathname.endsWith('/status') && method === 'PATCH') {
      const parts = pathname.split('/');
      const carId = parts[3];
      const body = await parseJsonBody(req);
      const car = FLEET.find(c => c.id === carId);
      if (!car) return sendJson(res, 404, { success: false, message: 'Car not found' });
      car.status = body.status || 'AVAILABLE';
      return sendJson(res, 200, { success: true, data: car });
    }

    // 5. DELETE /api/cars/:id (Admin Remove Car)
    if (pathname.startsWith('/api/cars/') && method === 'DELETE') {
      const carId = pathname.split('/')[3];
      const idx = FLEET.findIndex(c => c.id === carId);
      if (idx === -1) return sendJson(res, 404, { success: false, message: 'Car not found' });
      const removed = FLEET.splice(idx, 1)[0];
      return sendJson(res, 200, { success: true, message: 'Vehicle removed', data: removed });
    }

    // 6. POST /api/payments/charge (Payment Gateway Integration)
    if (pathname === '/api/payments/charge' && method === 'POST') {
      try {
        const body = await parseJsonBody(req);
        const { amount, cardNumber, cardholderName } = body;
        
        // Generate simulated bank transaction ID
        const txnId = 'TXN-' + Math.floor(100000000 + Math.random() * 900000000);
        const last4 = (cardNumber && cardNumber.length >= 4) ? cardNumber.slice(-4) : '4242';

        console.log(`[PAYMENT GATEWAY] Authorized $${amount} on Card **** ${last4} for ${cardholderName || 'Customer'} (Txn: ${txnId})`);

        return sendJson(res, 200, {
          success: true,
          status: 'PAID',
          transactionId: txnId,
          amountPaid: Number(amount),
          paymentMethod: `Card ending in ${last4}`,
          gatewayTimestamp: new Date().toISOString()
        });
      } catch (err) {
        return sendJson(res, 400, { success: false, message: 'Payment authorization failed' });
      }
    }

    // 7. POST /api/bookings (Create & Confirm Reservation)
    if (pathname === '/api/bookings' && method === 'POST') {
      try {
        const body = await parseJsonBody(req);
        const { carId, startDate, endDate, pickupLocation, totalAmount, paymentDetails } = body;
        
        const car = FLEET.find(c => c.id === carId);
        if (!car) return sendJson(res, 404, { success: false, message: 'Selected car not found' });

        const bookingRef = 'VD-' + Math.floor(1000 + Math.random() * 9000) + '-' + String.fromCharCode(65 + Math.floor(Math.random() * 26));
        const txnId = paymentDetails?.transactionId || ('TXN-' + Math.floor(100000000 + Math.random() * 900000000));
        const payMethod = paymentDetails?.paymentMethod || 'Visa ending in 4242';

        const newBooking = {
          id: 'b-' + Date.now(),
          bookingNumber: bookingRef,
          userId: 'user-customer',
          userName: body.userName || 'Alex Rivera',
          userEmail: body.userEmail || 'customer@velocitydrive.com',
          carId: car.id,
          carName: `${car.make} ${car.model}`,
          carImg: car.imageUrl,
          startDate: startDate || new Date().toISOString().split('T')[0],
          endDate: endDate || new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
          totalDays: body.totalDays || 3,
          totalAmount: Number(totalAmount) || car.pricePerDay * 3,
          status: 'CONFIRMED',
          pickupLocation: pickupLocation || car.location,
          transactionId: txnId,
          paymentMethod: payMethod,
          createdAt: new Date().toISOString()
        };

        BOOKINGS.unshift(newBooking);
        console.log(`[BOOKING ENGINE] Confirmed reservation ${bookingRef} for ${newBooking.carName} ($${newBooking.totalAmount})`);

        return sendJson(res, 201, {
          success: true,
          message: 'Booking confirmed and payment authorized',
          data: newBooking
        });
      } catch (err) {
        return sendJson(res, 400, { success: false, message: 'Failed to create booking' });
      }
    }

    // 8. GET /api/bookings/my
    if (pathname === '/api/bookings/my' && method === 'GET') {
      return sendJson(res, 200, { success: true, count: BOOKINGS.length, data: BOOKINGS });
    }

    // 9. GET /api/bookings/all (Admin KPI)
    if (pathname === '/api/bookings/all' && method === 'GET') {
      const totalRev = BOOKINGS.filter(b => b.status !== 'CANCELLED').reduce((s, b) => s + b.totalAmount, 0);
      const activeCount = BOOKINGS.filter(b => b.status === 'CONFIRMED').length;
      return sendJson(res, 200, {
        success: true,
        stats: {
          totalRevenue: Number(totalRev.toFixed(2)),
          totalCars: FLEET.length,
          activeRentals: activeCount,
          totalBookings: BOOKINGS.length,
          fleetUtilization: Math.round((activeCount / Math.max(1, FLEET.length)) * 100)
        },
        data: BOOKINGS
      });
    }

    // 10. PATCH /api/bookings/:id/cancel
    if (pathname.startsWith('/api/bookings/') && pathname.endsWith('/cancel') && method === 'PATCH') {
      const bookingId = pathname.split('/')[3];
      const b = BOOKINGS.find(x => x.id === bookingId);
      if (!b) return sendJson(res, 404, { success: false, message: 'Booking not found' });
      b.status = 'CANCELLED';
      return sendJson(res, 200, { success: true, message: 'Booking cancelled', data: b });
    }

    // 11. POST /api/auth/login
    if (pathname === '/api/auth/login' && method === 'POST') {
      const body = await parseJsonBody(req);
      const email = body.email || 'customer@velocitydrive.com';
      const isAdmin = email.toLowerCase().includes('admin');
      const user = {
        id: isAdmin ? 'user-admin' : 'user-customer',
        email,
        name: isAdmin ? 'David Makinde (Admin)' : 'Alex Rivera',
        role: isAdmin ? 'ADMIN' : 'CUSTOMER'
      };
      const token = 'jwt-session-token-' + crypto.randomBytes(16).toString('hex');
      return sendJson(res, 200, { success: true, token, user });
    }

    return sendJson(res, 404, { success: false, message: 'API route not found' });
  }

  // ================= STATIC WEB ASSETS =================
  let filePath = path.join(__dirname, pathname === '/' ? 'index.html' : pathname);
  
  if (!fs.existsSync(filePath)) {
    filePath = path.join(__dirname, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml'
  };

  const contentType = mimeTypes[ext] || 'text/html';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end('Server Error loading asset');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚗 VelocityDrive Full-Stack Server LIVE on: http://localhost:${PORT}`);
  console.log(`📡 API Endpoints: http://localhost:${PORT}/api/cars, /api/bookings, /api/payments`);
  console.log(`💳 Payment Gateway: Active (Simulated Visa/Mastercard)`);
  console.log(`=======================================================`);
});

