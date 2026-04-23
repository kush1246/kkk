# Testing Guide - Student Authentication System

## Prerequisites for Testing

1. **Backend Setup**:
   - MongoDB running locally or cloud instance
   - Backend server running on port 5000
   - Environment variables configured

2. **Frontend Setup**:
   - Frontend server running on port 3000
   - All dependencies installed

## Manual Testing Steps

### 1. Registration Testing

**Test Case 1: Successful Registration**
1. Navigate to `http://localhost:3000/register`
2. Fill in all fields with valid data:
   - Name: "Test Student"
   - Email: "test@example.com"
   - Password: "password123"
   - Confirm Password: "password123"
   - Course: "Computer Science"
3. Click "Register"
4. **Expected**: Redirect to login page with success message

**Test Case 2: Duplicate Email Registration**
1. Try to register with the same email as Test Case 1
2. **Expected**: Error message "Email already registered"

**Test Case 3: Password Mismatch**
1. Fill registration form with different passwords
2. **Expected**: Error message "Passwords do not match"

**Test Case 4: Invalid Email**
1. Enter invalid email format
2. **Expected**: Error message "Please enter a valid email address"

### 2. Login Testing

**Test Case 1: Successful Login**
1. Navigate to `http://localhost:3000/login`
2. Enter registered credentials:
   - Email: "test@example.com"
   - Password: "password123"
3. Click "Login"
4. **Expected**: Redirect to dashboard

**Test Case 2: Invalid Credentials**
1. Enter wrong password
2. **Expected**: Error message "Invalid email or password"

**Test Case 3: Empty Fields**
1. Submit form with empty fields
2. **Expected**: Error message "Please fill in all fields"

### 3. Dashboard Testing

**Test Case 1: Student Information Display**
1. After successful login, verify dashboard shows:
   - Student name
   - Email address
   - Course
   - Registration date

**Test Case 2: Password Update**
1. Fill password update form:
   - Current Password: "password123"
   - New Password: "newpassword123"
   - Confirm New Password: "newpassword123"
2. Click "Update Password"
3. **Expected**: Success message "Password updated successfully"

**Test Case 3: Password Update - Wrong Current Password**
1. Enter incorrect current password
2. **Expected**: Error message "Current password is incorrect"

**Test Case 4: Course Update**
1. Fill course update form with new course
2. Click "Update Course"
3. **Expected**: Success message and updated course display

### 4. Security Testing

**Test Case 1: Protected Route Access**
1. Try to access `http://localhost:3000/dashboard` without login
2. **Expected**: Redirect to login page

**Test Case 2: Token Expiration**
1. Clear localStorage token
2. Try to access dashboard
3. **Expected**: Redirect to login page

**Test Case 3: Logout Functionality**
1. Click logout button
2. **Expected**: Redirect to login page, token cleared

### 5. API Testing (Using Postman/curl)

**Registration API**:
```bash
curl -X POST http://localhost:5000/api/register \
  -H "Content-Type: application/json" \
  -d '{"name":"API Test","email":"api@test.com","password":"password123","course":"Engineering"}'
```

**Login API**:
```bash
curl -X POST http://localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"api@test.com","password":"password123"}'
```

**Get Student API**:
```bash
curl -X GET http://localhost:5000/api/student \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Update Password API**:
```bash
curl -X PUT http://localhost:5000/api/update-password \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"oldPassword":"password123","newPassword":"newpassword123"}'
```

**Update Course API**:
```bash
curl -X PUT http://localhost:5000/api/update-course \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"course":"New Course"}'
```

## Automated Testing Setup

To add automated testing, install these dependencies:

```bash
# Backend testing
npm install --save-dev jest supertest

# Frontend testing
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

## Performance Testing

1. **Load Testing**: Use tools like Apache JMeter or Artillery
2. **Stress Testing**: Test with multiple concurrent users
3. **Database Performance**: Monitor query execution times

## Security Testing

1. **Input Validation**: Test for XSS and SQL injection attempts
2. **Rate Limiting**: Test brute force protection
3. **Token Security**: Verify JWT token strength and expiration
4. **CORS Configuration**: Test cross-origin request handling

## Browser Compatibility Testing

Test the application in:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Deployment Testing

1. **Render Backend**: Verify all endpoints work in production
2. **Vercel Frontend**: Test all user flows in production
3. **Environment Variables**: Ensure all secrets are properly configured
4. **Database Connection**: Verify MongoDB connectivity in production

## Common Issues and Solutions

1. **CORS Errors**: Ensure backend allows frontend origin
2. **Database Connection**: Check MongoDB URI and network access
3. **Token Issues**: Verify JWT_SECRET is set and consistent
4. **Build Errors**: Check all dependencies are properly installed
