const https = require("https");
const querystring = require('querystring');
const url = require('url');

module.exports = function(UTILS) {
    UTILS.queryObjAddFields = function(sitePath, fieldsObj) {

        let parsedPathObj = url.parse(sitePath, true);

        const newSitePathQuery = querystring.stringify({
            ...parsedPathObj.query,
            ...fieldsObj
        });

        console.log('@>portfolio newSitePathQuery', newSitePathQuery);

        let newSitePath = [parsedPathObj.protocol , "//" , parsedPathObj.host , parsedPathObj.pathname];

        newSitePathQuery && newSitePath.push("?" + newSitePathQuery);
        parsedPathObj.hash && newSitePath.push(parsedPathObj.hash);

        console.log('@>portfolio newSitePath: ', newSitePath.join(""));

        return newSitePath.join("");

    }

};