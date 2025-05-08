import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import './EditClub.css';

function EditClub() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    iconURL: '',
    leaderName: '',
    contactInfo: '',
    socialMedia: {
      instagram: '',
      twitter: '',
      linkedin: ''
    }
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Try to get data from location state first (passed from list page)
    if (location.state?.clubData) {
      setFormData({
        ...location.state.clubData,
        socialMedia: location.state.clubData.socialMedia || {
          instagram: '',
          twitter: '',
          linkedin: ''
        }
      });
      setLoading(false);
      return;
    }
    
    // Otherwise fetch from API
    const fetchClubData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/api/clubs/${id}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch club data: ${response.status}`);
        }
        
        const clubData = await response.json();
        setFormData({
          ...clubData,
          socialMedia: clubData.socialMedia || {
            instagram: '',
            twitter: '',
            linkedin: ''
          }
        });
        
      } catch (err) {
        console.error("Error fetching club data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClubData();
  }, [id, location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      // Handle nested properties (like socialMedia.instagram)
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      // Handle top-level properties
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const response = await fetch(`http://localhost:3000/api/clubs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error(`Failed to update club: ${response.status}`);
      }
      
      // Show success message and navigate back to the list
      alert('Club updated successfully!');
      navigate('/admin/clubsList');
      
    } catch (err) {
      console.error("Error updating club:", err);
      setError(err.message);
      alert(`Error updating club: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading club data...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/admin/clubsList')}>Back to Clubs List</button>
      </div>
    );
  }

  return (
    <div className="edit-club-container">
      <h2>Edit Club: {formData.name}</h2>
      
      <form onSubmit={handleSubmit} className="edit-club-form">
        <div className="form-group">
          <label htmlFor="name">Club Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description || ''}
            onChange={handleChange}
            rows="4"
          ></textarea>
        </div>
        
        <div className="form-group">
          <label htmlFor="iconURL">Icon URL:</label>
          <input
            type="url"
            id="iconURL"
            name="iconURL"
            value={formData.iconURL || ''}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
          {formData.iconURL && (
            <div className="icon-preview">
              <p>Icon Preview:</p>
              <img 
                src={formData.iconURL} 
                alt="Club Icon Preview" 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/100?text=Invalid+URL";
                }}
              />
            </div>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="leaderName">Leader Name:</label>
          <input
            type="text"
            id="leaderName"
            name="leaderName"
            value={formData.leaderName || ''}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="contactInfo">Contact Information:</label>
          <input
            type="text"
            id="contactInfo"
            name="contactInfo"
            value={formData.contactInfo || ''}
            onChange={handleChange}
            placeholder="Email or phone number"
          />
        </div>
        
        <fieldset className="social-media-fieldset">
          <legend>Social Media</legend>
          
          <div className="form-group">
            <label htmlFor="instagram">Instagram:</label>
            <input
              type="text"
              id="instagram"
              name="socialMedia.instagram"
              value={formData.socialMedia?.instagram || ''}
              onChange={handleChange}
              placeholder="@username"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="twitter">Twitter:</label>
            <input
              type="text"
              id="twitter"
              name="socialMedia.twitter"
              value={formData.socialMedia?.twitter || ''}
              onChange={handleChange}
              placeholder="@username"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="linkedin">LinkedIn:</label>
            <input
              type="text"
              id="linkedin"
              name="socialMedia.linkedin"
              value={formData.socialMedia?.linkedin || ''}
              onChange={handleChange}
              placeholder="LinkedIn URL or username"
            />
          </div>
        </fieldset>
        
        <div className="form-actions">
          <button 
            type="button" 
            className="cancel-button"
            onClick={() => navigate('/admin/clubsList')}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="save-button"
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditClub;