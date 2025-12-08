import type { Response } from "express";

type JsonValue = string | number | boolean | null | JsonObject | JsonValue[];
interface JsonObject { [key: string]: JsonValue }

interface ResponseData extends JsonObject {
    message?: string;
}

export const okRes = <T extends ResponseData>(
    res: Response,
    data: T,
    status: number = 200
) => {
    return res.status(status).json({ success: true, ...data });
};

export const createdRes = <T extends ResponseData>(
    res: Response,
    data: T,
    status: number = 201
) => {
    return res.status(status).json({ success: true, ...data });
};

export const badRequestRes = <T extends ResponseData>(
    res: Response,
    data: T,
    status: number = 400
) => {
    return res.status(status).json({ success: false, ...data });
};

export const unauthorizedRes = <T extends ResponseData>(
    res: Response,
    data: T,
    status: number = 401
) => {
    return res.status(status).json({ success: false, ...data });
};

export const forbiddenRes = <T extends ResponseData>(
    res: Response,
    data: T,
    status: number = 403
) => {
    return res.status(status).json({ success: false, ...data });
};

export const notFoundRes = <T extends ResponseData>(
    res: Response,
    data: T,
    status: number = 404
) => {
    return res.status(status).json({ success: false, ...data });
};

export const serverErrorRes = <T extends ResponseData>(
    res: Response,
    data: T,
    status: number = 500
) => {
    return res.status(status).json({ success: false, ...data });
};
