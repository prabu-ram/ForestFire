import React, { useState } from 'react';
import { Amplify } from 'aws-amplify';
import { get } from 'aws-amplify/api';
import { useNavigate } from 'react-router-dom';
import awsExports from './aws-exports';

Amplify.configure(awsExports); 

function LoginPage() {
    const [userId, setUserID] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); 

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await get('apic1a4de00', `/users/${userId}`);
            setMessage(response.message);

            // Navigating to the dashboard on successful login
            navigate('/dashboard', { state: { userName: response.name, role: response.role } });
        } catch (error) {
            setMessage(error.response?.data?.message || error.message || 'An error occurred');
            console.error('Error during API request:', error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="User ID"
                    value={userId}
                    onChange={(e) => setUserID(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default LoginPage;
