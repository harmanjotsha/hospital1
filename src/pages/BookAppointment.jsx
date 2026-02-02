import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/mockApi';
import { useAuth } from '../context/AuthContext';
import '../styles/Booking.css';

export const BookAppointment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  const doctor = location.state?.doctor;
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    doctorId: doctor?.id || '',
    doctorName: doctor?.name || '',
    specialty: doctor?.specialty || '',
    date: '',
    time: '',
    reason: '',
    notes: '',
    patientName: user?.name || '',
    patientPhone: user?.phone || '',
    patientEmail: user?.email || '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!doctor) {
      navigate('/search');
    }
  }, [doctor, navigate]);

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM'
  ];

  const bookingMutation = useMutation({
    mutationFn: api.bookAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries(['appointments']);
      navigate('/appointments', { 
        state: { message: 'Appointment booked successfully!' }
      });
    }
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validateStep = (currentStep) => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!formData.date) newErrors.date = 'Please select a date';
      if (!formData.time) newErrors.time = 'Please select a time';
    } else if (currentStep === 2) {
      if (!formData.reason) newErrors.reason = 'Please provide a reason for visit';
    } else if (currentStep === 3) {
      if (!formData.patientName) newErrors.patientName = 'Name is required';
      if (!formData.patientPhone) newErrors.patientPhone = 'Phone is required';
      if (!formData.patientEmail) newErrors.patientEmail = 'Email is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setStep(step - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep(step)) {
      bookingMutation.mutate(formData);
    }
  };

  if (!doctor) return null;

  return (
    <div className="booking-page">
      <div className="booking-container">
        <div className="booking-header">
          <h1>Book Appointment</h1>
          <p>Complete the form to schedule your visit</p>
        </div>

        <div className="progress-bar">
          <div className={`progress-step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
            <div className="step-number">1</div>
            <div className="step-label">Date & Time</div>
          </div>
          <div className={`progress-line ${step > 1 ? 'active' : ''}`}></div>
          <div className={`progress-step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
            <div className="step-number">2</div>
            <div className="step-label">Reason</div>
          </div>
          <div className={`progress-line ${step > 2 ? 'active' : ''}`}></div>
          <div className={`progress-step ${step >= 3 ? 'active' : ''} ${step > 3 ? 'completed' : ''}`}>
            <div className="step-number">3</div>
            <div className="step-label">Confirm</div>
          </div>
        </div>

        <div className="booking-content">
          <div className="doctor-summary">
            <img src={doctor.image} alt={doctor.name} />
            <div>
              <h3>{doctor.name}</h3>
              <p>{doctor.specialty}</p>
              <p className="location">📍 {doctor.location}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="booking-form">
            {step === 1 && (
              <div className="form-step">
                <h2>Select Date & Time</h2>
                
                <div className="form-group">
                  <label htmlFor="date">Appointment Date *</label>
                  <input
                    type="date"
                    id="date"
                    value={formData.date}
                    onChange={(e) => handleChange('date', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className={errors.date ? 'error' : ''}
                  />
                  {errors.date && <span className="error-text">{errors.date}</span>}
                </div>

                <div className="form-group">
                  <label>Select Time Slot *</label>
                  <div className="time-slots">
                    {timeSlots.map(time => (
                      <button
                        key={time}
                        type="button"
                        className={`time-slot ${formData.time === time ? 'selected' : ''}`}
                        onClick={() => handleChange('time', time)}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                  {errors.time && <span className="error-text">{errors.time}</span>}
                </div>

                <div className="form-actions">
                  <button 
                    type="button" 
                    onClick={() => navigate('/search')}
                    className="secondary-button"
                  >
                    Cancel
                  </button>
                  <button 
                    type="button" 
                    onClick={handleNext}
                    className="primary-button"
                  >
                    Next Step
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="form-step">
                <h2>Reason for Visit</h2>
                
                <div className="form-group">
                  <label htmlFor="reason">Primary Reason *</label>
                  <select
                    id="reason"
                    value={formData.reason}
                    onChange={(e) => handleChange('reason', e.target.value)}
                    className={errors.reason ? 'error' : ''}
                  >
                    <option value="">Select a reason</option>
                    <option value="Annual Checkup">Annual Checkup</option>
                    <option value="Follow-up">Follow-up Visit</option>
                    <option value="New Symptoms">New Symptoms</option>
                    <option value="Consultation">Consultation</option>
                    <option value="Test Results">Discuss Test Results</option>
                    <option value="Prescription Refill">Prescription Refill</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.reason && <span className="error-text">{errors.reason}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="notes">Additional Notes (Optional)</label>
                  <textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleChange('notes', e.target.value)}
                    placeholder="Please provide any additional information about your symptoms or concerns..."
                    rows="4"
                  />
                </div>

                <div className="form-actions">
                  <button 
                    type="button" 
                    onClick={handleBack}
                    className="secondary-button"
                  >
                    Back
                  </button>
                  <button 
                    type="button" 
                    onClick={handleNext}
                    className="primary-button"
                  >
                    Next Step
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="form-step">
                <h2>Confirm Details</h2>
                
                <div className="form-group">
                  <label htmlFor="patientName">Full Name *</label>
                  <input
                    type="text"
                    id="patientName"
                    value={formData.patientName}
                    onChange={(e) => handleChange('patientName', e.target.value)}
                    className={errors.patientName ? 'error' : ''}
                  />
                  {errors.patientName && <span className="error-text">{errors.patientName}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="patientPhone">Phone Number *</label>
                  <input
                    type="tel"
                    id="patientPhone"
                    value={formData.patientPhone}
                    onChange={(e) => handleChange('patientPhone', e.target.value)}
                    className={errors.patientPhone ? 'error' : ''}
                  />
                  {errors.patientPhone && <span className="error-text">{errors.patientPhone}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="patientEmail">Email Address *</label>
                  <input
                    type="email"
                    id="patientEmail"
                    value={formData.patientEmail}
                    onChange={(e) => handleChange('patientEmail', e.target.value)}
                    className={errors.patientEmail ? 'error' : ''}
                  />
                  {errors.patientEmail && <span className="error-text">{errors.patientEmail}</span>}
                </div>

                <div className="appointment-summary">
                  <h3>Appointment Summary</h3>
                  <div className="summary-item">
                    <span>Doctor:</span>
                    <strong>{doctor.name}</strong>
                  </div>
                  <div className="summary-item">
                    <span>Specialty:</span>
                    <strong>{doctor.specialty}</strong>
                  </div>
                  <div className="summary-item">
                    <span>Date:</span>
                    <strong>{new Date(formData.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</strong>
                  </div>
                  <div className="summary-item">
                    <span>Time:</span>
                    <strong>{formData.time}</strong>
                  </div>
                  <div className="summary-item">
                    <span>Reason:</span>
                    <strong>{formData.reason}</strong>
                  </div>
                </div>

                <div className="form-actions">
                  <button 
                    type="button" 
                    onClick={handleBack}
                    className="secondary-button"
                  >
                    Back
                  </button>
                  <button 
                    type="submit"
                    className="primary-button"
                    disabled={bookingMutation.isPending}
                  >
                    {bookingMutation.isPending ? 'Booking...' : 'Confirm Booking'}
                  </button>
                </div>

                {bookingMutation.isError && (
                  <div className="error-message">
                    Failed to book appointment. Please try again.
                  </div>
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
