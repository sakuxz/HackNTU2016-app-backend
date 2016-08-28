

module.exports = {
	getJQ: async (plate_no) => {
    return new Promise(function(resolve, reject) {
      var request = require("request");
      var cheerio = require("cheerio");
      request({
        url: "https://www.mvdis.gov.tw/m3-emv-sev/taxi/query",
        method: "POST",
        form: {
          method:'query',
          plateNo: plate_no
        }
      }, function(e,r,b) {
        if(e || !b) {
          reject(e)
          return;
        }
        var $ = cheerio.load(b);
        resolve($);
      });
    });

	}

};
