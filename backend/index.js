const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const scheduleRoutes = require("./routes/scheduleRoutes");
const verifyUser = require("./middleware/authMiddleware");

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // or whatever your frontend runs on
    credentials: true, // <--- this is the important part
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]

  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/schedule", verifyUser, scheduleRoutes);
// Simple test route
app.get("/", (req, res) => res.send("Supabase Auth API running!"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
