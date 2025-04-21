import React from "react";
import { useNavigate } from "react-router-dom";

function Header(prob) {
  const navigate = useNavigate();

  const goHome = () => {
    const type = prob?.type?.toLowerCase() || "";

    if (type.includes("admin")) {
      navigate("/admin/home");
    } else if (type.includes("org")) {
      navigate("/org/home");
    } else {
      navigate("/user/home"); // ✅ default to user home
    }
  };

  const goToProfile = () => {
    const type = prob?.type?.toLowerCase() || "";

    if (type.includes("admin")) {
      navigate("/admin/prof");
    } else if (type.includes("org")) {
      navigate("/org/prof");
    } else {
      navigate("/user/prof"); // ✅ default to user profile
    }
  };

  return (
    <div>
      <div className="HeaderItems">
        <button className="headerBtn" onClick={goHome}>
          Home
        </button>
        <h3 className="mode">{prob?.type || "User"}</h3>
        <button className="headerBtn" onClick={goToProfile}>
          Profile
        </button>
      </div>
      <hr />
    </div>
  );
}

Header.defaultProps = {
  type: "",
};

export default Header;
