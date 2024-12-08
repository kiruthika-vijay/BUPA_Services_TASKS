import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './styles.css';
import { apiClient } from '../common/Auth';

const EmployeeDeleteConfirm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            await apiClient.delete(`/employees/${id}`);
            navigate('/employees'); // Redirect to employee list after deletion
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h1>Delete Employee</h1>
            <p>Are you sure you want to delete this employee?</p>
            <div className="actions">
                <button className="btn btn-danger btn-sm" onClick={handleDelete}>Yes, Delete</button>
                <Link to="/employees" className="btn btn-secondary btn-sm">Cancel</Link>
            </div>
        </div>
    );
};

export default EmployeeDeleteConfirm;
