import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import EmployeeForm from '../components/EmployeeForm';

const EmployeeCreate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError('');

    try {
      await axiosClient.post('/employees', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/employees');
    } catch (err) {
      const message =
        err.response?.data?.message || 'Failed to create employee';
      setError(message);
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h3>Add New Employee</h3>
          <Link to="/employees" className="btn btn-secondary">
            Back to List
          </Link>
        </div>
        <div className="card-body">
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <EmployeeForm onSubmit={handleSubmit} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default EmployeeCreate;
