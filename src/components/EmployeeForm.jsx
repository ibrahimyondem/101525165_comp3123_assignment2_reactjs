import React, { useState, useEffect } from 'react';

const EmployeeForm = ({ employee, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    position: '',
    department: '',
    dateOfJoining: '',
    salary: '',
  });
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (employee) {
      setFormData({
        firstName: employee.first_name || '',
        lastName: employee.last_name || '',
        email: employee.email || '',
        position: employee.position || '',
        department: employee.department || '',
        dateOfJoining: employee.date_of_joining
          ? employee.date_of_joining.split('T')[0]
          : '',
        salary: employee.salary || '',
      });
      if (employee.profile_picture) {
        setImagePreview(`http://localhost:3001/uploads/${employee.profile_picture}`);
      }
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.position.trim()) {
      newErrors.position = 'Position is required';
    }
    if (!formData.department.trim()) {
      newErrors.department = 'Department is required';
    }
    if (!formData.salary) {
      newErrors.salary = 'Salary is required';
    } else if (isNaN(formData.salary) || formData.salary <= 0) {
      newErrors.salary = 'Salary must be a positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const data = new FormData();
    data.append('first_name', formData.firstName);
    data.append('last_name', formData.lastName);
    data.append('email', formData.email);
    data.append('position', formData.position);
    data.append('department', formData.department);
    data.append('salary', formData.salary);
    if (formData.dateOfJoining) {
      data.append('date_of_joining', formData.dateOfJoining);
    }
    if (profileImage) {
      data.append('profile_picture', profileImage);
    }

    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="firstName" className="form-label">
            First Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter first name"
          />
          {errors.firstName && (
            <div className="invalid-feedback">{errors.firstName}</div>
          )}
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter last name"
          />
          {errors.lastName && (
            <div className="invalid-feedback">{errors.lastName}</div>
          )}
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email <span className="text-danger">*</span>
        </label>
        <input
          type="email"
          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email address"
        />
        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="position" className="form-label">
            Position <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className={`form-control ${errors.position ? 'is-invalid' : ''}`}
            id="position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            placeholder="e.g., Developer, Manager"
          />
          {errors.position && (
            <div className="invalid-feedback">{errors.position}</div>
          )}
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="department" className="form-label">
            Department <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className={`form-control ${errors.department ? 'is-invalid' : ''}`}
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="e.g., IT, HR, Sales"
          />
          {errors.department && (
            <div className="invalid-feedback">{errors.department}</div>
          )}
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="dateOfJoining" className="form-label">
            Date of Joining
          </label>
          <input
            type="date"
            className="form-control"
            id="dateOfJoining"
            name="dateOfJoining"
            value={formData.dateOfJoining}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="salary" className="form-label">
            Salary <span className="text-danger">*</span>
          </label>
          <input
            type="number"
            className={`form-control ${errors.salary ? 'is-invalid' : ''}`}
            id="salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder="Enter salary"
          />
          {errors.salary && (
            <div className="invalid-feedback">{errors.salary}</div>
          )}
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="profileImage" className="form-label">
          Profile Image
        </label>
        <input
          type="file"
          className="form-control"
          id="profileImage"
          accept="image/*"
          onChange={handleImageChange}
        />
        <small className="form-text text-muted">
          Upload a profile image (optional)
        </small>
      </div>

      {imagePreview && (
        <div className="mb-3">
          <label className="form-label">Image Preview</label>
          <div>
            <img
              src={imagePreview}
              alt="Preview"
              style={{
                maxWidth: '200px',
                maxHeight: '200px',
                objectFit: 'cover',
                borderRadius: '8px',
              }}
            />
          </div>
        </div>
      )}

      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? 'Submitting...' : employee ? 'Update Employee' : 'Add Employee'}
      </button>
    </form>
  );
};

export default EmployeeForm;
