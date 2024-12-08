import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './styles.css';
import { apiClient } from '../common/Auth';

const EmployeeDetails = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        fetchEmployeeDetails();
    }, [id]);

    const fetchEmployeeDetails = async () => {
        try {
            const response = await apiClient.get(`/employees/${id}`);
            setEmployee(response.data);
            setLoading(false);
        } catch (error) {
            setError('Error fetching employee details');
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="container mt-5 employee-card">
            <h1>Employee Details</h1>
            <div className="employee-info">
                <p><strong>Username:</strong> {employee.username}</p>
                <p><strong>Name:</strong> {employee.firstName} {employee.lastName}</p>
                <p><strong>Email:</strong> {employee.email}</p>
                <p><strong>Date of Birth:</strong> {employee.dob}</p>
                <p><strong>Age:</strong> {employee.age}</p>
                <p><strong>Salary:</strong> ${employee.salary}</p>
            </div>
            <Link to="/employees" className="btn btn-primary">Back to Employee List</Link>
        </div>
    );
};

export default EmployeeDetails;
