import type { Response } from "express";
type JsonValue = string | number | boolean | null | JsonObject | JsonValue[];
interface JsonObject {
    [key: string]: JsonValue;
}
interface ResponseData extends JsonObject {
    message?: string;
}
export declare const okRes: <T extends ResponseData>(res: Response, data: T, status?: number) => Response<any, Record<string, any>>;
export declare const createdRes: <T extends ResponseData>(res: Response, data: T, status?: number) => Response<any, Record<string, any>>;
export declare const badRequestRes: <T extends ResponseData>(res: Response, data: T, status?: number) => Response<any, Record<string, any>>;
export declare const unauthorizedRes: <T extends ResponseData>(res: Response, data: T, status?: number) => Response<any, Record<string, any>>;
export declare const forbiddenRes: <T extends ResponseData>(res: Response, data: T, status?: number) => Response<any, Record<string, any>>;
export declare const notFoundRes: <T extends ResponseData>(res: Response, data: T, status?: number) => Response<any, Record<string, any>>;
export declare const serverErrorRes: <T extends ResponseData>(res: Response, data: T, status?: number) => Response<any, Record<string, any>>;
export {};
//# sourceMappingURL=res_handler.d.ts.map