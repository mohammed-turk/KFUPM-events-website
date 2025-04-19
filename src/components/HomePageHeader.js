import React from "react";
import { useNavigate } from "react-router-dom";

function HOmePageHeader({ name }) {
  const navigate = useNavigate();

  const goToProfile = () => {
    if (name === "admin") {
      navigate("/admin/prof");
    } else if (name === "org") {
      navigate("/org/prof");
    } else if (name === "user") {
      navigate("/User/prof");
    }
  };

  const SignOut = () => {
    navigate("/login");
  };
  const addOrg = () => {
    navigate("/admin/addOrg");
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

      <button className="sign-out-btn " onClick={addOrg}>
        add Organization
      </button>
      <hr />
    </div>
  );
}

export default HOmePageHeader;