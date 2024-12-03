import React from 'react';
import { useLocation } from 'react-router-dom';

function Dashboard() {
    const location = useLocation();
    const { userName, role } = location.state || {};

    return (
        <div>
            <h2>Dashboard</h2>
            <p>Welcome, {userName}!</p>
            <p>Your role is: {role}</p>
        </div>
    );
}

export default Dashboard;
