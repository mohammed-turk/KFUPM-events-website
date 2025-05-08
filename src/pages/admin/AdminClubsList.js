import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ClubsListAdmin.css";

function ClubsListAdmin() {
  const [clubs, setClubs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchClubs();
  }, []);

  const fetchClubs = async () => {
    try {
      setLoading(true);
      console.log("ClubsListAdmin - Fetching clubs");
      const res = await fetch("http://localhost:3000/api/clubs");
      const data = await res.json();
      console.log("ClubsListAdmin - Clubs data fetched:", data);
      setClubs(data);
    } catch (err) {
      console.error("ClubsListAdmin - Failed to fetch clubs:", err);
    } finally {
      setLoading(false);
    }
  };

  // Function to view club details
  const handleViewClub = (club) => {
    console.log("ClubsListAdmin - Viewing club:", club.name, club._id);
    navigate(`/admin/club/${club._id}`, {
      state: { clubData: club }
    });
  };

  // Function for editing club
  const handleEdit = (e, club) => {
    // Stop the click event from bubbling up to the card
    e.stopPropagation();
    
    console.log("ClubsListAdmin - Editing club:", club.name, club._id);
    navigate(`/admin/club/edit/${club._id}`, {
      state: { clubData: club }
    });
  };

  // Improved delete function with better feedback and error handling
  const handleDelete = (e, club) => {
    // Stop the click event from bubbling up to the card
    e.stopPropagation();
    
    if (window.confirm(`Are you sure you want to delete "${club.name}"?`)) {
      setLoading(true);
      setDeleteStatus("Deleting...");
      
      console.log("ClubsListAdmin - Attempting to delete club:", club._id);
      
      fetch(`http://localhost:3000/api/clubs/${club._id}`, { 
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        console.log("ClubsListAdmin - Delete response status:", response.status);
        
        // Get the raw text first to examine the response
        return response.text().then(text => {
          console.log("ClubsListAdmin - Delete response text:", text);
          
          let data;
          try {
            if (text) {
              data = JSON.parse(text);
              console.log("ClubsListAdmin - Parsed JSON response:", data);
            }
          } catch (e) {
            console.log("ClubsListAdmin - Response is not JSON");
          }
          
          if (response.ok) {
            console.log("ClubsListAdmin - Delete was successful for club:", club._id);
            setDeleteStatus(`Successfully deleted "${club.name}"`);
            
            // Update the UI by filtering out the deleted club
            setClubs(prevClubs => {
              console.log("ClubsListAdmin - Current clubs:", prevClubs);
              const updatedClubs = prevClubs.filter(c => c._id !== club._id);
              console.log("ClubsListAdmin - Updated clubs:", updatedClubs);
              return updatedClubs;
            });
            
            // Refresh clubs from the server to ensure sync
            setTimeout(() => {
              fetchClubs();
            }, 1000);
            
            // Show a temporary success message
            setTimeout(() => {
              setDeleteStatus(null);
            }, 3000);
          } else {
            // Handle error response
            let errorMessage = `Error: ${response.status}`;
            if (data && data.error) {
              errorMessage += ` - ${data.error}`;
            } else if (text) {
              errorMessage += ` - ${text}`;
            }
            
            console.error("ClubsListAdmin - Delete failed:", errorMessage);
            setDeleteStatus(`Failed: ${errorMessage}`);
            
            // Clear error message after a few seconds
            setTimeout(() => {
              setDeleteStatus(null);
            }, 5000);
          }
        });
      })
      .catch(err => {
        console.error("ClubsListAdmin - Network error:", err);
        setDeleteStatus(`Network error: ${err.message}`);
        
        // Clear error message after a few seconds
        setTimeout(() => {
          setDeleteStatus(null);
        }, 5000);
      })
      .finally(() => {
        setLoading(false);
      });
    }
  };

  const filteredClubs = clubs.filter((club) =>
    club.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-page">
      <div className="admin-header-row">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <h2 className="admin-title">Clubs & Colleges Management</h2>
        <div style={{ width: "80px" }} /> {/* Spacer to balance layout */}
      </div>

      {/* Status message */}
      {deleteStatus && (
        <div className={`status-message ${deleteStatus.includes("Failed") || deleteStatus.includes("Error") ? "error" : "success"}`}>
          {deleteStatus}
        </div>
      )}

      <div className="admin-top-bar">
        <input
          type="text"
          placeholder="Search by name..."
          className="admin-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button 
          className="add-btn" 
          onClick={() => navigate("./addOrg")}
          disabled={loading}
        >
          ＋ Add Club
        </button>
      </div>

      {loading && <div className="loading-indicator">Loading...</div>}

      <div className="admin-grid">
        {filteredClubs.length > 0 ? (
          filteredClubs.map((club, index) => (
            <div 
              key={club._id || index} 
              className="admin-card"
              onClick={() => handleViewClub(club)}
              style={{ cursor: 'pointer' }}
            >
              <div className="admin-img-wrapper">
                <img
                  src={club.iconURL || "https://via.placeholder.com/120"}
                  alt={club.name}
                  className="admin-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/120";
                  }}
                />
              </div>
              <p className="admin-club-name">{club.name}</p>
              <div className="admin-actions">
                <button 
                  className="edit-btn" 
                  onClick={(e) => handleEdit(e, club)}
                  disabled={loading}
                >
                  Edit
                </button>
                <button 
                  className="delete-btn" 
                  onClick={(e) => handleDelete(e, club)}
                  disabled={loading}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          !loading && <p className="no-results">No clubs found</p>
        )}
      </div>

      
      <style jsx>{`
        .admin-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.15);
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  );
}

export default ClubsListAdmin;
