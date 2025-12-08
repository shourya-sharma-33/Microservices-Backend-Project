import express from "express";
import dotenv from "dotenv";
import { startSendOtpConsumer } from "./consumer.js";

dotenv.config();

const application = express();

startSendOtpConsumer();

application.listen(process.env.PORT, () => {
    console.log(`Mail service running on port ${process.env.PORT}`);
});