import express from "express";

const app = express();
const router = express.Router();

// Basic route
app.get("/", (req, res) => {
  res.send("User server works!");
});

// Example route using router
router.get("/hello", (req, res) => {
  res.send("Hello from /api/users/hello");
});
app.use("/api/users", router);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`User server is running on port ${PORT}`);
});
