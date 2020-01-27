var request = require("request");
var jwtToken = require('../basic/jwtToken.js');
var postHistorian = require('../basic/postHistorian.js');

async function registerVehicle(req,res) {

  var vIn= req.body.vIn;
  var vehicleDetails= req.body.vehicleDetails;

  let token = req.headers['x-access-token'] || req.headers['authorization'];
  var verifyTokenResp= await jwtToken.verifyToken(token);
  
  if (!verifyTokenResp.data)
      return res.status(401).send(JSON.stringify({success: false, message:verifyTokenResp.error}));
  
  var email=verifyTokenResp.data.email;

  vehicleDetails.$class='org.vda.VehicleDetails';
  var owner = "resource:composer.base.User#"+email;

  var options = {
    method: 'POST',
    url: 'http://localhost:3000/api/org.vda.VehicleRegister',
    headers: {'content-type': 'application/json'},
    body: {
        "$class": "org.vda.VehicleRegister",
        "vehicle": {
          "$class": "org.vda.Vehicle",
          "vIn": vIn,
          "vehicleDetails": vehicleDetails,
          "owner": owner
        }
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
        return res.status(409).send(JSON.stringify({success: false, message:'Vehicle vIn Already registered.'}));
      else
        return res.status(response.statusCode).send(JSON.stringify({success: false, message: body.error.message}));
    }
    
    var obj= {
      transactionId : body.transactionId,
      participantInvoking : "resource:composer.base.User#"+email,
      assetLinked : "resource:org.vda.Vehicle#"+vIn,
      transactionType : "VehicleRegister",
      transactionInvoked : "org.vda.VehicleRegister#"+body.transactionId,
      timestamp : new Date().toISOString()
    };
    postHistorian.postHistorian(obj);

    var result= {success: true, result: {message: "Vehicle Registered Successfully", trxId: body.transactionId}};
    return res.send(JSON.stringify(result));
  });
  

}

module.exports={
    registerVehicle
}
