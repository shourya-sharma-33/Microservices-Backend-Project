import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { IUser } from "../models/user.js";

import { unauthorizedRes } from "../config/res_handler.js";

interface JwtPayload {
    user: IUser;
}

export interface AuthenticatedRequest extends Request {
    user?: IUser | null;
}

export const is_auth = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;
        console.log("AUTH HEADER RECEIVED:", req.headers.authorization);

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return unauthorizedRes(res, {
                message: "Please Login - No Auth In Header"
            });
        }

        const token = authHeader.split(" ")[1];

        const decodedValue = jwt.verify(
            token,
            process.env.JWT_SIKURETTO as string
        ) as JwtPayload;

        if (!decodedValue?.user) {
            return unauthorizedRes(res, { message: "Token Error" });
        }

        req.user = decodedValue.user;
        next();
    } catch (error) {
        return unauthorizedRes(res, { message: "Please login" });
    }
};
