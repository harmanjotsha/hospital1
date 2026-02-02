import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { api, specialties, locations } from '../services/mockApi';
import '../styles/Search.css';

export const Search = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    specialty: '',
    location: '',
    search: ''
  });

  const { data: doctors = [], isLoading } = useQuery({
    queryKey: ['doctors', filters],
    queryFn: () => api.getDoctors(filters)
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value === 'All Specialties' || value === 'All Locations' ? '' : value
    }));
  };

  const handleBooking = (doctor) => {
    navigate('/book', { state: { doctor } });
  };

  return (
    <div className="search-page">
      <div className="search-header">
        <h1>Find a Doctor</h1>
        <p>Search for healthcare professionals by specialty, location, or name</p>
      </div>

      <div className="search-filters">
        <div className="filter-group">
          <input
            type="text"
            placeholder="🔍 Search by name or specialty..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-row">
          <div className="filter-group">
            <label>Specialty</label>
            <select
              value={filters.specialty || 'All Specialties'}
              onChange={(e) => handleFilterChange('specialty', e.target.value)}
              className="filter-select"
            >
              {specialties.map(specialty => (
                <option key={specialty} value={specialty}>
                  {specialty}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Location</label>
            <select
              value={filters.location || 'All Locations'}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              className="filter-select"
            >
              {locations.map(location => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="results-section">
        <div className="results-header">
          <h2>Available Doctors ({doctors.length})</h2>
        </div>

        {isLoading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading doctors...</p>
          </div>
        ) : doctors.length > 0 ? (
          <div className="doctors-grid">
            {doctors.map(doctor => (
              <div key={doctor.id} className="doctor-card">
                <img 
                  src={doctor.image} 
                  alt={doctor.name}
                  className="doctor-image"
                />
                <div className="doctor-info">
                  <h3>{doctor.name}</h3>
                  <p className="doctor-specialty">{doctor.specialty}</p>
                  <div className="doctor-meta">
                    <span className="rating">
                      ⭐ {doctor.rating}
                    </span>
                    <span className="experience">
                      {doctor.experience} years exp.
                    </span>
                  </div>
                  <p className="doctor-location">📍 {doctor.location}</p>
                  
                  <div className="availability-section">
                    <p className="availability-label">Next Available:</p>
                    <div className="available-dates">
                      {doctor.availableDates.slice(0, 3).map(date => (
                        <span key={date} className="date-chip">
                          {new Date(date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button 
                    onClick={() => handleBooking(doctor)}
                    className="book-button"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-results">
            <div className="empty-icon">🔍</div>
            <h3>No doctors found</h3>
            <p>Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </div>
  );
};
