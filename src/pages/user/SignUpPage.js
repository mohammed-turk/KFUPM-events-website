import React, { useState } from "react";
import Header from "../../components/Header";

function SignUpPage() {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/users/signup', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({name, username, email, password}),
            });
            const result = await response.json();
            setMessage(result);

            // Clear form on success
            setName("");
            setUsername("");
            setEmail("");
            setPassword("");

        } catch (error) {
            console.error("error:", error);
            setMessage("Failed to submit: " + error);
        }
    };

    return (
        <div>
            <Header />
            <div className="pageBody" id="loginPage">
                <div className="loginTab">
                    <h1 style={{ fontSize: "62px", letterSpacing: "7px" }}>Sign up</h1>
                    {message && <p>{message}</p>}
                    <form onSubmit={handleSubmit}>
                        <label>Full name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                        <label>Username</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        <label>Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <label>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <button type="submit">Sign up</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;