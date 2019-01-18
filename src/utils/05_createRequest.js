var https = require("https");

module.exports = function(UTILS) {
    UTILS.generateRequest = function(options, body) {
        return new Promise((resolve, reject) => {
            https.request(options, function(response) {

                let buffer = [];
                let common_data;
                response.on("data", (data) => {
                    buffer.push(data);
                });

                response.on("error", (err) => {
                    reject("ERROR parse_body");
                });

                response.on("end", () => {
                    try {
                        common_data = Buffer.concat(buffer).toString("utf8");
                    } catch (err) {
                        reject(err);
                    }
                    resolve(common_data);
                });

            }).end(body);
        });
    }
};