import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Select from 'react-select';

function AddEventPage() {
    const [title, setTitle] = useState("");
    const [selectedProvider, setSelectedProvider] = useState(null);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [poster, setPoster] = useState(null);
    const [clubOptions, setClubOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");

    // Fetch clubs for provider dropdown
    useEffect(() => {
        const fetchClubs = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/clubs');
                const clubs = await response.json();
                setClubOptions(clubs.map(club => ({
                    value: club._id,
                    label: club.name
                })));
            } catch (error) {
                console.error("Error fetching clubs:", error);
                setMessage("Failed to load clubs");
            }
        };
        fetchClubs();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setPoster(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        //Validation
        if (!selectedProvider || !poster) {
            setMessage("Please select a provider and poster image");
            return;
        }

        setIsLoading(true);
        setMessage("");

        try {
            const uploadData = new FormData();
            uploadData.append('file', poster); // Use the state directly
            uploadData.append('upload_preset', 'event_poster');

            console.log('Uploading file:', poster.name); // Verify file

            const cloudinaryResponse = await fetch(
                'https://api.cloudinary.com/v1_1/dxvl17oal/image/upload',
                { method: 'POST', body: uploadData }
            );

            const cloudinaryResult = await cloudinaryResponse.json();
            console.log('Cloudinary result:', cloudinaryResult);

            if (!cloudinaryResult.secure_url) {
                throw new Error('Image upload failed: No URL returned');
            }

            // 2. Send to backend
            const backendPayload = {
                title,
                provider: selectedProvider,
                date,
                timing: time,
                poster: cloudinaryResult.secure_url
            };

            console.log("Final payload:", backendPayload); // Verify before sending


            const response = await fetch('http://localhost:3000/api/clubs/admin/addOrg', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(backendPayload)
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.error || 'Failed to create event');

            setMessage("Event created successfully!");
            // Reset form
            setTitle("");
            setSelectedProvider(null);
            setDate("");
            setTime("");
            setPoster(null);

        } catch (error) {
            setMessage(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Header type={"Admin mode"}/>
            <div className="pageBody" id={"loginPage"}>
                <div className="loginTab">
                    <h1 style={{fontSize:"62px", letterSpacing:"7px"}}>Add a new event</h1>
                    {message && (
                        <p style={{color: message.includes("success") ? "green" : "red"}}>
                            {message}
                        </p>
                    )}
                    <form onSubmit={handleSubmit}>
                        <label>Event Title</label>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />

                        <label>Provider (Club)</label>
                        <Select
                            options={clubOptions}
                            placeholder="Select a club..."
                            value={selectedProvider}
                            onChange={setSelectedProvider}
                            isSearchable
                            required
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    minWidth: '250px',
                                    minHeight: '25px',
                                    marginBottom: '10px',
                                    borderRadius: '5px',
                                    border: '2px solid gray',
                                })
                            }}
                        />

                        <label>Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />

                        <label>Time</label>
                        <input
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            required
                        />

                        <label>Poster</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            required
                        />

                        <button type="submit" disabled={isLoading}>
                            {isLoading ? "Creating Event..." : "Add Event"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddEventPage;