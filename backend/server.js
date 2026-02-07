const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db.js");
const authRoutes = require("./routes/auth.routes.js")
const userRoutes = require("./routes/user.routes.js")
const taskRoutes = require("./routes/task.routes.js")
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 5000;

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(cookieParser())
app.use(express.json())

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/task", taskRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
