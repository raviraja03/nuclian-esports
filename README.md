# Nuclian Esports MERN Stack Application

A modern full-stack MERN (MongoDB, Express, React, Node.js) application with user management functionality, built using ES Modules and modern best practices.

## Features

- Modern ES Modules syntax throughout the application
- User management (CRUD operations)
- Responsive design with Tailwind CSS
- RESTful API with Express
- MongoDB database with Mongoose
- Clean and intuitive user interface

## Tech Stack

### Backend
- Node.js with Express (ES Modules)
- MongoDB with Mongoose
- CORS enabled
- Environment variables with dotenv
- Error handling middleware

### Frontend
- React.js
- Tailwind CSS with PostCSS
- React Router for navigation
- Axios for API calls
- Modern UI components

## Project Structure

```
nuclian-esports/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   ├── App.jsx       # Main App component
│   │   └── index.js      # Entry point
│   ├── tailwind.config.js # Tailwind CSS configuration
│   └── package.json      # Frontend dependencies
└── server/               # Backend server
    ├── src/
    │   ├── models/      # Database models
    │   ├── routes/      # API routes
    │   ├── middleware/  # Custom middleware
    │   └── index.js     # Server entry point
    └── package.json     # Backend dependencies
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a .env file in the server directory:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/nuclian_esports
   NODE_ENV=development
   ```

4. Start the backend server:
   ```bash
   # Development mode with nodemon
   npm run dev

   # Production mode
   npm start
   ```

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm start
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Endpoints

### Users

- GET `/api/users` - Get all users
- GET `/api/users/:id` - Get a specific user
- POST `/api/users` - Create a new user
- PUT `/api/users/:id` - Update a user
- DELETE `/api/users/:id` - Delete a user

## Future Enhancements

1. Authentication & Authorization
   - JWT-based authentication
   - User roles and permissions
   - Protected routes

2. Infrastructure
   - Docker containerization
   - CI/CD pipeline
   - Production deployment guide

3. Features
   - Redux for state management
   - Real-time updates with WebSocket
   - Advanced user profiles
   - Image upload support
   - Email notifications

4. Testing
   - Unit tests with Jest
   - Integration tests
   - E2E tests with Cypress

5. Performance
   - Redis caching
   - API rate limiting
   - Performance monitoring

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License.
