const express = require("express");
const router = express.Router();
const {getFavEvents} = require("../controllers/favController");

router.get("/", async (req, res) => {
    try {
        const userId = req.query.userid;
        const favEvents = await getFavEvents(userId);
        res.json(favEvents);
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;