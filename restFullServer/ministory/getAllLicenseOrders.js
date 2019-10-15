var request = require("request");
var jwtToken = require('../basic/jwtToken.js');
async function getAllLicenseOrders(req,res) {

    let token = req.headers['x-access-token'] || req.headers['authorization'];
    var verifyTokenResp= await jwtToken.verifyToken(token);
    let licenseOrderStatus = req.query.licenseOrderStatus;
    
    if (!verifyTokenResp.data)
        return res.status(401).send(JSON.stringify({success: false, message:verifyTokenResp.error}));
    
    var mId=verifyTokenResp.data.mId;


    if(licenseOrderStatus){
        filter = {where:{and:[{ministory:'resource:composer.base.Ministory#'+mId},{licenseOrderStatus:licenseOrderStatus}]}};  
    }else{
        filter = {where:{ministory:'resource:composer.base.Ministory#'+mId}};
    }


    //var filter = {where:{orderer:'resource:composer.base.User#'+email}};
    options = {
        method: 'GET',
        url: 'http://localhost:3000/api/org.ksa.vehicle.ministory.LicenseOrder',
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
    getAllLicenseOrders
}
