var request = require("request");
var jwtToken = require('../basic/jwtToken.js');
var postHistorian = require('../basic/postHistorian.js');

async function addFahasRecord(req,res) {

  var recordId= req.body.recordId;
  var description= req.body.description;
  var vIn= req.body.vIn;

  let token = req.headers['x-access-token'] || req.headers['authorization'];
  var verifyTokenResp= await jwtToken.verifyToken(token);
  
  if (!verifyTokenResp.data)
      return res.status(401).send(JSON.stringify({success: false, message:verifyTokenResp.error}));
  
  var companyId=verifyTokenResp.data.companyId;

  

  var options = {
    method: 'POST',
    url: 'http://localhost:3000/api/org.ksa.vehicle.fahas.AddFahasRecord',
    headers: {'content-type': 'application/json'},
    body: {
        "$class": "org.ksa.vehicle.fahas.AddFahasRecord",
        "fahasRecord": {
          "$class": "org.ksa.vehicle.fahas.FahasRecord",
          "recordId": recordId,
          "description": description,
          "fahas": "resource:composer.base.Fahas#"+companyId,
          "vehicle": "resource:org.vda.Vehicle#"+vIn
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
        return res.status(409).send(JSON.stringify({success: false, message:'RecordId Already exists.'}));
      else
        return res.status(response.statusCode).send(JSON.stringify({success: false, message: body.error.message}));
    }
    //console.log(body);
    var obj= {
      transactionId : body.transactionId,
      participantInvoking : "resource:composer.base.Fahas#"+companyId,
      assetLinked : "resource:org.vda.Vehicle#"+vIn,
      transactionType : "AddFahasRecord",
      transactionInvoked : "org.ksa.vehicle.fahas.AddFahasRecord#"+body.transactionId,
      timestamp : new Date().toISOString()
    };
    postHistorian.postHistorian(obj); 
    var result= {success: true, result: {message: "Record Placed Successfully", trxId: body.transactionId}};
    return res.send(JSON.stringify(result));
  });
  

}

module.exports={
    addFahasRecord
}
