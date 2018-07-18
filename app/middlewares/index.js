const fs = require("fs");
const path = require("path");

module.exports = function(UTILS) {

    let middleware = new UTILS.Middleware();

    let files = fs.readdirSync(__dirname);
    files.sort().pop(); // remove index.js 


    files.map((file) => {
        require(path.join(__dirname, file));
    });

    console.log('@>files: ',files)

    let runMiddlewareFunctions = files.map((middle) => {
        return require(path.join(__dirname, middle));
    }).filter(e => e);

    runMiddlewareFunctions.map((midleFunction) => {
        middleware.use(midleFunction);
    });

    return middleware;
}