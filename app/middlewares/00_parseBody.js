let { UTILS, ERRORS } = global.MY1_GLOBAL;

module.exports = function({ req, res }, next) {

    if (req.method === "POST") {
        UTILS.parseBody(req, req).then(result => {

            req.body = {
                ...req.body,
                ...result
            };

            return next({ req, res });
        }).catch(err => {
            console.err(err);

            req.responceError = {
                code: 770041,
                httpCode: 403
            };

            return next({ req, res });

        })
    } else {
        return next({ req, res });
    }
}