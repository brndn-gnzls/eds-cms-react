import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './LoginPage.module.css';

const LoginPage = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch(`${process.env.REACT_APP_STRAPI_BASE}/api/auth/local`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    identifier,
                    password
                }),
            });

            // Check if the response is not OK (Status 200)
            if (!response.ok) {
                const errorData = await response.json(); // Read response only once
                console.log('Response status:', response.status);
                console.log('Error message:', errorData.message);  // Log error message
                setError(errorData.message || '[-] Failed to authenticate');
                return;
            }

            const data = await response.json(); // Successful response body

            if (data.jwt) {
                // Store JWT in localStorage
                localStorage.setItem('token', data.jwt);
                navigate('/example');
            } else {
                setError('[-] Invalid Credentials');
            }
        } catch (err) {
            console.error('[-] Login failed: ', err);
            setError('[!] An unexpected error occurred');
        }
    };



    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Login</h1>
            <form className={styles.form} onSubmit={handleLogin}>
                <div className={styles.formGroup}>
                    <label htmlFor="identifier">Email or Username</label>
                    <input
                        type="text"
                        id="identifier"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className={styles.error}>{error}</p>}
                <button type="submit" className={styles.submitButton}>Login</button>
            </form>
        </div>
    );
};

export default LoginPage;