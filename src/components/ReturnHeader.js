import React from "react";
import BackButtonImg from "../../src/assets/icons/BackBtn.png";

import { useNavigate } from "react-router-dom";

function ReturnHeader() {
  const navigate = useNavigate();
  const userType = "admin";
  let mode =
    userType === "admin"
      ? "Admin Mode"
      : userType === "Org"
      ? "EventMod Organizer Mode"
      : "";

  const goHome = () => {
    navigate("/adminProf"); // Example route for AdminProfilePage
  };

  return (
    <div>
      <div className="HeaderItems">
        <button
          className="homeBtn"
          onClick={goHome}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
          }}
        >
          <img src={BackButtonImg} alt="Back" className="back-btn-img" />
        </button>
        <h3 className="mode">{mode}</h3>
      </div>
      <hr />
    </div>
  );
}

export default ReturnHeader;
