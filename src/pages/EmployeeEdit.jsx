import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import EmployeeForm from '../components/EmployeeForm';

const EmployeeEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  const fetchEmployee = async () => {
    try {
      const response = await axiosClient.get(`/employees/${id}`);
      setEmployee(response.data.data);
      setFetchLoading(false);
    } catch (err) {
      setError('Failed to fetch employee details');
      setFetchLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError('');

    try {
      await axiosClient.put(`/employees/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate(`/employees/${id}`);
    } catch (err) {
      const message =
        err.response?.data?.message || 'Failed to update employee';
      setError(message);
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          Employee not found
        </div>
        <Link to="/employees" className="btn btn-secondary">
          Back to List
        </Link>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h3>Edit Employee</h3>
          <div>
            <Link
              to={`/employees/${id}`}
              className="btn btn-secondary me-2"
            >
              Cancel
            </Link>
            <Link to="/employees" className="btn btn-secondary">
              Back to List
            </Link>
          </div>
        </div>
        <div className="card-body">
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <EmployeeForm
            employee={employee}
            onSubmit={handleSubmit}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeeEdit;
