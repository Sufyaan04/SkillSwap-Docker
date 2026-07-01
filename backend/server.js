require("dotenv").config();

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport =require("./config/passport");
const connectDB = require("./config/db");

connectDB();
const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());

app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {secure: false},
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/requests", require("./routes/requestRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});