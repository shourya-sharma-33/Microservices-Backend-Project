import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import chatRoutes from "./routes/chat.js";   // FIXED PATH

dotenv.config();

const application = express();
application.use(express.json());

connectDb();

application.use("/api/v1", chatRoutes);
application.use(express.json())
application.listen(process.env.PORT, () => {
    console.log(`chat service running on port ${process.env.PORT}`);
});
