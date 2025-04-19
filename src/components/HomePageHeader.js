import React from "react";
import { useNavigate } from "react-router-dom";

function HOmePageHeader({ name }) {
  const navigate = useNavigate();

  const goToProfile = () => {
    if (name === "admin") {
      navigate("/adminProf");
    } else if (name === "org") {
      navigate("/org/HomeOrg");
    } else if (name === "user") {
      navigate("/User/HomeUser");
    }
  };

  const SignOut = () => {
    navigate("/login");
  };

  let mode = "";
  if (name === "admin") {
    mode = "Admin Mode";
  } else if (name === "org") {
    mode = "Event Organizer Mode";
  } else if (name === "user") {
    mode = "Normal user mode";
  }

  return (
    <div >
    
      
      
      <h3 className="mode-display ">{mode}</h3>
      <button className="profile-btn" onClick={goToProfile}>
        Profile
      </button>
      <button className="sign-out-btn " onClick={SignOut}>
        Sign out
      </button>
      <hr />
    </div>
  );
}

export default HOmePageHeader;