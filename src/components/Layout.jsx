import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Layout.css';

export const Layout = ({ children }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  if (!isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="layout">
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/dashboard" className="logo">
            <span className="logo-icon">🏥</span>
            <span className="logo-text">HealthPortal</span>
          </Link>

          <div className="nav-links">
            <Link 
              to="/dashboard" 
              className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
            >
              <span className="nav-icon">📊</span>
              Dashboard
            </Link>
            <Link 
              to="/search" 
              className={`nav-link ${isActive('/search') ? 'active' : ''}`}
            >
              <span className="nav-icon">🔍</span>
              Find Doctors
            </Link>
            <Link 
              to="/appointments" 
              className={`nav-link ${isActive('/appointments') ? 'active' : ''}`}
            >
              <span className="nav-icon">📅</span>
              Appointments
            </Link>
            <Link 
              to="/records" 
              className={`nav-link ${isActive('/records') ? 'active' : ''}`}
            >
              <span className="nav-icon">📋</span>
              Records
            </Link>
            <Link 
              to="/profile" 
              className={`nav-link ${isActive('/profile') ? 'active' : ''}`}
            >
              <span className="nav-icon">👤</span>
              Profile
            </Link>
          </div>

          <div className="user-section">
            <div className="user-info">
              <span className="user-name">{user?.name}</span>
              <span className="user-email">{user?.email}</span>
            </div>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="main-content">
        {children}
      </main>

      <footer className="footer">
        <p>&copy; 2026 HealthPortal. All rights reserved.</p>
      </footer>
    </div>
  );
};
