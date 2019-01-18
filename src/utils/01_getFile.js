const fs = require("fs");

module.exports = function(UTILS) {
    UTILS.getFile = function(res, path) {

        let file = fs.createReadStream(path);

        file.on("data", (chunk) => {
            //console.log('@>chunk.length', chunk.length);
        });

        file.on("error", (err) => {
            console.err(err);
            res.statusCode = 404;
            res.end("404");
            file.close();
        });

        file.on("finish", () => {
            console.log('@>closed')
        });

        file.headers = {
            "accept-encoding": "gzip",
        };
        
        file.method = "GET";

        return file;

    }
};