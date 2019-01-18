function httpXHR({ siteHost, path, type, contentType, authorization, data }) {

    return new Promise(function(resolve, reject) {

        let xhr = new XMLHttpRequest();

        //xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

        xhr.open(type, siteHost + path, true);
        contentType && xhr.setRequestHeader('Content-Type', contentType); // application/json
        authorization && xhr.setRequestHeader('Authorization', authorization); // "JWT eyJhbGciO.iJIUzI1Ni.IsInR5c"
        console.log('@>', type, siteHost + path);

        xhr.onreadystatechange = function() {
            if (this.readyState != 4) return;

            let ans;

            try {
                ans = JSON.parse(this.responseText);
            } catch (err) {
                ans = this.responseText;
            };
//            console.log('@>this.responseText ', ans);
            if(ans.errorCode){
                reject(ans);
                return;
            }
            resolve(ans);
        }

        xhr.send(data);

    });

}

export default httpXHR;