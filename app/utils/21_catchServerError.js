const { SERVICES } = global.MY1_GLOBAL;

module.exports = function(UTILS) {
    UTILS.catchServerError = function({ req, res }) {

        return function(err) {
            if (err.name === "BulkWriteError" && err.toJSON) {
                switch (err.toJSON().errorCode) {
                    case 11000:
                        req.responceError = {
                            errorCode: 770011,
                            httpCode: 503
                        }
                        break;
                    default:
                        break;
                }
            }

            if (req.advancedOptions.redirectBack) {
                res.writeHead(302, {
                    "Location": UTILS.queryObjAddFields(req.headers.referer, { "errorCode": (req.responceError && req.responceError.errorCode) || 770000 }),
                });
                res.end();
            } else {

                if (req.responceError) {
                    res.statusCode = req.responceError.httpCode;
                }
                
                res.end(JSON.stringify(req.responceError));
            }
        }
    }
};