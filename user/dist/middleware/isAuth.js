import jwt from "jsonwebtoken";
import { unauthorizedRes } from "../config/res_handler.js";
export const is_auth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        console.log("AUTH HEADER RECEIVED:", req.headers.authorization);
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return unauthorizedRes(res, {
                message: "Please Login - No Auth In Header"
            });
        }
        const token = authHeader.split(" ")[1];
        const decodedValue = jwt.verify(token, process.env.JWT_SIKURETTO);
        if (!decodedValue?.user) {
            return unauthorizedRes(res, { message: "Token Error" });
        }
        req.user = decodedValue.user;
        next();
    }
    catch (error) {
        return unauthorizedRes(res, { message: "Please login" });
    }
};
//# sourceMappingURL=isAuth.js.map