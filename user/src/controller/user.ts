import { generateToken } from "../config/generate_token.js"
import { publishToQueue } from "../config/rabbitmq.js"
import try_catch from "../config/try_catch.js"
import { redisClient } from "../index.js"
import { User } from "../models/user.js"

import {
    okRes,
    badRequestRes,
    unauthorizedRes,
    notFoundRes
} from "../config/res_handler.js"
import type { AuthenticatedRequest } from "../middleware/isAuth.js"


export const loginUser = try_catch(async (req, res) => {
    const { email } = req.body

    const rateLimitKey = `otp:ratelimit:${email}`
    const ratelimit = await redisClient.get(rateLimitKey)

    if (ratelimit) {
        return badRequestRes(res, {
            message: "Too Many Request, Please Wait Before new otp request"
        }, 429)
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    const OtpKey = `otp:${email}`
    await redisClient.set(OtpKey, otp, { EX: 300 })

    await redisClient.set(rateLimitKey, "true", { EX: 60 })

    const message = {
        to: email,
        subject: "ur otp code",
        body: `Your otp is ${otp}, valid for 300 seconds`
    }

    await publishToQueue("send-otp", message)

    return okRes(res, {
        message: "otp send"
    })
})




export const verifyUser = try_catch(async (req, res) => {
    const { email, otp: enteredOtp } = req.body

    if (!email || !enteredOtp) {
        return badRequestRes(res, {
            message: "Email and OTP both required"
        })
    }

    const otpKey = `otp:${email}`
    const storedOtp = await redisClient.get(otpKey)

    if (!storedOtp || storedOtp !== enteredOtp) {
        return unauthorizedRes(res, {
            message: "Invalid or Expired OTP"
        })
    }

    await redisClient.del(otpKey)

    let user = await User.findOne({ email })
    if (!user) {
        const name = email.slice(0, 8)
        user = await User.create({ name, email })
    }

    const token = generateToken(user)

    return okRes(res, {
        message: "User verified",
        user,
        token
    })
})


export const userProfile = try_catch(async (req : AuthenticatedRequest, res ) => {
    const user = req.user;

    res.json(user);
})


export const updateUserName = try_catch(async (req : AuthenticatedRequest, res) => {
    const user = await User.findById(req.user?._id);

    if (!user) {
        notFoundRes(res, {
            message : "please login"
        });
        return;
    }

    user.name = req.body.name;
    await user.save();
    const token = generateToken(user);

    res.json({
        message : "user updated",
        user, token
    })

})

export const getAllUsers = try_catch(async(req:AuthenticatedRequest, res) => {
    const users = await User.find();

    res.json(users);
})


export const getUserByName = try_catch(async (req, res)=> {
    const user = await User.findById(req.params.id);
    res.json(user);
})