
import React from "react";
import AdminProfilePage from "../pages/admin/AdminProfilePage";
import { useNavigate } from "react-router-dom";

function HOmePageHeader(userType) {
  const navigate = useNavigate();
  
  let mode =
    userType.name === "admin"
      ? "Admin Mode"
      : userType.name === "Org"
      ? "Event Organizer Mode"
      : "Normal user mode";

  const goToProfile = () => {
    if (userType.name === "admin") {
        navigate("/adminProf"); // Example route for AdminProfilePage
      } else if (userType.name === "org") {
        navigate("org/HomeOrg");
      } else if (userType.name === "NormalUser") {
        navigate("User/HomeUser");
      } 
    
  };

  if (userType.name === "admin") {
    mode = "Admin Mode";
  } else if (userType.name === "Org") {
    mode = "Event Organizer Mode";
  } else if (userType.name === "NormalUser") {
    mode = "Normal user mode";
  } 

  return (
    <div>
      <div className="HeaderItems">
        <button className={"homeBtn"} onClick={goToProfile}>
          profile
        </button>
        <br/><br/>
      </div>
      <hr />
    </div>
  );
}

export default HOmePageHeader;
