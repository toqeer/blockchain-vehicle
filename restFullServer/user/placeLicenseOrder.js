var request = require("request");
var jwtToken = require('../basic/jwtToken.js');

async function placeLicenseOrder(req,res) {

  
  var licenseDetails= req.body.licenseDetails;
  var mId= req.body.ministory;

  let token = req.headers['x-access-token'] || req.headers['authorization'];
  var verifyTokenResp= await jwtToken.verifyToken(token);
  
  if (!verifyTokenResp.data)
      return res.status(401).send(JSON.stringify({success: false, message:verifyTokenResp.error}));
  
  var email=verifyTokenResp.data.email;
  var orderId= email+ new Date().getTime();
  licenseDetails.$class='org.license.LicenseDetails';

  var options = {
    method: 'POST',
    url: 'http://localhost:3000/api/org.ksa.vehicle.ministory.PlaceLicenseOrder',
    headers: {'content-type': 'application/json'},
    body: {
        "$class": "org.ksa.vehicle.ministory.PlaceLicenseOrder",
        "orderId": orderId,
        "licenseDetails": licenseDetails,
        "ministory": "resource:composer.base.Ministory#"+mId,
        "orderer": "resource:composer.base.User#"+email
      },
    json: true
  };
  
  request(options, function (error, response, body) {
    if (error){
      console.log(error);
      return res.status(500).send(JSON.stringify({success: false, message:error}));
    }
    //body=JSON.parse(body);

    if (response.statusCode!=200){
      if(body.error.message && body.error.message.includes('object already exists'))
        return res.status(409).send(JSON.stringify({success: false, message:'License Order Already placed.'}));
      else
        return res.status(response.statusCode).send(JSON.stringify({success: false, message: body.error.message}));
    }
    
    var result= {success: true, result: {message: "License Order Placed Successfully", trxId: body.transactionId}};
    return res.send(JSON.stringify(result));
  });
  

}

module.exports={
    placeLicenseOrder
}
