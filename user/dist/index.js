import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import { createClient } from "redis";
import userRoutes from "./routes/user.js";
import { connectRabbitMQ } from "./config/rabbitmq.js";
import cors from "cors";
const application = express();
dotenv.config();
connectDb();
export const redisClient = createClient({
    url: process.env.REDIS_URL,
});
connectRabbitMQ();
application.use(cors());
application.use(express.json());
redisClient.connect().then(() => console.log("connect to redis")).catch(console.error);
const PORT = 5000;
application.use("/api/v1", userRoutes);
application.listen(PORT, () => {
    console.log("Server Running on 5000");
});
//# sourceMappingURL=index.js.map