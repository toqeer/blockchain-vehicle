var request = require("request");
var jwtToken = require('../basic/jwtToken.js');

async function placeVehicleOrder(req,res) {

  //var orderId= req.body.orderId;
  var vehicleDetails= req.body.vehicleDetails;
  var manufacturer= req.body.manufacturer;

  let token = req.headers['x-access-token'] || req.headers['authorization'];
  var verifyTokenResp= await jwtToken.verifyToken(token);
  
  if (!verifyTokenResp.data)
      return res.status(401).send(JSON.stringify({success: false, message:verifyTokenResp.error}));
  
  var email=verifyTokenResp.data.email;
  var orderId= email+ new Date().getTime();

  vehicleDetails.$class='org.vda.VehicleDetails';
  manufacturer= "resource:composer.base.Manufacturer#"+manufacturer;
  var orderer = "resource:composer.base.User#"+email;

  var options = {
    method: 'POST',
    url: 'http://localhost:3000/api/org.ksa.vehicle.manufacturer.PlaceOrder',
    headers: {'content-type': 'application/json'},
    body: {
        "$class": "org.ksa.vehicle.manufacturer.PlaceOrder",
        "orderId":orderId,
        "vehicleDetails": vehicleDetails,
        "orderer":orderer,
        "manufacturer":manufacturer
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
        return res.status(409).send(JSON.stringify({success: false, message:'Vehicle Order Already placed.'}));
      else
        return res.status(response.statusCode).send(JSON.stringify({success: false, message: body.error.message}));
    }
    
    var result= {success: true, result: {message: "Vehicle Order Placed Successfully", trxId: body.transactionId}};
    return res.send(JSON.stringify(result));
  });
  

}

module.exports={
    placeVehicleOrder
}
