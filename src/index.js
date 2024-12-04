import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter for routing
import App from './App';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports'; 

Amplify.configure(awsExports);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter> {/* Wrap the App in BrowserRouter */}
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
