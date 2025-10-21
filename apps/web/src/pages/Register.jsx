// apps/web/src/pages/Register.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { useLocalAuth } from '../hooks/useLocalAuth';

export default function Register() {
    // console.log("All Environment Variables:", process.env);
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { handleLocalSuccess,
    handleLocalError,
    // localSignOut,
    localError,
    loading } = useLocalAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await handleLocalSuccess(email, password);
            navigate(ROUTES.DASHBOARD);
        } catch (error) {
            if (error) {
                if (error.message.includes("already registered")) {
                    navigate(ROUTES.DASHBOARD);
                    return;
                } else if (error.message.includes("already taken")) {
                    alert("This email is already registered. Redirecting to login page.");
                    navigate(ROUTES.LOGIN);
                    return;
                }
            } 
            console.error("Registration failed: ", error);
            alert("Registration failed. Please try again.");
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