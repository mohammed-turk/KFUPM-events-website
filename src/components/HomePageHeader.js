import React from "react";
import { useNavigate } from "react-router-dom";

function HOmePageHeader({ name }) {
  const navigate = useNavigate();

  const goToProfile = () => {
    if (name === "admin") {
      navigate("/admin/prof");
    } else if (name === "org") {
      navigate("/org/prof");
    } else {
      navigate("/user/prof");
    }
  };

  const SignOut = () => {
    navigate("/login");
  };

  const mode =
    name === "admin"
      ? "Admin Mode"
      : name === "org"
      ? "Event Organizer Mode"
      : "Normal User Mode";

  return (
    <section
      style={{
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto 30px auto",
        backgroundColor: "rgba(46, 78, 107, 0.76)", // Light gray-blue background
        borderRadius: "16px",
        padding: "24px 32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
      }}
    >
      <h3
        style={{
          fontSize: "1.6rem",
          fontWeight: "700",
          color: "#1f2937",
          margin: 0,
        }}
      >
        {mode}
      </h3>

      <div style={{ display: "flex", gap: "12px" }}>
        <button
          onClick={goToProfile}
          style={{
            backgroundColor: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            fontWeight: "600",
            fontSize: "0.95rem",
            cursor: "pointer",
          }}
        >
          Profile
        </button>

        <button
          onClick={SignOut}
          style={{
            backgroundColor: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            fontWeight: "600",
            fontSize: "0.95rem",
            cursor: "pointer",
          }}
        >
          Sign out
        </button>
      </div>
    </section>
  );
}

export default HOmePageHeader;
