import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

export default function Register() {
    console.log("All Environment Variables:", process.env);
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const registrationData = {
            email: email,
            password: password
        };
        console.log("AUTH_API_BASE_URL: ", API_BASE_URL);
        try {
            const response = await fetch(`${API_BASE_URL}/api/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registrationData),
            })

            if (response.status === 409) {
                alert('Your email is already registered. Redirecting to login page.');
                navigate(ROUTES.LOGIN);
                return; // no further action needed
            }
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Registration failed on the server.');
            }
            const data = await response.json();
            console.log("successfully received data: ", data);
            navigate(ROUTES.DASHBOARD);
        } catch (error) {
            console.error('Frontend Error:', error.message);
            // alert('An error occurred. Check the console for details.');
        }
    }

    return (
        <div>
            <h1>Please follow the steps to reigster</h1>
            {console.log("registration component rendered")}
            <form onSubmit={handleSubmit}>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required/>
                <input type="password" id="password"value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required/>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}