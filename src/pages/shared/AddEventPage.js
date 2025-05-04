import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

function AddEventPage() {
    const [title, setTitle] = useState("");
    const [selectedProvider, setSelectedProvider] = useState(null);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [poster, setPoster] = useState(null);
    const [clubOptions, setClubOptions] = useState([]);
    const [isLoadingClubs, setIsLoadingClubs] = useState(false);
    const [message, setMessage] = useState("");

    // Fetch and transform clubs into options format
    useEffect(() => {
        const fetchClubs = async () => {
            setIsLoadingClubs(true);
            try {
                const response = await fetch('http://localhost:3000/api/clubs');
                const clubs = await response.json();

                const options = clubs.map(club => ({
                    value: club._id, // store the ID
                    label: club.name // display the name
                }));

                setClubOptions(options);
            } catch (error) {
                console.error("Error fetching clubs:", error);
                setMessage("Failed to load clubs");
            } finally {
                setIsLoadingClubs(false);
            }
        };
        fetchClubs();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedProvider) {
            setMessage("Please select a provider");
            return;
        }

        const timing = new Date(`${date}T${time}`).toISOString();

        try {
            // Upload poster if exists (same as before)
            let posterUrl = "";
            if (poster) {
                // ... (your Cloudinary upload code)
            }

            // Prepare event data
            const eventData = {
                title,
                provider: selectedProvider.value, // using the ID
                timing,
                posterUrl
            };

            const response = await fetch('http://localhost:3000/api/events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(eventData)
            });

            const result = await response.json();

            if (response.ok) {
                setMessage("Event added successfully!");
                setTitle("");
                setSelectedProvider("");
                setDate("");
                setTime("");
                setPoster(null);
            } else {
                throw new Error(result.message || "Failed to add event");
            }

        } catch (error) {
            console.error("Error:", error);
            setMessage(error.message);
        }
    };

    return (
        <div>
            <Header type={"Admin mode"}/>
            <div className="pageBody" id={"loginPage"}>
                <div className="loginTab">
                    <h1 style={{fontSize:"62px", letterSpacing:"7px"}}>Add a new event</h1>
                    {message && <p style={{color: message.includes("success") ? "green" : "red"}}>{message}</p>}
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
                            isLoading={isLoadingClubs}
                            loadingMessage={() => "Loading clubs..."}
                            placeholder="Search for a club..."
                            noOptionsMessage={() => "No clubs found"}
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
                            onChange={(e) => setPoster(e.target.files[0])}
                        />

                        <button type="submit">Add event</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddEventPage;