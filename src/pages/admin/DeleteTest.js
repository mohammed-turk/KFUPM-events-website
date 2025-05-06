import React, { useEffect, useState } from "react";

function DeleteTest() {
  const [clubs, setClubs] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchClubs();
  }, []);

  const fetchClubs = async () => {
    try {
      setStatus("Fetching clubs...");
      const res = await fetch("http://localhost:3000/api/clubs");
      const data = await res.json();
      setClubs(data);
      setStatus(`Fetched ${data.length} clubs successfully`);
    } catch (err) {
      console.error("Failed to fetch clubs:", err);
      setStatus(`Error fetching clubs: ${err.message}`);
    }
  };

  const deleteClub = async (clubId, clubName) => {
    if (!clubId) {
      setStatus("Error: No club ID provided");
      return;
    }
    
    if (!window.confirm(`Are you sure you want to delete "${clubName}"?`)) {
      setStatus("Delete canceled");
      return;
    }
    
    try {
      setStatus(`Attempting to delete club ${clubId}...`);
      
      // Method 1: Using fetch
      const response = await fetch(`http://localhost:3000/api/clubs/${clubId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        setStatus(`Club "${clubName}" deleted successfully using fetch`);
        // Remove from UI
        setClubs(clubs.filter(c => c._id !== clubId));
      } else {
        const errorText = await response.text();
        setStatus(`Delete failed with fetch: ${response.status} - ${errorText}`);
      }
    } catch (err) {
      console.error("Error deleting:", err);
      setStatus(`Error: ${err.message}`);
    }
  };

  const deleteWithXhr = (clubId, clubName) => {
    if (!clubId) {
      setStatus("Error: No club ID provided");
      return;
    }
    
    if (!window.confirm(`Are you sure you want to delete "${clubName}" with XHR?`)) {
      setStatus("Delete canceled");
      return;
    }
    
    setStatus(`Attempting to delete club ${clubId} with XHR...`);
    
    // Method 2: Using XMLHttpRequest
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', `http://localhost:3000/api/clubs/${clubId}`, true);
    
    xhr.onload = function() {
      if (this.status >= 200 && this.status < 300) {
        setStatus(`Club "${clubName}" deleted successfully using XHR`);
        // Remove from UI
        setClubs(clubs.filter(c => c._id !== clubId));
      } else {
        setStatus(`Delete failed with XHR: ${this.status} - ${this.responseText}`);
      }
    };
    
    xhr.onerror = function() {
      setStatus(`Network error occurred with XHR`);
    };
    
    xhr.send();
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Delete Test Component</h1>
      
      <div style={{ margin: '20px 0', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
        <h3>Status:</h3>
        <pre>{status}</pre>
      </div>
      
      <button 
        onClick={fetchClubs}
        style={{ marginBottom: '20px', padding: '8px 16px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        Refresh Clubs List
      </button>
      
      <h2>Clubs List:</h2>
      
      {clubs.length === 0 ? (
        <p>No clubs found or still loading...</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {clubs.map(club => (
            <li key={club._id} style={{ marginBottom: '20px', padding: '15px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ margin: '0 0 5px 0' }}>{club.name}</h3>
                <p style={{ margin: '0', color: '#666' }}>ID: {club._id}</p>
              </div>
              <div>
                <button 
                  onClick={() => deleteClub(club._id, club.name)}
                  style={{ marginRight: '10px', padding: '8px 16px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Delete (Fetch)
                </button>
                <button 
                  onClick={() => deleteWithXhr(club._id, club.name)}
                  style={{ padding: '8px 16px', backgroundColor: '#e91e63', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Delete (XHR)
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DeleteTest;