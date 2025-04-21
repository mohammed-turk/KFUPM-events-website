import React, { useState } from "react";
import ReturnHeader from "../../components/ReturnHeader";

// Load 20 club icons by rotating through 5 sample images
const clubIcons = Array.from({ length: 20 }).map((_, i) =>
  require(`../../assets/icons/Clubs icons/club${(i % 5) + 1}.jpeg`)
);

function AdminClubsList() {
  const [filterBy, setFilterBy] = useState(""); // default is empty (placeholder)

  const handleFilterChange = (e) => {
    setFilterBy(e.target.value);
    // Add your filtering logic here if needed
  };

  return (
    <div>
      <ReturnHeader />

      <div className="pageBody ClubsListPage">
        <div className="clubs-header-row">
          <h2 className="clubs-title">Clubs & Colleges</h2>

          <div className="search-filter-container">
            <input type="text" className="club-search" placeholder="Search" />
            <select
              className="filter-select"
              value={filterBy}
              onChange={handleFilterChange}
            >
              <option value="" disabled hidden>
                Filter By
              </option>
              <option value="clubName">By Club Name</option>
              <option value="clubId">By Club ID</option>
              <option value="date">By Date</option>
            </select>
          </div>
        </div>

        <div className="club-grid">
          {clubIcons.map((iconSrc, index) => (
            <div key={index} className="club-item">
              <img
                src={iconSrc}
                alt={`Club ${index + 1}`}
                className="club-img"
              />
            </div>
          ))}
        </div>

        <div className="bottom-buttons">
          <button className="fab blue">＋</button>
        </div>
      </div>
    </div>
  );
}

export default AdminClubsList;
