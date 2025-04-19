import React from "react";
import ReturnHeader from "../../components/ReturnHeader";

const clubIcons = Array.from({ length: 20 }).map((_, i) =>
  require(`../../assets/icons/Clubs icons/club${(i % 5) + 1}.jpeg`)
);

function ClubsList() {
  return (
    <div>
      <ReturnHeader />

      <div className="pageBody ClubsListPage">
        <h2 className="clubs-title">Clubs & Colleges</h2>

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
      </div>
    </div>
  );
}

export default ClubsList;
