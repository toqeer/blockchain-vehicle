var request = require("request");
var jwtToken = require('../basic/jwtToken.js');
var postHistorian = require('../basic/postHistorian.js');

async function updateLicenseOrderStatus(req,res) {

    var orderId= req.body.orderId;
    var licenseNumber= req.body.licenseNumber;
    var issueDate= req.body.issueDate;
    var expiryDate= req.body.expiryDate;
    var licenseOrderStatus= req.body.licenseOrderStatus;
  

    let token = req.headers['x-access-token'] || req.headers['authorization'];
    var verifyTokenResp= await jwtToken.verifyToken(token);
  
    if (!verifyTokenResp.data)
        return res.status(401).send(JSON.stringify({success: false, message:verifyTokenResp.error}));
    
    var mId=verifyTokenResp.data.mId;
   

    if(licenseOrderStatus=='ASSIGNED'){
        if(!licenseNumber)
            return res.status(422).send(JSON.stringify({success: false, message:'licenseNumber id not provided'}));

        var options = {
            method: 'POST',
            url: 'http://localhost:3000/api/org.ksa.vehicle.ministory.UpdateLicenseOrderStatus',
            headers: {'content-type': 'application/json'},
            body: {
                "$class": "org.ksa.vehicle.ministory.UpdateLicenseOrderStatus",
                "licenseNumber": licenseNumber,
                "issueDate": issueDate,
                "expiryDate": expiryDate,
                "licenseOrderStatus": licenseOrderStatus,
                "licenseOrder": "resource:org.ksa.vehicle.ministory.LicenseOrder#"+orderId,
                "ministory": "resource:composer.base.Ministory#"+mId
              },
            json: true
        };
    }
    else{
        var options = {
            method: 'POST',
            url: 'http://localhost:3000/api/org.ksa.vehicle.ministory.UpdateLicenseOrderStatus',
            headers: {'content-type': 'application/json'},
            body: {
                "$class": "org.ksa.vehicle.ministory.UpdateLicenseOrderStatus",
                "licenseOrderStatus": licenseOrderStatus,
                "licenseOrder": "resource:org.ksa.vehicle.ministory.LicenseOrder#"+orderId,
                "ministory": "resource:composer.base.Ministory#"+mId
              },
            json: true
        };
    }
    //console.log(JSON.stringify(options));
    
    request(options, function (error, response, body) {
        if (error){
        console.log(error);
        return res.status(500).send(JSON.stringify({success: false, message:error}));
        }
        //body=JSON.parse(body);

        if (response.statusCode!=200){
        if(body.error.message && body.error.message.includes('object already exists'))
            return res.status(409).send(JSON.stringify({success: false, message:'License Already registered.'}));
        else
            return res.status(response.statusCode).send(JSON.stringify({success: false, message: body.error.message}));
        }
        

        var obj = {
            transactionId : body.transactionId,
            participantInvoking : "resource:composer.base.Ministory#"+mId,
            assetLinked : "resource:org.ksa.vehicle.ministory.LicenseOrder#"+orderId,
            transactionType : "UpdateLicenseOrderStatus",
            transactionInvoked : "org.ksa.vehicle.ministory.UpdateLicenseOrderStatus#"+body.transactionId,
            timestamp : new Date().toISOString()
        };
        postHistorian.postHistorian(obj);


        var result= {success: true, result: {message: "License Order Updated Successfully" , trxId: body.transactionId}};
        return res.send(JSON.stringify(result));
    });
    

}   

module.exports={
    updateLicenseOrderStatus
}
