var request = require("request");
var jwtToken = require('../basic/jwtToken.js');
var postHistorian = require('../basic/postHistorian.js');

async function revokeLicense(req,res) {

    var licenseNumber= req.body.licenseNumber;
  

    let token = req.headers['x-access-token'] || req.headers['authorization'];
    var verifyTokenResp= await jwtToken.verifyToken(token);
  
    if (!verifyTokenResp.data)
        return res.status(401).send(JSON.stringify({success: false, message:verifyTokenResp.error}));
    
    var mId=verifyTokenResp.data.mId;
   

    
    var options = {
        method: 'POST',
        url: 'http://localhost:3000/api/org.license.RevokeLicense',
        headers: {'content-type': 'application/json'},
        body: {
            "$class": "org.license.RevokeLicense",
            "license": "resource:org.license.License#"+licenseNumber
            },
        json: true
    };
    
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
            assetLinked : "resource:org.license.License#"+licenseNumber,
            transactionType : "RevokeLicense",
            transactionInvoked : "org.license.RevokeLicense#"+body.transactionId,
            timestamp : new Date().toISOString()
        };
        postHistorian.postHistorian(obj);

        var result= {success: true, result: {message: "License Cancelled Successfully" , trxId: body.transactionId}};
        return res.send(JSON.stringify(result));
    });
    

}   

module.exports={
    revokeLicense
}
