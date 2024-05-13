"use strict";
class brandController {
    CreateBrand(req, res) {
        const data = req.body;
        console.log("data: " + JSON.stringify(data));
        console.log("data: " + data);
    }
}
module.exports = new brandController();
