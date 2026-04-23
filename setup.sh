#!/bin/bash

echo "🚀 Setting up Student Authentication System - MERN Stack"
echo "========================================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if MongoDB is installed
if ! command -v mongod &> /dev/null; then
    echo "⚠️  MongoDB is not installed locally. You can use MongoDB Atlas instead."
    echo "   Visit: https://www.mongodb.com/atlas"
fi

echo ""
echo "📦 Installing Backend Dependencies..."
cd backend
npm install

if [ $? -eq 0 ]; then
    echo "✅ Backend dependencies installed successfully"
else
    echo "❌ Failed to install backend dependencies"
    exit 1
fi

echo ""
echo "📦 Installing Frontend Dependencies..."
cd ../frontend
npm install

if [ $? -eq 0 ]; then
    echo "✅ Frontend dependencies installed successfully"
else
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi

echo ""
echo "🔧 Setting up Environment Variables..."

# Create backend .env if it doesn't exist
if [ ! -f "../backend/.env" ]; then
    cat > ../backend/.env << EOL
MONGODB_URI=mongodb://localhost:27017/student-auth
JWT_SECRET=your_jwt_secret_key_here_change_in_production_$(date +%s)
PORT=5000
EOL
    echo "✅ Backend .env file created"
else
    echo "⚠️  Backend .env file already exists"
fi

# Create frontend .env if it doesn't exist
if [ ! -f ".env" ]; then
    cat > .env << EOL
REACT_APP_API_URL=http://localhost:5000/api
EOL
    echo "✅ Frontend .env file created"
else
    echo "⚠️  Frontend .env file already exists"
fi

echo ""
echo "🎉 Setup Complete!"
echo ""
echo "Next Steps:"
echo "1. Start MongoDB service: mongod"
echo "2. Start backend server: cd backend && npm run dev"
echo "3. Start frontend server: cd frontend && npm start"
echo "4. Open http://localhost:3000 in your browser"
echo ""
echo "📚 For deployment instructions, see README.md"
