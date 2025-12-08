import type { NextFunction, Request, Response } from "express";
import type { IUser } from "../models/user.js";
export interface AuthenticatedRequest extends Request {
    user?: IUser | null;
}
export declare const is_auth: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=isAuth.d.ts.map