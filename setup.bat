@echo off
echo 🚀 Setting up Student Authentication System - MERN Stack
echo ========================================================

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

echo.
echo 📦 Installing Backend Dependencies...
cd backend
call npm install

if %errorlevel% neq 0 (
    echo ❌ Failed to install backend dependencies
    pause
    exit /b 1
)
echo ✅ Backend dependencies installed successfully

echo.
echo 📦 Installing Frontend Dependencies...
cd ..\frontend
call npm install

if %errorlevel% neq 0 (
    echo ❌ Failed to install frontend dependencies
    pause
    exit /b 1
)
echo ✅ Frontend dependencies installed successfully

echo.
echo 🔧 Setting up Environment Variables...

REM Create backend .env if it doesn't exist
if not exist "..\backend\.env" (
    echo MONGODB_URI=mongodb://localhost:27017/student-auth > ..\backend\.env
    echo JWT_SECRET=your_jwt_secret_key_here_change_in_production >> ..\backend\.env
    echo PORT=5000 >> ..\backend\.env
    echo ✅ Backend .env file created
) else (
    echo ⚠️  Backend .env file already exists
)

REM Create frontend .env if it doesn't exist
if not exist ".env" (
    echo REACT_APP_API_URL=http://localhost:5000/api > .env
    echo ✅ Frontend .env file created
) else (
    echo ⚠️  Frontend .env file already exists
)

echo.
echo 🎉 Setup Complete!
echo.
echo Next Steps:
echo 1. Start MongoDB service: mongod
echo 2. Start backend server: cd backend ^&^& npm run dev
echo 3. Start frontend server: cd frontend ^&^& npm start
echo 4. Open http://localhost:3000 in your browser
echo.
echo 📚 For deployment instructions, see README.md
pause
