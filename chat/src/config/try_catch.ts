import type { NextFunction, Request, Response, RequestHandler } from "express";

const try_catch = (handler: RequestHandler): RequestHandler => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await handler(req, res, next);
        } catch (err) {
            next(err);
        }
    };
};

export default try_catch;
