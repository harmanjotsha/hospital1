import { Link } from 'react-router-dom';
import '../styles/Landing.css';
import kamraImage from '../assets/kamra.jpg';

export const Landing = () => {
  return (
    <div className="landing">
      <nav className="landing-nav">
        <div className="nav-container">
          <div className="nav-brand">
            <span className="brand-icon">🏥</span>
            <span className="brand-name">HealthCare Portal</span>
          </div>
          <div className="nav-links">
            <a href="#features" className="nav-link">Features</a>
            <a href="#how-it-works" className="nav-link">How It Works</a>
            <a href="#benefits" className="nav-link">Benefits</a>
            <Link to="/login" className="nav-btn login">Login</Link>
            <Link to="/signup" className="nav-btn signup">Get Started</Link>
          </div>
        </div>
      </nav>

      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content-main">
            <div className="hero-badge">
              <span className="badge-icon">✨</span>
              <span>Modern Healthcare Management</span>
            </div>
            <h1 className="hero-title">
              Your Health,<br />
              <span className="gradient-text">Simplified & Secured</span>
            </h1>
            <p className="hero-description">
              Experience seamless healthcare management with our comprehensive platform. 
              Book appointments, access medical records, and stay connected with healthcare 
              providers - all in one place.
            </p>
            <div className="hero-actions">
              <Link to="/signup" className="hero-btn primary">
                <span>Start Free Today</span>
                <span className="btn-arrow">→</span>
              </Link>
              <Link to="/login" className="hero-btn secondary">
                <span>Login to Account</span>
              </Link>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number" style={{ color: 'white' }}>500+</div>
                <div className="stat-label" style={{ color: 'white' }}>Verified Doctors</div>
              </div>
              <div className="stat-item">
                <div className="stat-number" style={{ color: 'white' }}>10K+</div>
                <div className="stat-label" style={{ color: 'white' }}>Happy Patients</div>
              </div>
              <div className="stat-item">
                <div className="stat-number" style={{ color: 'white' }}>50K+</div>
                <div className="stat-label" style={{ color: 'white' }}>Appointments</div>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="visual-card card-1">
              <div className="card-icon">📅</div>
              <div className="card-content">
                <div className="card-title">Next Appointment</div>
                <div className="card-subtitle">Dr. Sarah Johnson</div>
                <div className="card-date">Feb 10, 10:00 AM</div>
              </div>
            </div>
            <div className="visual-card card-2">
              <div className="card-icon">❤️</div>
              <div className="card-content">
                <div className="card-title">Health Status</div>
                <div className="vitals">
                  <span className="vital-item">Heart: 72 bpm</span>
                  <span className="vital-item">BP: 120/80</span>
                </div>
              </div>
            </div>
            <div className="visual-card card-3">
              <div className="card-icon">📊</div>
              <div className="card-content">
                <div className="card-title">Lab Results</div>
                <div className="card-status">All Normal ✓</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section 
        id="features" 
        className="features-section"
        style={{ backgroundImage: `url(${kamraImage})` }}
      >
        <div className="section-container">
          <div className="section-header-center">
            <h2 className="section-title">Everything You Need</h2>
            <p className="section-subtitle">
              Comprehensive healthcare management tools designed for modern patients
            </p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3 className="feature-title">Find Doctors</h3>
              <p className="feature-description">
                Search and filter from 500+ verified healthcare professionals by specialty, 
                location, and availability.
              </p>
              <div className="feature-tags">
                <span className="tag">Search Filters</span>
                <span className="tag">Real-time Availability</span>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📅</div>
              <h3 className="feature-title">Book Appointments</h3>
              <p className="feature-description">
                Schedule appointments instantly with our easy-to-use booking system. 
                Get instant confirmations and reminders.
              </p>
              <div className="feature-tags">
                <span className="tag">Instant Booking</span>
                <span className="tag">Reminders</span>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3 className="feature-title">Medical Records</h3>
              <p className="feature-description">
                Access your complete medical history, lab results, prescriptions, 
                and health metrics anytime, anywhere.
              </p>
              <div className="feature-tags">
                <span className="tag">Secure Access</span>
                <span className="tag">Cloud Storage</span>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📈</div>
              <h3 className="feature-title">Health Tracking</h3>
              <p className="feature-description">
                Monitor your vital signs, track health metrics over time with 
                interactive charts and visualizations.
              </p>
              <div className="feature-tags">
                <span className="tag">Visual Analytics</span>
                <span className="tag">Progress Reports</span>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔔</div>
              <h3 className="feature-title">Smart Reminders</h3>
              <p className="feature-description">
                Never miss an appointment or medication with intelligent notification 
                system and calendar integration.
              </p>
              <div className="feature-tags">
                <span className="tag">Notifications</span>
                <span className="tag">Calendar Sync</span>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3 className="feature-title">Secure & Private</h3>
              <p className="feature-description">
                Your health data is encrypted and protected with industry-standard 
                security protocols and HIPAA compliance.
              </p>
              <div className="feature-tags">
                <span className="tag">Encrypted</span>
                <span className="tag">HIPAA Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="how-it-works-section">
        <div className="section-container">
          <div className="section-header-center">
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">
              Get started in three simple steps
            </p>
          </div>
          <div className="steps-container">
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-icon">👤</div>
              <h3 className="step-title">Create Account</h3>
              <p className="step-description">
                Sign up in seconds with your email. Set up your profile and add your 
                medical information securely.
              </p>
            </div>
            <div className="step-connector"></div>
            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-icon">🔍</div>
              <h3 className="step-title">Find Doctor</h3>
              <p className="step-description">
                Search for doctors by specialty, location, or name. Check their 
                availability and ratings.
              </p>
            </div>
            <div className="step-connector"></div>
            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-icon">✅</div>
              <h3 className="step-title">Book & Manage</h3>
              <p className="step-description">
                Book appointments instantly, manage your schedule, and access all 
                your health records in one place.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="benefits" className="benefits-section">
        <div className="section-container">
          <div className="benefits-grid">
            <div className="benefits-content">
              <h2 className="section-title">Why Choose Our Platform?</h2>
              <div className="benefits-list">
                <div className="benefit-item">
                  <div className="benefit-icon">⚡</div>
                  <div className="benefit-text">
                    <h4>Lightning Fast</h4>
                    <p>Book appointments in under 60 seconds with our streamlined process</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">🌐</div>
                  <div className="benefit-text">
                    <h4>24/7 Access</h4>
                    <p>Access your health information anytime, anywhere, from any device</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">💰</div>
                  <div className="benefit-text">
                    <h4>Save Time & Money</h4>
                    <p>Reduce wait times, avoid unnecessary visits, and manage costs efficiently</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">🎯</div>
                  <div className="benefit-text">
                    <h4>Personalized Care</h4>
                    <p>Get tailored health recommendations based on your medical history</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="benefits-visual">
              <div className="benefit-card floating">
                <div className="benefit-stat">
                  <div className="stat-icon">⭐</div>
                  <div className="stat-info">
                    <div className="stat-value">4.9/5</div>
                    <div className="stat-text">Patient Rating</div>
                  </div>
                </div>
              </div>
              <div className="benefit-card floating" style={{ animationDelay: '0.2s' }}>
                <div className="benefit-stat">
                  <div className="stat-icon">⚡</div>
                  <div className="stat-info">
                    <div className="stat-value">60 sec</div>
                    <div className="stat-text">Avg. Booking Time</div>
                  </div>
                </div>
              </div>
              <div className="benefit-card floating" style={{ animationDelay: '0.4s' }}>
                <div className="benefit-stat">
                  <div className="stat-icon">🔒</div>
                  <div className="stat-info">
                    <div className="stat-value">100%</div>
                    <div className="stat-text">Data Secure</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Take Control of Your Health?</h2>
            <p className="cta-description">
              Join thousands of patients who trust our platform for their healthcare needs
            </p>
            <div className="cta-buttons">
              <Link to="/signup" className="cta-btn primary">
                <span>Get Started Free</span>
                <span className="btn-icon">→</span>
              </Link>
              <Link to="/login" className="cta-btn secondary">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-logo">
                <span className="brand-icon">🏥</span>
                <span className="brand-name">HealthCare Portal</span>
              </div>
              <p className="footer-description">
                Comprehensive healthcare management platform designed to simplify your 
                healthcare journey.
              </p>
            </div>
            <div className="footer-links">
              <h4>Quick Links</h4>
              <a href="#features">Features</a>
              <a href="#how-it-works">How It Works</a>
              <a href="#benefits">Benefits</a>
              <Link to="/login">Login</Link>
            </div>
            <div className="footer-links">
              <h4>Resources</h4>
              <a href="#help">Help Center</a>
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
              <a href="#contact">Contact Us</a>
            </div>
            <div className="footer-contact">
              <h4>Contact</h4>
              <p>📧 support@healthcare.com</p>
              <p>📞 +1 (555) 123-4567</p>
              <p>📍 123 Health St, Medical City</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 HealthCare Portal. All rights reserved.</p>
            <div className="footer-socials">
              <a href="#facebook" className="social-link">Facebook</a>
              <a href="#twitter" className="social-link">Twitter</a>
              <a href="#linkedin" className="social-link">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
