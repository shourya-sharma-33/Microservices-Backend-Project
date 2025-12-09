import express from "express";
import { is_auth } from "../middlewares/auth.js";
import { createNewChat } from "../controllers/chat.js";

const router = express.Router();

router.post("/chat/new", is_auth, createNewChat);

export default router;
