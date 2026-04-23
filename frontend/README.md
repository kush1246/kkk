# Frontend - Student Authentication System

## Overview

This is the React frontend for the Student Authentication System, featuring a modern, responsive UI with Bootstrap styling.

## Features

- Student Registration Form
- Student Login Form
- Protected Dashboard
- Password Update Functionality
- Course Update Functionality
- Secure Logout
- Error Handling
- Loading States
- Responsive Design

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm start
```

3. Build for production:
```bash
npm run build
```

## Configuration

Update the API base URL in `src/services/authService.js`:

```javascript
const API_BASE_URL = 'http://localhost:5000/api'; // Development
// const API_BASE_URL = 'https://your-backend-url.onrender.com/api'; // Production
```

## Components

### Auth Components
- `Login.js` - Student login form with validation
- `Register.js` - Student registration form with validation
- `Dashboard.js` - Protected dashboard with student details and update forms

### Utility Components
- `PrivateRoute.js` - Route protection wrapper
- `AuthContext.js` - Authentication state management

### Services
- `authService.js` - API service with Axios for backend communication

## Deployment on Vercel

1. Connect your GitHub repository to Vercel
2. Set the following configuration:
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Environment Variables: `REACT_APP_API_URL` (optional)

3. Vercel will automatically deploy your frontend

## Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Styling

The application uses Bootstrap 5 for styling with custom CSS in `src/index.css`:
- Custom color schemes
- Responsive design
- Modern card layouts
- Gradient buttons
- Form styling
- Loading states

## State Management

The application uses React Context API for authentication state management:
- `AuthContext` provides authentication state and methods
- Token storage in localStorage
- Automatic token refresh and validation
- Protected route implementation

## Error Handling

Comprehensive error handling for:
- Network errors
- Authentication failures
- Form validation errors
- Server response errors
- Unauthorized access attempts
