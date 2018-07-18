const http2 = require('http2');
const fs = require('fs');
const path = require('path');
const url = require('url');
const webpack = require('webpack');
const MimeLookup = require('mime-lookup');
const mime = new MimeLookup(require('mime-db'));

global.MY1_SERVER = true;

let { UTILS, ENV, PATH_TO_MODELS } = global.MY1_GLOBAL = require(__dirname + "/globals");
require(__dirname + "/utils")(UTILS);

let middlewares = require(__dirname + "/middlewares")(UTILS);


const webpackConfig = require(path.join(__dirname, "webpack.config"))();
const compiler = webpack(webpackConfig);
compiler.watch({
        aggregateTimeout: 300, // wait so long for more changes
        poll: true // use polling instead of native watchers
    },
    function(err, stats) {
        if (err) {
            console.log(err);
        }
        console.log(stats.toString({
            // Add console colors
            colors: true
        }));
    });

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const PortfolioOptions = {
    key: fs.readFileSync(path.join(__dirname, "..", "keys", "zenyShops.key")),
    cert: fs.readFileSync(path.join(__dirname, "..", "keys", "zenyShops.crt")),
    allowHTTP1: true
};


http2.createSecureServer(PortfolioOptions, function(request, response) {
    let urlParsed = url.parse(request.url, true);
    let reqType = mime.lookup(urlParsed.pathname);
    let callback = ({ req, res }) => {
        res.statusCode = 404;
        res.end(JSON.stringify({}));
    };

    console.sent("shops.zeny", request.method, urlParsed.host, request.headers.referer, urlParsed.pathname);

    response.setHeader('Access-Control-Allow-Origin', '*');

    if (urlParsed.pathname.indexOf("/apiv1/") === 0) {
        if (request.method === "POST") {
            if (urlParsed.pathname === "/apiv1/user") {

                callback = ({ req, res }) => {

                    // (async function() {
                    //     let newUser = await Member.findById(req.body.userID).select(['email', 'date', 'age', 'name']).exec();
                    //     if (!newUser) {
                    //         newUser = new Member({
                    //             _id: req.body.userID,
                    //             email: req.body.userEmail,
                    //             date: new Date
                    //         });
                    //         await newUser.save();
                    //         newUser = await Member.findById(req.body.userID).select(['email', 'date', 'age', 'name']).exec();
                    //     }
                    //     return newUser;
                    // })().then((result) => {
                    //     res.end(JSON.stringify(result));
                    // }).catch(UTILS.catchServerError({ req, res }));
                }

            } else if (urlParsed.pathname === "/apiv1/shops") {

                callback = ({ req, res }) => {
                   
                }
            }
        }
    } else {
        if (request.method == "GET") {
            if (urlParsed.pathname === "/") {
                request = UTILS.getFile(response, path.join(__dirname, "bundle", "index.html"));

                callback = ({ req, res }) => { req.pipe(res) };

            } else if (urlParsed.pathname === "/some-private") {
                request.advancedOptions = {
                    checkToken: true,
                };

                callback = ({ req, res }) => {

                    if (req.body.code) {
                        res.statusCode = parseInt(req.body.code, 10);
                    }

                    res.end(JSON.stringify(req.body));
                }
            } else if (reqType === "application/octet-stream") {
                request = UTILS.getFile(response, path.join(__dirname, "bundle", "index.html"));

                callback = ({ req, res }) => { req.pipe(res) };

            } else if (reqType !== "application/octet-stream") {
                request = UTILS.getFile(response, path.join(__dirname, "bundle", urlParsed.pathname));

                callback = ({ req, res }) => {
                    req.pipe(res)
                };
            }
        }
    }

    middlewares.init({ req: request, res: response }, callback);

}).listen(ENV.PORT || 3001, '127.0.0.1', () => {
    console.log(`https://shops.zeny:${ENV.PORT||3001}`);
});

process.on('uncaughtException', function(error) {
    console.trace(error)
});