import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/mockApi';
import '../styles/Profile.css';

export const Profile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    dateOfBirth: user?.dateOfBirth || '',
    gender: user?.gender || '',
    address: user?.address || '',
    bloodType: user?.bloodType || '',
    allergies: user?.allergies?.join(', ') || '',
  });
  const [success, setSuccess] = useState('');

  const updateMutation = useMutation({
    mutationFn: api.updateProfile,
    onSuccess: (data) => {
      updateUser(formData);
      setIsEditing(false);
      setSuccess('Profile updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    }
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      dateOfBirth: user?.dateOfBirth || '',
      gender: user?.gender || '',
      address: user?.address || '',
      bloodType: user?.bloodType || '',
      allergies: user?.allergies?.join(', ') || '',
    });
    setIsEditing(false);
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>My Profile</h1>
        <p>Manage your personal information and preferences</p>
      </div>

      {success && (
        <div className="success-message">
          ✓ {success}
        </div>
      )}

      <div className="profile-container">
        <div className="profile-sidebar">
          <div className="profile-avatar">
            <div className="avatar-circle">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <h2>{user?.name}</h2>
            <p>{user?.email}</p>
          </div>

          <div className="profile-stats">
            <div className="stat-item">
              <span className="stat-label">Member Since</span>
              <span className="stat-value">January 2026</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Patient ID</span>
              <span className="stat-value">#HP{user?.id}</span>
            </div>
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-actions">
            {!isEditing ? (
              <button 
                onClick={() => setIsEditing(true)}
                className="edit-button"
              >
                Edit Profile
              </button>
            ) : (
              <div className="edit-actions">
                <button 
                  onClick={handleCancel}
                  className="cancel-button"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSubmit}
                  className="save-button"
                  disabled={updateMutation.isPending}
                >
                  {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-section">
              <h3>Personal Information</h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>

                <div className="form-group">
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    disabled={!isEditing}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Blood Type</label>
                  <select
                    name="bloodType"
                    value={formData.bloodType}
                    onChange={handleChange}
                    disabled={!isEditing}
                  >
                    <option value="">Select Blood Type</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
              </div>

              <div className="form-group full-width">
                <label>Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  disabled={!isEditing}
                  rows="2"
                />
              </div>
            </div>

            <div className="form-section">
              <h3>Medical Information</h3>
              
              <div className="form-group full-width">
                <label>Allergies</label>
                <input
                  type="text"
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="e.g., Penicillin, Peanuts"
                />
                <small>Separate multiple allergies with commas</small>
              </div>
            </div>

            <div className="form-section">
              <h3>Emergency Contact</h3>
              <div className="info-box">
                <p>⚠️ Emergency contact information can be updated by contacting our support team.</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
