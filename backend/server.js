import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";
dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes


//  middleware

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
