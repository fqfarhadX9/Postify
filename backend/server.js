const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db.js");
const authRoutes = require("./routes/auth.routes.js")
const userRoutes = require("./routes/user.routes.js")
const postRoutes = require("./routes/post.route.js")
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 5000;

dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser())
app.use(express.json())
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
