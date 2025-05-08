const express = require("express");
const router = express.Router();
const {getJoinedClubs} = require("../controllers/joinedController");

router.get("/", async (req, res) => {
    try {
        console.log("joined Router Reached...")
        const userId = req.query.userid;
        console.log("got user ID: ", userId);
        const joinedClubs = await getJoinedClubs(userId);
        console.log("got joined clubs: ", joinedClubs);

        res.json(joinedClubs);
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;