if (MY1_SERVER) {
    global.ROOTDIR = __dirname;
}

let ERRORS = {
    "": "some problem with server",
    770000: "unknown error",
    770001: "Incorrect userName",
    770002: "Incorrect password",
    770003: "Incorrect token",
    770004: "Passport local problem",
    770006: "Email is none",
    770010: "unknown error with Mongo",
    770011: "E11000 duplicate key error collection",
    770020: "unknown error with Redis",
    770030: "unknown error with Postgre",
    770040: "unknown error with Sream",
    770041: "Some problem with parse stream body",
    770042: "Bad request",
    770404: "Page not found",
    770405: "You haven't shop with this ID",
    770403: "You are not verifyed",
    770406: "You are not logged in. Please login and try again",
    770407: "You write a wrong email or password. Please try again",
    770408: "You haven't orders with this ID in your shop",
    770409: "You can't cancelled this order",
    770410: "You haven't balance note with this ID in your shop",
};

let ORDER_STATUS = {
    "1": "in progress",
    "2": "ok",
    "3": "cancelled",
    "4": "failed",
    "5": "claim balance"
};

module.exports = {
    PATH_TO_MIDDLEWARES: ROOTDIR + "/middlewares",
    PATH_TO_MODELS: ROOTDIR + "/models",
    PATH_TO_BUNDLE: ROOTDIR + "/bundle",
    JWT_STORAGE: {},
    UTILS: {},
    ORDER_STATUS,
    ERRORS,
    ENV: process.env,
};


/*
127.0.0.1   auth.zeny
127.0.0.1   shops.zeny
*/