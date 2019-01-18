const { UTILS } = global.MY1_GLOBAL;

module.exports = function({ req, res }, next) {

    if (req.responceError) {
        console.err("99_catchErrorMiddleware", req.responceError);
        UTILS.catchServerError({ req, res })({});
    } else {
        return next({ req, res });
    }
}