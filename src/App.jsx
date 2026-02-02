import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './components/Layout';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { Search } from './pages/Search';
import { Appointments } from './pages/Appointments';
import { Profile } from './pages/Profile';
import './App.css';

const BookAppointment = lazy(() => import('./pages/BookAppointment').then(module => ({ default: module.BookAppointment })));
const MedicalRecords = lazy(() => import('./pages/MedicalRecords').then(module => ({ default: module.MedicalRecords })));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/search"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Search />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/book"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Suspense fallback={
                      <div className="loading-state">
                        <div className="spinner"></div>
                        <p>Loading...</p>
                      </div>
                    }>
                      <BookAppointment />
                    </Suspense>
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/appointments"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Appointments />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/records"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Suspense fallback={
                      <div className="loading-state">
                        <div className="spinner"></div>
                        <p>Loading...</p>
                      </div>
                    }>
                      <MedicalRecords />
                    </Suspense>
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Profile />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
