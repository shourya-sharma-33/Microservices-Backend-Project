export const okRes = (res, data, status = 200) => {
    return res.status(status).json({ success: true, ...data });
};
export const createdRes = (res, data, status = 201) => {
    return res.status(status).json({ success: true, ...data });
};
export const badRequestRes = (res, data, status = 400) => {
    return res.status(status).json({ success: false, ...data });
};
export const unauthorizedRes = (res, data, status = 401) => {
    return res.status(status).json({ success: false, ...data });
};
export const forbiddenRes = (res, data, status = 403) => {
    return res.status(status).json({ success: false, ...data });
};
export const notFoundRes = (res, data, status = 404) => {
    return res.status(status).json({ success: false, ...data });
};
export const serverErrorRes = (res, data, status = 500) => {
    return res.status(status).json({ success: false, ...data });
};
//# sourceMappingURL=res_handler.js.map