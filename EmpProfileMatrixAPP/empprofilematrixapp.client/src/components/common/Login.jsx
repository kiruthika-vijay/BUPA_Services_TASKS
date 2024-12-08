import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { apiClient, storeToken } from './Auth';
import './login.css'; // Import CSS
import { IoMdEyeOff, IoMdEye } from "react-icons/io";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setIsLoggedIn } = useContext(AuthContext);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await apiClient.post('/Aauth/login', {
                email,
                password,
            });

            storeToken(response.data);
            setIsLoggedIn(true);
            console.log("Login successful", response.data);

            // Navigate to the Home component/page
            navigate('/employees');
        }
        catch (err) {
            setError('Invalid username or password');
            console.error('Login failed:', err);
        }
    };

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="card">
                <div className="text-center mb-6">
                    <h2>EmpProfileMatrix</h2>
                    <p>Please enter your login details</p>
                </div>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                        />
                    </div>
                    <div style={{ position: "relative" }}>
                        <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="password">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
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
                    <div className="flex justify-between items-center">
                        <Link to="/employees/forgot-password" className="forgot-password">Forgot Password?</Link>
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button
                        type="submit"
                        className="btn-login"
                    >
                        Log In
                    </button>
                </form>
                <p className="register-link">
                    Don't have an account? <Link to="/employees/register" className="text-indigo-600 hover:underline font-semibold">Register here</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
