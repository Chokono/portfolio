const formidable = require('formidable');
const util = require('util');
let { PATH_TO_BUNDLE } = global.MY1_GLOBAL;

module.exports = function(UTILS) {
    UTILS.parseBody = function(req, res) {

        return new Promise((resolve, reject) => {

            let form = new formidable.IncomingForm(),
                files = [],
                fields = [];

            form.uploadDir = PATH_TO_BUNDLE;

            form.on('field', function(field, value) {
                    fields.push([field, value]);
                })
                .on('file', function(field, file) {
                    //file.name = true;
                    files.push([field, file]);
                })
                .on('error', function(err) {
                    console.err(err)

                    req.responceError = {
                        code: 770041,
                        httpCode: 403
                    };

                    reject({
                        code: 770041,
                        httpCode: 403
                    });

                })
                .on('end', function() {

                    if (~form.headers['content-type'].indexOf("multipart/form-data; boundary=") || ~form.headers['content-type'].indexOf("application/json")) {

                        if (!req.body) {
                            req.body = {};
                        }

                        fields.map(field => {
                            req.body[field[0]] = field[1];
                        });

                        //console.log('@>files', files);
                        resolve(req.body);

                    } else {
                        reject({
                            code: 770042,
                            httpCode: 503
                        });
                    }

                });


            form.parse(req);

        });
    }
};