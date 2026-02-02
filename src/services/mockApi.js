export const mockDoctors = [
  { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Cardiology', location: 'New York', rating: 4.8, experience: 15, image: '/doctor.jpg', availableDates: ['2026-02-05', '2026-02-07', '2026-02-10'] },
  { id: 2, name: 'Dr. Michael Chen', specialty: 'Dermatology', location: 'Los Angeles', rating: 4.9, experience: 12, image: '/doctor.jpg', availableDates: ['2026-02-06', '2026-02-08', '2026-02-11'] },
  { id: 3, name: 'Dr. Emily Williams', specialty: 'Pediatrics', location: 'Chicago', rating: 4.7, experience: 10, image: '/doctor.jpg', availableDates: ['2026-02-05', '2026-02-09', '2026-02-12'] },
  { id: 4, name: 'Dr. James Davis', specialty: 'Orthopedics', location: 'Houston', rating: 4.6, experience: 18, image: '/doctor.jpg', availableDates: ['2026-02-07', '2026-02-10', '2026-02-13'] },
  { id: 5, name: 'Dr. Lisa Anderson', specialty: 'Neurology', location: 'Phoenix', rating: 4.9, experience: 14, image: '/doctor.jpg', availableDates: ['2026-02-06', '2026-02-11', '2026-02-14'] },
  { id: 6, name: 'Dr. Robert Martinez', specialty: 'Cardiology', location: 'Philadelphia', rating: 4.8, experience: 20, image: '/doctor.jpg', availableDates: ['2026-02-08', '2026-02-12', '2026-02-15'] },
  { id: 7, name: 'Dr. Jessica Taylor', specialty: 'General Practice', location: 'San Antonio', rating: 4.7, experience: 8, image: '/doctor.jpg', availableDates: ['2026-02-05', '2026-02-08', '2026-02-11'] },
  { id: 8, name: 'Dr. David Brown', specialty: 'Psychiatry', location: 'San Diego', rating: 4.8, experience: 16, image: '/doctor.jpg', availableDates: ['2026-02-06', '2026-02-09', '2026-02-12'] },
];

export const mockAppointments = [
  { id: 1, doctorId: 1, doctorName: 'Dr. Sarah Johnson', specialty: 'Cardiology', date: '2026-02-10', time: '10:00 AM', status: 'upcoming', reason: 'Annual Checkup' },
  { id: 2, doctorId: 3, doctorName: 'Dr. Emily Williams', specialty: 'Pediatrics', date: '2026-02-15', time: '2:00 PM', status: 'upcoming', reason: 'Follow-up' },
  { id: 3, doctorId: 2, doctorName: 'Dr. Michael Chen', specialty: 'Dermatology', date: '2026-01-15', time: '11:00 AM', status: 'completed', reason: 'Skin Consultation' },
  { id: 4, doctorId: 5, doctorName: 'Dr. Lisa Anderson', specialty: 'Neurology', date: '2025-12-20', time: '9:00 AM', status: 'completed', reason: 'Headache Treatment' },
];

export const mockMedicalRecords = {
  labResults: [
    { id: 1, test: 'Blood Glucose', value: 95, unit: 'mg/dL', date: '2026-01-20', status: 'Normal', range: '70-100' },
    { id: 2, test: 'Cholesterol', value: 180, unit: 'mg/dL', date: '2026-01-20', status: 'Normal', range: '<200' },
    { id: 3, test: 'Blood Pressure', value: '120/80', unit: 'mmHg', date: '2026-01-25', status: 'Normal', range: '<120/80' },
    { id: 4, test: 'Hemoglobin', value: 14.5, unit: 'g/dL', date: '2026-01-20', status: 'Normal', range: '12-16' },
  ],
  vitals: [
    { date: '2026-01-25', weight: 70, height: 170, bmi: 24.2, heartRate: 72, temperature: 36.8 },
    { date: '2026-01-15', weight: 71, height: 170, bmi: 24.6, heartRate: 75, temperature: 36.6 },
    { date: '2026-01-05', weight: 71.5, height: 170, bmi: 24.7, heartRate: 73, temperature: 36.7 },
    { date: '2025-12-20', weight: 72, height: 170, bmi: 24.9, heartRate: 74, temperature: 36.9 },
  ],
  prescriptions: [
    { id: 1, medication: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', prescribedBy: 'Dr. Sarah Johnson', date: '2026-01-15', status: 'Active' },
    { id: 2, medication: 'Metformin', dosage: '500mg', frequency: 'Twice daily', prescribedBy: 'Dr. Sarah Johnson', date: '2026-01-15', status: 'Active' },
  ]
};

export const healthTips = [
  { id: 1, title: 'Stay Hydrated', content: 'Drink at least 8 glasses of water daily to maintain optimal health.', icon: '💧' },
  { id: 2, title: 'Regular Exercise', content: 'Aim for 30 minutes of moderate exercise at least 5 days a week.', icon: '🏃' },
  { id: 3, title: 'Balanced Diet', content: 'Include fruits, vegetables, whole grains, and lean proteins in your meals.', icon: '🥗' },
  { id: 4, title: 'Quality Sleep', content: 'Get 7-9 hours of sleep each night for better physical and mental health.', icon: '😴' },
];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  login: async (email, password) => {
    await delay(800);
    if (email && password) {
      return {
        user: {
          id: 1,
          email,
          name: 'John Doe',
          phone: '+1 (555) 123-4567',
          dateOfBirth: '1990-05-15',
          gender: 'Male',
          address: '123 Main St, New York, NY 10001',
          bloodType: 'O+',
          allergies: ['Penicillin'],
        },
        token: 'mock-jwt-token-' + Date.now()
      };
    }
    throw new Error('Invalid credentials');
  },

  signup: async (userData) => {
    await delay(800);
    return {
      user: { ...userData, id: Date.now() },
      token: 'mock-jwt-token-' + Date.now()
    };
  },

  // Doctors
  getDoctors: async (filters = {}) => {
    let filtered = [...mockDoctors];
    
    if (filters.specialty) {
      filtered = filtered.filter(d => d.specialty === filters.specialty);
    }
    if (filters.location) {
      filtered = filtered.filter(d => d.location.toLowerCase().includes(filters.location.toLowerCase()));
    }
    if (filters.search) {
      filtered = filtered.filter(d => 
        d.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        d.specialty.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    
    return filtered;
  },

  getDoctor: async (id) => {
    await delay(300);
    return mockDoctors.find(d => d.id === parseInt(id));
  },

  getAppointments: async () => {
    await delay(500);
    return [...mockAppointments];
  },

  bookAppointment: async (appointmentData) => {
    await delay(800);
    const newAppointment = {
      id: Date.now(),
      ...appointmentData,
      status: 'upcoming'
    };
    mockAppointments.unshift(newAppointment);
    return newAppointment;
  },

  cancelAppointment: async (id) => {
    await delay(500);
    const index = mockAppointments.findIndex(a => a.id === id);
    if (index !== -1) {
      mockAppointments[index].status = 'cancelled';
      return mockAppointments[index];
    }
    throw new Error('Appointment not found');
  },

  getMedicalRecords: async () => {
    await delay(600);
    return mockMedicalRecords;
  },

  getHealthTips: async () => {
    return healthTips;
  },

  updateProfile: async (profileData) => {
    await delay(700);
    return { ...profileData, updated: true };
  }
};

export const specialties = [
  'All Specialties',
  'Cardiology',
  'Dermatology',
  'Pediatrics',
  'Orthopedics',
  'Neurology',
  'General Practice',
  'Psychiatry'
];

export const locations = [
  'All Locations',
  'New York',
  'Los Angeles',
  'Chicago',
  'Houston',
  'Phoenix',
  'Philadelphia',
  'San Antonio',
  'San Diego'
];
