import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/Api';
import { useNavigate } from 'react-router-dom'; // Correct import

const SignInPage = () => {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [loginUser, { loading, error }] = useMutation(LOGIN_USER);
    const navigate = useNavigate(); // Correctly instantiated useNavigate hook

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await loginUser({ variables: { ...formState } });
            // Assuming the token is part of the response data, save it
            // localStorage.setItem('token', data.loginUser.token);
            alert('Sign in successful! Welcome back.');
            navigate('/'); // Correctly use navigate for redirection
        } catch (e) {
            console.error('Sign in error:', e);
            alert('Failed to sign in. Please check your credentials.');
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({ ...formState, [name]: value });
    };

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <input
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="Your email"
                />
                <input
                    name="password"
                    type="password"
                    value={formState.password}
                    onChange={handleChange}
                    placeholder="Password"
                />
                <button type="submit" disabled={loading}>Submit</button>
            </form>
            {error && <div style={{ color: 'red' }}>Login failed. Please check your credentials.</div>}
        </div>
    );
};

export default SignInPage;
