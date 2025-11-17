import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../api/axiosClient';

const EmployeeSearch = () => {
  const [department, setDepartment] = useState('');
  const [position, setPosition] = useState('');
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setSearched(false);

    if (!department && !position) {
      setError('Please enter at least one search criteria');
      setLoading(false);
      return;
    }

    try {
      const params = {};
      if (department) params.department = department;
      if (position) params.position = position;

      const response = await axiosClient.get('/employees/search', { params });
      setEmployees(response.data.data);
      setSearched(true);
      setLoading(false);
    } catch (err) {
      setError('Failed to search employees');
      setLoading(false);
    }
  };

  const handleClear = () => {
    setDepartment('');
    setPosition('');
    setEmployees([]);
    setSearched(false);
    setError('');
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h3>Search Employees</h3>
        </div>
        <div className="card-body">
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSearch}>
            <div className="row">
              <div className="col-md-5 mb-3">
                <label htmlFor="department" className="form-label">
                  Department
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="e.g., IT, HR, Sales"
                />
              </div>

              <div className="col-md-5 mb-3">
                <label htmlFor="position" className="form-label">
                  Position
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="position"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  placeholder="e.g., Developer, Manager"
                />
              </div>

              <div className="col-md-2 mb-3 d-flex align-items-end">
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? 'Searching...' : 'Search'}
                </button>
              </div>
            </div>

            <div className="mb-3">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleClear}
              >
                Clear
              </button>
              <Link to="/employees" className="btn btn-outline-secondary ms-2">
                Back to List
              </Link>
            </div>
          </form>
        </div>
      </div>

      {searched && (
        <div className="card mt-4">
          <div className="card-header">
            <h4>Search Results ({employees.length} found)</h4>
          </div>
          <div className="card-body">
            {employees.length === 0 ? (
              <div className="alert alert-info">
                No employees found matching your search criteria.
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th>Photo</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Position</th>
                      <th>Department</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((employee) => (
                      <tr key={employee._id}>
                        <td>
                          {employee.profile_picture ? (
                            <img
                              src={`http://localhost:3001/uploads/${employee.profile_picture}`}
                              alt={`${employee.first_name} ${employee.last_name}`}
                              style={{
                                width: '50px',
                                height: '50px',
                                objectFit: 'cover',
                                borderRadius: '50%',
                              }}
                            />
                          ) : (
                            <div
                              style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                backgroundColor: '#ccc',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <span>N/A</span>
                            </div>
                          )}
                        </td>
                        <td>{`${employee.first_name} ${employee.last_name}`}</td>
                        <td>{employee.email}</td>
                        <td>{employee.position}</td>
                        <td>{employee.department}</td>
                        <td>
                          <Link
                            to={`/employees/${employee._id}`}
                            className="btn btn-sm btn-info me-2"
                          >
                            View
                          </Link>
                          <Link
                            to={`/employees/${employee._id}/edit`}
                            className="btn btn-sm btn-warning"
                          >
                            Edit
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeSearch;
