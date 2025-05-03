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
      navigate("/user/home");
    }
  };

  return (
    <div className="header-container">
      <div className="header-content">
        <div className="header-items">
          <button className="header-btn" onClick={goHome}>
            Home
          </button>
          <div className="header-mode-container">
            <h3 className="header-mode">{prob?.type || "User"} </h3>
          </div>
        </div>
      </div>
      <div className="header-divider" />
    </div>
  );
}

Header.defaultProps = {
  type: "",
};

export default Header;

// CSS Styles
const styles = `
  .header-container {
    background: linear-gradient(135deg, #2b5876 0%, #4e4376 100%);
    padding: 1rem 0;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
  }

  .header-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .header-items {
    display: flex;
    align-items: center;
    position: relative;
  }

  .header-btn {
    background: rgba(255, 255, 255, 0.9);
    color: #2b5876;
    border: none;
    padding: 0.8rem 1.5rem;
    border-radius: 25px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    position: relative;
    z-index: 1;
  }

  .header-mode-container {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: fit-content;
  }

  .header-mode {
    color: #e0f4ff;
    margin: 0;
    font-size: 1.4rem;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .header-divider {
    height: 2px;
    background: rgba(173, 216, 230, 0.3);
    margin-top: 1rem;
    width: 100%;
  }

  @media (max-width: 768px) {
    .header-content {
      padding: 0 1rem;
    }
    
    .header-btn {
      padding: 0.6rem 1rem;
      font-size: 0.9rem;
    }
    
    .header-mode {
      font-size: 1.2rem;
    }
    
    .header-mode-container {
      left: 55%;
    }
  }

  @media (max-width: 480px) {
    .header-mode {
      font-size: 1.1rem;
    }
    
    .header-mode-container {
      left: 60%;
    }
  }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
