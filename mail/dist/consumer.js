import amqp from "amqplib";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
export const startSendOtpConsumer = async () => {
    try {
        const connection = await amqp.connect({
            protocol: "amqp",
            hostname: process.env.RABBITMQ_HOST,
            port: 5672,
            username: process.env.RABBITMQ_USERNAME,
            password: process.env.RABBITMQ_PASSWORD,
        });
        const channel = await connection.createChannel();
        const queueName = "send-otp";
        console.log("Mail service starting...");
        await channel.assertQueue(queueName, { durable: true });
        channel.consume(queueName, async (msg) => {
            if (!msg)
                return;
            try {
                const { to, subject, body } = JSON.parse(msg.content.toString());
                const transport = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 465,
                    secure: true,
                    auth: {
                        user: process.env.MAIL_USERNAME,
                        pass: process.env.MAIL_PASSWORD,
                    },
                });
                await transport.sendMail({
                    from: `"Chat App" <${process.env.MAIL_USERNAME}>`,
                    to,
                    subject,
                    text: body,
                });
                console.log(`OTP email sent to ${to}`);
                channel.ack(msg);
            }
            catch (err) {
                console.error("Error processing email:", err);
                channel.nack(msg, false, true);
            }
        });
        console.log("Mail service consumer started. Listening for OTP emails...");
    }
    catch (error) {
        console.error("Failed to start RabbitMQ consumer:", error);
    }
};
//# sourceMappingURL=consumer.js.map