var request = require("request");
var jwtToken = require('../basic/jwtToken.js');
async function getAllVehicleOrders(req,res) {

    let orderStatus = req.query.orderStatus;
    //return res.send(JSON.stringify({success: true, result: orderStatus}));
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    var verifyTokenResp= await jwtToken.verifyToken(token);
    var filter;

    if (!verifyTokenResp.data)
        return res.status(401).send(JSON.stringify({success: false, message:verifyTokenResp.error}));
    
    var companyId=verifyTokenResp.data.companyId;


    if(orderStatus){
        filter = {where:{and:[{manufacturer:'resource:composer.base.Manufacturer#'+companyId},{orderStatus:orderStatus}]}};  
    }else{
        filter = {where:{manufacturer:'resource:composer.base.Manufacturer#'+companyId}};
    }

    
    //filter = {where:{and:[{manufacturer:'resource:composer.base.Manufacturer#'+companyId},{orderStatus:"PLACED"}]}};
    options = {
        method: 'GET',
        url: 'http://localhost:3000/api/org.ksa.vehicle.manufacturer.Order',
        qs: {filter: JSON.stringify(filter)},
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
    getAllVehicleOrders
}
