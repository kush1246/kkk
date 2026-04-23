import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { authAPI } from '../services/authService';

const Dashboard = () => {
  const [studentData, setStudentData] = useState(null);
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const [courseForm, setCourseForm] = useState({
    course: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { user, logout, updateStudentData } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      const data = await authAPI.getStudent();
      setStudentData(data);
      setCourseForm({ course: data.course });
    } catch (err) {
      setError('Failed to fetch student data');
    }
  };

  const handlePasswordChange = (e) => {
    setPasswordForm({
      ...passwordForm,
      [e.target.name]: e.target.value
    });
  };

  const handleCourseChange = (e) => {
    setCourseForm({
      ...courseForm,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    // Validation
    if (!passwordForm.oldPassword || !passwordForm.newPassword || !passwordForm.confirmNewPassword) {
      setError('Please fill in all password fields');
      setLoading(false);
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmNewPassword) {
      setError('New passwords do not match');
      setLoading(false);
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setError('New password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      await authAPI.updatePassword({
        oldPassword: passwordForm.oldPassword,
        newPassword: passwordForm.newPassword
      });
      setMessage('Password updated successfully');
      setPasswordForm({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update password');
    }
    
    setLoading(false);
  };

  const handleCourseUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    if (!courseForm.course) {
      setError('Course field is required');
      setLoading(false);
      return;
    }

    try {
      await authAPI.updateCourse({ course: courseForm.course });
      setMessage('Course updated successfully');
      updateStudentData({ course: courseForm.course });
      if (studentData) {
        setStudentData({ ...studentData, course: courseForm.course });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update course');
    }
    
    setLoading(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="mb-0">Student Dashboard</h1>
            <button className="btn btn-outline-light" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container dashboard-content">
        {message && (
          <div className="alert alert-success" role="alert">
            {message}
          </div>
        )}

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <div className="row">
          <div className="col-lg-6">
            <div className="student-card">
              <h3 className="mb-4">Student Information</h3>
              {studentData ? (
                <div className="student-info">
                  <h5>Personal Details</h5>
                  <p><strong>Name:</strong> {studentData.name}</p>
                  <p><strong>Email:</strong> {studentData.email}</p>
                  <p><strong>Course:</strong> {studentData.course}</p>
                  <p><strong>Registered:</strong> {new Date(studentData.createdAt).toLocaleDateString()}</p>
                </div>
              ) : user ? (
                <div className="student-info">
                  <h5>Personal Details</h5>
                  <p><strong>Name:</strong> {user.name}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Course:</strong> {user.course}</p>
                </div>
              ) : (
                <div className="text-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="col-lg-6">
            <div className="update-card">
              <h4 className="mb-4">Update Course</h4>
              <form onSubmit={handleCourseUpdate}>
                <div className="mb-3">
                  <label htmlFor="course" className="form-label">
                    New Course
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="course"
                    name="course"
                    value={courseForm.course}
                    onChange={handleCourseChange}
                    placeholder="Enter new course"
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Updating...' : 'Update Course'}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-lg-6">
            <div className="update-card">
              <h4 className="mb-4">Update Password</h4>
              <form onSubmit={handlePasswordUpdate}>
                <div className="mb-3">
                  <label htmlFor="oldPassword" className="form-label">
                    Current Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="oldPassword"
                    name="oldPassword"
                    value={passwordForm.oldPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter current password"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="newPassword" className="form-label">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="newPassword"
                    name="newPassword"
                    value={passwordForm.newPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter new password (min 6 characters)"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="confirmNewPassword" className="form-label">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmNewPassword"
                    name="confirmNewPassword"
                    value={passwordForm.confirmNewPassword}
                    onChange={handlePasswordChange}
                    placeholder="Confirm new password"
                    required
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Updating...' : 'Update Password'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
