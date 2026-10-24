# iMovies - Movie Ticket Booking Made Simple

A full-stack, responsive, production-ready Movie Ticket Booking Web Application built with the **MERN** stack (MongoDB, Express.js, React.js, Node.js), featuring real-time WebSocket seat availability, 10-minute TTL temporary seat locking, printable QR digital passes, and automated cron utilities.

---

## Key Architecture & Features

### 1. Frontend (React 18 + Vite)
- **Code Splitting & Lazy Loading**: All pages are code-split using `React.lazy` and `Suspense` for blazing fast initial loads.
- **Cinematic Dark UI**: Tailored cinema palette with rich backdrop posters, custom scrollbars, and fluid responsive design.
- **Real-Time Seat Picker (`/seatslug/:showId`)**:
  - Interactive grid categorized into **Balcony (VIP)**, **Middle (Premium)**, and **Lower (Standard)** tiers.
  - Live WebSocket synchronization using **Socket.io** across connected browsers.
  - 10-minute temporary seat locking countdown with live TTL progress alerts.
- **Digital E-Tickets**: Printable passes complete with scannable QR codes, seat breakdowns, barcode styling, and instant PDF/Print support.
- **Full User Flow**:
  - Landing Hero with trailer preview & platform metrics.
  - Movie browsing with real-time text search and genre/language filter pills.
  - Movie details with YouTube trailer modal, cast list, and audience reviews.
  - Showtime selection grouped by theater location and interactive date selector (`dayjs`).
  - Secure payment modal simulating Credit/Debit Cards, UPI VPAs, and Net Banking with celebration confetti.
  - Personal Watchlist and Booking History with one-click cancellation.
- **Admin Management Portal (`/admin`)**:
  - Executive overview metrics: Total Revenue, Total Bookings, Movies, Theatres, Occupancy.
  - Movie Listing Creator (`/addmovie`).
  - Cinema Theatre Registrar with row tier pricing (`/addtheatre`).
  - Showtime Scheduler linking movies, theatres, dates, and times (`/addshow`).
  - Sub-Admin Access Delegator (`/addadmin`).
  - Platform Reservation Audit & Moderation (`/adminbookings`).

### 2. Backend (Node.js + Express.js)
- **MVC Architecture**: Modular separation into Models, Views/Routes, Controllers, and Middleware.
- **JWT & Bcrypt Security**: Multi-tier authentication distinguishing standard users from administrative staff.
- **Temporary Seat Locking & Cleanup**:
  - Seats locked with a 10-minute TTL timestamp.
  - `node-cron` automated cleanup task running every 30 seconds to release abandoned or expired locks.
- **Automated Show Reminders**:
  - `node-cron` task checking upcoming showtimes and dispatching email reminders via `nodemailer`.
- **WebSocket Gateway**:
  - Socket.io rooms dedicated to individual shows (`show_<showId>`) for broadcasting instant seat lock/booking/release events.

---

## Project Directory Layout

```
iMovies/
├── client/                     # Frontend (React + Vite + Tailwind CSS)
│   ├── src/
│   │   ├── components/         # Header, Footer, Loader, Protection, DigitalTicketModal, PaymentModal
│   │   ├── context/            # AuthContext, SocketContext
│   │   ├── hooks/              # useFetch custom hook
│   │   ├── pages/              # Landing, Home, MovieDetails, MovieShows, SeatMap, Bookings, Watchlist, Profile, Admin
│   │   ├── utils/              # Axios API instance with automatic JWT interceptors
│   │   ├── App.jsx             # React Router DOM configuration with Suspense & Lazy loading
│   │   └── main.jsx
│   └── package.json
└── server/                     # Backend (Node.js + Express.js REST API)
    ├── controllers/            # Auth, Movie, Theatre, Show, Booking, Favorite, Review controllers
    ├── middlewares/            # fetchUser.js (JWT validation & role enforcement)
    ├── models/                 # userModel, adminModel, movieModel, theatreModel, showModel, bookingModel, favoriteModel, reviewModel
    ├── routes/                 # Express REST API routes mounted under /api
    ├── utils/                  # reminderService.js, cleanupService.js, mailer.js, seedData.js
    ├── server.js               # Entry point with HTTP + Socket.io server
    └── .env                    # MONGO_URI, PORT, JWT_SECRET
```

---

## Default Credentials (Pre-Seeded)

| Role | Email | Password | Access Level |
|---|---|---|---|
| **Movie Fan (User)** | `example.com` | `example` | Browsing, Booking, Watchlist, Reviews, Tickets |
| **Administrator** | `example.com` | `example` | Full Dashboard, Analytics, Movie/Theatre/Show CRUD, Moderation |


---

## How to Run Locally

### 1. Start MongoDB
Ensure MongoDB is running locally on `mongodb://127.0.0.1:27017` or update `server/.env` with your MongoDB connection string.

### 2. Start Backend Server
```bash
cd server
npm install
npm run seed     # Seeds blockbusters, theatres, shows, and demo accounts
npm start        # Runs on http://localhost:5000
```

### 3. Start Frontend Client
```bash
cd client
npm install
npm run dev      # Runs on http://localhost:5173
```

---

## Key REST API Endpoints

- **Auth**: `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/admin/login`, `GET /api/auth/me`, `GET /api/auth/admin/stats`
- **Movies**: `GET /api/movie`, `GET /api/movie/:movieId`, `POST /api/movie`, `PUT /api/movie/:movieId`, `DELETE /api/movie/:movieId`
- **Theatres**: `GET /api/theatre`, `GET /api/theatre/:theatreId`, `POST /api/theatre`
- **Shows**: `GET /api/shows`, `GET /api/shows/movie/:movieId`, `GET /api/shows/:showId`, `POST /api/shows`
- **Bookings**: `POST /api/bookings/lock`, `POST /api/bookings/unlock`, `POST /api/bookings/confirm`, `GET /api/bookings/my-bookings`, `POST /api/bookings/cancel/:bookingId`
- **Watchlist**: `GET /api/favorite`, `POST /api/favorite`, `DELETE /api/favorite/:movieId`
- **Reviews**: `GET /api/review/movie/:movieId`, `POST /api/review`
