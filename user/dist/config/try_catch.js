const try_catch = (handler) => {
    return async (req, res, next) => {
        try {
            await handler(req, res, next);
        }
        catch (err) {
            next(err);
        }
    };
};
export default try_catch;
//# sourceMappingURL=try_catch.js.map