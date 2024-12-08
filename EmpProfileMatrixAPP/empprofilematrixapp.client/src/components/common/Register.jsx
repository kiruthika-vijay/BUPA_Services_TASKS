import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiClient } from './Auth'; // Assume this is the API client for backend communication
import './login.css'; // Import the shared CSS
import { IoMdEyeOff, IoMdEye } from "react-icons/io";

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [dob, setDob] = useState('');
    const [age, setAge] = useState('');
    const [salary, setSalary] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        // Ensure required fields are filled
        if (!firstName || !lastName || !email || !username) {
            setError("Please fill in all required fields.");
            return;
        }

        try {
            const response = await apiClient.post('/Aauth/register', {
                username,
                password,
                firstName,
                lastName,
                email,
                dob,
                age,
                salary,
            });

            setSuccessMessage('Registration successful! You can now login.');
            setTimeout(() => {
                navigate('/employees/login'); // Redirect to login page after successful registration
            }, 2000);
            console.log("Registration successful", response.data);
        } catch (err) {
            setError('Registration failed. Please try again.');
            console.error('Registration failed:', err);
        }
    };

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="card">
                <div className="text-center mb-6">
                    <h2>Create Your Account</h2>
                    <p>Please enter your details to register</p>
                </div>
                <form onSubmit={handleRegister} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="Enter your first name"
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Enter your last name"
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="dob">Date of Birth</label>
                        <input
                            type="date"
                            id="dob"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="age">Age</label>
                        <input
                            type="number"
                            id="age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            placeholder="Enter your age"
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="salary">Salary</label>
                        <input
                            type="number"
                            id="salary"
                            value={salary}
                            onChange={(e) => setSalary(e.target.value)}
                            placeholder="Enter your salary"
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                    <div style={{ position: "relative" }}>
                        <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="password">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="w-full px-3 py-2 border rounded-md"
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
                    <div style={{ position: "relative" }}>
                        <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm your password"
                            className="w-full px-3 py-2 border rounded-md"
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
                            onClick={toggleConfirmPasswordVisibility}
                        >
                            {showConfirmPassword ? (
                                <IoMdEyeOff /> // Eye-slash icon for visibility off
                            ) : (
                                <IoMdEye /> // Eye icon for visibility on
                            )}
                        </span>
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    {successMessage && <p className="success-message">{successMessage}</p>}
                    <button
                        type="submit"
                        className="btn-login"
                    >
                        Register
                    </button>
                </form>
                <p className="register-link">
                    Already have an account? <Link to="/employees/login" className="text-indigo-600 hover:underline font-semibold">Login here</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
