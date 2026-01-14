// const express = require('express')
// const cors = require('cors')
// const cookieParser = require('cookie-parser')
// require('dotenv').config()
// const connectDB = require('./config/db')
// const router = require('./routes')


// const app = express()
// app.use(cors({
//     origin : [process.env.FRONTEND_URL, "https://ecommerce-31na.vercel.app"],
//     credentials : true
// }))
// app.use(express.json())
// app.use(cookieParser())

// app.use("/api",router)

// const PORT = 8080 || process.env.PORT


// connectDB().then(()=>{
//     app.listen(PORT,()=>{
//         console.log("connnect to DB")
//         console.log("Server is running "+PORT)
//     })
// })




const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes');

const app = express();

// 1. Updated CORS to allow both local and your live Vercel URL
app.use(cors({
    origin: [
        process.env.FRONTEND_URL, 
        "https://ecommerce-31na.vercel.app" // Your frontend live URL
    ],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// 2. Base route to prevent "Cannot GET /" error on Vercel
app.get("/", (req, res) => {
    res.json({
        message: "Farid Express Server is running successfully!",
        status: "Active"
    });
});

// API Routes
app.use("/api", router);

// 3. Port handling for Vercel (uses 8080 as a fallback)
const PORT = process.env.PORT || 8080;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Connected to DB");
        console.log("Server is running on port " + PORT);
    });
}).catch((err) => {
    console.log("Database connection error: ", err);
});

module.exports = app; // Export for Vercel serverless functions