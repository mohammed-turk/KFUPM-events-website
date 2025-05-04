import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUpPage() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, username, email, password }),
      });

      const result = await response.json();
      setMessage(result.message || "Signup complete");

      if (result.success) {
        setName("");
        setUsername("");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.error("error:", error);
      setMessage("Failed to submit: " + error.message);
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.card}>
        <h1 style={styles.title}>Sign Up</h1>

        {message && <p style={styles.message}>{message}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />

          <label style={styles.label}>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={styles.input}
          />

          <label style={styles.label}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />

          <label style={styles.label}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />

          <button type="submit" style={styles.button}>
            Sign Up
          </button>
        </form>

        <p style={styles.loginText}>
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} style={styles.loginLink}>
            Log in
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  pageWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f2f4f8",
  },
  card: {
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
  },
  title: {
    fontSize: "36px",
    marginBottom: "20px",
    textAlign: "center",
    letterSpacing: "2px",
  },
  message: {
    backgroundColor: "#e3f6e5",
    padding: "10px",
    borderRadius: "6px",
    marginBottom: "15px",
    color: "#20572b",
    fontSize: "14px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "6px",
    fontSize: "14px",
    fontWeight: "600",
  },
  input: {
    marginBottom: "15px",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  button: {
    padding: "12px",
    backgroundColor: "#00407a",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "10px",
  },
  loginText: {
    marginTop: "20px",
    textAlign: "center",
    fontSize: "14px",
    color: "#333",
  },
  loginLink: {
    color: "#0066cc",
    textDecoration: "underline",
    cursor: "pointer",
  },
};

export default SignUpPage;
