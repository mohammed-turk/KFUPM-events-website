import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";

function LoginPage() {
  const navigate = useNavigate();

  const handleAdminAccess = () => {
    navigate("/admin/Home");
  };

  const handleUserAccess = () => {
    navigate("/user/home");
  };

  return (
    <div>
      <Header />
      <div className="pageBody" id={"loginPage"}>
        <div className="loginTab">
          <h1 style={{ fontSize: "62px", letterSpacing: "7px" }}>Login</h1>
          <form>
            <label>Username</label>
            <input />
            <label>Password</label>
            <input type="password" />
            <button type={"submit"}>Login</button>
          </form>
          <p>new User? sign up</p>

          {/* Access Buttons */}
          <div
            style={{
              marginTop: "20px",
              borderTop: "1px solid #ccc",
              paddingTop: "15px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "10px",
              }}
            >
              <button
                onClick={handleUserAccess}
                style={{
                  backgroundColor: "#4CAF50",
                  color: "white",
                  padding: "10px 15px",
                  borderRadius: "4px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "bold",
                  flex: "1",
                }}
              >
                User Interface
              </button>

              <button
                onClick={handleAdminAccess}
                style={{
                  backgroundColor: "#4285F4",
                  color: "white",
                  padding: "10px 15px",
                  borderRadius: "4px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "bold",
                  flex: "1",
                }}
              >
                Admin Interface
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
