import {} from "express";
import { unauthorizedRes } from "../config/res_handler.js";
import jwt, {} from "jsonwebtoken";
export const is_auth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            unauthorizedRes(res, {
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
        unauthorizedRes(res, { message: "Please login" });
    }
};
//# sourceMappingURL=auth.js.map