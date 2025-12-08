import { type Request, type Response, type NextFunction } from "express";
interface IUser extends Document {
    _id: string;
    name: string;
    email: string;
}
export interface AuthenticatedRequest extends Request {
    user?: IUser | null;
}
export declare const is_auth: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export {};
//# sourceMappingURL=auth.d.ts.map