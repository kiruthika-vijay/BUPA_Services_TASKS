import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import { apiClient } from '../common/Auth';
import { IoMdEyeOff, IoMdEye } from "react-icons/io";

const EmployeeCreate = () => {
    const [employee, setEmployee] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        dob: '',
        age: '',
        salary: ''
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
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
            await apiClient.post('/employees', employee);
            navigate('/employees'); // Redirect to employee list
        } catch (error) {
            setError('There was an error adding the employee');
        }
    };

    return (
        <div className="container mt-5 employee-form">
            <button onClick={handleBack} className="btn btn-primary btn-sm">BACK</button>
            <h1>Create New Employee</h1>
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
                <div className="form-group" style={{ position: "relative" }}>
                    <label htmlFor="password">Password</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        id="password"
                        name="password"
                        value={employee.password}
                        onChange={handleChange}
                    />
                    <span
                        className="input-group-text"
                        style={{
                            cursor: "pointer",
                            position: "absolute",
                            right: "10px", // Align icon to the right inside input field
                            top: "50%",
                            zIndex: 1, // Ensure the icon is on top
                        }}
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ? (
                            <IoMdEyeOff /> // Eye-slash icon for visibility off
                        ) : (
                            <IoMdEye /> // Eye icon for visibility on
                        )}
                    </span>
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
                <button type="submit" className="btn btn-success">Create Employee</button>
            </form>
        </div>
    );
};

export default EmployeeCreate;
