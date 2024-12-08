import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './styles.css';
import { apiClient } from '../common/Auth';

const EmployeeEdit = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchEmployeeDetails();
    }, [id]);

    const fetchEmployeeDetails = async () => {
        try {
            const response = await apiClient.get(`/employees/${id}`);
            setEmployee(response.data);
        } catch (error) {
            setError('Error fetching employee details');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    const handleBack = () => {
        navigate(-1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.values(employee).some(value => value === '')) {
            setError('All fields are required');
            return;
        }

        try {
            await apiClient.put(`/employees/${id}`, employee);
            navigate('/employees');
        } catch (error) {
            setError('Error updating employee details');
        }
    };

    if (!employee) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="container mt-5 employee-form">
            <button onClick={handleBack} className="btn btn-primary btn-sm">BACK</button>
            <h1>Edit Employee</h1>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        value={employee.username}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        value={employee.firstName}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        name="lastName"
                        value={employee.lastName}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={employee.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="dob">Date of Birth</label>
                    <input
                        type="date"
                        className="form-control"
                        id="dob"
                        name="dob"
                        value={employee.dob}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="age">Age</label>
                    <input
                        type="number"
                        className="form-control"
                        id="age"
                        name="age"
                        value={employee.age}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="salary">Salary</label>
                    <input
                        type="number"
                        className="form-control"
                        id="salary"
                        name="salary"
                        value={employee.salary}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Save Changes</button>
            </form>
        </div>
    );
};

export default EmployeeEdit;
