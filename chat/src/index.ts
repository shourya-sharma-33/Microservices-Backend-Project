import express from "express";
import dotenv from "dotenv";

dotenv.config();

const application = express();

application.listen(process.env.PORT, () => {
    console.log(`chat service running on port ${process.env.PORT}`);
});