import React, { useState } from 'react';

const Login = ({ onLogin}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("[]");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/api/login` , {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({username, password})
            })
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const {token} = await response.json();
            onLogin(token);
        } catch (error) {
            console.error("Error logging in:", error);
        }
    };

    return (
       <form onSubmit={handleSubmit}>
        <input 
        type= "text"
        value="username"
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required/>
        <input 
        type= "password"
        value="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required/>
        <button type="submit">Login</button>
       </form>
    )
}
export default Login;