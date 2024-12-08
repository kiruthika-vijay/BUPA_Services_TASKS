import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeList from './components/Employee/EmployeeList';
import EmployeeDetails from './components/Employee/EmployeeDetails';
import EmployeeCreate from './components/Employee/EmployeeCreate';
import EmployeeEdit from './components/Employee/EmployeeEdit';
import EmployeeDeleteConfirm from './components/Employee/EmployeeDeleteConfirm';
import Login from './components/common/Login';
import { AuthProvider } from './components/common/AuthContext';
import Register from './components/common/Register';

const App = () => (
    <Router>
        <AuthProvider>
            <Routes>
                <Route path="/employees/login" element={<Login />} />
                <Route path="/employees/register" element={<Register />} />
                <Route path="/employees" element={<EmployeeList />} />
                <Route path="/employees/details/:id" element={<EmployeeDetails />} />
                <Route path="/employees/create" element={<EmployeeCreate />} />
                <Route path="/employees/edit/:id" element={<EmployeeEdit />} />
                <Route path="/employees/delete/:id" element={<EmployeeDeleteConfirm />} />
            </Routes>
        </AuthProvider>
    </Router>
);

export default App;
