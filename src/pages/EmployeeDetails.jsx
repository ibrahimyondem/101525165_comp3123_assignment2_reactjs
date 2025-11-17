import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axiosClient from '../api/axiosClient';

const EmployeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  const fetchEmployee = async () => {
    try {
      const response = await axiosClient.get(`/employees/${id}`);
      setEmployee(response.data.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch employee details');
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await axiosClient.delete(`/employees/${id}`);
        navigate('/employees');
      } catch (err) {
        alert('Failed to delete employee');
      }
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error || !employee) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          {error || 'Employee not found'}
        </div>
        <Link to="/employees" className="btn btn-secondary">
          Back to Employee List
        </Link>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h3>Employee Details</h3>
          <div>
            <Link
              to={`/employees/${id}/edit`}
              className="btn btn-warning me-2"
            >
              Edit
            </Link>
            <button onClick={handleDelete} className="btn btn-danger me-2">
              Delete
            </button>
            <Link to="/employees" className="btn btn-secondary">
              Back to List
            </Link>
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4 text-center">
              {employee.profile_picture ? (
                <img
                  src={`http://localhost:3001/uploads/${employee.profile_picture}`}
                  alt={`${employee.first_name} ${employee.last_name}`}
                  className="img-fluid rounded"
                  style={{ maxWidth: '300px', maxHeight: '300px' }}
                />
              ) : (
                <div
                  className="bg-secondary text-white d-flex align-items-center justify-content-center"
                  style={{ width: '300px', height: '300px', margin: '0 auto' }}
                >
                  <h1>No Image</h1>
                </div>
              )}
            </div>
            <div className="col-md-8">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <th width="30%">First Name</th>
                    <td>{employee.first_name}</td>
                  </tr>
                  <tr>
                    <th>Last Name</th>
                    <td>{employee.last_name}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{employee.email}</td>
                  </tr>
                  <tr>
                    <th>Position</th>
                    <td>{employee.position}</td>
                  </tr>
                  <tr>
                    <th>Department</th>
                    <td>{employee.department}</td>
                  </tr>
                  <tr>
                    <th>Date of Joining</th>
                    <td>
                      {employee.date_of_joining
                        ? new Date(employee.date_of_joining).toLocaleDateString()
                        : 'N/A'}
                    </td>
                  </tr>
                  <tr>
                    <th>Salary</th>
                    <td>
                      {employee.salary
                        ? `$${employee.salary.toLocaleString()}`
                        : 'N/A'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
