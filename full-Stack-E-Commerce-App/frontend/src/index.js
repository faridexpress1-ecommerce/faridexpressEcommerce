// 

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes');

const app = express();

// 1. DYNAMIC CORS: This allows BOTH your local testing and your live Vercel site
const allowedOrigins = [
    "http://localhost:3000",
  // Your specific frontend Vercel URL
    process.env.FRONTEND_URL 
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            return callback(new Error('CORS policy block: This origin is not allowed'), false);
        }
        return callback(null, true);
    },
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// 2. HEALTH CHECK: Prevents "Cannot GET /" error on Vercel
app.get("/", (req, res) => {
    res.json({ message: "Farid Express Backend is Live!" });
});

app.use("/api", router);

// 3. PORT HANDLING: Vercel provides the port automatically
const PORT = process.env.PORT || 8080;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Connected to DB");
        console.log("Server is running on port " + PORT);
    });
}).catch(err => {
    console.error("Database connection failed:", err);
});

module.exports = app;