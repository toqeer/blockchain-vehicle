var request = require("request");
var jwtToken = require('../basic/jwtToken.js');
async function getAllVehicleTransactions(req,res) {

    let token = req.headers['x-access-token'] || req.headers['authorization'];
    var verifyTokenResp= await jwtToken.verifyToken(token);
    
    var vIn = req.query.vIn;
    if (!verifyTokenResp.data)
        return res.status(401).send(JSON.stringify({success: false, message:verifyTokenResp.error}));
    
    var email=verifyTokenResp.data.email;
    var filter = {where:{assetLinked:'resource:org.vda.Vehicle#'+vIn}};
    options = {
        method: 'GET',
        url: 'http://localhost:3000/api/composer.base.Historian',
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
            delete element.$class;
            //delete element.transactionInvoked;
            delete element.assetLinked;
            //element.participantInvoking = element.participantInvoking.slice(element.participantInvoking.lastIndexOf('#') + 1);
            element.participantInvoking = element.participantInvoking.slice(element.participantInvoking.lastIndexOf('#') + 1);
        });

        body.sort(function(x, y){
            return new Date(y.timestamp).getTime() - new Date(x.timestamp).getTime();
        });
        return res.send(JSON.stringify({success: true, result: body}));
    });
    

}

module.exports={
    getAllVehicleTransactions
}
