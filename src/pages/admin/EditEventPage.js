import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header";

function EditEventPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    provider: "",
    timing: "",
    info: "",
    posterURL: ""
  });

  // Fetch event data when component mounts
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/api/events/${eventId}`);
        
        if (!response.ok) {
          throw new Error(`Server returned ${response.status}: ${response.statusText}`);
        }
        
        const eventData = await response.json();
        console.log("Fetched event data:", eventData);
        
        // Format the data for the form
        setFormData({
          title: eventData.title || "",
          provider: eventData.provider || "",
          timing: eventData.timing || "",
          info: eventData.info || "",
          posterURL: eventData.posterURL || ""
        });
        
        setLoading(false);
      } catch (err) {
        console.error("Error loading event:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      const response = await fetch(`http://localhost:3000/api/events/${eventId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error(`Server returned ${response.status}: ${response.statusText}`);
      }
      
      // Navigate back to event details page after successful update
      alert("Event updated successfully!");
      navigate(`/admin/event/${eventId}`);
      
    } catch (err) {
      console.error("Error updating event:", err);
      setError(err.message);
      setLoading(false);
      alert(`Failed to update event: ${err.message}`);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    navigate(`/admin/event/${eventId}`);
  };

  if (loading && !formData.title) {
    return (
      <div>
        <Header type="Admin Mode" />
        <div className="pageBody">
          <h1>Loading event data...</h1>
        </div>
      </div>
    );
  }

  if (error && !formData.title) {
    return (
      <div>
        <Header type="Admin Mode" />
        <div className="pageBody">
          <h1>Error loading event</h1>
          <p>{error}</p>
          <button 
            style={buttonStyle} 
            onClick={() => navigate("/admin/eventList")}
          >
            Back to Events List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header type="Admin Mode" />
      <div className="pageBody">
        <div style={containerStyle}>
          <h1 style={titleStyle}>Edit Event</h1>
          
          <form onSubmit={handleSubmit} style={formStyle}>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                style={inputStyle}
                required
              />
            </div>
            
            <div style={formGroupStyle}>
              <label style={labelStyle}>Provider</label>
              <input
                type="text"
                name="provider"
                value={formData.provider}
                onChange={handleInputChange}
                style={inputStyle}
              />
            </div>
            
            <div style={formGroupStyle}>
              <label style={labelStyle}>Timing (e.g., date: الخميس 1 مايو | time: 7:00 PM)</label>
              <input
                type="text"
                name="timing"
                value={formData.timing}
                onChange={handleInputChange}
                style={inputStyle}
              />
            </div>
            
            <div style={formGroupStyle}>
              <label style={labelStyle}>Description/Info</label>
              <textarea
                name="info"
                value={formData.info}
                onChange={handleInputChange}
                style={{...inputStyle, minHeight: "100px"}}
              />
            </div>
            
            <div style={formGroupStyle}>
              <label style={labelStyle}>Poster URL</label>
              <input
                type="text"
                name="posterURL"
                value={formData.posterURL}
                onChange={handleInputChange}
                style={inputStyle}
              />
            </div>
            
            {formData.posterURL && (
              <div style={formGroupStyle}>
                <label style={labelStyle}>Poster Preview</label>
                <div style={posterPreviewContainer}>
                  <img 
                    src={formData.posterURL} 
                    alt="Event Poster Preview" 
                    style={posterPreviewStyle}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/300x200?text=Invalid+Image+URL";
                    }}
                  />
                </div>
              </div>
            )}
            
            <div style={buttonContainerStyle}>
              <button 
                type="button" 
                onClick={handleCancel}
                style={{...buttonStyle, backgroundColor: "#6c757d"}}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                style={buttonStyle}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Styles
const containerStyle = {
  maxWidth: "800px",
  margin: "0 auto",
  padding: "20px",
};

const titleStyle = {
  fontSize: "24px",
  fontWeight: "bold",
  marginBottom: "20px",
  textAlign: "center",
};

const formStyle = {
  backgroundColor: "white",
  padding: "30px",
  borderRadius: "10px",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
};

const formGroupStyle = {
  marginBottom: "20px",
};

const labelStyle = {
  display: "block",
  marginBottom: "5px",
  fontWeight: "500",
  color: "#333",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ddd",
  fontSize: "16px",
};

const posterPreviewContainer = {
  marginTop: "10px",
  maxWidth: "100%",
  height: "200px",
  overflow: "hidden",
  borderRadius: "5px",
  border: "1px solid #ddd",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const posterPreviewStyle = {
  maxWidth: "100%",
  maxHeight: "100%",
  objectFit: "contain",
};

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  gap: "15px",
  marginTop: "30px",
};

const buttonStyle = {
  flex: "1",
  padding: "12px 0",
  backgroundColor: "#3b82f6",
  color: "white",
  border: "none",
  borderRadius: "5px",
  fontSize: "16px",
  fontWeight: "500",
  cursor: "pointer",
};

export default EditEventPage;