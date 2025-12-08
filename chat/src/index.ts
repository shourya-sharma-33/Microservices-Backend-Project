import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";

dotenv.config();

const application = express();
connectDb();
application.listen(process.env.PORT, () => {
    console.log(`chat service running on port ${process.env.PORT}`);
});