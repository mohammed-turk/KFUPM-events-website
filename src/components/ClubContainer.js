import React from "react";
import {useNavigate} from "react-router-dom";

const ClubsContainer = ({ clubs, max}) => {
    const navigate = useNavigate();

    const horizontalScrollContainer = {
        display: "flex",
        flexWrap: "nowrap",
        gap: "10px",
        overflowX: "auto",
        paddingBottom: "10px",
        scrollbarColor: "darkblue transparent",
        scrollbarWidth: "thin",
    };

    const clubItem = {
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        width: "100px",
        height: "100px",
        overflow: "hidden",
        padding: 0,
        border: "2px solid transparent",
        transition: "transform 0.2s ease",
        cursor: "pointer",
        flexShrink: 0,
    };

    const clubIcon = {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
    };

    function handleClick(club){
        if (!club || !club._id) {
            console.error("Attempted to navigate to club with missing ID");
            return;
        }

        navigate(`/club/${club._id}`, {
            state: {
                clubData: club
            }
        });
    };

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    return (
        <div style={horizontalScrollContainer}>
            {shuffle(clubs).slice(0, max).map((club, index) => (
                <button
                    key={club._id || index}
                    style={clubItem}
                    onClick={() => handleClick(club)}
                    title={club.name}
                >
                    <img
                        src={club.iconURL}
                        alt={club.name}
                        style={clubIcon}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/100";
                        }}
                    />
                </button>
            ))}
        </div>
    );
};

export default ClubsContainer;