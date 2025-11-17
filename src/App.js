import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import EmployeeList from './pages/EmployeeList';
import EmployeeDetails from './pages/EmployeeDetails';
import EmployeeCreate from './pages/EmployeeCreate';
import EmployeeEdit from './pages/EmployeeEdit';
import EmployeeSearch from './pages/EmployeeSearch';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Routes */}
            <Route
              path="/employees"
              element={
                <ProtectedRoute>
                  <EmployeeList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employees/new"
              element={
                <ProtectedRoute>
                  <EmployeeCreate />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employees/search"
              element={
                <ProtectedRoute>
                  <EmployeeSearch />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employees/:id"
              element={
                <ProtectedRoute>
                  <EmployeeDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employees/:id/edit"
              element={
                <ProtectedRoute>
                  <EmployeeEdit />
                </ProtectedRoute>
              }
            />

            {/* Default Route */}
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
