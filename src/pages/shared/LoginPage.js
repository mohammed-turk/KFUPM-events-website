import React from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import logoImg from "../../assets/kfupm-logo.png";

function LoginPage() {
  const navigate = useNavigate();

  const handleAdminAccess = () => navigate("/admin/home");
  const handleUserAccess = () => navigate("/user/home");
  const handleOrgAccess = () => navigate("/org/home");
  const handleSignup = () => navigate("/signup");

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

          <form className="login-form">
            <label>Username</label>
            <input type="text" placeholder="example@kfupm.edu.sa" />

            <label>Password</label>
            <input type="password" placeholder="●●●●●●" />

            <div className="form-footer">
              <span className="forgot-password">Forgot password?</span>
            </div>

            <button type="submit" className="submit-btn">
              Login
            </button>
          </form>

          <p className="signup-text">
            Don’t have an account?{" "}
            <span onClick={handleSignup}>Sign Up for free</span>
          </p>

          <div className="access-buttons">
            <button className="access user" onClick={handleUserAccess}>
              User Interface
            </button>
            <button className="access admin" onClick={handleAdminAccess}>
              Admin Interface
            </button>
            <button className="access org" onClick={handleOrgAccess}>
              Org Interface
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
