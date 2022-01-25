// Dependencies
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
dotenv.config();
app.use(express.json());
app.use(cookieParser()); 
app.use(morgan("tiny"));

// Start Server
app.listen(PORT, () => console.log(`🌎 Server Listening at: http://localhost:${PORT} 🌎`));