import React from 'react';
import { Link } from 'react-router-dom';
import './WelcomePage.css';

const WelcomePage = () => {
    return (
        <div className="welcome-container">
            <div className="background-image"></div>

            <div className="navbar">
                <Link to="/signup" className="button">Sign Up</Link>
                <Link to="/login" className="button">Login</Link>
            </div>
        </div>
    );
}

export default WelcomePage;
