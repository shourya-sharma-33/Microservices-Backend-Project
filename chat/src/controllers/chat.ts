import { badRequestRes, createdRes } from "../config/res_handler.js";
import try_catch from "../config/try_catch.js";
import {
    AuthenticatedRequest
} from "../middlewares/auth.js"
import { Chat } from "../models/chat.js";

export const createNewChat = try_catch(
    async (req:AuthenticatedRequest, res) => {
        const userId = req.user?._id;
        const {
            otherUserId
        } = req.body;

        if (!otherUserId) {
            badRequestRes(res, {
                message : "Other Userid Is Required"
            });

            return;
        }

        const existingChat = await Chat.findOne({
            users : {
                $all : [userId, otherUserId], $size : 2
            }
        });

        if (existingChat) {
            res.json({
                message : "Chat Already Exists",
                chatId : existingChat._id
            })
            return;

        }

        const newChat = await Chat.create({
            users : [userId, otherUserId]
        });

        createdRes(res, {
            message : "New Chat Created",
            chatId : newChat._id,
        })



    }
)