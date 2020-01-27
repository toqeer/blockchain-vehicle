var request = require("request");
var jwtToken = require('../basic/jwtToken.js');
var postHistorian = require('../basic/postHistorian.js');

async function acceptTransferVehicle(req,res) {

  var buyer= req.body.buyer;
  var vIn= req.body.vIn;

  let token = req.headers['x-access-token'] || req.headers['authorization'];
  var verifyTokenResp= await jwtToken.verifyToken(token);
  
  if (!verifyTokenResp.data)
      return res.status(401).send(JSON.stringify({success: false, message:verifyTokenResp.error}));
  
  var email=verifyTokenResp.data.email;

  //vehicleDetails.$class='org.vda.VehicleDetails';
  //var owner = "resource:composer.base.User#"+email;

  var options = {
    method: 'POST',
    url: 'http://localhost:3000/api/org.vda.VehicleTransferUpdateStatus',
    headers: {'content-type': 'application/json'},
    body: {
        "$class": "org.vda.VehicleTransferUpdateStatus",
        "buyer": "resource:composer.base.User#"+buyer,
        "transferStatus": "BUYER_ACCEPTED",
        "vehicle": "resource:org.vda.Vehicle#"+vIn
      },
    json: true
  };
  
  request(options, function (error, response, body) {
    if (error){
      console.log(error);
      return res.status(500).send(JSON.stringify({success: false, message:error}));
    }
    //body=JSON.parse(body);

    if (response.statusCode!=200)
        return res.status(response.statusCode).send(JSON.stringify({success: false, message: body.error.message}));
    

    var obj= {
      transactionId : body.transactionId,
      participantInvoking : "resource:composer.base.User#"+email,
      assetLinked : "resource:org.vda.Vehicle#"+vIn,
      transactionType : "VehicleTransferUpdateStatus",
      transactionInvoked : "org.vda.VehicleTransferUpdateStatus#"+body.transactionId,
      timestamp : new Date().toISOString()
    };
    postHistorian.postHistorian(obj);

    var result= {success: true, result: {message: "Vehicle Transfer Accepted Successfully", trxId: body.transactionId}};
    //console.log(body);
    return res.send(JSON.stringify(result));
  });
  

}

module.exports={
    acceptTransferVehicle
}
