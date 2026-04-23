# Backend - Student Authentication System

## Overview

This is the backend API for the Student Authentication System, built with Node.js, Express, and MongoDB.

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
MONGODB_URI=mongodb://localhost:27017/student-auth
JWT_SECRET=your_jwt_secret_key_here_change_in_production
PORT=5000
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Start production server:
```bash
npm start
```

## API Endpoints

### Authentication

- `POST /api/register` - Register a new student
  - Body: `{ name, email, password, course }`
  - Response: `{ message, student }`

- `POST /api/login` - Login student
  - Body: `{ email, password }`
  - Response: `{ message, token, student }`

- `GET /api/student` - Get student details (protected)
  - Headers: `Authorization: Bearer <token>`
  - Response: Student object

- `PUT /api/update-password` - Update password (protected)
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ oldPassword, newPassword }`
  - Response: `{ message }`

- `PUT /api/update-course` - Update course (protected)
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ course }`
  - Response: `{ message, course }`

## Deployment on Render

1. Connect your GitHub repository to Render
2. Set environment variables in Render dashboard
3. Deploy with the following settings:
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Node Version: 18.x

## Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Request validation
- CORS configuration
- Error handling
