# 🚗 VelocityDrive — Modern Car Rental Platform

A full-stack car rental platform with **Next.js**, **TypeScript**, **Tailwind CSS**, **Node.js/Express**, **Prisma ORM**, **PostgreSQL**, and **JWT Authentication**.

---

## 🌟 Features Implemented

1. **🏎️ Car Listings & Smart Multi-Filter**:
   - Filter by Category: *Sports, Luxury, Electric (EV), SUV, Sedan*.
   - Filter by Price Range slider ($100 – $500/day).
   - Transmission toggle (*Automatic vs. Manual*).
   - Fuel Type selector (*Electric, Hybrid, Petrol*).
   - Live Search bar (by Make, Model, or Keyword).
   - Real-time Sorting (*Recommended, Price: Low to High, Price: High to Low, Highest Rated*).

2. **🔍 Interactive Car Details View**:
   - Multi-photo gallery with thumbnail switcher.
   - Comprehensive performance telemetry: Horsepower (HP), 0-60 MPH acceleration time, transmission, passenger capacity.
   - Included technology & amenities checklist.
   - Transparent daily pricing and instant booking trigger.

3. **🔐 User Registration & Login (JWT Authentication)**:
   - Full JWT token generation and authentication middleware.
   - Role-Based Access Control (**CUSTOMER** vs. **ADMIN**).
   - 1-Click Instant Demo Role Switcher in the top navigation bar.

4. **📅 Live Booking & Reservation Engine**:
   - Pick-up and return date pickers with automatic duration calculation.
   - Multiple hub locations (Beverly Hills, San Francisco SFO, Miami, Manhattan).
   - Protection plan selector (*Basic, Standard +$18/day, Premium Zero-Excess +$32/day*).
   - Optional add-ons (*Additional Driver, Child Safety Seat, Full GPS* at $15/day).
   - Live transparent price breakdown (Base rate, protection, extras, 10% tax, and total due).
   - Instant confirmation with verifiable booking reference (e.g. `VD-8392-M`).

5. **⚡ Availability Collision Checking**:
   - Validates requested rental dates against active/confirmed bookings to prevent double-booking.

6. **👤 Customer Dashboard ("My Bookings")**:
   - Tabbed filtering: *All, Confirmed, Completed, Cancelled*.
   - View vehicle thumbnails, dates, pickup location, total charged, and booking reference.
   - 1-click **Cancel Reservation** button.

7. **🛡️ Admin Command Center ("Admin Dashboard")**:
   - Executive KPIs: Total Revenue ($), Fleet Utilization Rate (%), Total Vehicles, Active Bookings.
   - **Fleet Management**: Add new vehicle modal, delete vehicle, live status dropdowns (*AVAILABLE, RENTED, MAINTENANCE*).
   - **Reservations Management**: Review all customer bookings, mark completed, or cancel.

---

## 📂 Project Directory Structure

```
classwork.com/
├── app/
│   ├── globals.css              # Custom styling, dark palette & scrollbars
│   ├── layout.tsx               # Root layout & SEO metadata
│   └── page.tsx                 # Main Next.js App Router full-stack component
├── components/
│   ├── Navbar.tsx               # Header with demo role switcher & profile
│   ├── Hero.tsx                 # Hero section with quick booking search widget
│   ├── CarFilters.tsx           # Multi-criteria filter & sort bar
│   ├── CarCard.tsx              # Vehicle card with specs & instant book
│   ├── CarDetailsModal.tsx      # Multi-image gallery & detailed telemetry
│   ├── BookingModal.tsx         # Date selector, add-ons & price calculator
│   ├── UserDashboard.tsx        # Customer reservation history & cancellations
│   ├── AdminDashboard.tsx       # KPI revenue metrics, fleet & booking control
│   ├── AuthModal.tsx            # JWT login / registration modal
│   ├── WhyChooseUs.tsx          # Key selling points
│   └── Footer.tsx               # Footer with hubs & 24/7 concierge contact
├── server/
│   ├── controllers/             # Express controllers (auth, cars, bookings)
│   ├── middleware/              # JWT verification & Admin RBAC guard
│   ├── routes/                  # Express API routes (/api/auth, /api/cars, /api/bookings)
│   ├── data/store.ts            # Data store & availability collision engine
│   └── index.ts                 # Express server entry point
├── prisma/
│   └── schema.prisma            # PostgreSQL schema with User, Car, and Booking models
├── lib/
│   ├── api.ts                   # Resilient frontend API client with JWT support
│   └── utils.ts                 # Formatting & class merging utilities
├── data/
│   └── cars.ts                  # High-resolution seed vehicle catalog
├── types/
│   └── index.ts                 # TypeScript interfaces & types
├── index.html                   # Zero-setup immediate live browser preview
├── package.json                 # Next.js, Express, Prisma, Tailwind dependencies
└── tsconfig.json                # TypeScript configuration
```

---

## 🚀 How to Run & View Live

### Option A: Instant Live View (Zero Installation Required)
Since you already have `index.html` in your project folder:
* Simply **double-click [`index.html`](file:///c:/Users/DELL/Downloads/classwork.com/classwork.com/index.html)** in Windows File Explorer, or
* Right-click [`index.html`](file:///c:/Users/DELL/Downloads/classwork.com/classwork.com/index.html) in your editor and choose **Open with Default Browser** / **Open with Live Server**.

Everything (filters, booking engine, price calculator, customer dashboard, admin command center, role switching) is 100% interactive out of the box!

---

### Option B: Run Full Next.js & Express Stack with Node.js

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the Express API server**:
   ```bash
   npm run server:dev
   ```
   *Runs on `http://localhost:5000` with `/api/auth`, `/api/cars`, and `/api/bookings`.*

3. **Start the Next.js frontend**:
   ```bash
   npm run dev
   ```
   *Opens on `http://localhost:3000`.*

4. **Connect to PostgreSQL via Prisma (When ready)**:
   * Set your `DATABASE_URL` in `.env`.
   * Push schema to database:
     ```bash
     npx prisma db push
     ```

