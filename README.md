# Student Authentication System - MERN Stack

A complete student login and registration system built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- **Student Registration**: Create new student accounts with name, email, password, and course
- **Student Login**: Secure authentication with JWT tokens
- **Protected Dashboard**: Access student details and update information
- **Password Update**: Change password with old password verification
- **Course Update**: Modify enrolled course
- **Secure Logout**: Clear tokens and redirect to login
- **Error Handling**: Comprehensive error messages for all scenarios
- **Responsive Design**: Modern UI with Bootstrap styling

## Project Structure

```
mse/
├── backend/
│   ├── models/
│   │   └── Student.js          # MongoDB Student model
│   ├── routes/
│   │   └── auth.js             # Authentication routes
│   ├── .env                    # Environment variables
│   ├── package.json            # Backend dependencies
│   └── server.js               # Express server setup
├── frontend/
│   ├── public/
│   │   └── index.html          # HTML template
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.js    # Dashboard component
│   │   │   ├── Login.js        # Login form
│   │   │   ├── PrivateRoute.js # Route protection
│   │   │   └── Register.js     # Registration form
│   │   ├── contexts/
│   │   │   └── AuthContext.js  # Authentication context
│   │   ├── services/
│   │   │   └── authService.js  # API service with Axios
│   │   ├── App.js              # Main App component
│   │   ├── index.css           # Custom styles
│   │   └── index.js            # React entry point
│   └── package.json            # Frontend dependencies
└── README.md                   # This file
```

## Technology Stack

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT authentication
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variable management

### Frontend
- **React**: UI library
- **React Router**: Client-side routing
- **Axios**: HTTP client
- **Bootstrap**: CSS framework
- **Context API**: State management

## API Endpoints

### Authentication Routes
- `POST /api/register` - Register new student
- `POST /api/login` - Login student and return JWT token
- `GET /api/student` - Get student details (protected)
- `PUT /api/update-password` - Update password (protected)
- `PUT /api/update-course` - Update course (protected)

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with:
```env
MONGODB_URI=mongodb://localhost:27017/student-auth
JWT_SECRET=your_jwt_secret_key_here_change_in_production
PORT=5000
```

4. Start the backend server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the frontend development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Deployment

### Backend Deployment on Render

1. **Create a Render Account**: Sign up at [render.com](https://render.com)

2. **Prepare for Deployment**:
   - Push your code to a GitHub repository
   - Ensure your `.env` variables are set in Render dashboard

3. **Create Web Service**:
   - Go to Render Dashboard → New → Web Service
   - Connect your GitHub repository
   - Select the `backend` folder as root directory
   - Set Build Command: `npm install`
   - Set Start Command: `npm start`
   - Add Environment Variables:
     - `MONGODB_URI`: Your MongoDB connection string
     - `JWT_SECRET`: Your secure JWT secret
     - `PORT`: 5000

4. **Deploy**: Render will automatically deploy your backend

### Frontend Deployment on Vercel

1. **Create a Vercel Account**: Sign up at [vercel.com](https://vercel.com)

2. **Prepare for Deployment**:
   - Update the API base URL in `frontend/src/services/authService.js`
   - Change `http://localhost:5000` to your Render backend URL

3. **Deploy with Vercel**:
   - Go to Vercel Dashboard → New Project
   - Import your GitHub repository
   - Set Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Add Environment Variable: `REACT_APP_API_URL` (your backend URL)

4. **Deploy**: Vercel will automatically deploy your frontend

### MongoDB Setup

**Option 1: MongoDB Atlas (Recommended for Production)**
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Get connection string
4. Use this as your `MONGODB_URI`

**Option 2: Local MongoDB**
1. Install MongoDB locally
2. Use `mongodb://localhost:27017/student-auth` as connection string

## Usage

1. **Register**: Create a new student account
2. **Login**: Authenticate with your credentials
3. **Dashboard**: View your student information
4. **Update Password**: Change your password (requires current password)
5. **Update Course**: Modify your enrolled course
6. **Logout**: Securely log out and clear session

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected routes with middleware
- Input validation and sanitization
- CORS configuration
- Error handling without exposing sensitive information

## Error Handling

The application handles various error scenarios:
- Invalid login credentials
- Duplicate email registration
- Unauthorized access attempts
- Password mismatch during update
- Network errors and server issues
- Form validation errors

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.
