# ApplyMate

ApplyMate is a job application tracker built with React. It helps users save job applications, track their current status, search through saved roles, and view a quick dashboard summary of their progress.

The main focus of this project is the frontend experience: clean React components, protected app screens, reusable UI pieces, form handling, filtering, dashboard stats, loading states, and responsive layout. I also built a simple backend to support authentication and persistent job data while learning basic backend development.

## Features

- User signup and login
- Protected routes for authenticated users
- Dashboard with total applications and status-based stats
- Add new job applications
- Edit existing applications in a modal
- Delete applications with a confirmation dialog
- Search applications by company name
- Filter applications by status
- Recent applications section on the dashboard
- Toast notifications for success and error feedback
- Loading skeletons while job data is being fetched
- Empty states for new users and filtered searches
- Responsive navigation with top navbar and mobile-friendly bottom navigation
- Clean, consistent form styling and validation feedback

## Frontend Highlights

This project was designed mainly as a frontend portfolio project. The React side includes:

- Component-based UI structure
- React Router routing and protected pages
- Context API for auth, jobs, and toast state
- Reducer-based job state management
- Reusable UI components like `JobCard`, `RecentJobCard`, `ModalEdit`, `ConfirmDialog`, `Navbar`, `BottomBar`, and `Filters`
- Form state management for login, signup, adding jobs, and editing jobs
- User-friendly loading, empty, success, and error states
- Responsive layout using Tailwind CSS
- Icon-based navigation using React Icons

## Backend

The backend is a basic Express and MongoDB API that I implemented while learning backend development. I used AI assistance to understand and build parts of the backend, especially around authentication, route protection, and improving security checks.

Backend features include:

- Express API server
- MongoDB connection with Mongoose
- User registration and login
- Password hashing with bcrypt
- JWT-based authentication
- Protected job routes
- User-specific job create, read, update, and delete operations
- Basic validation and ownership checks

The backend is intentionally simple because the main goal of this project is to showcase frontend and React skills.

## Tech Stack

Frontend:

- React
- React Router
- Context API
- Tailwind CSS
- React Icons
- Vite

Backend:

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcryptjs

## Project Structure

```txt
apply-mate/
  backend/
    config/
    controllers/
    middleware/
    models/
    routes/
    app.js
    server.js
  frontend/
    public/
    src/
      components/
      context/
      hooks/
      pages/
      provider/
      reducers/
      utils/
```

## Environment Variables

Backend `.env`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=your_frontend_url
```

Frontend `.env`:

```env
VITE_API_URL=your_backend_url
```

For local development, the frontend falls back to `http://localhost:5000` if `VITE_API_URL` is not set.

## Running Locally

Install backend dependencies:

```bash
cd backend
npm install
npm start
```

Install frontend dependencies:

```bash
cd frontend
npm install
npm run dev
```

## Current Status

The app includes the main features needed for a job tracking workflow. The frontend is the strongest part of the project and is the main area I focused on while building ApplyMate.

Future improvements could include better profile settings, password reset, richer analytics, deadline reminders, and more detailed job notes.
