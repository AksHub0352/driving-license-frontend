import React from 'react';
import { isAuthenticated } from '../auth/auth';
import { Navigate, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


const PrivateRoute = ({ component: Component }) => {
    return (
        isAuthenticated() ? <>{Component}</> : <Navigate to="/login" />
    )
}

export default PrivateRoute;
