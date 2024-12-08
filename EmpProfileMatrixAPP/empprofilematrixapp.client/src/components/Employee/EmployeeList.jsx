import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TbLogout2 } from "react-icons/tb";
import { apiClient } from '../common/Auth';
import './styles.css'; // Importing custom styles for the page

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await apiClient.get('/employees');
            setEmployees(response.data);
            setLoading(false);
        } catch (error) {
            setError('Error fetching employee list');
            setLoading(false);
        }
    };

    const handleLogout = () => {
        // Clear authentication data (example: localStorage or cookies)
        localStorage.removeItem('authToken'); // Remove token
        navigate('/employees/login'); // Redirect to login page
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="container mt-5">
            <button
                className="w-12 h-12 bg-blue-500 text-white rounded-full hover:bg-blue-600 flex items-center justify-center"
                onClick={handleLogout}
            >
                <TbLogout2 size={20} />
            </button>
            <h1 className="text-center mb-5">Employee List</h1>

            <button className="btn btn-primary">
                <Link to="/employees/create" className="btn-primary">Add Employee</Link>
            </button>
            <div className="table-responsive">
                <table className="table table-bordered table-striped">
                    <thead className="table-header">
                        <tr>
                            <th>EmpId</th>
                            <th>Username</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Date of Birth</th>
                            <th>Age</th>
                            <th>Salary</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(employee => (
                            <tr key={employee.empId}>
                                <td>{employee.empId}</td>
                                <td>{employee.username}</td>
                                <td>{employee.firstName} {employee.lastName}</td>
                                <td>{employee.email}</td>
                                <td>{employee.dob}</td>
                                <td>{employee.age}</td>
                                <td>{employee.salary}</td>
                                <td>
                                    <Link to={`/employees/edit/${employee.empId}`} className="btn btn-warning btn-sm">Edit</Link>
                                    <Link to={`/employees/delete/${employee.empId}`} className="btn btn-danger btn-sm">Delete</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeList;
