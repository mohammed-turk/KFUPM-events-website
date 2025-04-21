import React from "react";
import BackButtonImg from "../../src/assets/icons/BackBtn.png";
import { useNavigate, useLocation } from "react-router-dom";

function ReturnHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  // Only show "Clubs Section" if path includes "club" or "Clubs"
  const showClubsLabel = location.pathname.toLowerCase().includes("club");

  const goHome = () => {
    // Navigate based on known path context
    if (location.pathname.startsWith("/admin")) {
      navigate("/admin/home");
    } else if (location.pathname.startsWith("/org")) {
      navigate("/org/home");
    } else {
      navigate("/user/home");
    }
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
        {showClubsLabel && <h3 className="mode">Clubs Section</h3>}
      </div>
      <hr />
    </div>
  );
}

export default ReturnHeader;
