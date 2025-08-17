import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CustomerDashboard from './pages/CustomerDashboard';
import AgentDashboard from './pages/AgentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ComplaintForm from './pages/ComplaintForm';
import ComplaintDetails from './pages/ComplaintDetails';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ComplaintProvider } from './contexts/ComplaintContext';

function App() {
  return (
    <AuthProvider>
      <ComplaintProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/dashboard/*" element={<ProtectedRoute><DashboardRouter /></ProtectedRoute>} />
              <Route path="/complaint/new" element={<ProtectedRoute><ComplaintForm /></ProtectedRoute>} />
              <Route path="/complaint/:id" element={<ProtectedRoute><ComplaintDetails /></ProtectedRoute>} />
            </Routes>
          </div>
        </Router>
      </ComplaintProvider>
    </AuthProvider>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

function DashboardRouter() {
  const { user } = useAuth();
  
  if (!user) return <Navigate to="/login" />;
  
  switch (user.userType) {
    case 'customer':
      return <CustomerDashboard />;
    case 'agent':
      return <AgentDashboard />;
    case 'admin':
      return <AdminDashboard />;
    default:
      return <Navigate to="/" />;
  }
}

export default App;