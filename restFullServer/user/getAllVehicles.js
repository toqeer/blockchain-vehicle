var request = require("request");
var jwtToken = require('../basic/jwtToken.js');
async function getAllVehicles(req,res) {

    let token = req.headers['x-access-token'] || req.headers['authorization'];
    var verifyTokenResp= await jwtToken.verifyToken(token);
    
    if (!verifyTokenResp.data)
        return res.status(401).send(JSON.stringify({success: false, message:verifyTokenResp.error}));
    
    var email=verifyTokenResp.data.email;
    var filter = {where:{owner:'resource:composer.base.User#'+email}};
    options = {
        method: 'GET',
        url: 'http://localhost:3000/api/org.vda.Vehicle',
        qs: {filter: JSON.stringify(filter)},
        headers: {accept: 'application/json'},
        json: true
    };
    
    
    request(options, async function (error, response, body) {
        if (error)
            return res.status(500).send(JSON.stringify({success: false, message:error}));

        if (response.statusCode!=200)
            return res.status(response.statusCode).send(JSON.stringify({success: false, message: body.error.message}));

        body.forEach(element => {
            element.owner = element.owner.slice(element.owner.lastIndexOf('#') + 1);
        });
        return res.send(JSON.stringify({success: true, result: body}));
    });
    

}

module.exports={
    getAllVehicles
}
