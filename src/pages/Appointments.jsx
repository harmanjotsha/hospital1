import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { api } from '../services/mockApi';
import '../styles/Appointments.css';

export const Appointments = () => {
  const location = useLocation();
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState('all');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      setTimeout(() => setSuccessMessage(''), 5000);
   
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const { data: appointments = [], isLoading } = useQuery({
    queryKey: ['appointments'],
    queryFn: api.getAppointments
  });

  const cancelMutation = useMutation({
    mutationFn: api.cancelAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries(['appointments']);
    }
  });

  const handleCancel = (appointmentId) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      cancelMutation.mutate(appointmentId);
    }
  };

  const filteredAppointments = appointments.filter(apt => {
    if (filter === 'all') return true;
    if (filter === 'upcoming') return apt.status === 'upcoming';
    if (filter === 'completed') return apt.status === 'completed';
    if (filter === 'cancelled') return apt.status === 'cancelled';
    return true;
  }).sort((a, b) => new Date(b.date) - new Date(a.date));

  const upcomingCount = appointments.filter(a => a.status === 'upcoming').length;
  const completedCount = appointments.filter(a => a.status === 'completed').length;
  const cancelledCount = appointments.filter(a => a.status === 'cancelled').length;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'upcoming': return 'status-upcoming';
      case 'completed': return 'status-completed';
      case 'cancelled': return 'status-cancelled';
      default: return '';
    }
  };

  return (
    <div className="appointments-page">
      <div className="appointments-header">
        <h1>My Appointments</h1>
        <p>View and manage your healthcare appointments</p>
      </div>

      {successMessage && (
        <div className="success-banner">
          ✓ {successMessage}
        </div>
      )}

      <div className="appointments-stats">
        <div className="stat-item">
          <span className="stat-number">{upcomingCount}</span>
          <span className="stat-label">Upcoming</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{completedCount}</span>
          <span className="stat-label">Completed</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{cancelledCount}</span>
          <span className="stat-label">Cancelled</span>
        </div>
      </div>

      <div className="appointments-filters">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All ({appointments.length})
        </button>
        <button
          className={`filter-btn ${filter === 'upcoming' ? 'active' : ''}`}
          onClick={() => setFilter('upcoming')}
        >
          Upcoming ({upcomingCount})
        </button>
        <button
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed ({completedCount})
        </button>
        <button
          className={`filter-btn ${filter === 'cancelled' ? 'active' : ''}`}
          onClick={() => setFilter('cancelled')}
        >
          Cancelled ({cancelledCount})
        </button>
      </div>

      <div className="appointments-list">
        {isLoading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading appointments...</p>
          </div>
        ) : filteredAppointments.length > 0 ? (
          filteredAppointments.map(appointment => (
            <div key={appointment.id} className="appointment-item">
              <div className="appointment-date-badge">
                <div className="badge-day">
                  {new Date(appointment.date).getDate()}
                </div>
                <div className="badge-month">
                  {new Date(appointment.date).toLocaleDateString('en-US', { month: 'short' })}
                </div>
              </div>

              <div className="appointment-info">
                <div className="appointment-top">
                  <div>
                    <h3>{appointment.doctorName}</h3>
                    <p className="appointment-specialty">{appointment.specialty}</p>
                  </div>
                  <span className={`appointment-status ${getStatusClass(appointment.status)}`}>
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </span>
                </div>

                <div className="appointment-details-grid">
                  <div className="detail-item">
                    <span className="detail-icon">📅</span>
                    <span>{formatDate(appointment.date)}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon">🕐</span>
                    <span>{appointment.time}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon">📝</span>
                    <span>{appointment.reason}</span>
                  </div>
                </div>

                {appointment.status === 'upcoming' && (
                  <div className="appointment-actions">
                    <button className="action-btn view-btn">
                      View Details
                    </button>
                    <button 
                      className="action-btn reschedule-btn"
                    >
                      Reschedule
                    </button>
                    <button 
                      className="action-btn cancel-btn"
                      onClick={() => handleCancel(appointment.id)}
                      disabled={cancelMutation.isPending}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="empty-appointments">
            <div className="empty-icon">📅</div>
            <h3>No {filter !== 'all' ? filter : ''} appointments</h3>
            <p>You don't have any {filter !== 'all' ? filter : ''} appointments at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};
