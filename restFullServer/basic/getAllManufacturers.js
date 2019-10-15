var request = require("request");
//var jwtToken = require('../basic/jwtToken.js');
async function getAllManufacturers(req,res) {

    options = {
        method: 'GET',
        url: 'http://localhost:3000/api/composer.base.Manufacturer',
        headers: {accept: 'application/json'},
        json: true
    };
    
    
    request(options, async function (error, response, body) {
        if (error)
            return res.status(500).send(JSON.stringify({success: false, message:error}));

        if (response.statusCode!=200)
            return res.status(response.statusCode).send(JSON.stringify({success: false, message: body.error.message}));


        return res.send(JSON.stringify({success: true, result: body}));
    });
    

}

module.exports={
    getAllManufacturers
}
