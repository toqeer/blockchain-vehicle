var request = require("request");
var jwtToken = require('../basic/jwtToken.js');
async function getAllTakafulRecord(req,res) {

    let token = req.headers['x-access-token'] || req.headers['authorization'];
    var verifyTokenResp= await jwtToken.verifyToken(token);
    
    if (!verifyTokenResp.data)
        return res.status(401).send(JSON.stringify({success: false, message:verifyTokenResp.error}));
    
    var companyId=verifyTokenResp.data.companyId;


 
    filter = {where:{takaful:'resource:composer.base.Takaful#'+companyId}};
    


    //var filter = {where:{orderer:'resource:composer.base.User#'+companyId}};
    options = {
        method: 'GET',
        url: 'http://localhost:3000/api/org.ksa.vehicle.takaful.TakafulRecord',
        qs: {filter: JSON.stringify(filter)},
        headers: {accept: 'application/json'},
        json: true
    };
    
    
    request(options, async function (error, response, body) {
        if (error)
            return res.status(500).send(JSON.stringify({success: false, message:error}));
       // return console.log(body);
        if (response.statusCode!=200)
            return res.status(response.statusCode).send(JSON.stringify({success: false, message: body.error.message}));

        body.forEach(element => {
            element.vehicle = element.vehicle.slice(element.vehicle.lastIndexOf('#') + 1);
            element.takaful = element.takaful.slice(element.takaful.lastIndexOf('#') + 1);
        });
        return res.send(JSON.stringify({success: true, result: body}));
    });
    

}

module.exports={
    getAllTakafulRecord
}
