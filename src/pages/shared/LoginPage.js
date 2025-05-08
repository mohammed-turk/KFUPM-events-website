import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import logoImg from "../../assets/kfupm-logo.png";

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setUsername("");
    setPassword("");
  }, []); // Empty dependency array means this runs only once on mount

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // const savedUsername = localStorage.getItem("username");
      // const savedPassword = localStorage.getItem("password");
      // if (savedUsername) {
      //   setUsername(savedUsername);
      // }
      // if (savedPassword) {
      //   setPassword(savedPassword);
      // }
      const res = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("username", username); // Save username
      localStorage.setItem("password", password); // Save password

      const tokenPayload = JSON.parse(atob(data.token.split(".")[1]));
      const role = tokenPayload.role;

      if (role === 0) navigate("/admin/home");
      else if (role === 1) navigate("/org/home");
      else navigate("/user/home");
    } catch (err) {
      console.error(err);
      setError("Login failed");
    } finally {
      setUsername("");
      setPassword("");
    }
  };

  return (
    <div className="split-container">
      <div className="left-side">
        <div className="left-content">
          <img src={logoImg} alt="KFUPM Logo" className="kfupm-logo" />
          <p className="description">
            Discover upcoming events,
            <br />
            Reserve your seat instantly,
            <br />
            Register directly through the portal,
            <br />
            And enrich your KFUPM experience!
          </p>
        </div>
      </div>

      <div className="right-side">
        <div className="login-box">
          <h2>Welcome to KFUPM Events!</h2>
          <p className="subtext">
            Sign in to manage your registrations and explore what's happening
            around campus.
          </p>

          <form className="login-form" onSubmit={handleLogin}>
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="●●●●●●"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <div className="error">{error}</div>}

            <button type="submit" className="submit-btn">
              Login
            </button>
          </form>

          <p className="signup-text">
            Don’t have an account?{" "}
            <span onClick={() => navigate("/signup")}>Sign Up for free</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;