const express = require("express");
const router = express.Router();
const {getJoinedClubs, joinClub} = require("../controllers/joinedController");

router.get("/", async (req, res) => {
    try {
        const userId = req.query.userid;
        const joinedClubs = await getJoinedClubs(userId);
        res.json(joinedClubs);
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ error: "Server error" });
    }
});

router.post("/joinclub", async (req, res) => {
    try {
        const { clubID, userID } = req.body;

        const joined = await joinClub(userID, clubID);

        res.status(201).json({
            success: true,
            message: "User successfully joined the club.",
            data: joined
        });
    } catch (error) {
        console.error("Error joining club:", error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;