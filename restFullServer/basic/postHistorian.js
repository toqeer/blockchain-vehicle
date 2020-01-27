var request = require("request");  
function postHistorian(obj) {
    return new Promise(async resolve => {
        var options = {
            method: 'POST',
            url: 'http://localhost:3000/api/composer.base.Historian',
            headers: {'content-type': 'application/json'},
            body: {
                "$class": "composer.base.Historian",
                "transactionId": obj.transactionId,
                "participantInvoking": obj.participantInvoking,
                "assetLinked": obj.assetLinked,
                "transactionType": obj.transactionType,
                "transactionInvoked": obj.transactionInvoked,
                "timestamp": obj.timestamp
            },
            json: true
          };
          
          request(options, function (error, response, body) {
            if (error){
              console.log(error);
              return resolve({success: false});
            }
            //console.log(body);
            return resolve({success: true});
          });
    });
} 
  
  

module.exports={
    postHistorian
}
