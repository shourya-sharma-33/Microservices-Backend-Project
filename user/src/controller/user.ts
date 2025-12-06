import { publishToQueue } from "../config/rabbitmq.js"
import try_catch from "../config/try_catch.js"
import { redisClient } from "../index.js"

export const loginUser = try_catch(async (req, res) => {
    const { email } = req.body

    const rateLimitKey = `otp:ratelimit:${email}`
    const ratelimit = await redisClient.get(rateLimitKey)
    if (ratelimit) {
        res.status(429).json({
            message: "Too Many Request, Please Wait Before new otp request"
        })
        return
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    const OtpKey = `otp:${email}`
    await redisClient.set(OtpKey, otp, {
        EX: 300
    })

    await redisClient.set(rateLimitKey, "true", {
        EX: 60
    })

    const message = {
        to: email,
        subject: "ur otp code",
        body: `Your otp is ${otp}, valid for 300 seconds`
    }

    await publishToQueue("send-otp", message)

    res.status(200).json({
        message: "otp send"
    })
})
