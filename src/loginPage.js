import React, { useState } from 'react';
import {  Amplify } from 'aws-amplify';
import { API as api} from 'aws-amplify'
import { useNavigate } from 'react-router-dom';
import awsExports from './aws-exports';

Amplify.configure(awsExports); // Configure Amplify

function LoginPage() {
    const [userID, setUserID] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Make a GET request to the API endpoint using userID
            const response = await api.get('apic1a4de00', `/users/${userID}`);
            setMessage(response.message);

            // Navigate to the dashboard page after successful authentication
            navigate('/dashboard', { state: { userName: response.name, role: response.role } });
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.message);
            } else if (error.message) {
                setMessage(error.message);
            }
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
                    value={userID}
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
