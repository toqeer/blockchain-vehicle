var request = require("request");
var jwtToken = require('../basic/jwtToken.js');
async function getAllLicenseOrders(req,res) {

    let token = req.headers['x-access-token'] || req.headers['authorization'];
    var verifyTokenResp= await jwtToken.verifyToken(token);
    let licenseOrderStatus = req.query.licenseOrderStatus;
    
    if (!verifyTokenResp.data)
        return res.status(401).send(JSON.stringify({success: false, message:verifyTokenResp.error}));
    
    var email=verifyTokenResp.data.email;


    if(licenseOrderStatus){
        filter = {where:{and:[{orderer:'resource:composer.base.User#'+email},{licenseOrderStatus:licenseOrderStatus}]}};  
    }else{
        filter = {where:{orderer:'resource:composer.base.User#'+email}};
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

        body.forEach(element => {
            element.ministory = element.ministory.slice(element.ministory.lastIndexOf('#') + 1);
            element.orderer = element.orderer.slice(element.orderer.lastIndexOf('#') + 1);
        });
        return res.send(JSON.stringify({success: true, result: body}));
    });
    

}

module.exports={
    getAllLicenseOrders
}
