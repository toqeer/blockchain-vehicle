var request = require("request");
var jwtToken = require('../basic/jwtToken.js');
async function getAllTransferRequests(req,res) {

    let token = req.headers['x-access-token'] || req.headers['authorization'];
    var verifyTokenResp= await jwtToken.verifyToken(token);
    let licenseOrderStatus = req.query.licenseOrderStatus;
    
    if (!verifyTokenResp.data)
        return res.status(401).send(JSON.stringify({success: false, message:verifyTokenResp.error}));
    
    var mId=verifyTokenResp.data.mId;


    // if(licenseOrderStatus){
    //     filter = {where:{and:[{ministory:'resource:composer.base.Ministory#'+mId},{licenseOrderStatus:licenseOrderStatus}]}};  
    // }else{
    //     filter = {where:{ministory:'resource:composer.base.Ministory#'+mId}};
    // }


    var filter = {where:{and:[{transferFlag:'ACTIVE'},{"transferDetails.transferStatus": "BUYER_ACCEPTED"}]}};
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
            element.transferDetails.seller = element.transferDetails.seller.slice(element.transferDetails.seller.lastIndexOf('#') + 1);
            element.transferDetails.buyer = element.transferDetails.buyer.slice(element.transferDetails.buyer.lastIndexOf('#') + 1);
            element.transferDetails.vehicle = element.transferDetails.vehicle.slice(element.transferDetails.vehicle.lastIndexOf('#') + 1);
            element.owner = element.owner.slice(element.owner.lastIndexOf('#') + 1);
        });
        return res.send(JSON.stringify({success: true, result: body}));
    });
    

}

module.exports={
    getAllTransferRequests
}
