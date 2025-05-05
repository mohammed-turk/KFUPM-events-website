import React, {useState} from "react";
import Header from "../../components/Header";

function AddOrgPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [icon, setIcon] = useState(null);
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setIcon(file);
    };

    const handleAdd = async (event) => {
        event.preventDefault();

        //validation
        if (!icon) {
            setMessage("Please select an image first");
            return;
        }

        setIsLoading(true);
        setMessage("");

        try {
            // 1. Upload to Cloudinary
            const uploadData = new FormData();
            uploadData.append('file', icon); // Use the state directly
            uploadData.append('upload_preset', 'club_icons');

            console.log('Uploading file:', icon.name); // Verify file

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
                name,
                email,
                password,
                icon: cloudinaryResult.secure_url // Change this to match backend expectation
            };

            console.log("Final payload:", backendPayload); // Verify before sending

            const response = await fetch('http://localhost:3000/api/clubs/admin/addOrg', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(backendPayload)
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.error || 'Backend error');

            setMessage('Club created successfully!');
            setName("");
            setEmail("");
            setPassword("");
            setIcon(null);
            setIsLoading(false);

        } catch (error) {
            console.error('Error:', error);
            setMessage(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Header type={"Admin Mode"}/>
            <div className="pageBody" id={"loginPage"}>
                <div className="loginTab">
                    <h1 style={{textAlign: "center"}}>Add new club</h1>
                    {message && (
                        <p className={message.includes("Failed") ? "error" : "success"}>
                            {message}
                        </p>
                    )}
                    <form onSubmit={handleAdd}>

                        <label>Club name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <label>Icon</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            required
                        />
                        <button type="submit" disabled={isLoading}>
                            {isLoading ? "Processing..." : "Add Club"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddOrgPage;