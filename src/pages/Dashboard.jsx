import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { api } from '../services/mockApi';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import '../styles/Dashboard.css';

export const Dashboard = () => {
  const { user } = useAuth();
  const [greeting, setGreeting] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const { data: appointments = [], isLoading: appointmentsLoading } = useQuery({
    queryKey: ['appointments'],
    queryFn: api.getAppointments
  });

  const { data: healthTips = [], isLoading: tipsLoading } = useQuery({
    queryKey: ['healthTips'],
    queryFn: api.getHealthTips
  });

  const { data: medicalRecords } = useQuery({
    queryKey: ['medicalRecords'],
    queryFn: api.getMedicalRecords
  });

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');

    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const upcomingAppointments = appointments
    .filter(apt => apt.status === 'upcoming')
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3);

  const nextAppointment = upcomingAppointments[0];
  const completedAppointments = appointments.filter(a => a.status === 'completed');
  const totalPrescriptions = medicalRecords?.prescriptions?.length || 2;
  const totalLabResults = medicalRecords?.labResults?.length || 8;

  const daysUntilNextAppointment = nextAppointment 
    ? Math.ceil((new Date(nextAppointment.date) - new Date()) / (1000 * 60 * 60 * 24))
    : null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  return (
    <div className="dashboard">
      
      <div className="dashboard-hero">
        <div className="hero-content">
          <div className="greeting-section">
            <h1 className="hero-greeting">{greeting}, {user?.name}! 👋</h1>
            <p className="hero-subtitle">Here's your personalized health dashboard</p>
            <div className="hero-meta">
              <span className="current-date">
                📅 {currentTime.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
              <span className="current-time">🕐 {formatTime(currentTime)}</span>
            </div>
          </div>
          <div className="hero-actions">
            <Link to="/search" className="hero-button primary">
              <span className="button-icon">➕</span>
              Book Appointment
            </Link>
            <Link to="/records" className="hero-button secondary">
              <span className="button-icon">📊</span>
              View Records
            </Link>
          </div>
        </div>
        
        
        {nextAppointment && (
          <div className="next-appointment-alert">
            <div className="alert-icon">⏰</div>
            <div className="alert-content">
              <h3>Upcoming Appointment</h3>
              <p className="alert-doctor">{nextAppointment.doctorName} - {nextAppointment.specialty}</p>
              <p className="alert-time">
                {formatDate(nextAppointment.date)} at {nextAppointment.time}
              </p>
              {daysUntilNextAppointment !== null && (
                <span className="alert-badge">
                  {daysUntilNextAppointment === 0 
                    ? 'Today!' 
                    : daysUntilNextAppointment === 1 
                    ? 'Tomorrow' 
                    : `In ${daysUntilNextAppointment} days`}
                </span>
              )}
            </div>
            <Link to="/appointments" className="alert-action">View Details →</Link>
          </div>
        )}
      </div>

      
      <div className="stats-grid">
        <div className="stat-card stat-card-enhanced">
          <div className="stat-icon blue">📅</div>
          <div className="stat-info">
            <h3>{upcomingAppointments.length}</h3>
            <p>Upcoming Appointments</p>
            <div className="stat-detail">
              {nextAppointment && (
                <span className="mini-info">Next: {new Date(nextAppointment.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              )}
            </div>
          </div>
          <div className="stat-trend positive">
            <span className="trend-icon">↗</span>
            <span className="trend-text">Active</span>
          </div>
        </div>
        
        <div className="stat-card stat-card-enhanced">
          <div className="stat-icon green">✅</div>
          <div className="stat-info">
            <h3>{completedAppointments.length}</h3>
            <p>Completed Visits</p>
            <div className="stat-detail">
              <span className="mini-info">This year: {completedAppointments.filter(a => new Date(a.date).getFullYear() === 2026).length}</span>
            </div>
          </div>
          <div className="stat-trend positive">
            <span className="trend-icon">✓</span>
            <span className="trend-text">Updated</span>
          </div>
        </div>
        
        <div className="stat-card stat-card-enhanced">
          <div className="stat-icon purple">📋</div>
          <div className="stat-info">
            <h3>{totalLabResults}</h3>
            <p>Lab Results</p>
            <div className="stat-detail">
              <span className="mini-info">All results normal</span>
            </div>
          </div>
          <div className="stat-trend positive">
            <span className="trend-icon">💚</span>
            <span className="trend-text">Healthy</span>
          </div>
        </div>
        
        <div className="stat-card stat-card-enhanced">
          <div className="stat-icon orange">💊</div>
          <div className="stat-info">
            <h3>{totalPrescriptions}</h3>
            <p>Active Prescriptions</p>
            <div className="stat-detail">
              <span className="mini-info">All up to date</span>
            </div>
          </div>
          <div className="stat-trend">
            <span className="trend-icon">📦</span>
            <span className="trend-text">Current</span>
          </div>
        </div>
      </div>

      
      <div className="dashboard-grid">
        
        <div className="dashboard-section appointments-section">
          <div className="section-header">
            <div>
              <h2>Upcoming Appointments</h2>
              <p className="section-subtitle">Your scheduled healthcare visits</p>
            </div>
            <Link to="/appointments" className="view-all-link">
              View All <span className="arrow">→</span>
            </Link>
          </div>
          
          {appointmentsLoading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading appointments...</p>
            </div>
          ) : upcomingAppointments.length > 0 ? (
            <div className="appointments-list">
              {upcomingAppointments.map(appointment => (
                <div key={appointment.id} className="appointment-card enhanced">
                  <div className="appointment-date">
                    <div className="date-badge">
                      <span className="date-day">
                        {new Date(appointment.date).getDate()}
                      </span>
                      <span className="date-month">
                        {new Date(appointment.date).toLocaleDateString('en-US', { month: 'short' })}
                      </span>
                    </div>
                  </div>
                  <div className="appointment-details">
                    <div className="appointment-header-info">
                      <div>
                        <h3>{appointment.doctorName}</h3>
                        <p className="specialty">{appointment.specialty}</p>
                      </div>
                      <span className="appointment-badge">Confirmed</span>
                    </div>
                    <div className="appointment-meta-grid">
                      <div className="meta-item">
                        <span className="meta-icon">🕐</span>
                        <span className="meta-text">{appointment.time}</span>
                      </div>
                      <div className="meta-item">
                        <span className="meta-icon">📝</span>
                        <span className="meta-text">{appointment.reason}</span>
                      </div>
                    </div>
                  </div>
                  <Link 
                    to="/appointments"
                    className="appointment-action-btn"
                  >
                    <span>View</span>
                    <span className="action-arrow">→</span>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">📅</div>
              <h3>No upcoming appointments</h3>
              <p>Schedule your next visit with a healthcare provider</p>
              <Link to="/search" className="empty-action-btn">
                <span className="btn-icon">🔍</span>
                Find a Doctor
              </Link>
            </div>
          )}

          
          <div className="appointments-graph-container">
            <div className="graph-header">
              <h3>📈 Appointment Trends</h3>
              <span className="graph-period">Last 6 Months</span>
            </div>
            <div className="appointments-timeline-graph">
              <div className="graph-y-axis">
                <span className="y-label">10</span>
                <span className="y-label">8</span>
                <span className="y-label">6</span>
                <span className="y-label">4</span>
                <span className="y-label">2</span>
                <span className="y-label">0</span>
              </div>
              <div className="graph-content">
                <div className="graph-grid">
                  <div className="grid-line"></div>
                  <div className="grid-line"></div>
                  <div className="grid-line"></div>
                  <div className="grid-line"></div>
                  <div className="grid-line"></div>
                </div>
                <div className="graph-bars-container">
                  {[
                    { month: 'Aug', count: 3, color: '#667eea' },
                    { month: 'Sep', count: 5, color: '#764ba2' },
                    { month: 'Oct', count: 4, color: '#667eea' },
                    { month: 'Nov', count: 6, color: '#764ba2' },
                    { month: 'Dec', count: 4, color: '#667eea' },
                    { month: 'Jan', count: appointments.filter(a => new Date(a.date).getMonth() === 0).length || 4, color: '#764ba2' }
                  ].map((data, index) => (
                    <div key={index} className="graph-column">
                      <div 
                        className="graph-bar-animated"
                        style={{ 
                          height: `${(data.count / 10) * 100}%`,
                          background: `linear-gradient(180deg, ${data.color} 0%, ${data.color}dd 100%)`,
                          animationDelay: `${index * 0.1}s`
                        }}
                      >
                        <span className="bar-count">{data.count}</span>
                      </div>
                      <span className="x-label">{data.month}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="graph-footer">
              <div className="graph-insight">
                <span className="insight-icon">💡</span>
                <span className="insight-text">
                  You've scheduled {upcomingAppointments.length} appointments this month
                </span>
              </div>
            </div>
          </div>
        </div>

        
        <div className="dashboard-sidebar">
          
          <div className="dashboard-section health-summary-card">
            <div className="section-header">
              <h2>Health Summary</h2>
            </div>
            <div className="health-summary-content">
              <div className="summary-item">
                <div className="summary-icon">❤️</div>
                <div className="summary-details">
                  <span className="summary-label">Heart Rate</span>
                  <span className="summary-value">{medicalRecords?.vitals?.[0]?.heartRate || 72} bpm</span>
                </div>
                <span className="summary-status good">Normal</span>
              </div>
              <div className="summary-item">
                <div className="summary-icon">⚖️</div>
                <div className="summary-details">
                  <span className="summary-label">BMI</span>
                  <span className="summary-value">{medicalRecords?.vitals?.[0]?.bmi || 24.2}</span>
                </div>
                <span className="summary-status good">Normal</span>
              </div>
              <div className="summary-item">
                <div className="summary-icon">🩺</div>
                <div className="summary-details">
                  <span className="summary-label">Blood Pressure</span>
                  <span className="summary-value">120/80</span>
                </div>
                <span className="summary-status good">Normal</span>
              </div>
              <div className="summary-item">
                <div className="summary-icon">🌡️</div>
                <div className="summary-details">
                  <span className="summary-label">Temperature</span>
                  <span className="summary-value">{medicalRecords?.vitals?.[0]?.temperature || 36.8}°C</span>
                </div>
                <span className="summary-status good">Normal</span>
              </div>
            </div>
            <Link to="/records" className="summary-footer-link">
              View Full Medical Records →
            </Link>
          </div>

          
          <div className="dashboard-section health-tips-section">
            <div className="section-header">
              <h2>Daily Health Tips</h2>
            </div>
            {tipsLoading ? (
              <div className="loading">Loading tips...</div>
            ) : (
              <div className="health-tips">
                {healthTips.map(tip => (
                  <div key={tip.id} className="health-tip-card">
                    <div className="tip-icon">{tip.icon}</div>
                    <div className="tip-content">
                      <h3>{tip.title}</h3>
                      <p>{tip.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      
      <div className="quick-actions-enhanced">
        <div className="section-header">
          <h2>Quick Actions</h2>
          <p className="section-subtitle">Access key features instantly</p>
        </div>
        <div className="actions-grid-enhanced">
          <Link to="/search" className="action-card-enhanced">
            <div className="action-header">
              <span className="action-icon-large">🔍</span>
              <span className="action-badge">Popular</span>
            </div>
            <h3>Find Doctors</h3>
            <p>Search for specialists by location and specialty</p>
            <div className="action-footer">
              <span className="action-link">Browse Doctors →</span>
            </div>
          </Link>
          
          <Link to="/records" className="action-card-enhanced">
            <div className="action-header">
              <span className="action-icon-large">📊</span>
            </div>
            <h3>View Records</h3>
            <p>Access your complete medical history and test results</p>
            <div className="action-footer">
              <span className="action-link">View Records →</span>
            </div>
          </Link>
          
          <Link to="/appointments" className="action-card-enhanced">
            <div className="action-header">
              <span className="action-icon-large">📅</span>
            </div>
            <h3>My Appointments</h3>
            <p>Manage and track all your healthcare appointments</p>
            <div className="action-footer">
              <span className="action-link">View All →</span>
            </div>
          </Link>
          
          <Link to="/profile" className="action-card-enhanced">
            <div className="action-header">
              <span className="action-icon-large">⚙️</span>
            </div>
            <h3>Update Profile</h3>
            <p>Manage personal and medical information</p>
            <div className="action-footer">
              <span className="action-link">Edit Profile →</span>
            </div>
          </Link>
        </div>
      </div>

      
      <div className="recent-activity-section">
        <div className="section-header">
          <h2>Recent Activity</h2>
          <p className="section-subtitle">Your latest healthcare interactions</p>
        </div>
        <div className="activity-timeline">
          {completedAppointments.slice(0, 3).map((apt, index) => (
            <div key={apt.id} className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <h4>{apt.doctorName}</h4>
                  <span className="timeline-date">{formatDate(apt.date)}</span>
                </div>
                <p className="timeline-description">
                  Completed {apt.specialty} appointment for {apt.reason}
                </p>
                <span className="timeline-status">✓ Completed</span>
              </div>
            </div>
          ))}
          {completedAppointments.length === 0 && (
            <div className="timeline-empty">
              <p>No recent activity to show</p>
            </div>
          )}
        </div>
      </div>

      
      <div className="health-metrics-section">
        <div className="section-header">
          <h2>Health Metrics Overview</h2>
          <p className="section-subtitle">Track your vital signs over time</p>
        </div>
        <div className="metrics-graph-container">
          <div className="graph-tabs">
            <button className="graph-tab active">Weight & BMI</button>
            <button className="graph-tab">Heart Rate</button>
            <button className="graph-tab">Blood Pressure</button>
          </div>
          <div className="graph-placeholder">
            <div className="graph-visual">
              <div className="graph-bars">
                {medicalRecords?.vitals?.slice().reverse().map((vital, index) => (
                  <div key={index} className="graph-bar-item">
                    <div className="bar-container">
                      <div 
                        className="bar" 
                        style={{ 
                          height: `${(vital.weight / 80) * 100}%`,
                          background: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)'
                        }}
                      ></div>
                    </div>
                    <div className="bar-label">{new Date(vital.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                    <div className="bar-value">{vital.weight}kg</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="graph-legend">
              <div className="legend-item">
                <span className="legend-color" style={{ background: '#667eea' }}></span>
                <span className="legend-label">Weight (kg)</span>
              </div>
              <div className="legend-item">
                <span className="legend-color" style={{ background: '#10b981' }}></span>
                <span className="legend-label">BMI</span>
              </div>
              <div className="legend-item">
                <span className="legend-color" style={{ background: '#f59e0b' }}></span>
                <span className="legend-label">Heart Rate (bpm)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <div className="appointment-stats-section">
        <div className="section-header">
          <h2>Appointment Statistics</h2>
          <p className="section-subtitle">Your healthcare visit trends</p>
        </div>
        <div className="stats-chart-container">
          <div className="chart-visual">
            <div className="donut-chart">
              <svg viewBox="0 0 200 200" className="donut-svg">
                <circle cx="100" cy="100" r="80" fill="none" stroke="#f1f5f9" strokeWidth="30"/>
                <circle 
                  cx="100" 
                  cy="100" 
                  r="80" 
                  fill="none" 
                  stroke="#667eea" 
                  strokeWidth="30"
                  strokeDasharray={`${(upcomingAppointments.length / appointments.length) * 502} 502`}
                  transform="rotate(-90 100 100)"
                  strokeLinecap="round"
                />
                <circle 
                  cx="100" 
                  cy="100" 
                  r="80" 
                  fill="none" 
                  stroke="#10b981" 
                  strokeWidth="30"
                  strokeDasharray={`${(completedAppointments.length / appointments.length) * 502} 502`}
                  strokeDashoffset={`-${(upcomingAppointments.length / appointments.length) * 502}`}
                  transform="rotate(-90 100 100)"
                  strokeLinecap="round"
                />
                <text x="100" y="95" textAnchor="middle" fontSize="32" fontWeight="700" fill="#1e293b">
                  {appointments.length}
                </text>
                <text x="100" y="115" textAnchor="middle" fontSize="14" fill="#64748b">
                  Total
                </text>
              </svg>
            </div>
          </div>
          <div className="stats-breakdown">
            <div className="breakdown-item">
              <div className="breakdown-indicator" style={{ background: '#667eea' }}></div>
              <div className="breakdown-info">
                <span className="breakdown-label">Upcoming</span>
                <span className="breakdown-value">{upcomingAppointments.length} appointments</span>
              </div>
              <span className="breakdown-percentage">
                {appointments.length > 0 ? Math.round((upcomingAppointments.length / appointments.length) * 100) : 0}%
              </span>
            </div>
            <div className="breakdown-item">
              <div className="breakdown-indicator" style={{ background: '#10b981' }}></div>
              <div className="breakdown-info">
                <span className="breakdown-label">Completed</span>
                <span className="breakdown-value">{completedAppointments.length} appointments</span>
              </div>
              <span className="breakdown-percentage">
                {appointments.length > 0 ? Math.round((completedAppointments.length / appointments.length) * 100) : 0}%
              </span>
            </div>
            <div className="breakdown-item">
              <div className="breakdown-indicator" style={{ background: '#ef4444' }}></div>
              <div className="breakdown-info">
                <span className="breakdown-label">Cancelled</span>
                <span className="breakdown-value">
                  {appointments.filter(a => a.status === 'cancelled').length} appointments
                </span>
              </div>
              <span className="breakdown-percentage">
                {appointments.length > 0 ? Math.round((appointments.filter(a => a.status === 'cancelled').length / appointments.length) * 100) : 0}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
