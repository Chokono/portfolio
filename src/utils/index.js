const fs = require("fs");
const path = require("path");


module.exports = function(UTILS) {

    let files = fs.readdirSync(__dirname);
    files.sort().pop(); // remove index.js 

    files.map((file) => {
            return require(path.join(__dirname, file));
        })
        .filter(e => e)
        .map(e => e(UTILS));
}